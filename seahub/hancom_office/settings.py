import seahub.settings as settings

ENABLE_HANCOM_OFFICE = getattr(settings, 'ENABLE_HANCOM_OFFICE', False)
HANCOM_OFFICE_SERVER_URL = getattr(settings, 'HANCOM_OFFICE_SERVER_URL', '')
HANCOM_OFFICE_FORWARD_ADAPTER_NAME = getattr(settings, 'HANCOM_OFFICE_FORWARD_ADAPTER_NAME', '')
HANCOM_OFFICE_EDIT_FILE_EXTENSION = getattr(settings, 'HANCOM_OFFICE_EDIT_FILE_EXTENSION', ("docx", "pptx", "xlsx"))
HANCOM_OFFICE_VIEW_FILE_EXTENSION = getattr(settings, 'HANCOM_OFFICE_VIEW_FILE_EXTENSION', ("doc", "ppt", "xls"))
HANCOM_OFFICE_FILE_EXTENSION_APP_DICT = {
    "docx": "WRITE_EDITOR",
    "doc": "WRITE_VIEWER",
    "xlsx": "CALC_EDITOR",
    "xls": "CALC_VIEWER",
    "pptx": "SHOW_EDITOR",
    "ppt": "SHOW_VIEWER"
}
