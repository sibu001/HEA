import { TABLECOLUMN } from '../interface/table-column.interface';

export class TableColumnData {
    static readonly PROGRAM_GROUP_COLUMN_DATA: Array<TABLECOLUMN> = [
        { key: 'programCode', displayName: 'Group Code', sort: 'programCode', isEdit: true },
        { key: 'programName', displayName: 'Group Name', sort: 'programName' },
    ];

    static readonly CUSTOMER_GROUP_COLUMN_DATA: Array<TABLECOLUMN> = [
        { key: 'customerGroupId', displayName: 'Record Id' },
        { key: 'groupCode', displayName: 'Group Code', sort: 'groupCode', isEdit: true },
        { key: 'groupName', displayName: 'Group Name', sort: 'groupName' },
        { key: 'registrationUrl', displayName: 'Registration Url' },
        { key: 'baseDirectory', displayName: 'Base Directory', sort: 'baseDirectory' },
        { key: 'auditIdPattern', displayName: 'Audit Id Pattern' }
    ];

    static readonly CREDENTIAL_TYPE_COLUMN_DATA: Array<TABLECOLUMN> = [
        { key: 'credentialType', displayName: 'Credential Type', sort: 'credentialType', isEdit: true },
        { key: 'credentialName', displayName: 'Credential Name', sort: 'credentialName' },
        { key: 'utilityName', displayName: 'Utility Name', sort: 'utilityName' },
        { key: 'loginScript', displayName: 'Login', sort: 'loginScript' },
        { key: 'waterScrapingScript', displayName: 'Scripts' }
    ];

    static readonly CUSTOMER_ALERT_TYPE_COLUMN_DATA: Array<TABLECOLUMN> = [
        { key: 'alertCode', displayName: 'Alert Code', sort: 'alertCode', isEdit: true },
        { key: 'alertName', displayName: 'Alert Name', sort: 'alertName' },
        { key: 'note', displayName: 'Note', sort: 'note' },
    ];

    static readonly PLACE_KEY: Array<TABLECOLUMN> = [
        { key: 'placeCode', displayName: 'Place Code' },
        { key: 'placeName', displayName: 'Place Name' },
    ];

    static readonly PROGRAM_GROUP_KEY: Array<TABLECOLUMN> = [
        { key: 'programCode', displayName: 'Program Code' },
        { key: 'programName', displayName: 'Program Name' },
    ];

    static readonly CUSTOMER_CREDENTIAL_KEY: Array<TABLECOLUMN> = [
        { key: 'credentialType', displayName: 'Credential Type' },
        { key: 'active', displayName: 'Active' },
        { key: 'login', displayName: 'Links' },
        { key: 'password', displayName: 'Password' },
        { key: 'customerData', displayName: 'Customer Data', type: 'image' },
        { key: 'utilityData', displayName: 'Utility Data', type: 'image' },
        { key: 'electricity', displayName: 'Electricity', type: 'image' },
        { key: 'heating', displayName: 'Heating', type: 'image' },
        { key: 'water', displayName: 'Water', type: 'image' },
        { key: 'lastUsage', displayName: 'Last Usage' },
        { key: 'authEndDate', displayName: 'Auth End Date' },
        { key: 'authStatus', displayName: 'Auth Status' }
    ];

    static readonly CUSTOMER_ALERT_KEY: Array<TABLECOLUMN> = [
        { key: 'customerAlertType', displayName: 'Customer Alert Type' },
        { key: 'alertLevel', displayName: 'Alert Level' },
        { key: 'notes', displayName: 'Notes' }
    ];

    static readonly CUSTOMER_EVENT_KEY: Array<TABLECOLUMN> = [
        { key: 'eventType', displayName: 'Event Type' },
        { key: 'eventDate', displayName: 'Event Date' },
        { key: 'note', displayName: 'Note' },
        { key: 'author', displayName: 'Author' }
    ];

    static readonly CUSTOMER_STAFF_KEY: Array<TABLECOLUMN> = [
        { key: 'staff', displayName: 'Staff' },
        { key: 'date', displayName: 'Date' },
        { key: 'note', displayName: 'Note' }
    ];

    static readonly CUSTOMER_FILE_KEY: Array<TABLECOLUMN> = [
        { key: 'fileName', displayName: 'File Name' },
        { key: 'timeStamp', displayName: 'Time Stamp' },
        { key: 'description', displayName: 'Description' },
        { key: 'size', displayName: 'Size' }
    ];

    static readonly STATUS_DATA: Array<any> = [
        { id: 0, value: 'Active (0)' },
        { id: 10, value: 'In registration (10)' },
        { id: 20, value: 'Bad utility credentials (20)' },
        { id: 50, value: 'In progress (50)' },
        { id: 80, value: 'Pending (80)' },
        { id: 90, value: 'Blocked (90)' },
        { id: 85, value: 'PG&amp;E account pending (85)' },
    ];

    static readonly PLACE_CODE: Array<any> = [
        { id: 'ATHERTON', value: 'Atherton' },
        { id: 'CENTRAL VALLEY', value: 'Central Valley' },
        { id: 'ALAMEDA', value: 'SF East Bay' },
        { id: 'CLAREMONT', value: 'Claremont' },
        { id: 'LOS ALTOS', value: 'Los Altos' },
        { id: 'LOS ALTOS HILLS', value: 'Los Altos Hills' },
        { id: 'MONTE SERENO', value: 'Monte Sereno' },
        { id: 'MOUNTAIN VIEW', value: 'Mountain View' },
        { id: 'NORTHCV', value: 'North Central Valley' },
        { id: 'OTHER', value: 'NorCal' },
        { id: 'PORTOLA VALLEY', value: 'Portola Valley' },
        { id: 'SF BAY AREA', value: 'SF Bay Area' },
        { id: 'SOCAL', value: 'SoCal' },
        { id: 'SUNNYVALE', value: 'Sunnyvale' },
        { id: 'TST-US', value: 'Anytown USA' },
        { id: 'VERMONT', value: 'Vermont' },
        { id: 'WOODSIDE', value: 'Woodside' },
    ];

    static readonly ROLE_KEY: Array<TABLECOLUMN> = [
        { displayName: 'Role Code', key: 'roleCode', isEdit: true },
        { displayName: 'Permanent', key: 'permanent' },
        { displayName: 'Description', key: 'description' }
    ];

    static readonly PLACE_LIST_KEY: Array<TABLECOLUMN> = [
        { displayName: 'Place', key: 'place', isEdit: true },
        { displayName: 'Place Name', key: 'placeName' },
        { displayName: 'Weather Station', key: 'weatherStation' }
    ];

    static readonly ZIP_CODE_KEY: Array<TABLECOLUMN> = [
        { displayName: 'Zip Code', key: 'zipcode', isEdit: true },
        { displayName: 'Description', key: 'description' }
    ];

}
