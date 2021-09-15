from django.conf.urls import url

from seahub.hancom_office.api import HancomOfficeApiFileInfo, \
        HancomOfficeApiFileLock, HancomOfficeApiFileUnlock, \
        HancomOfficeApiFileGet, HancomOfficeApiFilePut

urlpatterns = [
    url(r'^info$', HancomOfficeApiFileInfo.as_view(), name="hancom-office-api-file-info"),
    url(r'^get$', HancomOfficeApiFileGet.as_view(), name="hancom-office-api-file-get"),
    url(r'^put$', HancomOfficeApiFilePut.as_view(), name="hancom-office-api-file-put"),
    url(r'^lock$', HancomOfficeApiFileLock.as_view(), name="hancom-office-api-file-lock"),
    url(r'^unlock$', HancomOfficeApiFileUnlock.as_view(), name="hancom-office-api-file-unlock"),
]
