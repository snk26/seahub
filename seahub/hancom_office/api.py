# Copyright (c) 2012-2016 Seafile Ltd.

import os
import json
import time
import logging
import requests

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from django.core.cache import cache
from django.http import HttpResponse, HttpResponseRedirect

from seaserv import seafile_api

from seahub.api2.utils import api_error
from seahub.api2.throttling import UserRateThrottle

from seahub.utils import gen_file_get_url, gen_inner_file_upload_url
from seahub.utils.file_op import ONLINE_OFFICE_LOCK_OWNER

from seahub.hancom_office.utils import get_hancom_office_cache_key

logger = logging.getLogger(__name__)

INFO_XML_RESP_STR = '''<?xml version="1.0" encoding="utf-8" ?>
<property>
<name><![CDATA[{}]]></name>
<type>{}</type>
<modified>{}</modified>
<read>{}</read>
<write>{}</write>
<locked>{}</locked>
<size>{}</size>
</property>
'''


class HancomOfficeApiFileInfo(APIView):

    """ Get file info.
    """

    throttle_classes = (UserRateThrottle,)

    def get(self, request, doc_id):

        cache_key = get_hancom_office_cache_key(doc_id)
        file_info_dict = cache.get(cache_key)

        can_edit = file_info_dict.get('can_edit')
        repo_id = file_info_dict.get('repo_id')
        file_path = file_info_dict.get('file_path')

        repo = seafile_api.get_repo(repo_id)
        file_id = seafile_api.get_file_id_by_path(repo_id, file_path)
        dirent = seafile_api.get_dirent_by_path(repo_id, file_path)

        file_name = os.path.basename(file_path)
        file_size = seafile_api.get_file_size(repo.store_id, repo.version, file_id)

        resp_str = INFO_XML_RESP_STR.format(file_name,
                                            'file',
                                            dirent.mtime,
                                            'true',
                                            'true' if can_edit else 'false',
                                            'false',
                                            file_size)

        return HttpResponse(resp_str, content_type='text/xml')


class HancomOfficeApiFileGet(APIView):

    """ Get file content.
    """

    throttle_classes = (UserRateThrottle,)

    def get(self, request, doc_id):

        cache_key = get_hancom_office_cache_key(doc_id)
        file_info_dict = cache.get(cache_key)

        username = file_info_dict.get('username')
        repo_id = file_info_dict.get('repo_id')
        file_path = file_info_dict.get('file_path')

        file_name = os.path.basename(file_path)

        file_id = seafile_api.get_file_id_by_path(repo_id, file_path)
        token = seafile_api.get_fileserver_access_token(repo_id,
                                                        file_id,
                                                        'view',
                                                        username,
                                                        False)

        url = gen_file_get_url(token, file_name)

        return HttpResponseRedirect(url)


class HancomOfficeApiFilePut(APIView):

    """ Save file.
    """

    throttle_classes = (UserRateThrottle,)

    def post(self, request, doc_id):

        cache_key = get_hancom_office_cache_key(doc_id)
        file_info_dict = cache.get(cache_key)

        username = file_info_dict.get('username')
        repo_id = file_info_dict.get('repo_id')
        file_path = file_info_dict.get('file_path')

        try:
            file_obj = request.read()

            # get file update url
            fake_obj_id = {'online_office_update': True}
            token = seafile_api.get_fileserver_access_token(repo_id,
                                                            json.dumps(fake_obj_id),
                                                            'update',
                                                            username)

            if not token:
                return api_error(status.HTTP_500_INTERNAL_SERVER_ERROR, '')

            update_url = gen_inner_file_upload_url('update-api', token)

            # update file
            files = {
                'file': file_obj,
                'file_name': os.path.basename(file_path),
                'target_file': file_path,
            }
            requests.post(update_url, files=files)
        except Exception as e:
            logger.error(e)
            return api_error(status.HTTP_500_INTERNAL_SERVER_ERROR, '')

        return Response()


class HancomOfficeApiFileLock(APIView):

    """ Lock file.
    """

    throttle_classes = (UserRateThrottle,)

    def post(self, request, doc_id):

        cache_key = get_hancom_office_cache_key(doc_id)
        file_info_dict = cache.get(cache_key)

        repo_id = file_info_dict.get('repo_id')
        file_path = file_info_dict.get('file_path')

        seafile_api.lock_file(repo_id, file_path, ONLINE_OFFICE_LOCK_OWNER,
                                                  int(time.time()) + 40 * 60)
        return Response()


class HancomOfficeApiFileUnlock(APIView):

    """ Unlock file.
    """

    throttle_classes = (UserRateThrottle,)

    def post(self, request, doc_id):

        cache_key = get_hancom_office_cache_key(doc_id)
        file_info_dict = cache.get(cache_key)

        repo_id = file_info_dict.get('repo_id')
        file_path = file_info_dict.get('file_path')

        seafile_api.unlock_file(repo_id, file_path)

        return Response()
