# Copyright (c) 2012-2016 Seafile Ltd.
import os
import logging

from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.utils.translation import ugettext as _

from seaserv import seafile_api, ccnet_api

from constance import config

from seahub.api2.utils import api_error
from seahub.api2.throttling import UserRateThrottle
from seahub.api2.permissions import IsProVersion
from seahub.api2.authentication import TokenAuthentication
from seahub.api2.endpoints.utils import api_check_group

from seahub.base.templatetags.seahub_tags import email2nickname
from seahub.base.accounts import User
from seahub.signals import repo_created
from seahub.group.utils import is_group_admin
from seahub.utils import is_valid_dirent_name, \
        is_pro_version, normalize_dir_path, is_valid_username, \
        send_perm_audit_msg
from seahub.utils.repo import get_library_storages, get_repo_owner
from seahub.utils.timeutils import timestamp_to_isoformat_timestr
from seahub.share.signals import share_repo_to_group_successful
from seahub.constants import PERMISSION_READ, PERMISSION_READ_WRITE

from seahub.settings import ENABLE_STORAGE_CLASSES, STORAGE_CLASS_MAPPING_POLICY

logger = logging.getLogger(__name__)

def get_group_owned_repo_info(request, repo_id):

    repo = seafile_api.get_repo(repo_id)

    repo_info = {}
    repo_info['id'] = repo_id
    repo_info['name'] = repo.name

    repo_info['mtime'] = timestamp_to_isoformat_timestr(repo.last_modified)
    repo_info['size'] = repo.size
    repo_info['encrypted'] = repo.encrypted

    repo_owner = get_repo_owner(request, repo_id)
    repo_info['owner'] = repo_owner

    return repo_info

class GroupOwnedLibraries(APIView):
    authentication_classes = (TokenAuthentication, SessionAuthentication)
    permission_classes = (IsAuthenticated, IsProVersion)
    throttle_classes = (UserRateThrottle,)

    @api_check_group
    def post(self, request, group_id):
        """ Add a group owned library.

        Permission checking:
        1. role permission, can_add_repo;
        1. is group admin;
        """

        # argument check
        repo_name = request.data.get("name", None)
        if not repo_name or \
                not is_valid_dirent_name(repo_name):
            error_msg = "name invalid."
            return api_error(status.HTTP_400_BAD_REQUEST, error_msg)

        password = request.data.get("passwd", None)
        if password and not config.ENABLE_ENCRYPTED_LIBRARY:
            error_msg = 'NOT allow to create encrypted library.'
            return api_error(status.HTTP_403_FORBIDDEN, error_msg)

        permission = request.data.get('permission', PERMISSION_READ_WRITE)
        if permission not in [PERMISSION_READ, PERMISSION_READ_WRITE]:
            error_msg = 'permission invalid.'
            return api_error(status.HTTP_400_BAD_REQUEST, error_msg)

        # permission check
        if not request.user.permissions.can_add_repo():
            error_msg = 'Permission denied.'
            return api_error(status.HTTP_403_FORBIDDEN, error_msg)

        if not is_group_admin(group_id, request.user.username):
            error_msg = 'Permission denied.'
            return api_error(status.HTTP_403_FORBIDDEN, error_msg)

        group_quota = seafile_api.get_group_quota(group_id)
        group_quota = int(group_quota)
        if group_quota <= 0 and group_quota != -2:
            error_msg = 'No group quota.'
            return api_error(status.HTTP_403_FORBIDDEN, error_msg)

        # create group owned repo
        group_id = int(group_id)
        if is_pro_version() and ENABLE_STORAGE_CLASSES:

            if STORAGE_CLASS_MAPPING_POLICY in ('USER_SELECT',
                    'ROLE_BASED'):

                storages = get_library_storages(request)
                storage_id = request.data.get("storage_id", None)
                if storage_id and storage_id not in [s['storage_id'] for s in storages]:
                    error_msg = 'storage_id invalid.'
                    return api_error(status.HTTP_400_BAD_REQUEST, error_msg)

                repo_id = seafile_api.add_group_owned_repo(group_id, repo_name,
                        password, permission, storage_id)
            else:
                # STORAGE_CLASS_MAPPING_POLICY == 'REPO_ID_MAPPING'
                repo_id = seafile_api.add_group_owned_repo(group_id, repo_name,
                        password, permission)
        else:
            repo_id = seafile_api.add_group_owned_repo(group_id, repo_name,
                    password, permission)

        # for activities
        org_id = -1
        username = request.user.username
        library_template = request.data.get("library_template", '')
        repo_created.send(sender=None, org_id=org_id, creator=username,
                repo_id=repo_id, repo_name=repo_name,
                library_template=library_template)

        # for notification
        repo = seafile_api.get_repo(repo_id)
        share_repo_to_group_successful.send(sender=None, from_user=username,
                group_id=group_id, repo=repo, path='/', org_id=org_id)

        info = get_group_owned_repo_info(request, repo_id)
        # TODO
        info['permission'] = permission
        return Response(info)

class GroupOwnedLibrary(APIView):
    authentication_classes = (TokenAuthentication, SessionAuthentication)
    permission_classes = (IsAuthenticated, IsProVersion)
    throttle_classes = (UserRateThrottle,)

    @api_check_group
    def put(self, request, group_id, repo_id):
        """ Rename a library.

        Permission checking:
        1. is group admin;
        """

        # argument check
        new_repo_name = request.data.get('name', '')
        if not new_repo_name:
            error_msg = 'name invalid.'
            return api_error(status.HTTP_400_BAD_REQUEST, error_msg)

        if not is_valid_dirent_name(new_repo_name):
            error_msg = 'name invalid.'
            return api_error(status.HTTP_400_BAD_REQUEST, error_msg)

        # resource check
        repo = seafile_api.get_repo(repo_id)
        if not repo:
            error_msg = 'Library %s not found.' % repo_id
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        # permission check
        group_id = int(group_id)
        username = request.user.username
        if not is_group_admin(group_id, username):
            error_msg = 'Permission denied.'
            return api_error(status.HTTP_403_FORBIDDEN, error_msg)

        # rename repo
        try:
            repo_owner = get_repo_owner(request, repo_id)
            # desc is ''
            seafile_api.edit_repo(repo_id, new_repo_name, '', repo_owner)
        except Exception as e:
            logger.error(e)
            error_msg = 'Internal Server Error'
            return api_error(status.HTTP_500_INTERNAL_SERVER_ERROR, error_msg)

        repo_info = get_group_owned_repo_info(request, repo_id)
        return Response(repo_info)

    @api_check_group
    def delete(self, request, group_id, repo_id):
        """ Delete a group owned library.

        Permission checking:
        1. is group admin;
        """

        repo = seafile_api.get_repo(repo_id)
        if not repo:
            error_msg = 'Library %s not found.' % repo_id
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        group_id = int(group_id)
        username = request.user.username
        if not is_group_admin(group_id, username):
            error_msg = 'Permission denied.'
            return api_error(status.HTTP_403_FORBIDDEN, error_msg)

        try:
            seafile_api.delete_group_owned_repo(group_id, repo_id)
        except Exception as e:
            logger.error(e)
            error_msg = 'Internal Server Error'
            return api_error(status.HTTP_500_INTERNAL_SERVER_ERROR, error_msg)

        return Response({'success': True})


def get_group_id_by_repo_owner(repo_owner):

    return int(repo_owner.split('@')[0])

class GroupOwnedLibraryUserFolderPermission(APIView):
    authentication_classes = (TokenAuthentication, SessionAuthentication)
    permission_classes = (IsAuthenticated, IsProVersion)
    throttle_classes = (UserRateThrottle,)

    def _get_user_folder_perm_info(self, email, repo_id, path, perm):
        result = {}
        if email and repo_id and path and perm:
            result['repo_id'] = repo_id
            result['user_email'] = email
            result['user_name'] = email2nickname(email)
            result['folder_path'] = path
            result['folder_name'] = path if path == '/' else os.path.basename(path.rstrip('/'))
            result['permission'] = perm

        return result

    def get(self, request, repo_id):
        """ List repo user folder perms (by folder_path).

        Permission checking:
        1. is group admin
        """

        # resource check
        repo = seafile_api.get_repo(repo_id)
        if not repo:
            error_msg = 'Library %s not found.' % repo_id
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        repo_owner = get_repo_owner(request, repo_id)
        group_id = get_group_id_by_repo_owner(repo_owner)
        if not ccnet_api.get_group(group_id):
            error_msg = 'Group %s not found.' % group_id
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        # permission check
        username = request.user.username
        if not is_group_admin(group_id, username):
            error_msg = 'Permission denied.'
            return api_error(status.HTTP_403_FORBIDDEN, error_msg)

        # get perm list
        results = []
        path = request.GET.get('folder_path', None)
        folder_perms = seafile_api.list_folder_user_perm_by_repo(repo_id)
        for perm in folder_perms:
            result = {}
            if path:
                if path == perm.path:
                    result = self._get_user_folder_perm_info(
                            perm.user, perm.repo_id, perm.path, perm.permission)
            else:
                result = self._get_user_folder_perm_info(
                        perm.user, perm.repo_id, perm.path, perm.permission)

            if result:
                results.append(result)

        return Response(results)

    def post(self, request, repo_id, format=None):
        """ Add repo user folder perm.

        Permission checking:
        1. is group admin
        """

        # argument check
        path = request.data.get('folder_path', None)
        if not path:
            error_msg = 'folder_path invalid.'
            return api_error(status.HTTP_400_BAD_REQUEST, error_msg)

        perm = request.data.get('permission', None)
        if not perm or perm not in [PERMISSION_READ, PERMISSION_READ_WRITE]:
            error_msg = 'permission invalid.'
            return api_error(status.HTTP_400_BAD_REQUEST, error_msg)

        # resource check
        repo = seafile_api.get_repo(repo_id)
        if not repo:
            error_msg = 'Library %s not found.' % repo_id
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        path = normalize_dir_path(path)
        if not seafile_api.get_dir_id_by_path(repo_id, path):
            error_msg = 'Folder %s not found.' % path
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        repo_owner = get_repo_owner(request, repo_id)
        group_id = get_group_id_by_repo_owner(repo_owner)
        if not ccnet_api.get_group(group_id):
            error_msg = 'Group %s not found.' % group_id
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        # permission check
        username = request.user.username
        if not is_group_admin(group_id, username):
            error_msg = 'Permission denied.'
            return api_error(status.HTTP_403_FORBIDDEN, error_msg)

        # add repo user folder perm
        result = {}
        result['failed'] = []
        result['success'] = []

        users = request.data.getlist('user_email')
        for user in users:
            if not is_valid_username(user):
                result['failed'].append({
                    'user_email': user,
                    'error_msg': 'user_email invalid.'
                })
                continue

            try:
                User.objects.get(email=user)
            except User.DoesNotExist:
                result['failed'].append({
                    'user_email': user,
                    'error_msg': 'User %s not found.' % user
                })
                continue

            permission = seafile_api.get_folder_user_perm(repo_id, path, user)
            if permission:
                result['failed'].append({
                    'user_email': user,
                    'error_msg': _(u'Permission already exists.')
                })
                continue

            try:
                seafile_api.add_folder_user_perm(repo_id, path, perm, user)
                send_perm_audit_msg('add-repo-perm', username, user, repo_id, path, perm)
            except Exception as e:
                logger.error(e)
                result['failed'].append({
                    'user_email': user,
                    'error_msg': 'Internal Server Error'
                })

            new_perm = seafile_api.get_folder_user_perm(repo_id, path, user)
            new_perm_info = self._get_user_folder_perm_info(
                    user, repo_id, path, new_perm)
            result['success'].append(new_perm_info)

        return Response(result)

    def put(self, request, repo_id, format=None):
        """ Modify repo user folder perm.

        Permission checking:
        1. is group admin
        """
        # argument check
        user = request.data.get('user_email', None)
        if not user:
            error_msg = 'user_email invalid.'
            return api_error(status.HTTP_400_BAD_REQUEST, error_msg)

        path = request.data.get('folder_path', None)
        if not path:
            error_msg = 'folder_path invalid.'
            return api_error(status.HTTP_400_BAD_REQUEST, error_msg)

        perm = request.data.get('permission', None)
        if not perm or perm not in [PERMISSION_READ, PERMISSION_READ_WRITE]:
            error_msg = 'permission invalid.'
            return api_error(status.HTTP_400_BAD_REQUEST, error_msg)

        # resource check
        repo = seafile_api.get_repo(repo_id)
        if not repo:
            error_msg = 'Library %s not found.' % repo_id
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        path = normalize_dir_path(path)
        if not seafile_api.get_dir_id_by_path(repo_id, path):
            error_msg = 'Folder %s not found.' % path
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        repo_owner = get_repo_owner(request, repo_id)
        group_id = get_group_id_by_repo_owner(repo_owner)
        if not ccnet_api.get_group(group_id):
            error_msg = 'Group %s not found.' % group_id
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        try:
            User.objects.get(email=user)
        except User.DoesNotExist:
            error_msg = 'User %s not found.' % user
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        permission = seafile_api.get_folder_user_perm(repo_id, path, user)
        if not permission:
            error_msg = 'Folder permission not found.'
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        # permission check
        username = request.user.username
        if not is_group_admin(group_id, username):
            error_msg = 'Permission denied.'
            return api_error(status.HTTP_403_FORBIDDEN, error_msg)

        # modify permission
        try:
            seafile_api.set_folder_user_perm(repo_id, path, perm, user)
            send_perm_audit_msg('modify-repo-perm', username, user, repo_id, path, perm)
            new_perm = seafile_api.get_folder_user_perm(repo_id, path, user)
            result = self._get_user_folder_perm_info(user, repo_id, path, new_perm)
            return Response(result)
        except Exception as e:
            logger.error(e)
            error_msg = 'Internal Server Error'
            return api_error(status.HTTP_500_INTERNAL_SERVER_ERROR, error_msg)

    def delete(self, request, repo_id):
        """ Delete repo user folder perm.

        Permission checking:
        1. is group admin
        """

        # argument check
        user = request.data.get('user_email', None)
        if not user:
            error_msg = 'user_email invalid.'
            return api_error(status.HTTP_400_BAD_REQUEST, error_msg)

        path = request.data.get('folder_path', None)
        if not path:
            error_msg = 'folder_path invalid.'
            return api_error(status.HTTP_400_BAD_REQUEST, error_msg)

        # resource check
        repo = seafile_api.get_repo(repo_id)
        if not repo:
            error_msg = 'Library %s not found.' % repo_id
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        repo_owner = get_repo_owner(request, repo_id)
        group_id = get_group_id_by_repo_owner(repo_owner)
        if not ccnet_api.get_group(group_id):
            error_msg = 'Group %s not found.' % group_id
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        # permission check
        username = request.user.username
        if not is_group_admin(group_id, username):
            error_msg = 'Permission denied.'
            return api_error(status.HTTP_403_FORBIDDEN, error_msg)

        # delete permission
        path = normalize_dir_path(path)
        permission = seafile_api.get_folder_user_perm(repo_id, path, user)
        if not permission:
            return Response({'success': True})

        try:
            seafile_api.rm_folder_user_perm(repo_id, path, user)
            send_perm_audit_msg('delete-repo-perm', username,
                    user, repo_id, path, permission)
            return Response({'success': True})
        except Exception as e:
            logger.error(e)
            error_msg = 'Internal Server Error'
            return api_error(status.HTTP_500_INTERNAL_SERVER_ERROR, error_msg)


class GroupOwnedLibraryGroupFolderPermission(APIView):
    authentication_classes = (TokenAuthentication, SessionAuthentication)
    permission_classes = (IsAuthenticated, IsProVersion)
    throttle_classes = (UserRateThrottle,)

    def _get_group_folder_perm_info(self, group_id, repo_id, path, perm):
        result = {}
        if group_id and repo_id and path and perm:
            group = ccnet_api.get_group(group_id)
            result['repo_id'] = repo_id
            result['group_id'] = group_id
            result['group_name'] = group.group_name
            result['folder_path'] = path
            result['folder_name'] = path if path == '/' else os.path.basename(path.rstrip('/'))
            result['permission'] = perm

        return result

    def get(self, request, repo_id, format=None):
        """ List repo group folder perms (by folder_path).

        Permission checking:
        1. is group admin
        """

        # resource check
        repo = seafile_api.get_repo(repo_id)
        if not repo:
            error_msg = 'Library %s not found.' % repo_id
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        repo_owner = get_repo_owner(request, repo_id)
        group_id = get_group_id_by_repo_owner(repo_owner)
        if not ccnet_api.get_group(group_id):
            error_msg = 'Group %s not found.' % group_id
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        # permission check
        username = request.user.username
        if not is_group_admin(group_id, username):
            error_msg = 'Permission denied.'
            return api_error(status.HTTP_403_FORBIDDEN, error_msg)

        results = []
        path = request.GET.get('folder_path', None)
        group_folder_perms = seafile_api.list_folder_group_perm_by_repo(repo_id)
        for perm in group_folder_perms:
            result = {}
            if path:
                if path == perm.path:
                    result = self._get_group_folder_perm_info(
                            perm.group_id, perm.repo_id, perm.path,
                            perm.permission)
            else:
                result = self._get_group_folder_perm_info(
                        perm.group_id, perm.repo_id, perm.path,
                        perm.permission)

            if result:
                results.append(result)

        return Response(results)

    def post(self, request, repo_id, format=None):
        """ Add repo group folder perm.

        Permission checking:
        1. is group admin
        """

        # argument check
        path = request.data.get('folder_path', None)
        if not path:
            error_msg = 'folder_path invalid.'
            return api_error(status.HTTP_400_BAD_REQUEST, error_msg)

        perm = request.data.get('permission', None)
        if not perm or perm not in [PERMISSION_READ, PERMISSION_READ_WRITE]:
            error_msg = 'permission invalid.'
            return api_error(status.HTTP_400_BAD_REQUEST, error_msg)

        # resource check
        repo = seafile_api.get_repo(repo_id)
        if not repo:
            error_msg = 'Library %s not found.' % repo_id
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        path = normalize_dir_path(path)
        if not seafile_api.get_dir_id_by_path(repo_id, path):
            error_msg = 'Folder %s not found.' % path
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        repo_owner = get_repo_owner(request, repo_id)
        group_id = get_group_id_by_repo_owner(repo_owner)
        if not ccnet_api.get_group(group_id):
            error_msg = 'Group %s not found.' % group_id
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        # permission check
        username = request.user.username
        if not is_group_admin(group_id, username):
            error_msg = 'Permission denied.'
            return api_error(status.HTTP_403_FORBIDDEN, error_msg)

        result = {}
        result['failed'] = []
        result['success'] = []

        group_ids = request.data.getlist('group_id')
        for group_id in group_ids:
            try:
                group_id = int(group_id)
            except ValueError:
                result['failed'].append({
                    'group_id': group_id,
                    'error_msg': 'group_id invalid.'
                })
                continue

            if not ccnet_api.get_group(group_id):
                result['failed'].append({
                    'group_id': group_id,
                    'error_msg': 'Group %s not found.' % group_id
                })
                continue

            permission = seafile_api.get_folder_group_perm(repo_id, path, group_id)
            if permission:
                result['failed'].append({
                    'group_id': group_id,
                    'error_msg': _(u'Permission already exists.')
                })
                continue

            try:
                seafile_api.add_folder_group_perm(repo_id, path, perm, group_id)
                send_perm_audit_msg('add-repo-perm', username, group_id, repo_id, path, perm)
            except Exception as e:
                logger.error(e)
                result['failed'].append({
                    'group_id': group_id,
                    'error_msg': 'Internal Server Error'
                })

            new_perm = seafile_api.get_folder_group_perm(repo_id, path, group_id)
            new_perm_info = self._get_group_folder_perm_info(
                    group_id, repo_id, path, new_perm)
            result['success'].append(new_perm_info)

        return Response(result)

    def put(self, request, repo_id, format=None):
        """ Modify repo group folder perm.

        Permission checking:
        1. is group admin
        """

        # argument check
        path = request.data.get('folder_path', None)
        if not path:
            error_msg = 'folder_path invalid.'
            return api_error(status.HTTP_400_BAD_REQUEST, error_msg)

        perm = request.data.get('permission', None)
        if not perm or perm not in [PERMISSION_READ, PERMISSION_READ_WRITE]:
            error_msg = 'permission invalid.'
            return api_error(status.HTTP_400_BAD_REQUEST, error_msg)

        group_id = request.data.get('group_id')
        if not group_id:
            error_msg = 'group_id invalid.'
            return api_error(status.HTTP_400_BAD_REQUEST, error_msg)

        try:
            group_id = int(group_id)
        except ValueError:
            error_msg = 'group_id invalid.'
            return api_error(status.HTTP_400_BAD_REQUEST, error_msg)

        # resource check
        repo = seafile_api.get_repo(repo_id)
        if not repo:
            error_msg = 'Library %s not found.' % repo_id
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        path = normalize_dir_path(path)
        if not seafile_api.get_dir_id_by_path(repo_id, path):
            error_msg = 'Folder %s not found.' % path
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        if not ccnet_api.get_group(group_id):
            error_msg = 'Group %s not found.' % group_id
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        repo_owner = get_repo_owner(request, repo_id)
        library_group_id = get_group_id_by_repo_owner(repo_owner)
        if not ccnet_api.get_group(library_group_id):
            error_msg = 'Group %s not found.' % group_id
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        permission = seafile_api.get_folder_group_perm(repo_id, path, group_id)
        if not permission:
            error_msg = 'Folder permission not found.'
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        # permission check
        username = request.user.username
        if not is_group_admin(library_group_id, username):
            error_msg = 'Permission denied.'
            return api_error(status.HTTP_403_FORBIDDEN, error_msg)

        # modify permission
        try:
            seafile_api.set_folder_group_perm(repo_id, path, perm, group_id)
            send_perm_audit_msg('modify-repo-perm', username, group_id, repo_id, path, perm)
            new_perm = seafile_api.get_folder_group_perm(repo_id, path, group_id)
            result = self._get_group_folder_perm_info(group_id, repo_id, path, new_perm)
            return Response(result)
        except Exception as e:
            logger.error(e)
            error_msg = 'Internal Server Error'
            return api_error(status.HTTP_500_INTERNAL_SERVER_ERROR, error_msg)

    def delete(self, request, repo_id, format=None):
        """ Delete repo group folder perm.

        Permission checking:
        1. is group admin
        """

        # arguments check
        group_id = request.data.get('group_id', None)
        path = request.data.get('folder_path', None)

        if not group_id:
            error_msg = 'group_id invalid.'
            return api_error(status.HTTP_400_BAD_REQUEST, error_msg)

        if not path:
            error_msg = 'folder_path invalid.'
            return api_error(status.HTTP_400_BAD_REQUEST, error_msg)

        try:
            group_id = int(group_id)
        except ValueError:
            error_msg = 'group_id invalid.'
            return api_error(status.HTTP_400_BAD_REQUEST, error_msg)

        # resource check
        if not ccnet_api.get_group(group_id):
            error_msg = 'Group %s not found.' % group_id
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        repo = seafile_api.get_repo(repo_id)
        if not repo:
            error_msg = 'Library %s not found.' % repo_id
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        repo_owner = get_repo_owner(request, repo_id)
        library_group_id = get_group_id_by_repo_owner(repo_owner)
        if not ccnet_api.get_group(library_group_id):
            error_msg = 'Group %s not found.' % group_id
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        # permission check
        username = request.user.username
        if not is_group_admin(library_group_id, username):
            error_msg = 'Permission denied.'
            return api_error(status.HTTP_403_FORBIDDEN, error_msg)

        # delete permission
        path = path.rstrip('/') if path != '/' else path
        permission = seafile_api.get_folder_group_perm(repo_id, path, group_id)
        if not permission:
            return Response({'success': True})

        try:
            seafile_api.rm_folder_group_perm(repo_id, path, group_id)
            send_perm_audit_msg('delete-repo-perm', username, group_id,
                                repo_id, path, permission)
            return Response({'success': True})
        except Exception as e:
            logger.error(e)
            error_msg = 'Internal Server Error'
            return api_error(status.HTTP_500_INTERNAL_SERVER_ERROR, error_msg)
