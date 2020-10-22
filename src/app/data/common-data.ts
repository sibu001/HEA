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
        { key: 'waterScrapingScript', displayName: 'Scripts'}
    ];

    static readonly CUSTOMER_ALERT_TYPE_COLUMN_DATA: Array<TABLECOLUMN> = [
        { key: 'alertCode', displayName: 'Alert Code', sort: 'alertCode', isEdit: true },
        { key: 'alertName', displayName: 'Alert Name', sort: 'alertName' },
        { key: 'note', displayName: 'Note', sort: 'note' },
    ];

    static readonly PLACE_KEY: Array<TABLECOLUMN> = [
        { key: 'placeCode', displayName: 'Place Code' },
        { key: 'placeName', displayName: 'Place Name'},
    ];

    static readonly PROGRAM_GROUP_KEY: Array<TABLECOLUMN> = [
        { key: 'programCode', displayName: 'Program Code' },
        { key: 'programName', displayName: 'Program Name'},
    ];
}
