import hashlib
from django.utils.encoding import force_bytes

from seahub.hancom_office.settings import HANCOM_OFFICE_SERVER_URL, \
        HANCOM_OFFICE_FORWARD_ADAPTER_NAME, HANCOM_OFFICE_FILE_EXTENSION_APP_DICT

from seahub.utils import get_service_url


def get_hancom_office_doc_id(repo_id, file_path):

    return hashlib.md5(force_bytes(repo_id + file_path)).hexdigest()[:40]


def get_hancom_office_cache_key(doc_id):

    return 'HANCOM_OFFICE_{}'.format(doc_id)


def get_hancom_office_editor_url(request, repo_id, file_path):

    url = "{}/{}/hancom-office-api-{}/open?app={}&fid={}&lang={}&user_id={}&host={}"

    doc_id = get_hancom_office_doc_id(repo_id, file_path)

    return url.format(HANCOM_OFFICE_SERVER_URL,
                      HANCOM_OFFICE_FORWARD_ADAPTER_NAME,
                      doc_id,
                      HANCOM_OFFICE_FILE_EXTENSION_APP_DICT[file_path.split('.')[-1]],
                      doc_id,
                      request.LANGUAGE_CODE,
                      request.user.username,
                      get_service_url())
