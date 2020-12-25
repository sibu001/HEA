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
        { key: 'script', displayName: 'Scripts' }
    ];

    static readonly CUSTOMER_ALERT_TYPE_COLUMN_DATA: Array<TABLECOLUMN> = [
        { key: 'alertCode', displayName: 'Alert Code', sort: 'alertCode', isEdit: true },
        { key: 'alertName', displayName: 'Alert Name', sort: 'alertName' },
        { key: 'note', displayName: 'Note', sort: 'note' },
    ];

    static readonly PLACE_KEY: Array<TABLECOLUMN> = [
        { key: 'place', displayName: 'Place Code' },
        { key: 'placeName', displayName: 'Place Name' },
    ];

    static readonly PROGRAM_GROUP_KEY: Array<TABLECOLUMN> = [
        { key: 'programCode', displayName: 'Program Code', isId: true },
        { key: 'programName', displayName: 'Program Name' },
    ];

    static readonly CUSTOMER_CREDENTIAL_KEY: Array<TABLECOLUMN> = [
        { key: 'credentialType', displayName: 'Credential Type', isEdit: true },
        { key: 'active', displayName: 'Active', type: 'image', isEdit: true },
        { key: 'login', displayName: 'Login' },
        { key: 'password', displayName: 'Password' },
        { key: 'dataInUse', displayName: 'Customer Data', type: 'image' },
        { key: 'utilityInUse', displayName: 'Utility Data', type: 'image' },
        { key: 'electricityInUse', displayName: 'Electricity', type: 'image' },
        { key: 'heatingInUse', displayName: 'Heating', type: 'image' },
        { key: 'waterInUse', displayName: 'Water', type: 'image' },
        { key: 'lastSuccessfulUsageDate', displayName: 'Last Usage' },
        { key: 'authorizationStartDate', displayName: 'Auth Start Date' },
        { key: 'authorizationEndDate', displayName: 'Auth End Date' },
        { key: 'authorizationStatus', displayName: 'Auth Status' }
    ];

    static readonly CUSTOMER_ALERT_KEY: Array<TABLECOLUMN> = [
        { key: 'customerAlertType', displayName: 'Customer Alert Type', isEdit: true },
        { key: 'alertLevels', displayName: 'Alert Level' },
        { key: 'note', displayName: 'Notes' }
    ];

    static readonly CUSTOMER_EVENT_KEY: Array<TABLECOLUMN> = [
        { key: 'eventType', displayName: 'Event Type', isEdit: true },
        { key: 'eventDatetime', displayName: 'Event Date', isDate: true },
        { key: 'description', displayName: 'Note' },
        { key: 'linkedPersonName', displayName: 'Author' }
    ];

    static readonly CUSTOMER_STAFF_KEY: Array<TABLECOLUMN> = [
        { key: 'staff', displayName: 'Staff', isEdit: true },
        { key: 'noteDate', displayName: 'Date', isDate: true },
        { key: 'note', displayName: 'Note' }
    ];

    static readonly CUSTOMER_FILE_KEY: Array<TABLECOLUMN> = [
        { key: 'name', displayName: 'File Name' },
        { key: 'timestamp', displayName: 'Time Stamp' },
        { key: 'description', displayName: 'Description', type: 'textArea' },
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

    static readonly ROLE_KEY: Array<TABLECOLUMN> = [
        { displayName: 'Role Code', key: 'roleCode', isEdit: true },
        { displayName: 'Permanent', key: 'permanent' },
        { displayName: 'Description', key: 'description' }
    ];

    static readonly ROLE_KEY_FOR_STAFF: Array<TABLECOLUMN> = [
        { displayName: 'Role Code', key: 'roleCode'},
        { displayName: 'Description', key: 'description' }
    ];

    static readonly PLACE_LIST_KEY: Array<TABLECOLUMN> = [
        { displayName: 'Place', sort: 'place', key: 'place', isEdit: true },
        { displayName: 'Place Name', sort: 'placeName', key: 'placeName' },
        { displayName: 'Weather Station', key: 'stationId' }
    ];

    static readonly ZIP_CODE_KEY: Array<TABLECOLUMN> = [
        { displayName: 'Zip Code', key: 'zipCode' },
        { displayName: 'Description', key: 'stationId' }
    ];


    static readonly CUSTOMER_EVENT_TYPE_COLUMN_DATA: Array<TABLECOLUMN> = [
        { displayName: 'Event Code', key: 'eventCode', sort: 'eventCode', isEdit: true },
        { displayName: 'Event Name', key: 'eventName', sort: 'eventName' },
        { displayName: 'Shared', key: 'shared', sort: 'shared' },
        { displayName: 'Only One', key: 'onlyOne', sort: 'onlyOne' }
    ];

    static readonly CUSTOMER_COMPARISON_GROUP_COLUMN_DATA: Array<TABLECOLUMN> = [
        { key: 'serialNumber', displayName: '#' },
        { displayName: 'Comparison Code', key: 'comparisonCode', sort: 'comparisonCode' },
        { displayName: 'Group Name', key: 'groupName', sort: 'groupName', isEdit: true },
        { displayName: 'Order', key: 'orderNumber', sort: 'orderNumber' },
        { displayName: 'Weather Station', key: 'weatherStationId', sort: 'weatherStationId' },
        { displayName: 'Costumers', key: 'numOfCustomers' },

    ];

    static readonly COMPARISON_CODE_DROPDOWN_DATA: Array<any> = [
        { key: 'Cooling', value: 'Cooling Load' },
        { key: 'BaseElectric', value: 'Electric Always on' },
        { key: 'HeatingElectric', value: 'Electric Heating Load' },
        { key: 'VariableElectric', value: 'Electric Variable Load' },
        { key: 'BaseGas', value: 'Gas Always on' },
        { key: 'HeatingGas', value: 'Gas Heating Load' },
        { key: 'VariableGas', value: 'Gas Variable Load' },
        { key: 'IndoorWater', value: 'Indoor Water' },
        { key: 'IrrigationWater', value: 'Irrigation Water' },
        { key: 'Recurring', value: 'Recurring Load' },
    ];

    static readonly HOUSE_SIZE_DATA: Array<any> = [
        { key: 'LT_1750', value: '< 1750 sf' },
        { key: 'LT_3500', value: '> 1750 sf and < 3500 sf' },
        { key: 'GT_3500', value: '> 3500 sf' },
    ];

    static readonly HOUSE_TYPE_DATA: Array<any> = [
        { key: 'apartment', value: 'Apartment' },
        { key: 'condo', value: 'Condo or Townhouse' },
        { key: 'duplex', value: 'Duplex' },
        { key: 'mobile', value: 'Mobile Home' },
        { key: 'single', value: 'Single' },
    ];

    static readonly OCCUPANCY_DATA: Array<any> = [
        { key: 'ONE_OR_TWO', value: '2 or less' },
        { key: 'THREE_OR_FOUR', value: '3 or 4' },
        { key: 'FIVE_OR_MORE', value: '5+ persons' },
    ];

    static readonly YES_NO_DATA: Array<any> = [
        { key: 'Y', value: 'Yes' },
        { key: 'N', value: 'No' }
    ];


    static readonly LOT_SIZE_DATA: Array<any> = [
        { key: 'LT_DOT25_ACRE', value: '&lt; 0.25 acre' },
        { key: 'LT_DOT75_ACRE', value: '& gt; 0.25 and & lt; 0.75 acre' },
        { key: 'GT_DOT75_ACRE', value: '& gt; 0.75 acre' }
    ];

    static readonly FACTOR_KEY: Array<TABLECOLUMN> = [
        { key: 'serialNumber', displayName: '#' },
        { key: 'factorCode', sort: 'factorCode', displayName: 'Factor Code', isEdit: true },
        { key: 'place', sort: 'place', displayName: 'Place' },
        { key: 'year', sort: 'year', displayName: 'Year' },
        { key: 'factorName', sort: 'factorName', displayName: 'Name' },
        { key: 'value', sort: 'value', displayName: 'Value' }
    ];

    static readonly CALCULATION_TYPE: Array<any> = [
        { key: 'javascript', value: 'JavaScript' },
        { key: 'spel', value: 'SpEL', selected: true },
        { key: 'webharvest', value: 'WebHarvest script' },
    ];

    static readonly CUSTOMER_ALERT_TYPE: Array<any> = [
        { customerAlertTypeId: 1, name: 'Email address bouncing' },
        { customerAlertTypeId: 2, name: 'Problem with Energy Profile' },
        { customerAlertTypeId: 3, name: 'Moved out of home being monitored' },
        { customerAlertTypeId: 4, name: 'Opted In for Program Specific Survey' },
        { customerAlertTypeId: 5, name: 'Problem with utility account or utility data' },
        { customerAlertTypeId: 6, name: 'Unusually Short Utility Billing Month' },
        { customerAlertTypeId: 7, name: 'Problem with Heating or Cooling Regression Results' },
        { customerAlertTypeId: 8, name: 'Zero Variable Electric Load for one or more months' },
        { customerAlertTypeId: 9, name: 'Dr Power account' },
        { customerAlertTypeId: 10, name: 'Offline Authorization' },
        { customerAlertTypeId: 11, name: 'Cooling load was double counted and fixed' },
        { customerAlertTypeId: 12, name: 'Heating load was double counted and fixed' },
        { customerAlertTypeId: 13, name: '3rd party electric charges' },
        { customerAlertTypeId: 14, name: 'Other Space Heating Fuel?' },
        { customerAlertTypeId: 15, name: 'Other Water Heating Fuel ?' },
        { customerAlertTypeId: 16, name: 'Multiple homes under a single account' },
        { customerAlertTypeId: 16, name: 'Multiple services under a single account' },
    ];

    static readonly ALERT_LEVEL: Array<any> = [
        { alertLevel: 0, alertName: 'Green' },
        { alertLevel: 5, alertName: 'Yellow' },
        { alertLevel: 10, alertName: 'Red' },
    ];


    static readonly LOOKUP_KEYS: Array<TABLECOLUMN> = [
        { key: 'lookupCode', sort: 'lookupCode', displayName: 'Lookup Code', isEdit: true },
        { key: 'lookupName', sort: 'lookupName', displayName: 'Lookup Name' },
        { key: 'defaultValue', sort: 'defaultValue', displayName: 'Default Value' },
    ];

    static readonly LOOKUP_VALUE_KEYS: Array<TABLECOLUMN> = [
        { key: 'lookupValue', displayName: 'Lookup Value' },
        { key: 'valueName', displayName: 'Value Name' },
    ];

    static readonly SYSTEM_PARAMETER_KEYS: Array<TABLECOLUMN> = [
        { key: 'paramCode', sort: 'paramCode', displayName: 'Parameter Code', isEdit: true },
        { key: 'description', sort: 'description', displayName: 'Description' },
        { key: 'paramValue', sort: 'paramValue', displayName: 'Parameter Value' },
        { key: 'format', sort: 'format', displayName: 'Format' },
    ];

    static readonly WEATHER_STATION_KEYS: Array<TABLECOLUMN> = [
        { key: 'stationId', sort: 'stationId', displayName: 'Station Id', isEdit: true },
        { key: 'stationName', sort: 'stationName', displayName: 'Station Name' },
    ];

    static readonly LOGS_KEYS: Array<TABLECOLUMN> = [
        { key: 'serialNumber', displayName: '#' },
        { key: 'username', sort: 'username', displayName: 'Username' },
        { key: 'recordType', sort: 'recordType', displayName: 'Record Type' },
        { key: 'comment', sort: 'comment', displayName: 'Comment' },
        { key: 'entity', sort: 'entity', displayName: 'Entity' },
        { key: 'logDate', sort: 'logDate', displayName: 'Log Date', isDate: true }
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

    static readonly DEGREE_DAY_KEY: Array<TABLECOLUMN> = [
        { key: 'serialNumber', displayName: '#' },
        { key: 'stationId', sort: 'stationId', displayName: 'Station ID' },
        { key: 'type', sort: 'type', displayName: 'Type' },
        { key: 'createdDate', sort: 'createdDate', displayName: 'Date', isDate: true },
        { key: 'base', sort: 'base', displayName: 'Base Temprature' },
        { key: 'value', sort: 'value', displayName: 'Degree Days' },
    ];

    static readonly CIMIS_STATION_KEY: Array<TABLECOLUMN> = [
        { key: 'stationNbr', sort: 'stationNbr', displayName: 'Station Number', isEdit: true },
        { key: 'name', sort: 'name', displayName: 'Station Name' },
        { key: 'isActive', sort: 'isActive', displayName: 'Active?' }
    ];

    static readonly CIMIS_MEASUREMENTS_KEY: Array<TABLECOLUMN> = [
        { key: 'serialNumber', displayName: '#' },
        { key: 'stationNbr', sort: 'stationNbr', displayName: 'Station Number' },
        { key: 'cmDateTime', sort: 'cmDateTime', displayName: 'Date' },
        { key: 'hour', sort: 'hour', displayName: 'Hour' },
        { key: 'irradiance', displayName: 'Irradiance' }
    ];

    static readonly TOPIC_DESCRIPTION_DATA: Array<any> = [
        { key: '33', value: 'Program Suspended' },
        { key: '9', value: 'User Profile' },
        { key: '34', value: 'Solar PV Info' },
        { key: '16', value: 'Home Profile' },
        { key: '25', value: 'Service Options' },
        { key: '10', value: 'Home Energy Profile' },
        { key: '26', value: 'Program Selector' },
        { key: '32', value: 'Leaks Intro' },
        { key: '27', value: 'Always on' },
        { key: '28', value: 'Variable' },
        { key: '29', value: 'Heating & amp; Cooling' },
        { key: '31', value: 'Recurring' },
        { key: '23', value: 'User Feedback' }
    ];

    static readonly BATCH_SCRIPT_KEY: Array<TABLECOLUMN> = [
        { key: 'batchName', sort: 'batchName', displayName: 'Batch Name' },
        { key: 'period', sort: 'period', displayName: 'Period' },
        { key: 'periodDay', sort: 'periodDay', displayName: 'Period Day' },
        { key: 'mailAddres', sort: 'mailAddres', displayName: 'Mail Address' },
        { key: 'dateLastExecuted', displayName: 'Date last Executed' }
    ];

    static readonly CUSTOMER_GROUP_KEY: Array<TABLECOLUMN> = [
        { key: 'groupCode', sort: 'groupCode', displayName: 'Group Code' },
        { key: 'groupName', sort: 'groupName', displayName: 'Group Name' },
    ];

    // Job name	Last fire time	Last Runtime	Next fire time	State
    static readonly SYSTEM_JOBS_KEY: Array<TABLECOLUMN> = [
        { key: 'jobName', displayName: 'Job name' },
        { key: 'lastFireTime', displayName: 'Last fire time' },
        { key: 'lastRuntime', displayName: 'Last Runtime' },
        { key: 'nextFireTime', displayName: 'Next fire time' },
        { key: 'state', displayName: 'State' },
        {
            key: 'buttons', displayName: '', type: 'buttons', buttonList: [
                { key: 'execute', name: 'Execute' },
                { key: 'Pause', name: 'pause' }
            ]
        },
    ];

    static readonly SYSTEM_THREAD_KEY: Array<TABLECOLUMN> = [
        { key: 'threadName', displayName: 'Thread name' },
        { key: 'cpuTime', displayName: 'CPU time' },
        { key: 'usertime', displayName: 'User Runtime' },
        { key: 'blw', displayName: 'bl/w' },
        {
            key: 'stackTrack', displayName: 'Stack Track', type: 'buttons', buttonList: [
                { key: 'stack', name: 'Stack' }
            ]
        }
    ];

    static readonly EC2_INSTANCE_KEY: Array<TABLECOLUMN> = [
        { key: 'Name', displayName: 'Name' },
        { key: 'instanceId', displayName: 'Instance ID' },
        { key: 'state', displayName: 'State' },
        { key: 'publicDNS', displayName: 'Public DNS' },
        { key: 'action', displayName: 'Action' },
    ];

    static readonly ALERT_MESSAGE_KEY: Array<TABLECOLUMN> = [
        { key: 'id', sort: 'id', displayName: 'Id', isEdit: true },
        { key: 'target', sort: 'target', displayName: 'Target', isEdit: true },
        { key: 'alertType', sort: 'alertType', displayName: 'Alert Type' },
        { key: 'alertLevel', sort: 'alertLevel', displayName: 'Alert Level' },
        { key: 'messageTemplate', sort: 'messageTemplate', displayName: 'Message' },
        { key: 'createdDate', sort: 'createdDate', displayName: 'Created Date', isDate: true },
        { key: 'active', displayName: 'Active', type: 'image' },
    ];

    static readonly TOPIC_DESCRIPTION_KEY: Array<TABLECOLUMN> = [
        { key: 'topicCode', sort: 'topicCode', displayName: 'Topic Code' },
        { key: 'topicLabel', sort: 'topicLabel', displayName: 'Topic Label' },
        { key: 'topicReportLabel', sort: 'topicReportLabel', displayName: 'Topic Report Label' },
        { key: 'active', displayName: 'Active' },
        { key: 'nextTopicCode', displayName: 'Next Topic Code' }
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

    static readonly TOPIC_PANE_KEY: Array<TABLECOLUMN> = [
        { key: 'paneCode', displayName: 'Pane Code' },
        { key: 'label', displayName: 'Label' },
        { key: 'orderNumber', displayName: 'Order Number' },
        { key: 'section', displayName: 'Section' },
        { key: 'isSection', displayName: 'Is Section' }
    ];

    static readonly RECOMMENDATION_KEY: Array<TABLECOLUMN> = [
        { key: 'Code', displayName: 'Code' },
        { key: 'type', displayName: 'Type' },
        { key: 'label', displayName: 'Label' },
    ];

    static readonly RECOMMENDATION_EDIT_KEY: Array<TABLECOLUMN> = [
        { key: 'Code', displayName: 'Code' },
        { key: 'label', displayName: 'Label' },
    ];

    static readonly TOPIC_VARIABLES_KEYS: Array<TABLECOLUMN> = [
        { key: 'field', displayName: 'Field' },
        { key: 'comments', displayName: 'Comments' },
        { key: 'calculationPeriod', displayName: 'Calculation Period' },
    ];


    static readonly PANE_DATA_BLOCK_KEY: Array<TABLECOLUMN> = [
        { key: 'blockCode', displayName: 'Block Code' },
        { key: 'orderNumber', displayName: 'Order Number' },
        { key: 'label', displayName: 'Label' },
        { key: 'isArray', displayName: 'Is Array' }
    ];

    static readonly PANE_DATA_FIELD_KEY: Array<TABLECOLUMN> = [
        { key: 'fieldCode', displayName: 'Field Code' },
        { key: 'orderNumber', displayName: 'Order Number' },
        { key: 'label', displayName: 'Label' },
    ];

    static readonly PANE_CHART_KEYS: Array<TABLECOLUMN> = [
        { key: 'chartCode', displayName: 'Chart Code' },
        { key: 'orderNumber', displayName: 'Order Number' },
        { key: 'chartTitle', displayName: 'Chart Title' },
    ];

    static readonly CHART_SERIES_FIELD_KEY: Array<TABLECOLUMN> = [
        { key: 'seriesCode', displayName: 'Series Code' },
        { key: 'seriesName', displayName: 'Series Name' },
        { key: 'orderNumber', displayName: 'Order Number' },
        { key: 'seriesColor', displayName: 'Series Color' },
        { key: 'seriesStrokeWidth', displayName: 'Series Stroke Width' },
    ];

    static readonly PANE_REPORT_KEYS: Array<TABLECOLUMN> = [
        { key: 'reportCode', displayName: 'Report Code' },
        { key: 'reportLabel', displayName: 'Report Label' },
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
            key: 'dataField', displayName: 'Data Field', addRowType: 'select', option:
                [
                    { key: '1246', value: 'Do you have a solar PV system at your home?&nbsp;(pv_ConfirmPV)' },
                    { key: '1248', value: 'Install date&nbsp;(pv_InstallDate)' },
                    { key: '1249', value: 'System size, in rated kW&nbsp;(pv_Size)' },
                    { key: '1250', value: 'Orientation&nbsp;(pv_Orientation)' },
                    { key: '1251', value: 'Shading&nbsp;(pv_Shading)' },
                    { key: '1271', value: 'Order SV Recalculation&nbsp;(pv_OrderSVRecalculation)' },
                    { key: '1254', value: 'Date Installed&nbsp;(pv_InstallGroup.pv_InstallGroupDate)' },
                    { key: '1255', value: 'Total System Size (kW)&nbsp;(pv_InstallGroup.pv_installGroupSize)' },
                    { key: '1256', value: 'Orientation&nbsp;(pv_InstallGroup.pv_InstallGroupOrientation)' },
                    { key: '1257', value: 'Shading&nbsp;(pv_InstallGroup.pv_installGroupShading)' },
                    { key: '1272', value: 'Annual derating factor (%)&nbsp;(pv_InstallGroup.pv_installGroupADF)' },
                    { key: '1258', value: 'Start of Outage&nbsp;(pv_OutageGroup.pv_OutageGroupStart)' },
                    { key: '1263', value: 'End of Outage&nbsp;(pv_OutageGroup.pv_OutageGroupEnd)' },
                    { key: '1267', value: 'UpdatePVOutputCallAllowed&nbsp;(pv_UpdatePVOutputCallAllowed)' },
                    { key: '1266', value: 'Call UpdatePVOutput&nbsp;(pv_UpdatePVOutput)' },
                    { key: '1268', value: 'UpdatePVOutputOnSave&nbsp;(pv_UpdatePVOutputOnSave)' },
                    { key: '1273', value: 'Percent of hourly values above idle load&nbsp;(pv_PctOverIdleLoad)' },
                    { key: '1275', value: 'Electric use came from the Sun&nbsp;(pv_electricUseFromSun)' },
                    { key: '1276', value: '12 months Electric Savings&nbsp;(pv_12mElectricSavings)' },
                    { key: '1259', value: 'Do you have a log of your PV system\'s generation on an hourly basis?&nbsp;(pv_hasHourlyLog)' },
                    {
                        key: '1260',
                        value: `Would you like to compare our estimate to your system log for a particular day
                        in the past?&nbsp;(pv_CompareToSystemLog)`
                    },
                    { key: '1261', value: 'Which day would you like to compare?&nbsp;(pv_CompareDate)' },
                    { key: '1262', value: 'Enter total logged PV output for this day:&nbsp;(pv_DailyOutputFromLog)' },
                    { key: '1269', value: 'Estimated daily PV system output&nbsp;(pv_PVDayOutput_kWh)' },
                    { key: '1270', value: 'Estimation difference&nbsp;(pv_EstimationDiff)' },
                    {
                        key: '1264',
                        value: `Do you have a whole-home battery that is used to shift electric loads from
                        hour to hour?&nbsp;(pv_hasWholeHomeBattery)`
                    },
                    {
                        key: '1265',
                        value: `Is your battery also used to shift electric loads more than two days?& nbsp;
                        (pv_IsBatteryUsedToShiftLoads)`
                    },
                    { key: '1274', value: 'Recalc SVs&nbsp;(pv_RecalcSVOnSave)' },
                ]
        },
        {
            key: 'reportParameter', displayName: 'Report Parameter', addRowType: 'select', option:
                [
                    { key: '37', value: 'Program Name Filter' },
                ]
        },
    ];

    static readonly STAFF_TABLE_COLUMN: Array<TABLECOLUMN> = [
        { key: 'username', sort: 'username', displayName: 'Username', isEdit: true },
        { key: 'email', sort: 'email', displayName: 'E-mail' },
        { key: 'status', displayName: 'Status' },
        { key: 'name', displayName: 'Name' },
        { key: 'createdDate', sort: 'createdDate', displayName: 'Join Data', isDate: true },
    ];

    static readonly SURVEY_VERSION_SETTING_DATA: Array<any> = [
        { id: '0', name: 'Show button on survey panes' },
        { id: '1', name: 'Always use new Panes' },
        { id: '2', name: 'Always use old Panes' }
    ];

    static readonly TOPIC_GROUP_COLUMN_DATA: Array<TABLECOLUMN> = [
        { key: 'groupCode', displayName: 'Group Code' },
        { key: 'groupName', displayName: 'Group Name' },
    ];

    static readonly TOPIC_KEYS: Array<TABLECOLUMN> = [
        { key: 'label', sort: 'label', displayName: 'Label', isEdit: true },
        { key: 'user', displayName: 'User' },
        { key: 'group', displayName: 'Group' },
        { key: 'startDate', sort: 'startDate', displayName: 'Start Date' },
        { key: 'modifiedDate', sort: 'modifiedDate', displayName: 'Modified Date' },
        { key: 'completedDate', sort: 'completedDate', displayName: 'Completed Date' },
    ];

    static readonly ADMIN_REPORT_KEYS: Array<TABLECOLUMN> = [
        { key: 'reportName', sort: 'reportLabel', displayName: 'Report Name', isEdit: true },
        { key: 'reportLabel', sort: 'reportLabel', displayName: 'Report Label' },
        { key: 'reportType', displayName: 'Report Type' },
        { key: 'embeddedReport', displayName: 'Embedded Report' },
        { key: 'callReport', displayName: '', type: 'image', imagePath: 'assets/images/ico_pdf.gif', event: 'callReport' },
    ];

    static readonly ADMIN_REPORT_PARAMETER_KEYS: Array<TABLECOLUMN> = [
        { key: 'parameterName', displayName: 'Parameter Name' },
        { key: 'defaultValue', displayName: 'Default Value' },
        { key: 'parameterLabel', displayName: 'Parameter Label' },
    ];

    static readonly EVENT_HISTORY_KEYS: Array<TABLECOLUMN> = [
        { key: 'customer', sort: 'customer', displayName: 'customer', isEdit: true },
        { key: 'eventCode', sort: 'eventCode', displayName: 'Event Code' },
        { key: 'eventName', displayName: 'Event Name' },
        { key: 'date', displayName: 'Date' },
        { key: 'author', displayName: 'Author' },
    ];
    static readonly CUSTOMER_EVENT_TYPE: Array<any> = [
        {
            id: '1',
            code: '',
            name: 'Assigned to High Heating or Cooling Program Group'
        },
        {
            id: '2',
            code: '',
            name: 'Assign to High Plug Loads Program Group'
        },
        {
            id: '3',
            code: '',
            name: 'Assigned to High Heating/Cooling Loads Program Group'
        },
        {
            id: '5',
            code: '',
            name: 'New real-time energy monitor was installed'
        },
        {
            id: '6',
            code: '',
            name: 'Completed a home energy consultation with an expert'
        },
        {
            id: '9',
            code: '',
            name: 'Started charging an electric vehicle at home'
        },
        {
            id: '10',
            code: '',
            name: 'Started charging an electric vehicle (sub-metered)'
        },
        {
            id: '11',
            code: '',
            name: 'Added, removed or updated a major appliance'
        },
        { id: '12', code: '', name: 'Change in average home occupancy' },
        { id: '13', code: '', name: 'Significant home remodel or retrofit' },
        {
            id: '14',
            code: '',
            name: 'Completed a simple Energy Efficiency measure'
        },
        { id: '15', code: '', name: 'Change in behavior affecting energy use' },
        {
            id: '16',
            code: '',
            name: 'Unassigned from High Heating/Cooling Loads Program Group'
        },
        {
            id: '17',
            code: '',
            name: 'Unassigned from High Plug Loads Program Group'
        },
        {
            id: '18',
            code: '',
            name: 'Unassigned from High Heating/Cooling Loads Program Group'
        },
        {
            id: '19',
            code: '',
            name: 'Assigned to High Variable Loads Program Group'
        },
        {
            id: '20',
            code: '',
            name: 'Unassigned from High Variable Loads Program Group'
        },
        {
            id: '21',
            code: '',
            name: 'Completed initial Home Energy Profile for EUMV'
        },
        {
            id: '22',
            code: '',
            name: 'Completed online smart meter audit for EUMV'
        },
        {
            id: '23',
            code: '',
            name: 'Assigned to High Recurring Loads Program Group'
        },
        {
            id: '24',
            code: '',
            name: 'Unassigned from High Recurring Loads Program Group'
        },
        { id: '25', code: '', name: 'Assigned to Low Energy Program Group' },
        {
            id: '26',
            code: '',
            name: 'Unassigned from Low Energy Program Group'
        },
        {
            id: '27',
            code: '',
            name: 'Assigned to Detailed Online Audit Program'
        },
        { id: '28', code: '', name: 'Unassigned from Online Program' },
        { id: '29', code: '', name: 'Temporary increase in energy use' },
        {
            id: '30',
            code: '',
            name: 'Solar PV system installed and generating electricity'
        },
        { id: '31', code: '', name: 'Problem with Energy Profile Detected' },
        { id: '32', code: '', name: 'Problem with Energy Profile now fixed' },
        { id: '33', code: '', name: 'Moved to a new home' },
        {
            id: '34',
            code: '',
            name: 'Opt-in for optional Program-specific Survey'
        },
        { id: '36', code: '', name: 'Received an energy saving device' },
        {
            id: '39',
            code: '',
            name: 'Air conditioning optimizer installed by home professional'
        },
        {
            id: '40',
            code: '',
            name: 'In-home energy audit performed by professional'
        },
        { id: '41', code: '', name: 'Account specific notes' },
        {
            id: '42',
            code: '',
            name: 'Double-countedrecurring or base load detected and fixed'
        },
        {
            id: '43',
            code: '',
            name: 'Double-counted recurring or base load detected and fixed'
        },
        { id: '44', code: '', name: 'Enrolled into P4P Program' },
        { id: '45', code: '', name: 'Removed from P4P Program' },
        { id: '46', code: '', name: 'Determined Eligible for P4P Program' },
        { id: '47', code: '', name: 'Temporary decrease in energy use' },
        {
            id: '48',
            code: '',
            name: 'Stopped charging an electric vehicle at home'
        },
        { id: '49', code: '', name: 'Determined  ineligible for P4P Program' },
        { id: '50', code: '', name: 'Applied for Peninsula Climate Comfort' },
        {
            id: '51',
            code: '',
            name: 'Completion  date for Home Energy Profile topic'
        },
        {
            id: '52',
            code: '',
            name: 'Enrolled into P4P Program as Metered Reserve'
        },
        { id: '53', code: '', name: 'Log of miscellaneous Coaching Activity' }
    ];

    static readonly PROSPECTS_KEY: Array<TABLECOLUMN> = [
        { key: 'registrationId', sort: 'registrationId', displayName: 'ID' },
        { key: 'program', sort: 'program', displayName: 'Program' },
        { key: 'name', sort: 'name', displayName: 'Name' },
        { key: 'field6', sort: 'field6', displayName: 'Page' },
        { key: 'email', sort: 'email', displayName: 'Email' },
        { key: 'coachUserId', sort: 'coachUserId', displayName: 'CoachID' },
        { key: 'createdDate', sort: 'createdDate', displayName: 'Date', isDate: true },
        { key: 'optOutMail', sort: 'optOutMail', displayName: 'Opt Out Mail', isDate: true }
    ];

    static readonly MAIL_DESC_KEYS: Array<TABLECOLUMN> = [
        { key: 'id', sort: 'id', displayName: 'ID' },
        { key: 'mailName', sort: 'mailName', displayName: 'Mail Name', isEdit: true },
        { key: 'mailPeriod', sort: 'mailPeriod', displayName: 'Period', isEdit: true },
        { key: 'periodDayRule', sort: 'periodDayRule', displayName: 'Period Day' },
        { key: 'lastMaxProcessedTime', sort: 'lastMaxProcessedTime', displayName: 'Runtime' },
        { key: 'subjectTemplate', sort: 'subjectTemplate', displayName: 'Subject' },
    ];

    static readonly CONTENT_PART_KEYS: Array<TABLECOLUMN> = [
        { key: 'label', displayName: 'Label', isEdit: true },
        { key: 'order', displayName: 'Order' },
        { key: 'contentFilter', displayName: 'Content Filter' },
    ];

    static readonly VARIABLE_KEYS: Array<TABLECOLUMN> = [
        { key: 'fieldCode', displayName: 'Field Code', isEdit: true },
        { key: 'order', displayName: 'Order' },
        { key: 'calculationRule', displayName: 'Calculation Rule' },
    ];

    static readonly PERIOD_DATA: any[] = [
        { key: 'D', value: 'Daily' },
        { key: 'M', value: 'Monthly' },
        { key: 'N', value: 'None' },
        { key: 'S', value: 'Single' },
        { key: 'W', value: 'Weekly' },
        { key: 'Y', value: 'Year' },
    ];


    static readonly CUSTOMER_GROUP_MAIL_PART_KEYS: Array<TABLECOLUMN> = [
        { key: 'customerGroupName', sort: 'customerGroupName', displayName: 'customerGroupName' },
        { key: 'header', displayName: 'Header', isEdit: true },
        { key: 'footer', displayName: 'Footer', isEdit: true },
    ];

    static readonly MAIL_TYPE: any[] = [
        { key: '3', value: 'For Testing' },
        { key: '4', value: 'Monthly Home Energy Report' },
        { key: '5', value: 'Monthly Tips (first year)' },
        { key: '6', value: 'Not forgotten 1' },
        { key: '7', value: 'Not forgotten 2' },
        { key: '8', value: 'Winterize pool' },
        { key: '9', value: 'CG1 Release' },
        { key: '10', value: 'CGO Release' },
        { key: '11', value: 'PG&amp;E Transition' },
        { key: '12', value: 'Never Activated' },
        { key: '13', value: 'Didn\'t finish HEP' },
        { key: '14', value: 'Changed PW?' },
        { key: '15', value: 'Atta boy!' },
        { key: '16', value: 'What up?' },
        { key: '17', value: 'Declined HC/PM' },
        { key: '18', value: 'EUMV Extended' },
        { key: '19', value: 'VEIC Welcome' },
        { key: '20', value: 'Spam Filter Test' },
        { key: '21', value: 'New customer activation mail' },
        { key: '22', value: 'Repeated activation mail' },
        { key: '23', value: 'Recommendations Reminder' },
        { key: '28', value: 'Welcome to EUMV2' },
        { key: '30', value: 'Forgot Password' },
        { key: '31', value: 'New Recommendation' },
        { key: '32', value: 'E-Mail Changed' },
        { key: '33', value: 'Registration Errors' },
        { key: '34', value: 'Alameda HEA Announcement' },
        { key: '35', value: 'pie chart test' },
        { key: '36', value: 'SnapShot' },
        { key: '37', value: 'Alameda Activation Offer' },
        { key: '38', value: 'Registrations Not Working' },
        { key: '39', value: 'HETU Phone Consult Confirmation' },
        { key: '40', value: 'HETU Phone Consult Reminder' },
        { key: '41', value: 'High Load Alert (similar homes)' },
        { key: '42', value: 'HAAS Pricing Survey' },
        { key: '43', value: 'Spam Test (Water)' },
        { key: '44', value: 'Forgot Password (Water)' },
        { key: '45', value: 'Registration Errors (Water)' },
        { key: '46', value: 'Never Activated (Water)' },
        { key: '47', value: 'Monthly Water Report' },
        { key: '48', value: 'Didn\'t finish Water' },
        { key: '49', value: 'New water activation mail' },
        { key: '50', value: 'Credit card problem' },
        { key: '51', value: 'Water leak alert' },
        { key: '52', value: 'OhmConnect DR Offer' },
        { key: '53', value: 'New EF customer activation' },
        { key: '54', value: 'RYPL intro message' },
        { key: '55', value: 'RYPL Utility Link Instructions' },
        { key: '57', value: 'RYPL Increased Idle Load' },
        { key: '58', value: 'RYPL Decreased Idle Load' },
        { key: '59', value: 'RYPL Generic Template' },
        { key: '60', value: 'RYPL Utility Link Instructions - OLD 2017-04-09' },
        { key: '61', value: 'RYPL PLDB Update' },
        { key: '62', value: 'RYPL Try Dr Power' },
        { key: '63', value: 'Prereg Reminder' },
        { key: '64', value: 'RYPL Spam Test' },
        { key: '65', value: 'RYPL New Customer Activation' },
        { key: '66', value: 'RYPL Registration Errors' },
        { key: '67', value: 'RYPL Password Reset' },
        { key: '68', value: 'Energy Coach Introduction' },
        { key: '69', value: 'Enrolled in P4P notification' },
        { key: '70', value: 'Increased electric use alert' },
        { key: '71', value: 'Group E - Inactive, Unqualified - App Intro' },
        { key: '72', value: 'Group A - Active, Open Emails, High Idle' },
        { key: '73', value: 'Group D - Active, Dont Open Emails' },
        { key: '74', value: 'Group B - Active, Open Email, Low Idle, High Bill' },
        { key: '75', value: 'Group C - Active, Open Emails, Low Idle, Low Bill' },
        { key: '76', value: 'Increased natural gas use alert' },
        { key: '77', value: 'Sunnyvale Migration to HI' },
        { key: '81', value: 'Migration to SMD' },
        { key: '82', value: 'RYPL Try HomeIntel' },
        { key: '83', value: 'Authorization about to expire' },
        { key: '85', value: 'COVID Energy Alert' },
        { key: '86', value: 'Pre-reg shelter-in-place msg' },
        { key: '87', value: 'NextDoor Yelp testimonial request' },
    ];

    static readonly USER_REPORTS_KEYS: Array<TABLECOLUMN> = [
        { key: 'order', displayName: 'Order' },
        { key: 'reportType', displayName: 'Report Type' },
        { key: 'displayLabel', sort: 'displayLabel', displayName: 'Display Label', isEdit: true },
        { key: 'label', sort: 'label', displayName: 'Label', isEdit: true },
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
    static readonly JS_PAGES_KEYS: Array<TABLECOLUMN> = [
        { key: 'code', sort: 'code', displayName: 'Code', isEdit: true },
        { key: 'name', sort: 'name', displayName: 'Page Name' },
        { key: 'template', displayName: 'Template' },
        { key: 'showInMenu', displayName: 'Show In Menu' },
    ];

    static readonly VIEW_CONF_KEYS: Array<TABLECOLUMN> = [
        { key: 'name', sort: 'name', displayName: 'Name', isEdit: true },
        { key: 'username', sort: 'username', displayName: 'User Name' },
        { key: 'shared', displayName: 'Shared' },
        { key: 'baseEntity', displayName: 'Base Entity' },
        { key: 'attributes', displayName: '', type: 'link', links: [{ routerLink: '/admin/viewConfiguration/viewConfigurationAttributeList', displayName: 'Attributes', queryParam: {} }] },
    ];

    static readonly ATTRIBUTE_LIST_KEYS: Array<TABLECOLUMN> = [
        { key: 'columnOrder', sort: 'columnOrder', displayName: 'Column Order', isEdit: true },
        { key: 'definition', sort: 'definition', displayName: 'Definition' },
        { key: 'label', sort: 'label', displayName: 'Label' },
        { key: 'attributeType', sort: 'attributeType', displayName: 'Attribute Type' },
        { key: 'sortAllow', sort: 'sortAllow', displayName: 'Sort Allow' },
    ];

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

    static readonly TRENDING_PART_KEYS: Array<TABLECOLUMN> = [
        { key: 'label', sort: 'label', displayName: 'Label', isEdit: true },
        { key: 'orderNumber', sort: 'orderNumber', displayName: 'Order Number' },
        { key: 'explanation', sort: 'Explanation', displayName: 'Explanation' },
    ];

    static readonly TRENDING_CHART_KEYS: Array<TABLECOLUMN> = [
        { key: 'chartCode', displayName: 'Chart Code', isEdit: true },
        { key: 'orderNumber', displayName: 'Order Number' },
        { key: 'resourceUse', displayName: 'Resource Use' },
        { key: 'unitType ', displayName: 'Unit Type' },
        { key: 'useType', displayName: 'Use Type' },
    ];

    static readonly SUMMARY_CHART_KEYS: Array<TABLECOLUMN> = [
        { key: 'chartCode', sort: 'chartCode', displayName: 'Chart Code', isEdit: true },
        { key: 'orderNumber', sort: 'orderNumber', displayName: 'Order Number' },
        { key: 'resourceUse', displayName: 'Resource Use' },
        { key: 'unitType ', displayName: 'Unit Type' },
        { key: 'useType', displayName: 'Use Type' },
    ];
    static readonly DATA_SET_KEYS: Array<TABLECOLUMN> = [
        { key: 'queryParameter', displayName: 'Query Parameter', addRowType: 'text' },
        { key: 'calculationFormula', displayName: 'Calculation Formula', addRowType: 'textarea' },
    ];

    static readonly GAS_KEYS: Array<TABLECOLUMN> = [
        { key: 'year', sort: 'year', displayName: 'Year' },
        { key: 'month', sort: 'month', displayName: 'Month' },
        { key: 'billingPeriod', displayName: 'Billing Period' },
        { key: 'billingDate', displayName: 'Billing Date' },
        { key: 'value', displayName: 'Value' },
    ];

    static readonly SMART_METER_KEYS: Array<TABLECOLUMN> = [
        { key: 'year', sort: 'year', displayName: 'Year' },
        { key: 'month', sort: 'month', displayName: 'Month' },
        { key: 'day', sort: 'day', displayName: 'Day' },
        { key: 'hour', sort: 'hour', displayName: 'Hour' },
        { key: 'value', displayName: 'Value' },
    ];

    static readonly SMART_METER_DAILY_KEYS: Array<TABLECOLUMN> = [
        { key: 'year', sort: 'year', displayName: 'Year' },
        { key: 'month', sort: 'month', displayName: 'Month' },
        { key: 'day', sort: 'day', displayName: 'Day' },
        { key: 'value', displayName: 'Value' },
    ];

    static readonly SHARE_MY_DATA_KEYS: Array<TABLECOLUMN> = [
        { key: 'auditId', sort: 'auditId', displayName: 'Audit Id', isEdit: true },
        { key: 'subscriptionId', sort: 'subscriptionId', displayName: 'Subscription Id' },
        { key: 'createdDate', sort: 'createdDate', displayName: 'Created Date' },
        { key: 'account', sort: 'account', displayName: 'Account' },
        { key: 'name', sort: 'name', displayName: 'Name' },
        { key: 'city', sort: 'city', displayName: 'City' },
        { key: 'address', sort: 'address', displayName: 'Address' },
        { key: 'createNew', displayName: 'create New?' },
    ];

    static readonly EVENT_TYPE_DATA: Array<any> = [
        { key: '1', value: 'Assigned to High Heating or Cooling Program Group' },
        { key: '2', value: 'Assigned to High Plug Loads Program Group' },
        { key: '3', value: 'Assigned to High Heating/Cooling Loads Program Group' },
        { key: '5', value: 'New real-time energy monitor was installed' },
        { key: '6', value: 'Completed a home energy consultation with an expert' },
        { key: '9', value: 'Started charging anelectric vehicle at home' },
        { key: '10', value: 'Started charging an electric vehicle(sub - metered)' },
        { key: '11', value: 'Added, removed or updated a major appliance' },
        { key: '12', value: 'Change in average home occupancy' },
        { key: '13', value: 'Significant home remodel or retrofit' },
        { key: '14', value: 'Completed a simple Energy Efficiency measure' },
        { key: '15', value: 'Change in behavior affecting energy use' },
        { key: '16', value: 'Unassigned from High Heating/Cooling Loads Program Group' },
        { key: '17', value: 'Unassigned from High Plug Loads Program Group' },
        { key: '18', value: 'Unassigned from High Heating / Cooling Loads Program Group' },
        { key: '19', value: 'Assigned to High Variable Loads Program Group' },
        { key: '20', value: 'Unassigned from High Variable Loads Program Group' },
        { key: '21', value: 'Completed initial Home Energy Profile for EUMV' },
        { key: '22', value: 'Completed online smart meter audit for EUMV' },
        { key: '23', value: 'Assigned to High Recurring Loads Program Group' },
        { key: '24', value: 'Unassigned from High Recurring Loads Program Group' },
        { key: '25', value: 'Assigned to Low Energy Program Group' },
        { key: '26', value: 'Unassigned from Low Energy Program Group' },
        { key: '27', value: 'Assigned to Detailed Online Audit Program' },
        { key: '28', value: 'Unassigned from Online Program' },
        { key: '29', value: 'Temporary increase in energy use' },
        { key: '30', value: 'Solar PV system installed and generating electricity' },
        { key: '31', value: 'Problem with Energy Profile Detected' },
        { key: '32', value: 'Problem with Energy Profile now fixed' },
        { key: '33', value: 'Moved to a new home' },
        { key: '34', value: 'Opt -in for optional Program - specific Survey' },
        { key: '36', value: 'Received an energy saving device' },
        { key: '39', value: 'Air conditioning optimizer installed by home professional' },
        { key: '40', value: 'In-home energy audit performed by professional' },
        { key: '41', value: 'Account specific notes' },
        { key: '42', value: 'Double-counted recurring or base load detected and fixed' },
        { key: '43', value: 'Double-counted recurring or base load detected and fixed' },
        { key: '44', value: 'Enrolled into P4P Program' },
        { key: '45', value: 'Removed from P4P Program' },
        { key: '46', value: 'Determined Eligible for P4P Program' },
        { key: '47', value: 'Temporary decrease in energy use' },
        { key: '48', value: 'Stopped charging an electric vehicle at home' },
        { key: '49', value: 'Determined ineligible for P4P Program' },
        { key: '50', value: 'Applied for Peninsula Climate Comfort' },
        { key: '51', value: 'Completion date for Home Energy Profile topic' },
        { key: '52', value: 'Enrolled into P4P Program as Metered Reserve' },
        { key: '53', value: 'Log of miscellaneous Coaching Activity' },
    ];
}
