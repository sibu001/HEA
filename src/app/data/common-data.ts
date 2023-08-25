import { TABLECOLUMN } from '../interface/table-column.interface';
import { AppConstant } from '../utility/app.constant';

export class TableColumnData {
    static readonly PROGRAM_GROUP_COLUMN_DATA: Array<TABLECOLUMN> = [
        { key: 'id', isEdit: true, displayName: 'Record Id', sort: 'id' },
        { key: 'programCode', isEdit: true, displayName: 'Program Code', sort: 'programCode', isUnderline: true },
        { key: 'programName', isEdit: true, displayName: 'Program Name', sort: 'programName' },
    ];

    static readonly CUSTOMER_GROUP_COLUMN_DATA: Array<TABLECOLUMN> = [
        { key: 'customerGroupId', isEdit: true, displayName: 'Record Id' },
        { key: 'groupCode', isEdit: true, displayName: 'Group Code', sort: 'groupCode', isUnderline: true },
        { key: 'groupName', isEdit: true, displayName: 'Group Name', sort: 'groupName' },
        { key: 'registrationUrl', isEdit: true, displayName: 'Registration Url' },
        { key: 'baseDirectory', isEdit: true, displayName: 'Base Directory', sort: 'baseDirectory' },
        { key: 'auditIdPattern', isEdit: true, displayName: 'Audit Id Pattern' }
    ];

    static readonly CREDENTIAL_TYPE_COLUMN_DATA: Array<TABLECOLUMN> = [
        { key: 'credentialType', isEdit: true, displayName: 'Credential Type', sort: 'credentialType', isUnderline: true },
        { key: 'credentialName', isEdit: true, displayName: 'Credential Name', sort: 'credentialName' },
        { key: 'utilityName', isEdit: true, displayName: 'Utility Name', sort: 'utilityName' },
        { key: 'loginScript', isEdit: true, displayName: 'Login', sort: 'loginScript' },
        { key: 'script', isEdit: true, displayName: 'Scripts' }
    ];

    static readonly CUSTOMER_ALERT_TYPE_COLUMN_DATA: Array<TABLECOLUMN> = [
        { key: 'alertCode', isEdit: true, displayName: 'Alert Code', sort: 'alertCode', isUnderline: true },
        { key: 'alertName', isEdit: true, displayName: 'Alert Name', sort: 'alertName' },
        { key: 'note', isEdit: true, displayName: 'Note', sort: 'note' },
    ];

    static readonly PLACE_KEY: Array<TABLECOLUMN> = [
        { key: 'place', isEdit: true, displayName: 'Place Code' },
        { key: 'placeName', isEdit: true, displayName: 'Place Name' },
    ];

    static readonly PROGRAM_GROUP_KEY: Array<TABLECOLUMN> = [
        { key: 'programCode', isEdit: true, displayName: 'Program Code', isId: true },
        { key: 'programName', isEdit: true, displayName: 'Program Name' },
    ];

    static readonly CUSTOMER_CREDENTIAL_KEY: Array<TABLECOLUMN> = [
        { key: 'credentialType', isEdit: true, displayName: 'Credential Type', isUnderline: true },
        { key: 'active', isEdit: true, displayName: 'Active', type: 'image', isUnderline: true },
        { key: 'login', isEdit: true, displayName: 'Login' },
        { key: 'password', isEdit: true, displayName: 'Pwd' },
        { key: 'dataInUse', isEdit: true, displayName: 'Customer Data', type: 'image' },
        { key: 'utilityInUse', isEdit: true, displayName: 'Util Data', type: 'image' },
        { key: 'electricityInUse', isEdit: true, displayName: 'Electricity', type: 'image' },
        { key: 'heatingInUse', isEdit: true, displayName: 'Heating', type: 'image' },
        { key: 'waterInUse', isEdit: true, displayName: 'Water', type: 'image' },
        { key: 'lastSuccessfulUsageDate', isEdit: true, displayName: 'Last Usage' },
        { key: 'authorizationStartDate', isEdit: true, displayName: 'Auth Start Date' },
        { key: 'authorizationEndDate', isEdit: true, displayName: 'Auth End Date' },
        { key: 'authorizationStatus', isEdit: true, displayName: 'Auth Status' }
    ];

    static readonly CUSTOMER_ALERT_KEY: Array<TABLECOLUMN> = [
        { key: 'customerAlertType', isEdit: true, displayName: 'Customer Alert Type' },
        { key: 'alertLevels', isEdit: true, displayName: 'Alert Level' },
        { key: 'note', isEdit: true, displayName: 'Notes' }
    ];

    static readonly CUSTOMER_EVENT_KEY: Array<TABLECOLUMN> = [
        { key: 'eventType', isEdit: true, displayName: 'Event Type' },
        { key: 'eventDatetime', isEdit: true, displayName: 'Event Date' },
        { key: 'description', isEdit: true, displayName: 'Note' },
        { key: 'linkedPersonName', isEdit: true, displayName: 'Author' }
    ];

    static readonly CUSTOMER_STAFF_KEY: Array<TABLECOLUMN> = [
        { key: 'staff', isEdit: true, displayName: 'Staff' },
        { key: 'noteDate', isEdit: true, displayName: 'Date' },
        { key: 'note', isEdit: true, displayName: 'Note' }
    ];

    static readonly CUSTOMER_FILE_KEY: Array<TABLECOLUMN> = [
        { key: 'name', isEdit: true, displayName: 'File Name' },
        { key: 'timestamp', isEdit: true, displayName: 'Timestamp', sort : "timestamp" },
        { key: 'description', isEdit: true, displayName: 'Description', type: 'textArea' },
        { key: 'size', isEdit: true, displayName: 'Size' }
    ];

    static readonly CUSTOMER_EMAIL_KEY: Array<TABLECOLUMN> = [
        { key: 'mailName', displayName: 'Message Type' },
        { key: 'active', displayName: 'Enabled', type: 'checkbox' },
    ];

    static readonly OPT_OUT_KEY: Array<TABLECOLUMN> = [
        { key: 'mailDescriptionId', displayName: '#' },
        { key: 'mailName', displayName: 'Message name'},
    ];

    static readonly ROLE_KEY: Array<TABLECOLUMN> = [
        { isEdit: true, displayName: 'Role Code', key: 'roleCode', isUnderline: true },
        { isEdit: true, displayName: 'Permanent', key: 'permanent' },
        { isEdit: true, displayName: 'Description', key: 'description' }
    ];

    static readonly ROLE_KEY_FOR_STAFF: Array<TABLECOLUMN> = [
        { isEdit: true, displayName: 'Role Code', key: 'roleCode' },
        { isEdit: true, displayName: 'Description', key: 'description' }
    ];

    static readonly PLACE_LIST_KEY: Array<TABLECOLUMN> = [
        { isEdit: true, displayName: 'Place', sort: 'place', key: 'place', isUnderline: true },
        { isEdit: true, displayName: 'Place Name', sort: 'placeName', key: 'placeName' },
        { isEdit: true, displayName: 'Weather Station', key: 'weatherStationId' }
    ];

    static readonly ZIP_CODE_KEY: Array<TABLECOLUMN> = [
        { displayName: 'Zip Code', key: 'zipCode' },
        { displayName: 'Description', key: 'stationId' }
    ];


    static readonly CUSTOMER_EVENT_TYPE_COLUMN_DATA: Array<TABLECOLUMN> = [
        { isEdit: true, displayName: '#', key: 'indexCode' },
        { isEdit: true, displayName: 'Event Code', key: 'eventCode', sort: 'eventCode', isUnderline: true },
        { isEdit: true, displayName: 'Event Name', key: 'eventName', sort: 'eventName' },
        { isEdit: true, displayName: 'Shared', key: 'shared', sort: 'shared' },
        { isEdit: true, displayName: 'Avaliable to coaches', key: 'availableToCoaches', sort: 'availableToCoaches' },
        { isEdit: true, displayName: 'Only One', key: 'onlyOne', sort: 'onlyOne' },
        { isEdit: true, displayName: 'Period Event', key: 'periodEvent', sort: 'periodEvent' },
  
    ];

    static readonly CUSTOMER_COMPARISON_GROUP_COLUMN_DATA: Array<TABLECOLUMN> = [
        { isEdit: true, displayName: 'Comparison Code', key: 'comparisonCode', sort: 'comparisonCode' },
        { isEdit: true, displayName: 'Group Name', key: 'groupName', sort: 'groupName', isUnderline: true },
        { isEdit: true, displayName: 'Order', key: 'orderNumber', sort: 'orderNumber' },
        { isEdit: true, displayName: 'Weather Station', key: 'weatherStationId', sort: 'weatherStationId' },
        { isEdit: true, displayName: 'Costumers', key: 'numOfCustomers' },

    ];

    static readonly FACTOR_KEY: Array<TABLECOLUMN> = [
        // { key: 'serialNumber', isEdit: true, displayName: '#' },
        { key: 'factorCode', sort: 'factorCode', isEdit: true, displayName: 'Factor Code', isUnderline: true },
        { key: 'place', sort: 'place', isEdit: true, displayName: 'Place' },
        { key: 'year', sort: 'year', isEdit: true, displayName: 'Year' },
        { key: 'factorName', sort: 'factorName', isEdit: true, displayName: 'Name' },
        { key: 'value', sort: 'value', isEdit: true, displayName: 'Value' }
    ];

    static readonly ALERT_LEVEL: Array<any> = [
        { alertLevel: 0, alertName: 'Green' },
        { alertLevel: 5, alertName: 'Yellow' },
        { alertLevel: 10, alertName: 'Red' },
    ];

    static readonly LOOKUP_KEYS: Array<TABLECOLUMN> = [
        { key: 'lookupCode', sort: 'lookupCode', isEdit: true, displayName: 'Lookup Code', isUnderline: true },
        { key: 'lookupName', sort: 'lookupName', isEdit: true, displayName: 'Lookup Name' },
        { key: 'defaultValue', sort: 'defaultValue', isEdit: true, displayName: 'Default Value' },
    ];

    static readonly LOOKUP_VALUE_KEYS: Array<TABLECOLUMN> = [
        { key: 'lookupValue', isEdit: true, displayName: 'Lookup Value' },
        { key: 'valueName', isEdit: true, displayName: 'Value Name' },
    ];

    static readonly SYSTEM_PARAMETER_KEYS: Array<TABLECOLUMN> = [
        { key: 'paramCode', sort: 'paramCode', isEdit: true, displayName: 'Parameter Code', isUnderline: true },
        { key: 'description', sort: 'description', isEdit: true, displayName: 'Description' },
        { key: 'paramValue', isEdit: true, displayName: 'Parameter Value' },
        { key: 'format', isEdit: true, displayName: 'Format' },
    ];

    static readonly WEATHER_STATION_KEYS: Array<TABLECOLUMN> = [
        { key: 'stationId', sort: 'stationId', isEdit: true, displayName: 'Station Id', isUnderline: true },
        { key: 'stationName', sort: 'stationName', isEdit: true, displayName: 'Station Name' },
    ];

    static readonly LOGS_KEYS: Array<TABLECOLUMN> = [
        // { key: 'serialNumber', isEdit: true, displayName: '#' },
        { key: 'username', sort: 'username', isEdit: true, displayName: 'Username' },
        { key: 'recordType', sort: 'recordType', isEdit: true, displayName: 'Record Type' },
        { key: 'comment', sort: 'comment', isEdit: true, displayName: 'Comment / Entity' },
        // { key: 'entity', sort: 'entity', isEdit: true, displayName: 'Entity' },
        { key: 'logDate', sort: 'logDate', isEdit: true, displayName: 'Log Date' }
    ];

    static readonly DEGREE_DAY_KEY: Array<TABLECOLUMN> = [
        // { key: 'serialNumber', isEdit: true, displayName: '#' },
        { key: 'stationId', sort: 'stationId', isEdit: true, displayName: 'Station ID' },
        { key: 'type', sort: 'type', isEdit: true, displayName: 'Type' },
        { key: 'createdDate', sort: 'createdDate', isEdit: true, displayName: 'Date', isDate: true },
        { key: 'base', sort: 'base', isEdit: true, displayName: 'Base Temprature' },
        { key: 'value', isEdit: true, displayName: 'Degree Days' },
    ];

    static readonly CIMIS_STATION_KEY: Array<TABLECOLUMN> = [
        { key: 'stationNbr', sort: 'stationNbr', isEdit: true, displayName: 'Station Number', isUnderline: true },
        { key: 'name', sort: 'name', isEdit: true, displayName: 'Station Name' },
        { key: 'isActive', sort: 'isActive', isEdit: true, displayName: 'Active?' }
    ];

    static readonly CIMIS_MEASUREMENTS_KEY: Array<TABLECOLUMN> = [
        // { key: 'serialNumber', isEdit: true, displayName: '#' },
        { key: 'stationNbr', sort: 'stationNbr', isEdit: true, displayName: 'Station Number' },
        { key: 'cmDateTime', sort: 'cmDateTime', isEdit: true, displayName: 'Date' },
        { key: 'hour', sort: 'hour', isEdit: true, displayName: 'Hour' },
        { key: 'irradiance', isEdit: true, displayName: 'Irradiance' }
    ];

    static readonly BATCH_SCRIPT_KEY: Array<TABLECOLUMN> = [
        // { key: 'serialNumber', isEdit: true, displayName: '#' },
        { key: 'batchName', sort: 'batchName', isEdit: true, displayName: 'Batch name', isUnderline: true },
        { key: 'batchPeriod', sort: 'batchPeriod', isEdit: true, displayName: 'Period', isUnderline: true },
        { key: 'periodDay', sort: 'periodDay', isEdit: true, displayName: 'Period day' },
        { key: 'mailAddress', sort: 'mailAddress', isEdit: true, displayName: 'Mail address' },
        { key: 'lastExecutionTime', isEdit: true, displayName: 'Date last executed' }
    ];

    static readonly CUSTOMER_GROUP_KEY: Array<TABLECOLUMN> = [
        // { key: 'optional', displayName: 'Optional', type: 'checkbox' }, // push this object in mail-description-edit component.
        { key: 'groupCode', isEdit: true, displayName: 'Group Code' },
        { key: 'groupName', isEdit: true, displayName: 'Group Name' },
    ];

    // Job name	Last fire time	Last Runtime	Next fire time	State
    static readonly SYSTEM_JOBS_KEY: Array<TABLECOLUMN> = [
        { key: 'serialNumber', isEdit: true, displayName: '#' },
        { key: 'viewName', isEdit: true, displayName: 'Job name' },
        { key: 'prevFireTime', isEdit: true, displayName: 'Last fire time' },
        { key: 'prevRunTime', isEdit: true, displayName: 'Last Runtime', },
        { key: 'nextFireTime', isEdit: true, displayName: 'Next fire time' },
        { key: 'state', isEdit: true, displayName: 'State' },
        { key: 'buttonList', isEdit: true, displayName: '', type: 'buttons' },
    ];

    static readonly SYSTEM_THREAD_KEY: Array<TABLECOLUMN> = [
        { key: 'threadName', isEdit: true, displayName: 'Thread name' },
        { key: 'cpuTime', isEdit: true, displayName: 'cpu time' },
        { key: 'userTime', isEdit: true, displayName: 'user time' },
        { key: 'blw', isEdit: true, displayName: 'bl/w' },
        { key: 'buttonList', isEdit: true, displayName: 'Stack track', type: 'buttons' }
    ];

    static readonly EC2_INSTANCE_KEY: Array<TABLECOLUMN> = [
        { key: 'serialNumber', isEdit: true, displayName: '#' },
        { key: 'name', isEdit: true, displayName: 'Name' },
        { key: 'instanceId', isEdit: true, displayName: 'Instance ID' },
        { key: 'instanceState', isEdit: true, displayName: 'State' },
        { key: 'publicDNS', isEdit: true, displayName: 'Public DNS' },
        { key: 'buttonList', isEdit: true, displayName: 'Action', type: 'buttons' }
    ];

    static readonly ALERT_MESSAGE_KEY: Array<TABLECOLUMN> = [
        { key: 'id', sort: 'id', isEdit: true, displayName: 'Id' },
        { key: 'target', sort: 'target', isEdit: true, displayName: 'Target' },
        { key: 'alertType', sort: 'alertType', isEdit: true, displayName: 'Alert Type' },
        { key: 'alertLevel', sort: 'alertLevel', isEdit: true, displayName: 'Alert Level' },
        { key: 'messageTemplate', sort: 'messageTemplate', isEdit: true, displayName: 'Message' },
        { key: 'createdDate', sort: 'createdDate', isEdit: true, displayName: 'Created Date' },
        { key: 'active', isEdit: true, displayName: 'Active', type : 'image' },
    ];

    static readonly TOPIC_DESCRIPTION_KEY: Array<TABLECOLUMN> = [
        // { key: 'serialNumber', isEdit: true, displayName: '#' },
        { key: 'surveyCode', sort: 'surveyCode', isEdit: true, displayName: 'Topic Code', isUnderline: true },
        { key: 'label', sort: 'label', isEdit: true, displayName: 'Topic Label' },
        { key: 'reportLabel', sort: 'reportLabel', isEdit: true, displayName: 'Topic Report Label' },
        { key: 'active', isEdit: true, displayName: 'Active' },
        { key: 'nextSurveyCode', isEdit: true, displayName: 'Next Topic Code' }
    ];

    static readonly TOPIC_PANE_KEY: Array<TABLECOLUMN> = [
        { key: 'paneCode', isEdit: true, displayName: 'Pane Code' ,isUnderline: true },
        { key: 'label', isEdit: true, displayName: 'Label' },
        { key: 'orderNumber', isEdit: true, displayName: 'Order Number' },
        { key: 'parentSectionLabel', isEdit: true, displayName: 'Section' },
        { key: 'section', isEdit: true, displayName: 'Is Section' }
    ];

    static readonly RECOMMENDATION_KEY: Array<TABLECOLUMN> = [
        { key: 'takebackCode', isEdit: true, displayName: 'Csode' },
        { key: 'lookupType', isEdit: true, displayName: 'Type' },
        { key: 'takebackLabelTemplate', isEdit: true, displayName: 'Label' },
    ];

    static readonly RECOMMENDATION_EDIT_KEY: Array<TABLECOLUMN> = [
        { key: 'takebackCode', isEdit: true, displayName: 'Code' },
        { key: 'takebackLabelTemplate', isEdit: true, displayName: 'Label' },
    ];

    static readonly TOPIC_VARIABLES_KEYS: Array<TABLECOLUMN> = [
        { key: 'field', isEdit: true, displayName: 'Field' },
        { key: 'comments', isEdit: true, displayName: 'Comments' },
        { key: 'calculationPeriodActual', isEdit: true, displayName: 'Calculation Period' },
    ];

    static readonly PANE_DATA_BLOCK_KEY: Array<TABLECOLUMN> = [
        { key: 'blockCode', isEdit: true, displayName: 'Block Code' },
        { key: 'orderNumber', isEdit: true, displayName: 'Order Number' },
        { key: 'label', isEdit: true, displayName: 'Label' },
        { key: 'array', isEdit: true, displayName: 'Is array' }
    ];

    static readonly PANE_DATA_FIELD_VALUES_KEY: Array<TABLECOLUMN> = [
        { key: 'order', isEdit: true, displayName: 'Order', type :'inputField', addRowType : 'text' },
        { key: 'value', isEdit: true, displayName: 'Value', type :'inputField', addRowType : 'text'  },
        { key: 'range', isEdit: true, displayName: 'Rage' , type :'inputField', addRowType : 'text' },
        { key: 'name', isEdit: true, displayName: 'Value Name', type :'inputField', addRowType : 'text' }
    ];

    static readonly PANE_DATA_FIELD_KEY: Array<TABLECOLUMN> = [
        { key: 'field', isEdit: true, displayName: 'Field Code' },
        { key: 'orderNumber', isEdit: true, displayName: 'Order Number' },
        { key: 'label', isEdit: true, displayName: 'Label' },
    ];

    static readonly PANE_CHART_KEYS: Array<TABLECOLUMN> = [
        { key: 'chartCode', isEdit: true, displayName: 'Chart Code' },
        { key: 'orderNumber', isEdit: true, displayName: 'Order Number' },
        { key: 'chartTitle', isEdit: true, displayName: 'Chart Title' },
    ];

    static readonly CHART_SERIES_FIELD_KEY: Array<TABLECOLUMN> = [
        { key: 'seriesCode', isEdit: true, displayName: 'Series Code' },
        { key: 'seriesName', isEdit: true, displayName: 'Series Name' },
        { key: 'orderNumber', isEdit: true, displayName: 'Order Number' },
        { key: 'seriesColor', isEdit: true, displayName: 'Series Color' },
        { key: 'seriesStrokeWidth', isEdit: true, displayName: 'Series Stroke Width' },
    ];

    static readonly PANE_REPORT_KEYS: Array<TABLECOLUMN> = [
        { key: 'reportCode', isEdit: true, displayName: 'Report Code' },
        { key: 'reportLabel', isEdit: true, displayName: 'Report Label' },
    ];

    static readonly STAFF_TABLE_COLUMN: Array<TABLECOLUMN> = [
        // { key: 'serialNumber', isEdit: true, displayName: '#' },
        { key: 'username', sort: 'username', isEdit: true, displayName: 'Username', isUnderline: true },
        { key: 'email', sort: 'email', isEdit: true, displayName: 'E-mail' },
        { key: 'status', isEdit: true, displayName: 'Status' },
        { key: 'name', sort: 'name', isEdit: true, displayName: 'Name' },
        { key: 'createdDate', sort: 'createdDate', isEdit: true, displayName: 'Join Date', isDate: true, dataFormat: 'MMM dd,yyyy'},
    ];

    static readonly SURVEY_VERSION_SETTING_DATA: Array<any> = [
        { id: '0', name: 'Show button on survey panes' },
        { id: '1', name: 'Always use new Panes' },
        { id: '2', name: 'Always use old Panes' }
    ];

    static readonly TOPIC_GROUP_COLUMN_DATA: Array<TABLECOLUMN> = [
        { key: 'groupCode', isEdit: true, displayName: 'Group Code' },
        { key: 'groupName', isEdit: true, displayName: 'Group Name' },
    ];

    static readonly TOPIC_KEYS: Array<TABLECOLUMN> = [
        // { key: 'serialNumber',sort: 'label', showSerailNumber : true, displayName: '#', isUnderline: true },
        { key: 'label', sort: 'label', isEdit: true, displayName: 'Label', isUnderline: true  },
        { key: 'user', isEdit: true, displayName: 'User'  },
        { key: 'group', isEdit: true, displayName: 'Group'  },
        { key: 'createdDate', sort: 'createdDate', isEdit: true, displayName: 'Start Date', isDate: true , dataFormat : 'MM/dd/yyyy hh:mm:ss' , isSurvey :true },
        { key: 'updatedDate', sort: 'updatedDate', isEdit: true, displayName: 'Modified Date' , isDate: true, dataFormat : 'MM/dd/yyyy hh:mm:ss' , isSurvey :true},
        { key: 'finishedDate', sort: 'finishedDate', isEdit: true, displayName: 'Completed Date', isDate: true , dataFormat : 'MM/dd/yyyy hh:mm:ss' , isSurvey :true},
    ];

    static readonly ADMIN_REPORT_KEYS: Array<TABLECOLUMN> = [
        // { key: 'serialNumber', displayName: '#' },
        { key: 'reportName', sort: 'reportLabel', isEdit: true, displayName: 'Report Name', isUnderline: true },
        { key: 'reportLabel', sort: 'reportLabel', isEdit: true, displayName: 'Report Label' },
        { key: 'reportType', isEdit: true, displayName: 'Report Type' },
        { key: 'embeddedReport', isEdit: true, displayName: 'Embedded Report' },
        { key: 'callReport', isEdit: true, displayName: '', type: 'image', imagePath: 'assets/images/ico_pdf.gif', event: 'callReport' },
    ];

    static readonly ADMIN_REPORT_PARAMETER_KEYS: Array<TABLECOLUMN> = [
        { key: 'parameterName', isEdit: true, displayName: 'Parameter Name', type: 'input' },
        { key: 'defaultValue', isEdit: true, displayName: 'Default Value', type: 'input' },
        { key: 'parameterLabel', isEdit: true, displayName: 'Parameter Label', type: 'input' },
        { key: 'action', displayName: '', type: 'image' },
    ];

    static readonly EVENT_HISTORY_KEYS: Array<TABLECOLUMN> = [
        { key: 'customerName', sort: 'customer.user.name', isEdit: true, displayName: 'Customer' },
        { key: 'eventCode', sort: 'eventCode', isEdit: true, displayName: 'Event Code', isUnderline: true },
        { key: 'eventName', sort: 'eventName', isEdit: true, displayName: 'Event Name' },
        { key: 'createdDate', sort: 'createdDate', isEdit: true, displayName: 'Date' },
        { key: 'linkedPersonName', sort: 'linkedPersonName', isEdit: true, displayName: 'Author' },
    ];

    static readonly PROSPECTS_KEY: Array<TABLECOLUMN> = [
        { key: 'registrationId', sort: 'registrationId', isEdit: true, displayName: 'ID' },
        { key: 'source', sort: 'program', isEdit: true, displayName: 'Program' },
        { key: 'name', sort: 'name', isEdit: true, displayName: 'Name' },
        { key: 'field6', sort: 'field6', isEdit: true, displayName: 'Page' },
        { key: 'email', sort: 'email', isEdit: true, displayName: 'Email' },
        { key: 'coachUserId', sort: 'coachUserId', isEdit: true, displayName: 'CoachID' },
        { key: 'createdDate', sort: 'createdDate', isEdit: true, displayName: 'Date', isDate: true, dataFormat : 'MM/dd/yyyy hh:mm:ss' },
        { key: 'auditId' , isEdit: true, displayName: 'Audit ID'},
        { key: 'optOutMail', isEdit: true, displayName: 'OptOut	'}
    ];

    static readonly MAIL_DESC_KEYS: Array<TABLECOLUMN> = [
        // { key: 'serialNumber', displayName: '#' },
        { key: 'id', sort: 'id', isEdit: true, displayName: 'ID' },
        { key: 'mailName', sort: 'mailName', isEdit: true, displayName: 'Mail Name', isUnderline: true },
        { key: 'mailPeriod', sort: 'mailPeriod', isEdit: true, displayName: 'Period', isUnderline: true },
        { key: 'periodDayRule', sort: 'periodDayRule', isEdit: true, displayName: 'Period Day' },
        { key: 'totalProcessedTime', sort: 'totalProcessedTime', isEdit: true, displayName: 'Runtime' },
        { key: 'subjectTemplate', sort: 'subjectTemplate', isEdit: true, displayName: 'Subject' },
    ];

    static readonly KEY_INDICATOR_KEYS: Array<TABLECOLUMN> = [
        { key: 'keyIndicatorCode', sort: 'keyIndicatorCode', isEdit: true, displayName: 'Key Indicator Code', isUnderline : true },
        { key: 'keyIndicatorName', sort: 'keyIndicatorName', isEdit: true, displayName: 'Key Indicator Name' }, 
    ];

    static readonly CONTENT_PART_KEYS: Array<TABLECOLUMN> = [
        { key: 'label', isEdit: true, displayName: 'Label', isUnderline: true },
        { key: 'contentOrder', isEdit: true, displayName: 'Order' },
        { key: 'contentFilterRule', isEdit: true, displayName: 'Content Filter' },
    ];

    static readonly VARIABLE_KEYS: Array<TABLECOLUMN> = [
        { key: 'field', isEdit: true, displayName: 'Field Code', isUnderline: true },
        { key: 'orderNumber', isEdit: true, displayName: 'Order' },
        { key: 'calculation', isEdit: true, displayName: 'Calculation Rule' },
    ];

    static readonly CUSTOMER_GROUP_MAIL_PART_KEYS: Array<TABLECOLUMN> = [
        { key: 'serialNumber', displayName: '#' },
        { key: 'groupName', sort: 'customerGroup.groupName', displayName: 'Customer Group Name' },
        { key: 'header', isEdit: true, displayName: 'Header', isUnderline: true },
        { key: 'footer', isEdit: true, displayName: 'Footer', isUnderline: true },
    ];

    static readonly USER_REPORTS_KEYS: Array<TABLECOLUMN> = [
        { key: 'orderNumber', isEdit: true, displayName: 'Order' },
        { key: 'userReportType', isEdit: true, displayName: 'Report Type' },
        { key: 'displayName', sort: 'displayName', isEdit: true, displayName: 'Display Label', isUnderline: true },
        { key: 'labelTemplate', sort: 'labelTemplate', isEdit: true, displayName: 'Label', isUnderline: true },
    ];

    static readonly JS_PAGES_KEYS: Array<TABLECOLUMN> = [
        { key: 'code', sort: 'code', isEdit: true, displayName: 'Code', isUnderline: true },
        { key: 'name', sort: 'name', isEdit: true, displayName: 'Page Name' },
        { key: 'template', isEdit: true, displayName: 'Template' },
        { key: 'showInMenu', isEdit: true, displayName: 'Show In Menu' },
    ];

    static readonly VIEW_CONF_KEYS: Array<TABLECOLUMN> = [
        { key: 'configurationName', sort: 'name', isEdit: true, displayName: 'ConfigurationName', isUnderline: true },
        { key: 'createdBy', sort: 'username', isEdit: true, displayName: 'User Name' },
        { key: 'sharedShow', isEdit: true, displayName: 'Shared' },
        { key: 'baseEntity', isEdit: true, displayName: 'Base Entity' },
        { key: 'attributes', isEdit: true, displayName: '', type: 'link', links: [{ routerLink: '/admin/viewConfiguration/viewConfigurationAttributeList', isEdit: true, displayName: 'Attributes', queryParam: { } }] },
    ];

    static readonly ATTRIBUTE_LIST_KEYS: Array<TABLECOLUMN> = [
        { key: 'columnOrder', sort: 'columnOrder', isEdit: true, displayName: 'Column Order', isUnderline: true },
        { key: 'definition', sort: 'definition', isEdit: true, displayName: 'Definition' },
        { key: 'label', sort: 'label', isEdit: true, displayName: 'Label' },
        { key: 'attributeType', sort: 'attributeType', isEdit: true, displayName: 'Attribute Type' },
        { key: 'sortAllowed', sort: 'sortAllow', isEdit: true, displayName: 'Sort Allow' },
    ];

    static readonly VIEW_ATTRIBUTE_ATTRIBUTE_TYPE : Map<string, string> = new Map<string, string>([
        ['C','Only Column'],
        ['S', 'Script Calculation'],
        ['V', 'Variable'],
        ['A', 'Alerts'],
        ['E', 'Events'],
        ['N', 'Notes'],
        ['D', 'Customer Files']
    ]);


    static readonly TRENDING_PART_KEYS: Array<TABLECOLUMN> = [
        { key: 'labelTemplate', sort: 'label', isEdit: true, displayName: 'Label', isUnderline: true },
        { key: 'orderNumber', sort: 'orderNumber', isEdit: true, displayName: 'Order Number' },
        { key: 'explanationTemplate', sort: 'Explanation', isEdit: true, displayName: 'Explanation' },
    ];

    static readonly TRENDING_CHART_KEYS: Array<TABLECOLUMN> = [
        { key: 'chartCode', isEdit: true, displayName: 'Chart Code', isUnderline: true },
        { key: 'orderNumber', isEdit: true, displayName: 'Order Number' },
        { key: 'resourceUse', isEdit: true, displayName: 'Resource Use' },
        { key: 'unitType', isEdit: true, displayName: 'Unit Type' },
        { key: 'useType', isEdit: true, displayName: 'Use Type' },
    ];

    static readonly SUMMARY_CHART_KEYS: Array<TABLECOLUMN> = [
        { key: 'chartCode', isEdit: true, sort: 'chart.chartCode',  displayName: 'Chart Code', isUnderline: true },
        { key: 'orderNumber', sort: 'orderNumber', isEdit: true, displayName: 'Order Number' },
        { key: 'resourceUse', isEdit: true, displayName: 'Resource Use' },
        { key: 'unitType', isEdit: true, displayName: 'Unit Type' },
        { key: 'useType', isEdit: true, displayName: 'Use Type' },
    ];

    static readonly DATA_SET_KEYS: Array<TABLECOLUMN> = [
        { key: 'queryParameter', isEdit: true, displayName: 'Query Parameter', type :'inputField' , addRowType: 'text' },
        { key: 'dataFieldLabel', isEdit: true, displayName: 'Data Field', addRowType: 'select', type :'inputField', option : [] },
    ];

    static readonly TRENDING_DATA_SET_KEYS: Array<TABLECOLUMN> = [
        { key: 'field', isEdit: true, displayName: 'Query Parameter', type :'inputField' , addRowType: 'text' },
        { key: 'calculation', isEdit: true, displayName: 'Calculation formula', type :'inputField' , addRowType: 'text'  },
    ];

    static readonly SUMMARY_DATA_SET_KEYS: Array<TABLECOLUMN> = [
        { key: 'field', isEdit: true, displayName: 'Query Parameter', type :'inputField' , addRowType: 'text' },
        { key: 'calculation', isEdit: true, displayName: 'Calculation formula', type :'inputField' , addRowType: 'text'  },
    ];

    static readonly GAS_KEYS: Array<TABLECOLUMN> = [
        { key : AppConstant.ASTRIC , isEdit : true, displayName : ''},
        { key: 'year', sort: 'year', isEdit: true, displayName: 'Year' },
        { key: 'month', sort: 'month', isEdit: true, displayName: 'Month' },
        { key: 'billingPeriod', isEdit: true, displayName: 'Billing Period' },
        { key: 'billingDate', isEdit: true, displayName: 'Billing Date', isDate: true },
        { key: 'value', isEdit: true, displayName: 'Total' },
    ];

    static readonly GAS_CHARGE_KEYS: Array<TABLECOLUMN> = [
        { key : AppConstant.ASTRIC , isEdit : true, displayName : ''},
        { key: 'year', sort: 'year', isEdit: true, displayName: 'Year' },
        { key: 'month', sort: 'month', isEdit: true, displayName: 'Month' },
        { key: 'billingPeriod', isEdit: true, displayName: 'Billing Period' },
        { key: 'billingDate', isEdit: true, displayName: 'Billing Date', isDate: true },
        { key: 'value', isEdit: true, displayName: 'Total', isDolar : true },
    ];


    static readonly ELECTRICITY_CHARGE_KEYS: Array<TABLECOLUMN> = [
        { key : AppConstant.ASTRIC , isEdit : true, displayName : ''},
        { key: 'year', sort: 'year', isEdit: true, displayName: 'Year' },
        { key: 'month', sort: 'month', isEdit: true, displayName: 'Month' },
        { key: 'billingPeriod', isEdit: true, displayName: 'Billing Period' },
        { key: 'billingDate', isEdit: true, displayName: 'Billing Date', isDate: true },
        { key: 'value', isEdit: true, displayName: 'Total', isDolar :true },
        // { key: 'utilGen', isEdit: true, displayName: '3rd Party Gen', isDolar :true  },
    ];

    static readonly ELECTRICITY_KEYS: Array<TABLECOLUMN> = [
        { key : AppConstant.ASTRIC , isEdit : true, displayName : ''},
        { key: 'year', sort: 'year', isEdit: true, displayName: 'Year' },
        { key: 'month', sort: 'month', isEdit: true, displayName: 'Month' },
        { key: 'billingPeriod', isEdit: true, displayName: 'Billing Period' },
        { key: 'billingDate', isEdit: true, displayName: 'Billing Date', isDate: true },
        { key: 'value', isEdit: true, displayName: 'Total' },
    ];

    static readonly SMART_METER_KEYS: Array<TABLECOLUMN> = [
        { key: 'year', sort: 'year', isEdit: true, displayName: 'Year' },
        { key: 'month', sort: 'month', isEdit: true, displayName: 'Month' },
        { key: 'day', sort: 'day', isEdit: true, displayName: 'Day' },
        { key: 'hour', sort: 'hour', isEdit: true, displayName: 'Hour' },
        { key: 'value', isEdit: true, displayName: 'Total' },
    ];

    static readonly SMART_METER_DAILY_KEYS: Array<TABLECOLUMN> = [
        { key: 'year', sort: 'year', isEdit: true, displayName: 'Year' },
        { key: 'month', sort: 'month', isEdit: true, displayName: 'Month' },
        { key: 'day', sort: 'day', isEdit: true, displayName: 'Day' },
        { key: 'value', isEdit: true, displayName: 'Total' },
    ];

    static readonly SHARE_MY_DATA_KEYS: Array<TABLECOLUMN> = [
        { key: 'auditId', sort: 'auditId', isEdit: true, displayName: 'Audit Id' },
        { key: 'subscriptionId', sort: 'subscriptionId', isEdit: true, displayName: 'Subscription Id' },
        { key: 'createdDate', sort: 'createdDate', isEdit: true, displayName: 'Created Date' },
        { key: 'account', sort: 'account', isEdit: true, displayName: 'Account' },
        { key: 'name', sort: 'name', isEdit: true, displayName: 'Name' },
        { key: 'city', sort: 'city', isEdit: true, displayName: 'City' },
        { key: 'address', sort: 'address', isEdit: true, displayName: 'Address' },
        { key: 'processAsNew', isEdit: true, displayName: 'create New?', type : 'checkbox' },
        { key: 'update', type : 'buttons' , displayName: ' '}
    ];

    static readonly MAIL_ARCHIVE_KEY: Array<TABLECOLUMN> = [
        { key: 'subject', sort: 'subject', isEdit: true, displayName: 'Subject', isUnderline: true },
        { key: 'dateSent', sort: 'dateSent', isEdit: true, displayName: 'Date sent', isDate: true },
        { key: 'sentTo', sort: 'sentTo', isEdit: true, displayName: 'Sent to'  },
        { key: 'inBouncedList', isEdit: true, displayName: 'Bounced' },
        { key: 'wasOpened', isEdit: true, displayName: 'Opened' },
        { key: 'permanentLink', isEdit: true, displayName: 'Permanent link', isUnderline: true }
    ];

    static readonly EVENT_TYPE_RESTRICTION : Array<TABLECOLUMN> = [
        { isEdit: true, displayName: 'Event Code', key: 'eventCode'},
        { isEdit: true, displayName: 'Event Name', key: 'eventName'}
    ]


    // JSON value data
    static readonly STATUS_DATA: Array<any> = [
        { id: 0, value: 'Active (0)' },
        { id: 10, value: 'In registration (10)' },
        { id: 20, value: 'Bad utility credentials (20)' },
        { id: 50, value: 'In progress (50)' },
        { id: 80, value: 'Pending (80)' },
        { id: 90, value: 'Blocked (90)' },
        { id: 85, value: 'PG&amp;E account pending (85)' },
    ];

    static readonly STATUS_DATA_FOR_STAFF: Array<any> = [
        { id: 0, value: 'Active (0)' },
        { id: 10, value: 'In registration (10)' },
        { id: 90, value: 'Blocked (90)' },
    ];

    static readonly STATUS_DATA_FOR_STAFF_LIST: Array<any> = [
        { id: 0, value: 'Active (0)' },
        { id: 90, value: 'Blocked (90)' },
    ];
    static readonly NOT_ONLY_ELECTRICITY_TO_HEAT_DATA: Array<any> = [
        { key: '' , value: null},
        { key: 'Y', value: 'Answer: Yes' },
        { key: 'N', value: 'Answer: No' },
        { key: 'U', value: 'Not answered'},
    ];

    static readonly YES_NO_DATA: Array<any> = [
        { key: 'Y', value: 'Yes' },
        { key: 'N', value: 'No' }
    ];

    static readonly BASE_TEMPERATURE: Array<any> = [
        { key: '50', value: '50 F' },
        { key: '51', value: '51 F' },
        { key: '52', value: '52 F' },
        { key: '53', value: '53 F' },
        { key: '54', value: '54 F' },
        { key: '55', value: '55 F' },
        { key: '56', value: '56 F' },
        { key: '57', value: '57 F' },
        { key: '58', value: '58 F' },
        { key: '59', value: '59 F' },
        { key: '60', value: '60 F' },
        { key: '61', value: '61 F' },
        { key: '62', value: '62 F' },
        { key: '63', value: '63 F' },
        { key: '64', value: '64 F' },
        { key: '65', value: '65 F' },
        { key: '66', value: '66 F' },
        { key: '67', value: '67 F' },
        { key: '68', value: '68 F' },
        { key: '69', value: '69 F' },
        { key: '70', value: '70 F' },
        { key: '71', value: '71 F' },
        { key: '72', value: '72 F' },
        { key: '73', value: '73 F' },
        { key: '74', value: '74 F' },
        { key: '75', value: '75 F' },
        { key: '76', value: '76 F' },
        { key: '77', value: '77 F' },
        { key: '78', value: '78 F' },
        { key: '79', value: '79 F' },
        { key: '80', value: '80 F' },
        { key: '81', value: '81 F' },
        { key: '82', value: '82 F' },
        { key: '83', value: '83 F' },
        { key: '84', value: '84 F' },
        { key: '85', value: '85 F' },
    ];

    static readonly TOPIC_DESCRIPTION_SELECT_DATA: Array<any> = [
        { key: '393', value: 'Does your home have Natural Gas ? (hhe_noGasQ)' },
        { key: '394', value: 'Get Natural Gas Data(hhe_gasFmSoCalGas)' },
        { key: '395', value: 'Get Natural Gas Data(hhe_gasFmPGE)' },
        { key: '396', value: 'Collecting Your Natural Gas Data(hhe_noGasStop)' },
        { key: '124', value: 'Home Energy Profile Intro(hhe_Intro)' },
        { key: '108', value: 'NG Special Case Panes(NaturalGasSpecialCase)' },
        { key: '52', value: 'Fuel other than natural gas(hhe_noGasInOnlineAccountQ)' },
        { key: '54', value: 'Monthly use other than gas or electric(hhe_noGasNotOnlyElectricity)' },
        { key: '55', value: 'Fuel other than electric or gas(hhe_noGasNotOnlyElectricityHasLog)' },
        { key: '56', value: 'No monthly log for fuel use(hhe_noInfo)' },
        { key: '53', value: 'Only electricity(hhe_noGasOnlyElectricity)' },
        { key: '184', value: 'Not enough Natural Gas data(hhe_not12mosGas)' },
        { key: '270', value: 'Natural Gas Cost(hhe_naturalGasCost_new)' },
        { key: '271', value: 'Winter Heating Natural Gas Cost(hhe_winterHeatingNGCost_new)' },
        { key: '63', value: 'Other Space Heating Fuel ? (hhe_annualGasSmall)' },
        { key: '272', value: 'Year - round Natural Gas Cost(hhe_BaseFuelAnalysis_new)' },
        { key: '57', value: 'Other Water Heating Fuel ? (hhe_smallBaseFuelUse)' },
        { key: '253', value: 'Variable Natural Gas Cost(hhe_VariableGasLoadsCost)' },
        { key: '185', value: 'Not enough Electricity data(hhe_not12mosElec)' },
        { key: '255', value: 'Electricity Cost(hhe_annualElectric_new)' },
        { key: '257', value: 'Summer Cooling Cost(hhe_bigACelectricity_new)' },
        { key: '256', value: 'Winter Electric Heating Cost(hhe_bigWinterBaseLoadAnalysis_new)' },
        { key: '259', value: 'Year - round Electric Costs(hhe_YearRoundElectricityCost_new)' },
        { key: '260', value: 'Idle Load Summary(hhe_BaseLoadSmartMeter_new)' },
        { key: '44', value: 'Smart meter info not available(hhe_BaseLoadSurvey)' },
        { key: '358', value: 'Always on Adjustment(hhe_adjustBase)' },
        { key: '265', value: 'Always on Electricity Cost(hhe_baseload_new)' },
        { key: '359', value: 'Recurring Load Adjustment(hhe_adjustRecurring)' },
        { key: '267', value: 'Recurring Electric Cost(hhe_RecurringEnergy_new)' },
        { key: '268', value: 'Variable Electric Cost(hhe_variableElectricityCost_new)' },
        { key: '280', value: 'Variable Electric Use by Hour(hhe_variableElectricityDetail_new)' },
        { key: '269', value: 'Combined Household Energy Cost(hhe_SeasonalEnergyCost_new)' },
        { key: '112', value: 'RMVD: Energy Profile Completed(hhe_EnergyProfileCompleted)' },
    ];

    static readonly PANE_DATA: Array<any> = [
        { key: '88', value: 'Introduction to CEC(prf_introCEC)' },
        { key: '125', value: 'Introduction to EUMV(prf_introMV)' },
        { key: '169', value: 'Introduction to HEA(prf_introHEA)' },
        { key: '171', value: 'Introduction to GTLA(prf_introGTLA)' },
        { key: '236', value: 'Welcome to the study(prf_introVT)' },
        { key: '237', value: 'Introduction to HET(prf_introHET)' },
        { key: '327', value: 'Introduction to AC(prf_introAC)' },
        { key: '360', value: 'Introduction to HEA(prf_introWater)' },
        { key: '387', value: 'Introduction to EF(prf_introEF)' },
        { key: '390', value: 'Small Screen Detected(prf_smallScreen)' },
        { key: '21', value: 'Agree to terms(prf_welcome)' },
        { key: '361', value: 'Agree to terms(DISABLED)(prf_welcomeWater)' },
        { key: '389', value: 'Agree to Share Your Data(prf_agreeToShare)' },
        { key: '22', value: 'Utility Account Info(prf_utilityAccountInfo)' },
        { key: '388', value: 'Utility Account Info(prf_utilityAccountInfoNonPGE)' },
        { key: '370', value: 'Water Utility Account Info(prf_wUtilityAccountInfo)' },
        { key: '23', value: 'Valid Utility Account(prf_utilityAccountValidated)' },
        { key: '353', value: 'Your Concerns(prf_concerns)' },
        { key: '156', value: 'Referral Source(prf_ReferralSource)' },
        { key: '317', value: 'Your Customer Support Staff(prf_staffAssigned)' },
        { key: '24', value: 'Assessment goals(prf_objectives)' },
        { key: '25', value: 'Affinity Groups(prf_AffinityGroups)' },
    ];

    static readonly INPUT_TYPE_DATA: Array<any> = [
        { key: 'text', value: 'Any text' },
        { key: 'checkbox', value: 'Checkbox' },
        { key: 'date', value: 'Date' },
        { key: 'hslider', value: 'Horizontal slider' },
        { key: 'password', value: 'Password' },
        { key: 'radiobutton', value: 'Radiobutton' },
        { key: 'select" selected = "selected', value: 'Selection' },
        { key: 'textarea', value: 'Textarea' },
        { key: 'vradiobutton', value: 'Vertical radiobuttons' },
        { key: 'vslider', value: 'Vertical slider' },
    ];

    static readonly COLOR_DATA: Array<any> = [
        { key: 'default', value: 'Default' },
        { key: 'white', value: 'White' },
        { key: 'lightGray', value: 'Light Gray' },
        { key: 'gray', value: 'Gray' },
        { key: 'darkGray', value: 'Dark Gray' },
        { key: 'black', value: 'Black' },
        { key: 'red', value: 'Red' },
        { key: 'pink', value: 'Pink' },
        { key: 'orange', value: 'Orange' },
        { key: 'yellow', value: 'Yellow' },
        { key: 'green', value: 'Green' },
        { key: 'magenta', value: 'Magenta' },
        { key: 'cyan', value: 'Cyan' },
        { key: 'blue', value: 'Blue' },
        { key: 'blue1', value: 'Blue 1' },
        { key: 'orange1', value: 'Orange 1' },
        { key: 'lightGrey', value: 'Light Gray' },
        { key: 'gray1', value: 'Gray 1' },
        { key: 'lightGrey1', value: 'Light Gray 1' },
        { key: 'darkGray1', value: 'Dark Gray 1' },
        { key: 'gray2', value: 'Gray 2' },
        { key: 'darkOrange', value: 'Dark Orange' },
        { key: 'beige', value: 'Beige' },
        { key: 'darkGreen', value: 'Dark Green' },
    ];

    static readonly FONT_STYLE_DATA: Array<any> = [
        { key: '', value: 'Default' },
        { key: 'Century Schoolbook L', value: 'Century Schoolbook L' },
        { key: 'DejaVu Sans', value: 'DejaVu Sans' },
        { key: 'DejaVu Sans Mono', value: 'DejaVu Sans Mono' },
        { key: 'DejaVu Serif', value: 'DejaVu Serif' },
        { key: 'Dialog', value: 'Dialog' },
        { key: 'DialogInput', value: 'DialogInput' },
        { key: 'Dingbats', value: 'Dingbats' },
        { key: 'Droid Arabic Kufi', value: 'Droid Arabic Kufi' },
        { key: 'Droid Arabic Naskh', value: 'Droid Arabic Naskh' },
        { key: 'Droid Naskh Shift Alt', value: 'Droid Naskh Shift Alt' },
        { key: 'Droid Sans', value: 'Droid Sans' },
        { key: 'Droid Sans Arabic', value: 'Droid Sans Arabic' },
        { key: 'Droid Sans Armenian', value: 'Droid Sans Armenian' },
        { key: 'Droid Sans Ethiopic', value: 'Droid Sans Ethiopic' },
        { key: 'Droid Sans Fallback', value: 'Droid Sans Fallback' },
        { key: 'Droid Sans Georgian', value: 'Droid Sans Georgian' },
        { key: 'Droid Sans Hebrew', value: 'Droid Sans Hebrew' },
        { key: 'Droid Sans Japanese', value: 'Droid Sans Japanese' },
        { key: 'Droid Sans Mono', value: 'Droid Sans Mono' },
        { key: 'Droid Serif', value: 'Droid Serif' },
        { key: 'Liberation Mono', value: 'Liberation Mono' },
        { key: 'Liberation Sans', value: 'Liberation Sans' },
        { key: 'Liberation Sans Narrow', value: 'Liberation Sans Narrow' },
        { key: 'Liberation Serif', value: 'Liberation Serif' },
        { key: 'Lucida Bright', value: 'Lucida Bright' },
        { key: 'Lucida Sans', value: 'Lucida Sans' },
        { key: 'Lucida Sans Typewriter', value: 'Lucida Sans Typewriter' },
        { key: 'Monospaced', value: 'Monospaced' },
        { key: 'Nimbus Mono L', value: 'Nimbus Mono L' },
        { key: 'Nimbus Roman No9 L', value: 'Nimbus Roman No9 L' },
        { key: 'Nimbus Sans L', value: 'Nimbus Sans L' },
        { key: 'SansSerif', value: 'SansSerif' },
        { key: 'Serif', value: 'Serif' },
        { key: 'Standard Symbols L', value: 'Standard Symbols L' },
        { key: 'URW Bookman L', value: 'URW Bookman L' },
        { key: 'URW Chancery L', value: 'URW Chancery L' },
        { key: 'URW Gothic L', value: 'URW Gothic L' },
        { key: 'URW Palladio L', value: 'URW Palladio L' },
    ];

    static readonly REPORT_PARAMETER_KEY: Array<TABLECOLUMN> = [
        {
            key: 'dataFieldLabel', isEdit: true, displayName: 'Data Field', type :'inputField', addRowType: 'select', option:
                [
                    // { key: '1246', value: 'Do you have a solar PV system at your home?&nbsp;(pv_ConfirmPV)' },
                    // { key: '1248', value: 'Install date&nbsp;(pv_InstallDate)' },
                    // { key: '1249', value: 'System size, in rated kW&nbsp;(pv_Size)' },
                    // { key: '1250', value: 'Orientation&nbsp;(pv_Orientation)' },
                    // { key: '1251', value: 'Shading&nbsp;(pv_Shading)' },
                    // { key: '1271', value: 'Order SV Recalculation&nbsp;(pv_OrderSVRecalculation)' },
                    // { key: '1254', value: 'Date Installed&nbsp;(pv_InstallGroup.pv_InstallGroupDate)' },
                    // { key: '1255', value: 'Total System Size (kW)&nbsp;(pv_InstallGroup.pv_installGroupSize)' },
                    // { key: '1256', value: 'Orientation&nbsp;(pv_InstallGroup.pv_InstallGroupOrientation)' },
                    // { key: '1257', value: 'Shading&nbsp;(pv_InstallGroup.pv_installGroupShading)' },
                    // { key: '1272', value: 'Annual derating factor (%)&nbsp;(pv_InstallGroup.pv_installGroupADF)' },
                    // { key: '1258', value: 'Start of Outage&nbsp;(pv_OutageGroup.pv_OutageGroupStart)' },
                    // { key: '1263', value: 'End of Outage&nbsp;(pv_OutageGroup.pv_OutageGroupEnd)' },
                    // { key: '1267', value: 'UpdatePVOutputCallAllowed&nbsp;(pv_UpdatePVOutputCallAllowed)' },
                    // { key: '1266', value: 'Call UpdatePVOutput&nbsp;(pv_UpdatePVOutput)' },
                    // { key: '1268', value: 'UpdatePVOutputOnSave&nbsp;(pv_UpdatePVOutputOnSave)' },
                    // { key: '1273', value: 'Percent of hourly values above idle load&nbsp;(pv_PctOverIdleLoad)' },
                    // { key: '1275', value: 'Electric use came from the Sun&nbsp;(pv_electricUseFromSun)' },
                    // { key: '1276', value: '12 months Electric Savings&nbsp;(pv_12mElectricSavings)' },
                    // { key: '1259', value: 'Do you have a log of your PV system\'s generation on an hourly basis?&nbsp;(pv_hasHourlyLog)' },
                    // {
                    //     key: '1260',
                    //     value: `Would you like to compare our estimate to your system log for a particular day
                    //     in the past?&nbsp;(pv_CompareToSystemLog)`
                    // },
                    // { key: '1261', value: 'Which day would you like to compare?&nbsp;(pv_CompareDate)' },
                    // { key: '1262', value: 'Enter total logged PV output for this day:&nbsp;(pv_DailyOutputFromLog)' },
                    // { key: '1269', value: 'Estimated daily PV system output&nbsp;(pv_PVDayOutput_kWh)' },
                    // { key: '1270', value: 'Estimation difference&nbsp;(pv_EstimationDiff)' },
                    // {
                    //     key: '1264',
                    //     value: `Do you have a whole-home battery that is used to shift electric loads from
                    //     hour to hour?&nbsp;(pv_hasWholeHomeBattery)`
                    // },
                    // {
                    //     key: '1265',
                    //     value: `Is your battery also used to shift electric loads more than two days?& nbsp;
                    //     (pv_IsBatteryUsedToShiftLoads)`
                    // },
                    // { key: '1274', value: 'Recalc SVs&nbsp;(pv_RecalcSVOnSave)' },
                ]
        },
        {
            key: 'reportParameterLabel', isEdit: true, displayName: 'Report Parameter' , type :'inputField' ,  addRowType: 'select', option:
                [
                    // { key: '37', value: 'Program Name Filter' },
                ]
        },
    ];

    static readonly USER_REPORT_DATA: any[] = [
        { key: 'bills', value: 'Bills Values' },
        { key: 'elecHeatMap', value: 'Electric Heat Map' },
        { key: 'elc_regression', value: 'Electric Regression Model' },
        { key: 'endUse', value: 'Energy by End Use' },
        { key: 'hourly', value: 'Hourly' },
        { key: 'hourlyExclHVAC', value: 'Hourly Details (excluding HVAC)' },
        { key: 'irrigationWksht', value: 'Irrigation Worksheet' },
        { key: 'monthlyEnergy', value: 'Monthly Energy Data' },
        { key: 'ngHeatMap', value: 'Natural Gas Heat Map' },
        { key: 'ngProfile', value: 'Natural Gas Profile' },
        { key: 'newHourly', value: 'New Hourly' },
        { key: 'profile', value: 'Profile' },
        { key: 'progress', value: 'Progress' },
        { key: 'recentCSV', value: 'Recent CSV' },
        { key: 'recentTrends', value: 'Recent Trends' },
        { key: 'regression', value: 'Regression Model' },
        { key: 'snapshot', value: 'SnapShot' },
        { key: 'elecHeatMapPV', value: 'Solar PV Heat Map' },
        { key: 'trendingProfile" selected="selected', value: 'Trending Profile' },
        { key: 'userHistory', value: 'User History' },
        { key: 'waterHeatMap', value: 'Water Heat Map' },
        { key: 'waterProfile', value: 'Water Profile' },
        { key: 'waterProgress', value: 'Water Progress' },
    ];

    static readonly BASE_ENTITIES : Array<any> = [
        { key : 'customer' , value: 'Customer list' }   
    ]

    static readonly ATTRIBUTE_TYPE_DATA: any[] = [
        { key: 'C', value: 'Only Column' },
        { key: 'S', value: 'Script Calculation' },
        { key: 'V', value: 'Variable' },
        { key: 'A', value: 'Alerts' },
        { key: 'E', value: 'Events' },
        { key: 'N', value: 'Notes' },
        { key: 'D', value: 'Customer Files' },
    ];

    static readonly DEFINITION_DATA: any[] = [
        { key: 'customerId', value: 'Customer ID' },
        { key: 'userId', value: 'User ID' },
        { key: 'auditId" selected="selected', value: 'Audit ID' },
        { key: 'activationDate', value: 'Activation Date' },
        { key: 'registrationDate', value: 'Registration Date' },
        { key: 'staffPermission', value: 'Staff Permission' },
        { key: 'findReason', value: 'Find Reason' },
        { key: 'phoneNumber', value: 'Phone Number' },
        { key: 'placeCode', value: 'Place Code' },
        { key: 'city', value: 'City' },
        { key: 'postalCode', value: 'Postal Code' },
        { key: 'state', value: 'Sate' },
        { key: 'street1', value: 'Street' },
        { key: 'pgeAgreementSigned', value: 'PG&amp;E' },
        { key: 'pgeAddress', value: 'PG&amp;E Address' },
        { key: 'pgeHasPool', value: 'Has Pool' },
        { key: 'solarPvInstalled', value: 'Solar PV' },
        { key: 'calWaterAccount', value: 'CalWater Account' },
        { key: 'purismaAccount', value: 'Purisma Account' },
        { key: 'zillowConstructionSQFT', value: 'Zillow, SQFT' },
        { key: 'zillowLotSize', value: 'Zillow, Lot Size' },
        { key: 'zillowYearBuilt', value: 'Zillow, Year Built' },
        { key: 'constructionSQFT', value: 'SQFT' },
        { key: 'lotSize', value: 'Lot Size' },
        { key: 'yearBuilt', value: 'Year Built' },
        { key: 'permissionGranted', value: 'Permission Granted' },
        { key: 'livedMoreThan', value: 'Lived More Than' },
        { key: 'historyCollected', value: 'History Collected' },
        { key: 'constructionValidated', value: 'Construction Validated' },
        { key: 'optOutMail', value: 'Opt Out Mail' },
        { key: 'pgeBillDateDay', value: 'PG&amp;E Bill Date Day' },
        { key: 'notes', value: 'Notes' },
        { key: 'excludeFromReports', value: 'Exclude From Reports' },
        { key: 'ngHeatingModel', value: 'NG Heating Model' },
        { key: 'elCoolingModel', value: 'El Cooling Model' },
        { key: 'elHeatingModel', value: 'El Heating Model' },
        { key: 'eligibleStartDate', value: 'Eligible Start Date' },
        { key: 'latitude', value: 'Latitude' },
        { key: 'longitude', value: 'Longitude' },
        { key: 'maxAlertLevel', value: 'Alert level' },
        { key: 'coachUser.username', value: 'Coach Username' },
        { key: 'coachUser.email', value: 'Coach E-Mail' },
        { key: 'coachUser.staffPhoneNumber', value: 'Coach Phone' },
        { key: 'coachUser.status', value: 'Coach Status' },
        { key: 'coachUser.name', value: 'Coach' },
        { key: 'user.username', value: 'Username' },
        { key: 'user.email', value: 'E-Mail' },
        { key: 'user.status', value: 'Status' },
        { key: 'user.name', value: 'Name' },
        { key: 'user.comments', value: 'Comments' },
        { key: 'user.lastSuccessfulUtilityReadDate', value: 'Most recent utility data collection' },
        { key: 'customerGroup.groupCode', value: 'Group Code' },
        { key: 'customerGroup.groupName', value: 'Group Name' },
        { key: 'place.place', value: 'Place' },
        { key: 'place.placeName', value: 'Place Name' },
        { key: 'place.stationId', value: 'Station ID' },
        { key: 'place.timezone', value: 'Time Zone' },
        { key: 'programGroup.programCode', value: 'Program Code' },
        { key: 'programGroup.programName', value: 'Program Name' },
    ];

    static readonly REPORT_FORMATE: any[] = [
        { key: 'pdf', value: 'PDF' },
        { key: 'html', value: 'HTML' },
        { key: 'csv', value: 'CSV' },
        { key: 'xls', value: 'XLS' },
    ];

    static readonly TARGET: any[] = [
        { key: 'C', value: 'Customer' },
        { key: 'U', value: 'Staff' },
    ];

    static readonly ALERT_TYPE: any[] = [
        { key: 'L', value: 'On Login' },
        { key: 'S', value: 'Now' },
    ];

    static readonly ALERT_LEVEL_TYPE: any[] = [
        { key: '0', value: 'Informational' },
        { key: '5', value: 'Warning' },
        { key: '10', value: 'Error' },
    ];

    static readonly ELECTRIC_MODEL: any[] = [
        { key: '0', value: 'Auto' },
        { key: '11', value: 'Seasonal Model' },
        { key: '13', value: 'DailyCombined Model' },
    ];

    static readonly NATURAL_GAS_HEATING_MODEL: any[] = [
        { key: '0', value: 'Auto' },
        { key: '1', value: 'Seasonal Model' },
        { key: '3', value: '5-day MA Linear Regression Model' },
    ];

    static readonly SMART_METER_ELECTRIC_PERIOD: any[] = [
        { key: '1', value: 'One Hour' },
        { key: '2', value: '30 min' },
        { key: '4', value: '15 min' },
    ];

    static readonly UI_VERSION: any[] = [
        { key: '', value: '-'},
        { key: AppConstant.classicVersionSelectionValue, value: 'classic version' },
        { key: AppConstant.responsiveVersionSelectionValue, value: 'The new responsive version' },
    ];

    static readonly SCRIPT_DEBUG_EVENT: any[] = [
        { key: 'OPEN', value: 'Open' },
        { key: 'SAVE', value: 'Save' },
        { key: 'INIT', value: 'Initialization' },
        { key: 'RECALCULATE', value: 'Recalculate' },
        { key: 'RECALCULATE_AFTER_RESCRAPE', value: 'Recalculate after re-scrape' },
        { key: 'VALIDATE', value: 'Validate' },
        { key: 'PERIOD', value: 'Periodically' },
    ];

    static readonly JS_PAGE_TEMPLATE: any[] = [
        { key: 'jsPageWithoutTemplate', value: 'JS Page Without Template' },
        { key: 'jsPageWithRightMenu', value: 'JS Page With Right Menu' },
        { key: 'jsPageWithoutMenu', value: 'JS Page Without Menu' },
    ];

    static readonly JS_PAGE_GROUP: any[] = [
        { key: 'A', value: 'Allow All' },
        { key: 'W', value: 'Allow All with waring' },
        { key: 'S', value: 'Select single value' },
    ];

    static readonly RECORD_TYPE: any[] = [
        { key: 'U', value: 'Update' },
        { key: 'I', value: 'New' },
        { key: 'E', value: 'Error' },
        { key: 'S', value: 'Start' },
        { key: 'F', value: 'Finish' },
    ];

    static readonly SOURCE_TYPE: any[] = [
        { key: 'CUST', value: 'By Customer' },
        { key: 'REG', value: 'By Registration' },
    ];

    static readonly TOOL_TYPE: any[] = [
        { key: 'jschart', value: 'Free JS Charts' },
        { key: 'jfreechart', value: 'jFreeChart' },
        { key: 'jqplot', value: 'jqPlot' },
    ];

    static readonly CHART_TYPE: any[] = [
        { key: 'area', value: 'Area chart' },
        { key: 'bar', value: 'Bar category chart' },
        { key: 'line', value: 'Line category chart' },
        { key: 'pie', value: 'Pie chart' },
        { key: 'stackedArea', value: 'Stacked area category chart' },
        { key: 'stackedBar', value: 'Stacked bar category chart' },
        { key: 'timeSeries', value: 'Time series chart' },
    ];

    static readonly FONT_STYLE: any[] = [
        { key: '0', value: 'Plain' },
        { key: '1', value: 'Bold' },
        { key: '2', value: 'Italic' },
        { key: '3', value: 'Bold/Italic' },
    ];

    static readonly LOCATION: any[] = [
        { key: 'nw', value: 'Top/Right' },
        { key: 'n', value: 'Top' },
        { key: 'ne', value: 'Top/Left' },
        { key: 'e', value: 'Left' },
        { key: 'se', value: 'Bottom/Left' },
        { key: 's', value: 'Bottom' },
        { key: 'sw', value: 'Bottom/Right' },
        { key: 'w', value: 'Right' },
    ];

    static readonly RESOURCE_USE: any[] = [
        { key: 'hhe', value: 'Household Energy' },
        { key: 'electricity', value: 'Electricity Only' },
        { key: 'naturalGas', value: 'Natural Gas Only' },
        { key: 'water', value: 'Water' },
        { key: 'ghg', value: 'GHG' },
    ];


    static readonly UNIT_TYPE: any[] = [
        { key: 'cost', value: 'Cost' },
        { key: 'use', value: 'Use' },
    ];

    static readonly USE_TYPE: any[] = [
        { key: 'airTravel', value: 'Air Travel' },
        { key: 'all', value: 'All Loads' },
        { key: 'allSources', value: 'All Sources' },
        { key: 'baseLoads', value: 'Always on' },
        { key: 'carTravel', value: 'Car Travel' },
        { key: 'electricity', value: 'Electricity' },
        { key: 'indoorWater', value: 'Indoor Water' },
        { key: 'naturalGas', value: 'Natural Gas' },
        { key: 'outdoorWater', value: 'Outdoor Water' },
        { key: 'recurring', value: 'Recurring' },
        { key: 'summerCooling', value: 'Summer Cooling' },
        { key: 'variable', value: 'Variable' },
        { key: 'water', value: 'Water' },
        { key: 'winterSpaceHeating', value: 'Winter Space Heating' },
    ];

    static readonly SERIES_QUERY_TYPE: any[] = [
        { key: 'javaScript', value: 'JavaScript' },
        { key: 'spel', value: 'SpEL' },
        { key: 'sql', value: 'SQL' },
        { key: 'webharvest', value: 'WebHarvest script' },
    ];

    static readonly FORMAT_TYPE: any[] = [
        { key: 'N', value: 'Number' },
        { key: 'C', value: 'String' },
        { key: 'D', value: 'Date' },
    ];

    static readonly NEXT_PANE_SECTION: any[] = [
        { key: '323', value: 'Explanation (sp_explainItCEC)' },
        { key: '379', value: 'Explanation (sp_explainItCW)' },
        { key: '391', value: 'Explanation (sp_explainItPending)' },
    ];

    static readonly RECOMMENDATION_LEAK_TYPE: any[] = [
        { key: '2', value: 'Leaks' },
        { key: '3', value: 'Recommendations' },
        { key: '1', value: 'Unique' },
    ];

    static readonly ACTION_TYPE: any[] = [
        { key: 'installation', value: 'Installation' },
        { key: 'habit', value: 'Habit' },
        { key: 'other', value: 'Other' },
    ];

    static readonly PRICE_CALCULATION_TYPE: any[] = [
        { key: 'F', value: 'By formula' },
        { key: 'P', value: 'Percent from Leak value' },
    ];

    static readonly IMAGE_LIST: any[] = [
        { key: 'leakghg.png', value: 'CO2' },
        { key: 'leakdiscovery.png', value: 'Discovery' },
        { key: 'leakelectric.png', value: 'Electric' },
        { key: 'leakgas.png', value: 'Gas' },
        { key: 'leakwater.png', value: 'Water' },

    ];

    static readonly ICON_LIST: any[] = [
        { key: 'leakghg-mini.png', value: 'CO2' },
        { key: 'leakdiscovery-mini.png', value: 'Discovery' },
        { key: 'leakelectric-mini.png', value: 'Electric' },
        { key: 'leakgas-mini.png', value: 'Gas' },
        { key: 'leakwater-mini.png', value: 'Water' },
    ];

    static readonly CALCULATION_PERIOD: any[] = [
        { key: 'B', value: 'After new bill' },
        { key: 'E', value: 'After new Electric bill' },
        { key: 'G', value: 'After new Gas bill' },
        { key: 'V', value: 'After new Water bill' },
        { key: 'A', value: 'Always' },
        { key: 'D', value: 'Daily' },
        { key: 'M', value: 'Monthly' },
        { key: 'W', value: 'Weekly' },
        { key: 'Y', value: 'Year' },
    ];

    static readonly TOPIC_SOURCE_TYPE: any[] = [
        { key: 'pge', value: 'PGE' },
        { key: 'system', value: 'System' },
        { key: 'user', value: 'User' },
        { key: 'zillow', value: 'Zillow' },
    ];

    static readonly DATA_TYPE: any[] = [
        { key: 'boolean', value: 'Boolean' },
        { key: 'datetime', value: 'DateTime' },
        { key: 'number', value: 'Number' },
        { key: 'text', value: 'Text' },
    ];

    static readonly CALCULATION_EVENT_TYPE: any[] = [
        { key: 'always', value: 'Always' },
        { key: 'open', value: 'On Pane open' },
        { key: 'save', value: 'On Pane save' },
        { key: 'once', value: 'Only once' },
        { key: 'period', value: 'Period' },
    ];

    static readonly VALUE_TYPE: any[] = [
        { key: 'C', value: 'String' },
        { key: 'N', value: 'Number' },
    ];

}

