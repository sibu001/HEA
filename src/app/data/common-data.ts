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
        { key: 'placeCode', displayName: 'Place Code' },
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
        { key: 'lastSuccessfulUsageDate', displayName: 'Last Usage', isDate: true },
        { key: 'authorizationEndDate', displayName: 'Auth End Date', isDate: true },
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
        { displayName: 'Place', sort: 'place', key: 'place', isEdit: true },
        { displayName: 'Place Name', sort: 'placeName', key: 'placeName' },
        { displayName: 'Weather Station', key: 'stationId' }
    ];

    static readonly ZIP_CODE_KEY: Array<TABLECOLUMN> = [
        { displayName: 'Zip Code', key: 'zipcode', isEdit: true },
        { displayName: 'Description', key: 'description' }
    ];


    static readonly CUSTOMER_EVENT_TYPE_COLUMN_DATA: Array<TABLECOLUMN> = [
        { displayName: 'Event Code', key: 'eventCode', sort: 'eventCode', isEdit: true },
        { displayName: 'Event Name', key: 'eventName', sort: 'eventName' },
        { displayName: 'Shared', key: 'shared', sort: 'shared' },
        { displayName: 'Only One', key: 'onlyOne', sort: 'onlyOne' }
    ];

    static readonly CUSTOMER_COMPARISON_GROUP_COLUMN_DATA: Array<TABLECOLUMN> = [
        { displayName: 'Comparison Code', key: 'comparisonCode', sort: 'comparisonCode' },
        { displayName: 'Group Name', key: 'groupName', sort: 'groupName' },
        { displayName: 'Order', key: 'order', sort: 'order' },
        { displayName: 'Weather Station', key: 'weatherStation', sort: 'weatherStation' },
        { displayName: 'Costumers', key: 'costumers', sort: 'customers' },

    ];

    static readonly PLACE_STATION_ID: Array<any> = [
        { key: 'KACV', value: 'CZ 01(Arcata)(KACV)' }
        , { key: 'KCIC', value: 'Chico Municipal Airport(North Central Valley)(KCIC)' }
        , { key: 'KCQT', value: 'CZ 06(Los Angeles Downtown)(KCQT)' }
        , { key: 'KFAT', value: 'CZ 13(Fresno Yosemite International)(KFAT)' }
        , { key: 'KHAF', value: 'Half Moon Bay AirPort(KHAF)' }
        , { key: 'KLVK', value: 'Livermore Municipal Airport(instead of KCALIVER9)(KLVK)' }
        , { key: 'KMHS', value: 'CZ 16(Mount Shasta)(KMHS)' }
        , { key: 'KMPV', value: 'Vermont(KMPV)' }
        , { key: 'KMYV', value: 'Olivehurst, CA(North Central Valley)(KMYV)' }
        , { key: 'KNID', value: 'CZ 14(China Lake)(KNID)' }
        , { key: 'KNJK', value: 'CZ 15(El Centro Naval Air Facility)(KNJK)' }
        , { key: 'KOAK', value: 'CZ 03(Metro Oakland International)(KOAK)' }
        , { key: 'KONT', value: 'Ontario airport in SoCal(KONT)' }
        , { key: 'KRAL', value: 'CZ 10(Riverside Municipal)(KRAL)' }
        , { key: 'KRBL', value: 'CZ 11(Red Bluff Municipal)(KRBL)' }
        , { key: 'KSAC', value: 'CZ 12(Sacramento Executive)(KSAC)' }
        , { key: 'KSAN', value: 'CZ 07(San Diego International - Lindbergh)(KSAN)' }
        , { key: 'KSFO', value: 'San Francisco International(KSFO)' }
        , { key: 'KSJC', value: 'CZ 04(San Jose Airport)(KSJC)' }
        , { key: 'KSMX', value: 'CZ 05(Santa Maria Public Airport)(KSMX)' }
        , { key: 'KSNA', value: 'CZ 08(John Wayne - Orange County)(KSNA)' }
        , { key: 'KSNS', value: 'Salinas Municipal Airport(KSNS)' }
        , { key: 'KSTS', value: 'CZ 02(Sonoma County)(KSTS)' }
        , { key: 'KVTMONTP2', value: 'Vermont(old)(KVTMONTP2)' }
        , { key: 'RECYCLE-CZ12', value: 'C12 TMY for CEC "Urban Footprint" program(RECYCLE - CZ12)' }
        , { key: 'RECYCLE-US', value: 'Artificial weather data for TST accounts(RECYCLE - US)' }
    ];

    public static readonly TIMEZONE: Array<any> = [

        {
            key: 'Etc/GMT+12',
            value: 'Etc / GMT + 12, GMT - 12: 00'
        },
        {
            key: 'Etc/GMT+11',
            value: 'Etc / GMT + 11, GMT - 11: 00'
        },
        {
            key: 'Pacific/Midway',
            value: 'Pacific / Midway, Samoa Daylight Time, GMT - 11: 00'
        },
        {
            key: 'Pacific/Niue',
            value: 'Pacific / Niue, Niue Summer Time, GMT - 11: 00'
        },
        {
            key: 'Pacific/Pago_Pago',
            value: 'Pacific / Pago Pago, Samoa Daylight Time, GMT - 11: 00'
        },
        {
            key: 'Pacific/Samoa',
            value: 'Pacific / Samoa, Samoa Daylight Time, GMT - 11: 00'
        },
        {
            key: 'US/Samoa',
            value: 'US / Samoa, Samoa Daylight Time, GMT - 11: 00'
        },
        {
            key: 'America/Adak',
            value: 'America / Adak, Hawaii Daylight Time, GMT - 10: 00, DST'
        },
        {
            key: 'America/Atka',
            value: 'America / Atka, Hawaii Daylight Time, GMT - 10: 00, DST'
        },
        { key: 'Etc/GMT+10', value: 'Etc / GMT + 10, GMT - 10: 00' },
        { key: 'HST', value: 'HST, Hawaii Daylight Time, GMT - 10: 00' },
        { key: 'Pacific/Honolulu', value: 'Pacific / Honolulu, Hawaii Daylight Time, GMT - 10: 00' },
        { key: 'Pacific/Johnston', value: 'Pacific / Johnston, Hawaii Daylight Time, GMT - 10: 00' },
        { key: 'Pacific/Rarotonga', value: 'Pacific / Rarotonga, Cook Is.Summer Time, GMT - 10: 00' },
        { key: 'Pacific/Tahiti', value: 'Pacific / Tahiti, Tahiti Summer Time, GMT - 10: 00' },
        { key: 'SystemV/HST10', value: 'SystemV / HST10, Hawaii Daylight Time, GMT - 10: 00' },
        { key: 'US/Aleutian', value: 'US / Aleutian, Hawaii Daylight Time, GMT - 10: 00, DST' },
        { key: 'US/Hawaii', value: 'US / Hawaii, Hawaii Daylight Time, GMT - 10: 00' },
        { key: 'Pacific/Marquesas', value: 'Pacific / Marquesas, Marquesas Summer Time, GMT - 09: 30' },
        { key: 'AST', value: 'AST, Alaska Daylight Time, GMT - 09: 00, DST' },
        { key: 'America/Anchorage', value: 'America / Anchorage, Alaska Daylight Time, GMT - 09: 00, DST' },
        { key: 'America/Juneau', value: 'America / Juneau, Alaska Daylight Time, GMT - 09: 00, DST' },
        { key: 'America/Metlakatla', value: 'America / Metlakatla, Alaska Daylight Time, GMT - 09: 00, DST' },
        { key: 'America/Nome', value: 'America / Nome, Alaska Daylight Time, GMT - 09: 00, DST' },
        { key: 'America/Sitka', value: 'America / Sitka, Alaska Daylight Time, GMT - 09: 00, DST' },
        { key: 'America/Yakutat', value: 'America / Yakutat, Alaska Daylight Time, GMT - 09: 00, DST' },
        { key: 'Etc/GMT+9', value: 'Etc / GMT + 9, GMT - 09: 00' },
        { key: 'Pacific/Gambier', value: 'Pacific / Gambier, Gambier Summer Time, GMT - 09: 00' },
        { key: 'SystemV/YST9', value: 'SystemV / YST9, Alaska Daylight Time, GMT - 09: 00' },
        { key: 'SystemV/YST9YDT', value: 'SystemV / YST9YDT, Alaska Daylight Time, GMT - 09: 00, DST' },
        { key: 'US/Alaska', value: 'US / Alaska, Alaska Daylight Time, GMT - 09: 00, DST' },
        { key: 'America/Dawson', value: 'America / Dawson, Pacific Daylight Time, GMT - 08: 00, DST' },
        { key: 'America/Ensenada', value: 'America / Ensenada, Pacific Daylight Time, GMT - 08: 00, DST' },
        { key: 'America/Los_Angeles', value: 'America / Los Angeles, Pacific Daylight Time, GMT - 08: 00, DST' },
        { key: 'America/Santa_Isabel', value: 'America / Santa Isabel, Pacific Daylight Time, GMT - 08: 00, DST' },
        { key: 'America/Tijuana', value: 'America / Tijuana, Pacific Daylight Time, GMT - 08: 00, DST' },
        { key: 'America/Vancouver', value: 'America / Vancouver, Pacific Daylight Time, GMT - 08: 00, DST' },
        { key: 'America/Whitehorse', value: 'America / Whitehorse, Pacific Daylight Time, GMT - 08: 00, DST' },
        { key: 'Canada/Pacific', value: 'Canada / Pacific, Pacific Daylight Time, GMT - 08: 00, DST' },
        { key: 'Canada/Yukon', value: 'Canada / Yukon, Pacific Daylight Time, GMT - 08: 00, DST' },
        { key: 'Etc/GMT+8', value: 'Etc / GMT + 8, GMT - 08: 00' },
        { key: 'Mexico/BajaNorte', value: 'Mexico / BajaNorte, Pacific Daylight Time, GMT - 08: 00, DST' },
        { key: 'PST', value: 'PST, Pacific Daylight Time, GMT - 08: 00, DST' },
        { key: 'PST8PDT', value: 'PST8PDT, Pacific Daylight Time, GMT - 08: 00, DST' },
        { key: 'Pacific/Pitcairn', value: 'Pacific / Pitcairn, Pitcairn Daylight Time, GMT - 08: 00' },
        { key: 'SystemV/PST8', value: 'SystemV / PST8, Pacific Daylight Time, GMT - 08: 00' },
        { key: 'SystemV/PST8PDT', value: 'SystemV / PST8PDT, Pacific Daylight Time, GMT - 08: 00, DST' },
        { key: 'US/Pacific', value: 'US / Pacific, Pacific Daylight Time, GMT - 08: 00, DST' },
        { key: 'US/Pacific-New', value: 'US / Pacific - New, Pacific Daylight Time, GMT - 08: 00, DST' },
        { key: 'America/Boise', value: 'America / Boise, Mountain Daylight Time, GMT - 07: 00, DST' },
        { key: 'America/Cambridge_Bay', value: 'America / Cambridge Bay, Mountain Daylight Time, GMT - 07: 00, DST' },
        { key: 'America/Chihuahua', value: 'America / Chihuahua, Mountain Daylight Time, GMT - 07: 00, DST' },
        { key: 'America/Creston', value: 'America / Creston, Mountain Daylight Time, GMT - 07: 00' },
        { key: 'America/Dawson_Creek', value: 'America / Dawson Creek, Mountain Daylight Time, GMT - 07: 00' },
        { key: 'America/Denver', value: 'America / Denver, Mountain Daylight Time, GMT - 07: 00, DST' },
        { key: 'America/Edmonton', value: 'America / Edmonton, Mountain Daylight Time, GMT - 07: 00, DST' },
        { key: 'America/Fort_Nelson', value: 'America / Fort Nelson, Mountain Daylight Time, GMT - 07: 00' },
        { key: 'America/Hermosillo', value: 'America / Hermosillo, Mountain Daylight Time, GMT - 07: 00' },
        { key: 'America/Inuvik', value: 'America / Inuvik, Mountain Daylight Time, GMT - 07: 00, DST' },
        { key: 'America/Mazatlan', value: 'America / Mazatlan, Mountain Daylight Time, GMT - 07: 00, DST' },
        { key: 'America/Ojinaga', value: 'America / Ojinaga, Mountain Daylight Time, GMT - 07: 00, DST' },
        { key: 'America/Phoenix', value: 'America / Phoenix, Mountain Daylight Time, GMT - 07: 00' },
        { key: 'America/Shiprock', value: 'America / Shiprock, Mountain Daylight Time, GMT - 07: 00, DST' },
        { key: 'America/Yellowknife', value: 'America / Yellowknife, Mountain Daylight Time, GMT - 07: 00, DST' },
        { key: 'Canada/Mountain', value: 'Canada / Mountain, Mountain Daylight Time, GMT - 07: 00, DST' },
        { key: 'Etc/GMT+7', value: 'Etc / GMT + 7, GMT - 07: 00' },
        { key: 'MST', value: 'MST, Mountain Daylight Time, GMT - 07: 00' },
        { key: 'MST7MDT', value: 'MST7MDT, Mountain Daylight Time, GMT - 07: 00, DST' },
        { key: 'Mexico/BajaSur', value: 'Mexico / BajaSur, Mountain Daylight Time, GMT - 07: 00, DST' },
        { key: 'Navajo', value: 'Navajo, Mountain Daylight Time, GMT - 07: 00, DST' },
        { key: 'PNT', value: 'PNT, Mountain Daylight Time, GMT - 07: 00' },
        { key: 'SystemV/MST7', value: 'SystemV / MST7, Mountain Daylight Time, GMT - 07: 00' },
        { key: 'SystemV/MST7MDT', value: 'SystemV / MST7MDT, Mountain Daylight Time, GMT - 07: 00, DST' },
        { key: 'US/Arizona', value: 'US / Arizona, Mountain Daylight Time, GMT - 07: 00' },
        { key: 'US/Mountain', value: 'US / Mountain, Mountain Daylight Time, GMT - 07: 00, DST' },
        { key: 'America/Bahia_Banderas', value: 'America / Bahia Banderas, Central Daylight Time, GMT - 06: 00, DST' },
        { key: 'America/Belize', value: 'America / Belize, Central Daylight Time, GMT - 06: 00' },
        { key: 'America/Chicago', value: 'America / Chicago, Central Daylight Time, GMT - 06: 00, DST' },
        { key: 'America/Costa_Rica', value: 'America / Costa Rica, Central Daylight Time, GMT - 06: 00' },
        { key: 'America/El_Salvador', value: 'America / El Salvador, Central Daylight Time, GMT - 06: 00' },
        { key: 'America/Guatemala', value: 'America / Guatemala, Central Daylight Time, GMT - 06: 00' },
        { key: 'America/Indiana/Knox', value: 'America / Indiana / Knox, Central Daylight Time, GMT - 06: 00, DST' },
        { key: 'America/Indiana/Tell_City', value: 'America / Indiana / Tell City, Central Daylight Time, GMT - 06: 00,DST' },
        { key: 'America/Knox_IN', value: 'America / Knox IN, Central Daylight Time, GMT - 06: 00, DST' },
        { key: 'America/Managua', value: 'America / Managua, Central Daylight Time, GMT - 06: 00' },
        { key: 'America/Matamoros', value: 'America / Matamoros, Central Daylight Time, GMT - 06: 00, DST' },
        { key: 'America/Menominee', value: 'America / Menominee, Central Daylight Time, GMT - 06: 00, DST' },
        { key: 'America/Merida', value: 'America / Merida, Central Daylight Time, GMT - 06: 00, DST' },
        { key: 'America/Mexico_City', value: 'America / Mexico City, Central Daylight Time, GMT - 06: 00, DST' },
        { key: 'America/Monterrey', value: 'America / Monterrey, Central Daylight Time, GMT - 06: 00, DST' },
        { key: 'America/North_Dakota/Beulah', value: 'America / North Dakota / Beulah, Central Daylight Time,GMT - 06: 00, DST' },
        { key: 'America/North_Dakota/Center', value: 'America / North Dakota / Center, Central Daylight Time,GMT - 06: 00, DST' },
        { key: 'America/North_Dakota/New_Salem', value: 'America / North Dakota / New Salem, Central Daylight Time,GMT - 06: 00, DST' },
        { key: 'America/Rainy_River', value: 'America / Rainy River, Central Daylight Time, GMT - 06: 00, DST' },
        { key: 'America/Rankin_Inlet', value: 'America / Rankin Inlet, Central Daylight Time, GMT - 06: 00, DST' },
        { key: 'America/Regina', value: 'America / Regina, Central Daylight Time, GMT - 06: 00' },
        { key: 'America/Resolute', value: 'America / Resolute, Central Daylight Time, GMT - 06: 00, DST' },
        { key: 'America/Swift_Current', value: 'America / Swift Current, Central Daylight Time, GMT - 06: 00' },
        { key: 'America/Tegucigalpa', value: 'America / Tegucigalpa, Central Daylight Time, GMT - 06: 00' },
        { key: 'America/Winnipeg', value: 'America / Winnipeg, Central Daylight Time, GMT - 06: 00, DST' },
        { key: 'CST', value: 'CST, Central Daylight Time, GMT - 06: 00, DST' },
        { key: 'CST6CDT', value: 'CST6CDT, Central Daylight Time, GMT - 06: 00, DST' },
        { key: 'Canada/Central', value: 'Canada / Central, Central Daylight Time, GMT - 06: 00, DST' },
        { key: 'Canada/East-Saskatchewan', value: 'Canada / East - Saskatchewan, Central Daylight Time, GMT - 06: 00' },
        { key: 'Canada/Saskatchewan', value: 'Canada / Saskatchewan, Central Daylight Time, GMT - 06: 00' },
        { key: 'Chile/EasterIsland', value: 'Chile / EasterIsland, Easter Is.Summer Time, GMT - 06: 00, DST' },
        { key: 'Etc/GMT+6', value: 'Etc / GMT + 6, GMT - 06: 00' },
        { key: 'Mexico/General', value: 'Mexico / General, Central Daylight Time, GMT - 06: 00, DST' },
        { key: 'Pacific/Easter', value: 'Pacific / Easter, Easter Is.Summer Time, GMT - 06: 00, DST' },
        { key: 'Pacific/Galapagos', value: 'Pacific / Galapagos, Galapagos Summer Time, GMT - 06: 00' },
        { key: 'SystemV/CST6', value: 'SystemV / CST6, Central Daylight Time, GMT - 06: 00' },
        { key: 'SystemV/CST6CDT', value: 'SystemV / CST6CDT, Central Daylight Time, GMT - 06: 00, DST' },
        { key: 'US/Central', value: 'US / Central, Central Daylight Time, GMT - 06: 00, DST' },
        { key: 'US/Indiana-Starke', value: 'US / Indiana - Starke, Central Daylight Time, GMT - 06: 00, DST' },
        { key: 'America/Atikokan', value: 'America / Atikokan, Eastern Daylight Time, GMT - 05: 00' },
        { key: 'America/Bogota', value: 'America / Bogota, Colombia Summer Time, GMT - 05: 00' },
        { key: 'America/Cancun', value: 'America / Cancun, Eastern Daylight Time, GMT - 05: 00' },
        { key: 'America/Cayman', value: 'America / Cayman, Eastern Daylight Time, GMT - 05: 00' },
        { key: 'America/Coral_Harbour', value: 'America / Coral Harbour, Eastern Daylight Time, GMT - 05: 00' },
        { key: 'America/Detroit', value: 'America / Detroit, Eastern Daylight Time, GMT - 05: 00, DST' },
        { key: 'America/Eirunepe', value: 'America / Eirunepe, Acre Summer Time, GMT - 05: 00' },
        { key: 'America/Fort_Wayne', value: 'America / Fort Wayne, Eastern Daylight Time, GMT - 05: 00, DST' },
        { key: 'America/Guayaquil', value: 'America / Guayaquil, Ecuador Summer Time, GMT - 05: 00' },
        { key: 'America/Havana', value: 'America / Havana, Cuba Daylight Time, GMT - 05: 00, DST' },
        { key: 'America/Indiana/Indianapolis', value: 'America / Indiana / Indianapolis, Eastern Daylight Time, GMT - 05: 00, DST' },
        { key: 'America/Indiana/Marengo', value: 'America / Indiana / Marengo, Eastern Daylight Time, GMT - 05: 00, DST' },
        { key: 'America/Indiana/Petersburg', value: 'America / Indiana / Petersburg, Eastern Daylight Time, GMT - 05: 00, DST' },
        { key: 'America/Indiana/Vevay', value: 'America / Indiana / Vevay, Eastern Daylight Time, GMT - 05: 00, DST' },
        { key: 'America/Indiana/Vincennes', value: 'America / Indiana / Vincennes, Eastern Daylight Time, GMT - 05: 00, DST' },
        { key: 'America/Indiana/Winamac', value: 'America / Indiana / Winamac, Eastern Daylight Time, GMT - 05: 00, DST' },
        { key: 'America/Indianapolis', value: 'America / Indianapolis, Eastern Daylight Time, GMT - 05: 00, DST' },
        { key: 'America/Iqaluit', value: 'America / Iqaluit, Eastern Daylight Time, GMT - 05: 00, DST' },
        { key: 'America/Jamaica', value: 'America / Jamaica, Eastern Daylight Time, GMT - 05: 00' },
        { key: 'America/Kentucky/Louisville', value: 'America / Kentucky / Louisville, Eastern Daylight Time, GMT - 05: 00, DST' },
        { key: 'America/Kentucky/Monticello', value: 'America / Kentucky / Monticello, Eastern Daylight Time, GMT - 05: 00, DST' },
        { key: 'America/Lima', value: 'America / Lima, Peru Summer Time, GMT - 05: 00' },
        { key: 'America/Louisville', value: 'America / Louisville, Eastern Daylight Time, GMT - 05: 00, DST' },
        { key: 'America/Montreal', value: 'America / Montreal, Eastern Daylight Time, GMT - 05: 00, DST' },
        { key: 'America/Nassau', value: 'America / Nassau, Eastern Daylight Time, GMT - 05: 00, DST' },
        { key: 'America/New_York', value: 'America / New York, Eastern Daylight Time, GMT - 05: 00, DST' },
        { key: 'America/Nipigon', value: 'America / Nipigon, Eastern Daylight Time, GMT - 05: 00, DST' },
        { key: 'America/Panama', value: 'America / Panama, Eastern Daylight Time, GMT - 05: 00' },
        { key: 'America/Pangnirtung', value: 'America / Pangnirtung, Eastern Daylight Time, GMT - 05: 00, DST' },
        {
            key: 'America/Port-au-Prince',
            value: 'America / Port - au - Prince, Eastern Daylight Time, GMT - 05: 00, DST'
        },
        { key: 'America/Porto_Acre', value: 'America / Porto Acre, Acre Summer Time, GMT - 05: 00' },
        { key: 'America/Rio_Branco', value: 'America / Rio Branco, Acre Summer Time, GMT - 05: 00' },
        { key: 'America/Thunder_Bay', value: 'America / Thunder Bay, Eastern Daylight Time, GMT - 05: 00, DST' },
        { key: 'America/Toronto', value: 'America / Toronto, Eastern Daylight Time, GMT - 05: 00, DST' },
        { key: 'Brazil/Acre', value: 'Brazil / Acre, Acre Summer Time, GMT - 05: 00' },
        { key: 'Canada/Eastern', value: 'Canada / Eastern, Eastern Daylight Time, GMT - 05: 00, DST' },
        { key: 'Cuba', value: 'Cuba, Cuba Daylight Time, GMT - 05: 00, DST' },
        { key: 'EST', value: 'EST, Eastern Daylight Time, GMT - 05: 00' },
        { key: 'EST5EDT', value: 'EST5EDT, Eastern Daylight Time, GMT - 05: 00, DST' },
        { key: 'Etc/GMT+5', value: 'Etc / GMT + 5, GMT - 05: 00' },
        { key: 'IET', value: 'IET, Eastern Daylight Time, GMT - 05: 00, DST' },
        { key: 'Jamaica', value: 'Jamaica, Eastern Daylight Time, GMT - 05: 00' },
        { key: 'SystemV/EST5', value: 'SystemV / EST5, Eastern Daylight Time, GMT - 05: 00' },
        { key: 'SystemV/EST5EDT', value: 'SystemV / EST5EDT, Eastern Daylight Time, GMT - 05: 00, DST' },
        { key: 'US/East-Indiana', value: 'US / East - Indiana, Eastern Daylight Time, GMT - 05: 00, DST' },
        { key: 'US/Eastern', value: 'US / Eastern, Eastern Daylight Time, GMT - 05: 00, DST' },
        { key: 'US/Michigan', value: 'US / Michigan, Eastern Daylight Time, GMT - 05: 00, DST' },
        { key: 'America/Anguilla', value: 'America / Anguilla, Atlantic Daylight Time, GMT - 04: 00' },
        { key: 'America/Antigua', value: 'America / Antigua, Atlantic Daylight Time, GMT - 04: 00' },
        { key: 'America/Aruba', value: 'America / Aruba, Atlantic Daylight Time, GMT - 04: 00' },
        { key: 'America/Asuncion', value: 'America / Asuncion, Paraguay Summer Time, GMT - 04: 00, DST' },
        { key: 'America/Barbados', value: 'America / Barbados, Atlantic Daylight Time, GMT - 04: 00' },
        { key: 'America/Blanc-Sablon', value: 'America / Blanc - Sablon, Atlantic Daylight Time, GMT - 04: 00' },
        { key: 'America/Boa_Vista', value: 'America / Boa Vista, Amazon Summer Time, GMT - 04: 00' },
        { key: 'America/Campo_Grande', value: 'America / Campo Grande, Amazon Summer Time, GMT - 04: 00, DST' },
        { key: 'America/Caracas', value: 'America / Caracas, Venezuela Summer Time, GMT - 04: 00' },
        { key: 'America/Cuiaba', value: 'America / Cuiaba, Amazon Summer Time, GMT - 04: 00, DST' },
        { key: 'America/Curacao', value: 'America / Curacao, Atlantic Daylight Time, GMT - 04: 00' },
        { key: 'America/Dominica', value: 'America / Dominica, Atlantic Daylight Time, GMT - 04: 00' },
        { key: 'America/Glace_Bay', value: 'America / Glace Bay, Atlantic Daylight Time, GMT - 04: 00, DST' },
        { key: 'America/Goose_Bay', value: 'America / Goose Bay, Atlantic Daylight Time, GMT - 04: 00, DST' },
        { key: 'America/Grand_Turk', value: 'America / Grand Turk, Atlantic Daylight Time, GMT - 04: 00' },
        { key: 'America/Grenada', value: 'America / Grenada, Atlantic Daylight Time, GMT - 04: 00' },
        { key: 'America/Guadeloupe', value: 'America / Guadeloupe, Atlantic Daylight Time, GMT - 04: 00' },
        { key: 'America/Guyana', value: 'America / Guyana, Guyana Summer Time, GMT - 04: 00' },
        { key: 'America/Halifax', value: 'America / Halifax, Atlantic Daylight Time, GMT - 04: 00, DST' },
        { key: 'America/Kralendijk', value: 'America / Kralendijk, Atlantic Daylight Time, GMT - 04: 00' },
        { key: 'America/La_Paz', value: 'America / La Paz, Bolivia Summer Time, GMT - 04: 00' },
        { key: 'America/Lower_Princes', value: 'America / Lower Princes, Atlantic Daylight Time, GMT - 04: 00' },
        { key: 'America/Manaus', value: 'America / Manaus, Amazon Summer Time, GMT - 04: 00' },
        { key: 'America/Marigot', value: 'America / Marigot, Atlantic Daylight Time, GMT - 04: 00' },
        { key: 'America/Martinique', value: 'America / Martinique, Atlantic Daylight Time, GMT - 04: 00' },
        { key: 'America/Moncton', value: 'America / Moncton, Atlantic Daylight Time, GMT - 04: 00, DST' },
        { key: 'America/Montserrat', value: 'America / Montserrat, Atlantic Daylight Time, GMT - 04: 00' },
        { key: 'America/Port_of_Spain', value: 'America / Port of Spain, Atlantic Daylight Time, GMT - 04: 00' },
        { key: 'America/Porto_Velho', value: 'America / Porto Velho, Amazon Summer Time, GMT - 04: 00' },
        { key: 'America/Puerto_Rico', value: 'America / Puerto Rico, Atlantic Daylight Time, GMT - 04: 00' },
        { key: 'America/Santiago', value: 'America / Santiago, Chile Summer Time, GMT - 04: 00, DST' },
        { key: 'America/Santo_Domingo', value: 'America / Santo Domingo, Atlantic Daylight Time, GMT - 04: 00' },
        { key: 'America/St_Barthelemy', value: 'America / St Barthelemy, Atlantic Daylight Time, GMT - 04: 00' },
        { key: 'America/St_Kitts', value: 'America / St Kitts, Atlantic Daylight Time, GMT - 04: 00' },
        { key: 'America/St_Lucia', value: 'America / St Lucia, Atlantic Daylight Time, GMT - 04: 00' },
        { key: 'America/St_Thomas', value: 'America / St Thomas, Atlantic Daylight Time, GMT - 04: 00' },
        { key: 'America/St_Vincent', value: 'America / St Vincent, Atlantic Daylight Time, GMT - 04: 00' },
        { key: 'America/Thule', value: 'America / Thule, Atlantic Daylight Time, GMT - 04: 00, DST' },
        { key: 'America/Tortola', value: 'America / Tortola, Atlantic Daylight Time, GMT - 04: 00' },
        { key: 'America/Virgin', value: 'America / Virgin, Atlantic Daylight Time, GMT - 04: 00' },
        { key: 'Atlantic/Bermuda', value: 'Atlantic / Bermuda, Atlantic Daylight Time, GMT - 04: 00, DST' },
        { key: 'Brazil/West', value: 'Brazil / West, Amazon Summer Time, GMT - 04: 00' },
        { key: 'Canada/Atlantic', value: 'Canada / Atlantic, Atlantic Daylight Time, GMT - 04: 00, DST' },
        { key: 'Chile/Continental', value: 'Chile / Continental, Chile Summer Time, GMT - 04: 00, DST' },
        { key: 'Etc/GMT+4', value: 'Etc / GMT + 4, GMT - 04: 00' },
        { key: 'PRT', value: 'PRT, Atlantic Daylight Time, GMT - 04: 00' },
        { key: 'SystemV/AST4', value: 'SystemV / AST4, Atlantic Daylight Time, GMT - 04: 00' },
        { key: 'SystemV/AST4ADT', value: 'SystemV / AST4ADT, Atlantic Daylight Time, GMT - 04: 00, DST' },
        { key: 'America/St_Johns', value: 'America / St Johns, Newfoundland Daylight Time, GMT - 03: 30, DST' },
        { key: 'CNT', value: 'CNT, Newfoundland Daylight Time, GMT - 03: 30, DST' },
        {
            key: 'Canada/Newfoundland',
            value: 'Canada / Newfoundland, Newfoundland Daylight Time, GMT - 03: 30, DST'
        },
        { key: 'AGT', value: 'AGT, Argentine Summer Time, GMT - 03: 00' },
        { key: 'America/Araguaina', value: 'America / Araguaina, Brasilia Summer Time, GMT - 03: 00' },
        {
            key: 'America/Argentina/Buenos_Aires',
            value: 'America / Argentina / Buenos Aires, Argentine Summer Time, GMT - 03: 00'
        },
        {
            key: 'America/Argentina/Catamarca',
            value: 'America / Argentina / Catamarca, Argentine Summer Time, GMT - 03: 00'
        },
        {
            key: 'America/Argentina/ComodRivadavia',
            value: 'America / Argentina / ComodRivadavia, Argentine Summer Time, GMT - 03: 00'
        },
        {
            key: 'America/Argentina/Cordoba',
            value: 'America / Argentina / Cordoba, Argentine Summer Time, GMT - 03: 00'
        },
        {
            key: 'America/Argentina/Jujuy',
            value: 'America / Argentina / Jujuy, Argentine Summer Time, GMT - 03: 00'
        },
        {
            key: 'America/Argentina/La_Rioja',
            value: 'America / Argentina / La Rioja, Argentine Summer Time, GMT - 03: 00'
        },
        {
            key: 'America/Argentina/Mendoza',
            value: 'America / Argentina / Mendoza, Argentine Summer Time, GMT - 03: 00'
        },
        {
            key: 'America/Argentina/Rio_Gallegos',
            value: 'America / Argentina / Rio Gallegos, Argentine Summer Time, GMT - 03: 00'
        },
        {
            key: 'America/Argentina/Salta',
            value: 'America / Argentina / Salta, Argentine Summer Time, GMT - 03: 00'
        },
        {
            key: 'America/Argentina/San_Juan',
            value: 'America / Argentina / San Juan, Argentine Summer Time, GMT - 03: 00'
        },
        {
            key: 'America/Argentina/San_Luis',
            value: 'America / Argentina / San Luis, Argentine Summer Time, GMT - 03: 00'
        },
        {
            key: 'America/Argentina/Tucuman',
            value: 'America / Argentina / Tucuman, Argentine Summer Time, GMT - 03: 00'
        },
        {
            key: 'America/Argentina/Ushuaia',
            value: 'America / Argentina / Ushuaia, Argentine Summer Time, GMT - 03: 00'
        },
        { key: 'America/Bahia', value: 'America / Bahia, Brasilia Summer Time, GMT - 03: 00' },
        { key: 'America/Belem', value: 'America / Belem, Brasilia Summer Time, GMT - 03: 00' },
        { key: 'America/Buenos_Aires', value: 'America / Buenos Aires, Argentine Summer Time, GMT - 03: 00' },
        { key: 'America/Catamarca', value: 'America / Catamarca, Argentine Summer Time, GMT - 03: 00' },
        { key: 'America/Cayenne', value: 'America / Cayenne, French Guiana Summer Time, GMT - 03: 00' },
        { key: 'America/Cordoba', value: 'America / Cordoba, Argentine Summer Time, GMT - 03: 00' },
        { key: 'America/Fortaleza', value: 'America / Fortaleza, Brasilia Summer Time, GMT - 03: 00' },
        { key: 'America/Godthab', value: 'America / Godthab, Western Greenland Summer Time, GMT - 03: 00, DST' },
        { key: 'America/Jujuy', value: 'America / Jujuy, Argentine Summer Time, GMT - 03: 00' },
        { key: 'America/Maceio', value: 'America / Maceio, Brasilia Summer Time, GMT - 03: 00' },
        { key: 'America/Mendoza', value: 'America / Mendoza, Argentine Summer Time, GMT - 03: 00' },
        {
            key: 'America/Miquelon',
            value: 'America / Miquelon, Pierre & amp; Miquelon Daylight Time, GMT - 03: 00, DST'
        },
        { key: 'America/Montevideo', value: 'America / Montevideo, Uruguay Summer Time, GMT - 03: 00' },
        { key: 'America/Paramaribo', value: 'America / Paramaribo, Suriname Summer Time, GMT - 03: 00' },
        { key: 'America/Punta_Arenas', value: 'America / Punta Arenas, GMT - 03: 00' },
        { key: 'America/Recife', value: 'America / Recife, Brasilia Summer Time, GMT - 03: 00' },
        { key: 'America/Rosario', value: 'America / Rosario, Argentine Summer Time, GMT - 03: 00' },
        { key: 'America/Santarem', value: 'America / Santarem, Brasilia Summer Time, GMT - 03: 00' },
        { key: 'America/Sao_Paulo', value: 'America / Sao Paulo, Brasilia Summer Time, GMT - 03: 00, DST' },
        { key: 'Antarctica/Palmer', value: 'Antarctica / Palmer, Chile Summer Time, GMT - 03: 00' },
        { key: 'Antarctica/Rothera', value: 'Antarctica / Rothera, Rothera Summer Time, GMT - 03: 00' },
        { key: 'Atlantic/Stanley', value: 'Atlantic / Stanley, Falkland Is.Summer Time, GMT - 03: 00' },
        { key: 'BET', value: 'BET, Brasilia Summer Time, GMT - 03: 00, DST' },
        { key: 'Brazil/East', value: 'Brazil / East, Brasilia Summer Time, GMT - 03: 00, DST' },
        { key: 'Etc/GMT+3', value: 'Etc / GMT + 3, GMT - 03: 00' },
        { key: 'America/Noronha', value: 'America / Noronha, Fernando de Noronha Summer Time, GMT - 02: 00' },
        {
            key: 'Atlantic/South_Georgia',
            value: 'Atlantic / South Georgia, South Georgia Daylight Time, GMT - 02: 00'
        },
        { key: 'Brazil/DeNoronha', value: 'Brazil / DeNoronha, Fernando de Noronha Summer Time, GMT - 02: 00' },
        { key: 'Etc/GMT+2', value: 'Etc / GMT + 2, GMT - 02: 00' },
        {
            key: 'America/Scoresbysund',
            value: 'America / Scoresbysund, Eastern Greenland Summer Time, GMT - 01: 00, DST'
        },
        {
            key: 'Atlantic/Azores',
            value: 'Atlantic / Azores, Azores Summer Time, GMT - 01: 00, DST'
        },
        { key: 'Atlantic/Cape_Verde', value: 'Atlantic / Cape Verde, Cape Verde Summer Time, GMT - 01: 00' },
        { key: 'Etc/GMT+1', value: 'Etc / GMT + 1, GMT - 01: 00' },
        { key: 'Africa/Abidjan', value: 'Africa / Abidjan, Greenwich Mean Time, GMT + 00: 00' },
        { key: 'Africa/Accra', value: 'Africa / Accra, Ghana Summer Time, GMT + 00: 00' },
        { key: 'Africa/Bamako', value: 'Africa / Bamako, Greenwich Mean Time, GMT + 00: 00' },
        { key: 'Africa/Banjul', value: 'Africa / Banjul, Greenwich Mean Time, GMT + 00: 00' },
        { key: 'Africa/Bissau', value: 'Africa / Bissau, Greenwich Mean Time, GMT + 00: 00' },
        {
            key: 'Africa/Casablanca',
            value: 'Africa / Casablanca, Western European Summer Time, GMT + 00: 00, DST'
        },
        { key: 'Africa/Conakry', value: 'Africa / Conakry, Greenwich Mean Time, GMT + 00: 00' },
        { key: 'Africa/Dakar', value: 'Africa / Dakar, Greenwich Mean Time, GMT + 00: 00' },
        { key: 'Africa/El_Aaiun', value: 'Africa / El Aaiun, Western European Summer Time, GMT + 00: 00, DST' },
        { key: 'Africa/Freetown', value: 'Africa / Freetown, Greenwich Mean Time, GMT + 00: 00' },
        { key: 'Africa/Lome', value: 'Africa / Lome, Greenwich Mean Time, GMT + 00: 00' },
        { key: 'Africa/Monrovia', value: 'Africa / Monrovia, Greenwich Mean Time, GMT + 00: 00' },
        { key: 'Africa/Nouakchott', value: 'Africa / Nouakchott, Greenwich Mean Time, GMT + 00: 00' },
        { key: 'Africa/Ouagadougou', value: 'Africa / Ouagadougou, Greenwich Mean Time, GMT + 00: 00' },
        { key: 'Africa/Sao_Tome', value: 'Africa / Sao Tome, Greenwich Mean Time, GMT + 00: 00' },
        { key: 'Africa/Timbuktu', value: 'Africa / Timbuktu, Greenwich Mean Time, GMT + 00: 00' },
        { key: 'America/Danmarkshavn', value: 'America / Danmarkshavn, Greenwich Mean Time, GMT + 00: 00' },
        {
            key: 'Antarctica/Troll',
            value: 'Antarctica / Troll, Central European Summer Time, GMT + 00: 00, DST'
        },
        { key: 'Atlantic/Canary', value: 'Atlantic / Canary, Western European Summer Time, GMT + 00: 00, DST' },
        { key: 'Atlantic/Faeroe', value: 'Atlantic / Faeroe, Western European Summer Time, GMT + 00: 00, DST' },
        { key: 'Atlantic/Faroe', value: 'Atlantic / Faroe, Western European Summer Time, GMT + 00: 00, DST' },
        {
            key: 'Atlantic/Madeira',
            value: 'Atlantic / Madeira, Western European Summer Time, GMT + 00: 00, DST'
        },
        { key: 'Atlantic/Reykjavik', value: 'Atlantic / Reykjavik, Greenwich Mean Time, GMT + 00: 00' },
        { key: 'Atlantic/St_Helena', value: 'Atlantic / St Helena, Greenwich Mean Time, GMT + 00: 00' },
        { key: 'Eire', value: 'Eire, Irish Summer Time, GMT + 00: 00, DST' },
        { key: 'Etc/GMT', value: 'Etc / GMT, GMT + 00: 00' },
        { key: 'Etc/GMT+0', value: 'Etc / GMT + 0, GMT + 00: 00' },
        { key: 'Etc/GMT-0', value: 'Etc / GMT - 0, GMT + 00: 00' },
        { key: 'Etc/GMT0', value: 'Etc / GMT0, GMT + 00: 00' },
        { key: 'Etc/Greenwich', value: 'Etc / Greenwich, Greenwich Mean Time, GMT + 00: 00' },
        { key: 'Etc/UCT', value: 'Etc / UCT, Coordinated Universal Time, GMT + 00: 00' },
        { key: 'Etc/UTC', value: 'Etc / UTC, Coordinated Universal Time, GMT + 00: 00' },
        { key: 'Etc/Universal', value: 'Etc / Universal, Coordinated Universal Time, GMT + 00: 00' },
        { key: 'Etc/Zulu', value: 'Etc / Zulu, Coordinated Universal Time, GMT + 00: 00' },
        { key: 'Europe/Belfast', value: 'Europe / Belfast, British Summer Time, GMT + 00: 00, DST' },
        { key: 'Europe/Dublin', value: 'Europe / Dublin, Irish Summer Time, GMT + 00: 00, DST' },
        { key: 'Europe/Guernsey', value: 'Europe / Guernsey, British Summer Time, GMT + 00: 00, DST' },
        { key: 'Europe/Isle_of_Man', value: 'Europe / Isle of Man, British Summer Time, GMT + 00: 00, DST' },
        { key: 'Europe/Jersey', value: 'Europe / Jersey, British Summer Time, GMT + 00: 00, DST' },
        { key: 'Europe/Lisbon', value: 'Europe / Lisbon, Western European Summer Time, GMT + 00: 00, DST' },
        { key: 'Europe/London', value: 'Europe / London, British Summer Time, GMT + 00: 00, DST' },
        { key: 'GB', value: 'GB, British Summer Time, GMT + 00: 00, DST' },
        { key: 'GB-Eire', value: 'GB - Eire, British Summer Time, GMT + 00: 00, DST' },
        { key: 'GMT', value: 'GMT, Greenwich Mean Time, GMT + 00: 00' },
        { key: 'GMT0', value: 'GMT0, GMT + 00: 00' },
        { key: 'Greenwich', value: 'Greenwich, Greenwich Mean Time, GMT + 00: 00' },
        { key: 'Iceland', value: 'Iceland, Greenwich Mean Time, GMT + 00: 00' },
        { key: 'Portugal', value: 'Portugal, Western European Summer Time, GMT + 00: 00, DST' },
        { key: 'UCT', value: 'UCT, Coordinated Universal Time, GMT + 00: 00' },
        { key: 'UTC', value: 'UTC, Coordinated Universal Time, GMT + 00: 00' },
        { key: 'Universal', value: 'Universal, Coordinated Universal Time, GMT + 00: 00' },
        { key: 'WET', value: 'WET, Western European Summer Time, GMT + 00: 00, DST' },
        { key: 'Zulu', value: 'Zulu, Coordinated Universal Time, GMT + 00: 00' },
        { key: 'Africa/Algiers', value: 'Africa / Algiers, Central European Summer Time, GMT + 01: 00' },
        { key: 'Africa/Bangui', value: 'Africa / Bangui, Western African Summer Time, GMT + 01: 00' },
        { key: 'Africa/Brazzaville', value: 'Africa / Brazzaville, Western African Summer Time, GMT + 01: 00' },
        { key: 'Africa/Ceuta', value: 'Africa / Ceuta, Central European Summer Time, GMT + 01: 00, DST' },
        { key: 'Africa/Douala', value: 'Africa / Douala, Western African Summer Time, GMT + 01: 00' },
        { key: 'Africa/Kinshasa', value: 'Africa / Kinshasa, Western African Summer Time, GMT + 01: 00' },
        { key: 'Africa/Lagos', value: 'Africa / Lagos, Western African Summer Time, GMT + 01: 00' },
        { key: 'Africa/Libreville', value: 'Africa / Libreville, Western African Summer Time, GMT + 01: 00' },
        { key: 'Africa/Luanda', value: 'Africa / Luanda, Western African Summer Time, GMT + 01: 00' },
        { key: 'Africa/Malabo', value: 'Africa / Malabo, Western African Summer Time, GMT + 01: 00' },
        { key: 'Africa/Ndjamena', value: 'Africa / Ndjamena, Western African Summer Time, GMT + 01: 00' },
        { key: 'Africa/Niamey', value: 'Africa / Niamey, Western African Summer Time, GMT + 01: 00' },
        { key: 'Africa/Porto-Novo', value: 'Africa / Porto - Novo, Western African Summer Time, GMT + 01: 00' },
        { key: 'Africa/Tunis', value: 'Africa / Tunis, Central European Summer Time, GMT + 01: 00' },
        { key: 'Africa/Windhoek', value: 'Africa / Windhoek, Western African Summer Time, GMT + 01: 00, DST' },
        {
            key: 'Arctic/Longyearbyen',
            value: 'Arctic / Longyearbyen, Central European Summer Time, GMT + 01: 00, DST'
        },
        {
            key: 'Atlantic/Jan_Mayen',
            value: 'Atlantic / Jan Mayen, Central European Summer Time, GMT + 01: 00, DST'
        },
        { key: 'CET', value: 'CET, Central European Summer Time, GMT + 01: 00, DST' },
        { key: 'ECT', value: 'ECT, Central European Summer Time, GMT + 01: 00, DST' },
        { key: 'Etc/GMT-1', value: 'Etc / GMT - 1, GMT + 01: 00' },
        {
            key: 'Europe/Amsterdam',
            value: 'Europe / Amsterdam, Central European Summer Time, GMT + 01: 00, DST'
        },
        { key: 'Europe/Andorra', value: 'Europe / Andorra, Central European Summer Time, GMT + 01: 00, DST' },
        { key: 'Europe/Belgrade', value: 'Europe / Belgrade, Central European Summer Time, GMT + 01: 00, DST' },
        { key: 'Europe/Berlin', value: 'Europe / Berlin, Central European Summer Time, GMT + 01: 00, DST' },
        {
            key: 'Europe/Bratislava',
            value: 'Europe / Bratislava, Central European Summer Time, GMT + 01: 00, DST'
        },
        { key: 'Europe/Brussels', value: 'Europe / Brussels, Central European Summer Time, GMT + 01: 00, DST' },
        { key: 'Europe/Budapest', value: 'Europe / Budapest, Central European Summer Time, GMT + 01: 00, DST' },
        { key: 'Europe/Busingen', value: 'Europe / Busingen, Central European Summer Time, GMT + 01: 00, DST' },
        {
            key: 'Europe/Copenhagen',
            value: 'Europe / Copenhagen, Central European Summer Time, GMT + 01: 00, DST'
        },
        {
            key: 'Europe/Gibraltar',
            value: 'Europe / Gibraltar, Central European Summer Time, GMT + 01: 00, DST'
        },
        {
            key: 'Europe/Ljubljana',
            value: 'Europe / Ljubljana, Central European Summer Time, GMT + 01: 00, DST'
        },
        {
            key: 'Europe/Luxembourg',
            value: 'Europe / Luxembourg, Central European Summer Time, GMT + 01: 00, DST'
        },
        { key: 'Europe/Madrid', value: 'Europe / Madrid, Central European Summer Time, GMT + 01: 00, DST' },
        { key: 'Europe/Malta', value: 'Europe / Malta, Central European Summer Time, GMT + 01: 00, DST' },
        { key: 'Europe/Monaco', value: 'Europe / Monaco, Central European Summer Time, GMT + 01: 00, DST' },
        { key: 'Europe/Oslo', value: 'Europe / Oslo, Central European Summer Time, GMT + 01: 00, DST' },
        { key: 'Europe/Paris', value: 'Europe / Paris, Central European Summer Time, GMT + 01: 00, DST' },
        {
            key: 'Europe/Podgorica',
            value: 'Europe / Podgorica, Central European Summer Time, GMT + 01: 00, DST'
        },
        { key: 'Europe/Prague', value: 'Europe / Prague, Central European Summer Time, GMT + 01: 00, DST' },
        { key: 'Europe/Rome', value: 'Europe / Rome, Central European Summer Time, GMT + 01: 00, DST' },
        {
            key: 'Europe/San_Marino',
            value: 'Europe / San Marino, Central European Summer Time, GMT + 01: 00, DST'
        },
        { key: 'Europe/Sarajevo', value: 'Europe / Sarajevo, Central European Summer Time, GMT + 01: 00, DST' },
        { key: 'Europe/Skopje', value: 'Europe / Skopje, Central European Summer Time, GMT + 01: 00, DST' },
        {
            key: 'Europe/Stockholm',
            value: 'Europe / Stockholm, Central European Summer Time, GMT + 01: 00, DST'
        },
        { key: 'Europe/Tirane', value: 'Europe / Tirane, Central European Summer Time, GMT + 01: 00, DST' },
        { key: 'Europe/Vaduz', value: 'Europe / Vaduz, Central European Summer Time, GMT + 01: 00, DST' },
        { key: 'Europe/Vatican', value: 'Europe / Vatican, Central European Summer Time, GMT + 01: 00, DST' },
        { key: 'Europe/Vienna', value: 'Europe / Vienna, Central European Summer Time, GMT + 01: 00, DST' },
        { key: 'Europe/Warsaw', value: 'Europe / Warsaw, Central European Summer Time, GMT + 01: 00, DST' },
        { key: 'Europe/Zagreb', value: 'Europe / Zagreb, Central European Summer Time, GMT + 01: 00, DST' },
        { key: 'Europe/Zurich', value: 'Europe / Zurich, Central European Summer Time, GMT + 01: 00, DST' },
        { key: 'MET', value: 'MET, Middle Europe Summer Time, GMT + 01: 00, DST' },
        { key: 'Poland', value: 'Poland, Central European Summer Time, GMT + 01: 00, DST' },
        { key: 'ART', value: 'ART, Eastern European Summer Time, GMT + 02: 00' },
        { key: 'Africa/Blantyre', value: 'Africa / Blantyre, Central African Summer Time, GMT + 02: 00' },
        { key: 'Africa/Bujumbura', value: 'Africa / Bujumbura, Central African Summer Time, GMT + 02: 00' },
        { key: 'Africa/Cairo', value: 'Africa / Cairo, Eastern European Summer Time, GMT + 02: 00' },
        { key: 'Africa/Gaborone', value: 'Africa / Gaborone, Central African Summer Time, GMT + 02: 00' },
        { key: 'Africa/Harare', value: 'Africa / Harare, Central African Summer Time, GMT + 02: 00' },
        { key: 'Africa/Johannesburg', value: 'Africa / Johannesburg, South Africa Summer Time, GMT + 02: 00' },
        { key: 'Africa/Kigali', value: 'Africa / Kigali, Central African Summer Time, GMT + 02: 00' },
        { key: 'Africa/Lubumbashi', value: 'Africa / Lubumbashi, Central African Summer Time, GMT + 02: 00' },
        { key: 'Africa/Lusaka', value: 'Africa / Lusaka, Central African Summer Time, GMT + 02: 00' },
        { key: 'Africa/Maputo', value: 'Africa / Maputo, Central African Summer Time, GMT + 02: 00' },
        { key: 'Africa/Maseru', value: 'Africa / Maseru, South Africa Summer Time, GMT + 02: 00' },
        { key: 'Africa/Mbabane', value: 'Africa / Mbabane, South Africa Summer Time, GMT + 02: 00' },
        { key: 'Africa/Tripoli', value: 'Africa / Tripoli, Eastern European Summer Time, GMT + 02: 00' },
        { key: 'Asia/Amman', value: 'Asia / Amman, Eastern European Summer Time, GMT + 02: 00, DST' },
        { key: 'Asia/Beirut', value: 'Asia / Beirut, Eastern European Summer Time, GMT + 02: 00, DST' },
        { key: 'Asia/Damascus', value: 'Asia / Damascus, Eastern European Summer Time, GMT + 02: 00, DST' },
        { key: 'Asia/Gaza', value: 'Asia / Gaza, Eastern European Summer Time, GMT + 02: 00, DST' },
        { key: 'Asia/Hebron', value: 'Asia / Hebron, Eastern European Summer Time, GMT + 02: 00, DST' },
        { key: 'Asia/Jerusalem', value: 'Asia / Jerusalem, Israel Daylight Time, GMT + 02: 00, DST' },
        { key: 'Asia/Nicosia', value: 'Asia / Nicosia, Eastern European Summer Time, GMT + 02: 00, DST' },
        { key: 'Asia/Tel_Aviv', value: 'Asia / Tel Aviv, Israel Daylight Time, GMT + 02: 00, DST' },
        { key: 'CAT', value: 'CAT, Central African Summer Time, GMT + 02: 00' },
        { key: 'EET', value: 'EET, Eastern European Summer Time, GMT + 02: 00, DST' },
        { key: 'Egypt', value: 'Egypt, Eastern European Summer Time, GMT + 02: 00' },
        { key: 'Etc/GMT-2', value: 'Etc / GMT - 2, GMT + 02: 00' },
        { key: 'Europe/Athens', value: 'Europe / Athens, Eastern European Summer Time, GMT + 02: 00, DST' },
        {
            key: 'Europe/Bucharest',
            value: 'Europe / Bucharest, Eastern European Summer Time, GMT + 02: 00, DST'
        },
        { key: 'Europe/Chisinau', value: 'Europe / Chisinau, Eastern European Summer Time, GMT + 02: 00, DST' },
        { key: 'Europe/Helsinki', value: 'Europe / Helsinki, Eastern European Summer Time, GMT + 02: 00, DST' },
        { key: 'Europe/Kaliningrad', value: 'Europe / Kaliningrad, Eastern European Summer Time, GMT + 02: 00' },
        { key: 'Europe/Kiev', value: 'Europe / Kiev, Eastern European Summer Time, GMT + 02: 00, DST' },
        {
            key: 'Europe/Mariehamn',
            value: 'Europe / Mariehamn, Eastern European Summer Time, GMT + 02: 00, DST'
        },
        { key: 'Europe/Nicosia', value: 'Europe / Nicosia, Eastern European Summer Time, GMT + 02: 00, DST' },
        { key: 'Europe/Riga', value: 'Europe / Riga, Eastern European Summer Time, GMT + 02: 00, DST' },
        { key: 'Europe/Sofia', value: 'Europe / Sofia, Eastern European Summer Time, GMT + 02: 00, DST' },
        { key: 'Europe/Tallinn', value: 'Europe / Tallinn, Eastern European Summer Time, GMT + 02: 00, DST' },
        { key: 'Europe/Tiraspol', value: 'Europe / Tiraspol, Eastern European Summer Time, GMT + 02: 00, DST' },
        { key: 'Europe/Uzhgorod', value: 'Europe / Uzhgorod, Eastern European Summer Time, GMT + 02: 00, DST' },
        { key: 'Europe/Vilnius', value: 'Europe / Vilnius, Eastern European Summer Time, GMT + 02: 00, DST' },
        {
            key: 'Europe/Zaporozhye',
            value: 'Europe / Zaporozhye, Eastern European Summer Time, GMT + 02: 00, DST'
        },
        { key: 'Israel', value: 'Israel, Israel Daylight Time, GMT + 02: 00, DST' },
        { key: 'Libya', value: 'Libya, Eastern European Summer Time, GMT + 02: 00' },
        { key: 'Africa/Addis_Ababa', value: 'Africa / Addis Ababa, Eastern African Summer Time, GMT + 03: 00' },
        { key: 'Africa/Asmara', value: 'Africa / Asmara, Eastern African Summer Time, GMT + 03: 00' },
        { key: 'Africa/Asmera', value: 'Africa / Asmera, Eastern African Summer Time, GMT + 03: 00' },
        {
            key: 'Africa/Dar_es_Salaam',
            value: 'Africa / Dar es Salaam, Eastern African Summer Time, GMT + 03: 00'
        },
        { key: 'Africa/Djibouti', value: 'Africa / Djibouti, Eastern African Summer Time, GMT + 03: 00' },
        { key: 'Africa/Juba', value: 'Africa / Juba, Eastern African Summer Time, GMT + 03: 00' },
        { key: 'Africa/Kampala', value: 'Africa / Kampala, Eastern African Summer Time, GMT + 03: 00' },
        { key: 'Africa/Khartoum', value: 'Africa / Khartoum, Eastern African Summer Time, GMT + 03: 00' },
        { key: 'Africa/Mogadishu', value: 'Africa / Mogadishu, Eastern African Summer Time, GMT + 03: 00' },
        { key: 'Africa/Nairobi', value: 'Africa / Nairobi, Eastern African Summer Time, GMT + 03: 00' },
        { key: 'Antarctica/Syowa', value: 'Antarctica / Syowa, Syowa Summer Time, GMT + 03: 00' },
        { key: 'Asia/Aden', value: 'Asia / Aden, Arabia Daylight Time, GMT + 03: 00' },
        { key: 'Asia/Baghdad', value: 'Asia / Baghdad, Arabia Daylight Time, GMT + 03: 00' },
        { key: 'Asia/Bahrain', value: 'Asia / Bahrain, Arabia Daylight Time, GMT + 03: 00' },
        { key: 'Asia/Famagusta', value: 'Asia / Famagusta, GMT + 03: 00' },
        { key: 'Asia/Istanbul', value: 'Asia / Istanbul, Eastern European Summer Time, GMT + 03: 00' },
        { key: 'Asia/Kuwait', value: 'Asia / Kuwait, Arabia Daylight Time, GMT + 03: 00' },
        { key: 'Asia/Qatar', value: 'Asia / Qatar, Arabia Daylight Time, GMT + 03: 00' },
        { key: 'Asia/Riyadh', value: 'Asia / Riyadh, Arabia Daylight Time, GMT + 03: 00' },
        { key: 'EAT', value: 'EAT, Eastern African Summer Time, GMT + 03: 00' },
        { key: 'Etc/GMT-3', value: 'Etc / GMT - 3, GMT + 03: 00' },
        { key: 'Europe/Istanbul', value: 'Europe / Istanbul, Eastern European Summer Time, GMT + 03: 00' },
        { key: 'Europe/Kirov', value: 'Europe / Kirov, GMT + 03: 00' },
        { key: 'Europe/Minsk', value: 'Europe / Minsk, Moscow Daylight Time, GMT + 03: 00' },
        { key: 'Europe/Moscow', value: 'Europe / Moscow, Moscow Daylight Time, GMT + 03: 00' },
        { key: 'Europe/Simferopol', value: 'Europe / Simferopol, Moscow Daylight Time, GMT + 03: 00' },
        { key: 'Europe/Volgograd', value: 'Europe / Volgograd, Moscow Daylight Time, GMT + 03: 00' },
        { key: 'Indian/Antananarivo', value: 'Indian / Antananarivo, Eastern African Summer Time, GMT + 03: 00' },
        { key: 'Indian/Comoro', value: 'Indian / Comoro, Eastern African Summer Time, GMT + 03: 00' },
        { key: 'Indian/Mayotte', value: 'Indian / Mayotte, Eastern African Summer Time, GMT + 03: 00' },
        { key: 'Turkey', value: 'Turkey, Eastern European Summer Time, GMT + 03: 00' },
        { key: 'W-SU', value: 'W - SU, Moscow Daylight Time, GMT + 03: 00' },
        { key: 'Asia/Riyadh87', value: 'Asia / Riyadh87, GMT + 03: 07' },
        { key: 'Asia/Riyadh88', value: 'Asia / Riyadh88, GMT + 03: 07' },
        { key: 'Asia/Riyadh89', value: 'Asia / Riyadh89, GMT + 03: 07' },
        { key: 'Mideast/Riyadh87', value: 'Mideast / Riyadh87, GMT + 03: 07' },
        { key: 'Mideast/Riyadh88', value: 'Mideast / Riyadh88, GMT + 03: 07' },
        { key: 'Mideast/Riyadh89', value: 'Mideast / Riyadh89, GMT + 03: 07' },
        { key: 'Asia/Tehran', value: 'Asia / Tehran, Iran Daylight Time, GMT + 03: 30, DST' },
        { key: 'Iran', value: 'Iran, Iran Daylight Time, GMT + 03: 30, DST' },
        { key: 'Asia/Baku', value: 'Asia / Baku, Azerbaijan Summer Time, GMT + 04: 00' },
        { key: 'Asia/Dubai', value: 'Asia / Dubai, Gulf Daylight Time, GMT + 04: 00' },
        { key: 'Asia/Muscat', value: 'Asia / Muscat, Gulf Daylight Time, GMT + 04: 00' },
        { key: 'Asia/Tbilisi', value: 'Asia / Tbilisi, Georgia Summer Time, GMT + 04: 00' },
        { key: 'Asia/Yerevan', value: 'Asia / Yerevan, Armenia Summer Time, GMT + 04: 00' },
        { key: 'Etc/GMT-4', value: 'Etc / GMT - 4, GMT + 04: 00' },
        { key: 'Europe/Astrakhan', value: 'Europe / Astrakhan, GMT + 04: 00' },
        { key: 'Europe/Samara', value: 'Europe / Samara, Samara Summer Time, GMT + 04: 00' },
        { key: 'Europe/Saratov', value: 'Europe / Saratov, GMT + 04: 00' },
        { key: 'Europe/Ulyanovsk', value: 'Europe / Ulyanovsk, GMT + 04: 00' },
        { key: 'Indian/Mahe', value: 'Indian / Mahe, Seychelles Summer Time, GMT + 04: 00' },
        { key: 'Indian/Mauritius', value: 'Indian / Mauritius, Mauritius Summer Time, GMT + 04: 00' },
        { key: 'Indian/Reunion', value: 'Indian / Reunion, Reunion Summer Time, GMT + 04: 00' },
        { key: 'NET', value: 'NET, Armenia Summer Time, GMT + 04: 00' },
        { key: 'Asia/Kabul', value: 'Asia / Kabul, Afghanistan Summer Time, GMT + 04: 30' },
        { key: 'Antarctica/Mawson', value: 'Antarctica / Mawson, Mawson Summer Time, GMT + 05: 00' },
        { key: 'Asia/Aqtau', value: 'Asia / Aqtau, Aqtau Summer Time, GMT + 05: 00' },
        { key: 'Asia/Aqtobe', value: 'Asia / Aqtobe, Aqtobe Summer Time, GMT + 05: 00' },
        { key: 'Asia/Ashgabat', value: 'Asia / Ashgabat, Turkmenistan Summer Time, GMT + 05: 00' },
        { key: 'Asia/Ashkhabad', value: 'Asia / Ashkhabad, Turkmenistan Summer Time, GMT + 05: 00' },
        { key: 'Asia/Atyrau', value: 'Asia / Atyrau, GMT + 05: 00' },
        { key: 'Asia/Dushanbe', value: 'Asia / Dushanbe, Tajikistan Summer Time, GMT + 05: 00' },
        { key: 'Asia/Karachi', value: 'Asia / Karachi, Pakistan Summer Time, GMT + 05: 00' },
        { key: 'Asia/Oral', value: 'Asia / Oral, Oral Summer Time, GMT + 05: 00' },
        { key: 'Asia/Samarkand', value: 'Asia / Samarkand, Uzbekistan Summer Time, GMT + 05: 00' },
        { key: 'Asia/Tashkent', value: 'Asia / Tashkent, Uzbekistan Summer Time, GMT + 05: 00' },
        { key: 'Asia/Yekaterinburg', value: 'Asia / Yekaterinburg, Yekaterinburg Summer Time, GMT + 05: 00' },
        { key: 'Etc/GMT-5', value: 'Etc / GMT - 5, GMT + 05: 00' },
        {
            key: 'Indian/Kerguelen',
            value: 'Indian / Kerguelen, French Southern & amp; Antarctic Lands Summer Time, GMT + 05: 00'
        },
        { key: 'Indian/Maldives', value: 'Indian / Maldives, Maldives Summer Time, GMT + 05: 00' },
        { key: 'PLT', value: 'PLT, Pakistan Summer Time, GMT + 05: 00' },
        { key: 'Asia/Calcutta', value: 'Asia / Calcutta, India Daylight Time, GMT + 05: 30' },
        { key: 'Asia/Colombo', value: 'Asia / Colombo, India Daylight Time, GMT + 05: 30' },
        { key: 'Asia/Kolkata', value: 'Asia / Kolkata, India Daylight Time, GMT + 05: 30' },
        { key: 'IST', value: 'IST, India Daylight Time, GMT + 05: 30' },
        { key: 'Asia/Kathmandu', value: 'Asia / Kathmandu, Nepal Summer Time, GMT + 05: 45' },
        { key: 'Asia/Katmandu', value: 'Asia / Katmandu, Nepal Summer Time, GMT + 05: 45' },
        { key: 'Antarctica/Vostok', value: 'Antarctica / Vostok, Vostok Summer Time, GMT + 06: 00' },
        { key: 'Asia/Almaty', value: 'Asia / Almaty, Alma - Ata Summer Time, GMT + 06: 00' },
        {
            key: 'Asia/Bishkek',
            value: 'Asia / Bishkek, Kirgizstan Summer Time, GMT + 06: 00'
        },
        {
            key: 'Asia/Dacca',
            value: 'Asia / Dacca, Bangladesh Summer Time, GMT + 06: 00'
        },
        {
            key: 'Asia/Dhaka',
            value: 'Asia / Dhaka, Bangladesh Summer Time, GMT + 06: 00'
        },
        {
            key: 'Asia/Kashgar',
            value: 'Asia / Kashgar, Xinjiang Daylight Time, GMT + 06: 00'
        },
        {
            key: 'Asia/Omsk',
            value: 'Asia / Omsk, Omsk Summer Time, GMT + 06: 00'
        },
        {
            key: 'Asia/Qyzylorda',
            value: 'Asia / Qyzylorda, Qyzylorda Summer Time, GMT + 06: 00'
        },
        {
            key: 'Asia/Thimbu',
            value: 'Asia / Thimbu, Bhutan Summer Time, GMT + 06: 00'
        },
        {
            key: 'Asia/Thimphu',
            value: 'Asia / Thimphu, Bhutan Summer Time, GMT + 06: 00'
        },
        {
            key: 'Asia/Urumqi',
            value: 'Asia / Urumqi, Xinjiang Daylight Time, GMT + 06: 00'
        },
        {
            key: 'BST',
            value: 'BST, Bangladesh Summer Time, GMT + 06: 00'
        },
        {
            key: 'Etc/GMT-6',
            value: 'Etc / GMT - 6, GMT + 06: 00'
        },
        {
            key: 'Indian/Chagos',
            value: 'Indian / Chagos, Indian Ocean Territory Summer Time, GMT + 06: 00'
        },
        {
            key: 'Asia/Rangoon',
            value: 'Asia / Rangoon, Myanmar Summer Time, GMT + 06: 30'
        },
        {
            key: 'Asia/Yangon',
            value: 'Asia / Yangon, Myanmar Summer Time, GMT + 06: 30'
        },
        {
            key: 'Indian/Cocos',
            value: 'Indian / Cocos, Cocos Islands Summer Time, GMT + 06: 30'
        },
        {
            key: 'Antarctica/Davis',

            value: 'Antarctica / Davis, Davis Summer Time, GMT + 07: 00'
        },
        {
            key: 'Asia/Bangkok',
            value: 'Asia / Bangkok, Indochina Summer Time, GMT + 07: 00'
        },
        {
            key: 'Asia/Barnaul',
            value: 'Asia / Barnaul, GMT + 07: 00'
        },
        {
            key: 'Asia/Ho_Chi_Minh',
            value: 'Asia / Ho Chi Minh, Indochina Summer Time, GMT + 07: 00'
        },
        {
            key: 'Asia/Hovd',
            value: 'Asia / Hovd, Hovd Summer Time, GMT + 07: 00'
        },
        {
            key: 'Asia/Jakarta',
            value: 'Asia / Jakarta, West Indonesia Summer Time, GMT + 07: 00'
        },
        {
            key: 'Asia/Krasnoyarsk',
            value: 'Asia / Krasnoyarsk, Krasnoyarsk Summer Time, GMT + 07: 00'
        },
        {
            key: 'Asia/Novokuznetsk',
            value: 'Asia / Novokuznetsk, Krasnoyarsk Summer Time, GMT + 07: 00'
        },
        {
            key: 'Asia/Novosibirsk',
            value: 'Asia / Novosibirsk, Novosibirsk Summer Time, GMT + 07: 00'
        },
        {
            key: 'Asia/Phnom_Penh',
            value: 'Asia / Phnom Penh, Indochina Summer Time, GMT + 07: 00'
        },
        {
            key: 'Asia/Pontianak',
            value: 'Asia / Pontianak, West Indonesia Summer Time, GMT + 07: 00'
        },
        {
            key: 'Asia/Saigon',
            value: 'Asia / Saigon, Indochina Summer Time, GMT + 07: 00'
        },
        {
            key: 'Asia/Tomsk',
            value: 'Asia / Tomsk, GMT + 07: 00'
        },
        {
            key: 'Asia/Vientiane',
            value: 'Asia / Vientiane, Indochina Summer Time, GMT + 07: 00'
        },
        {
            key: 'Etc/GMT-7',

            value: 'Etc / GMT - 7, GMT + 07: 00'
        },
        {
            key: 'Indian/Christmas',
            value: 'Indian / Christmas, Christmas Island Summer Time, GMT + 07: 00'
        },
        {
            key: 'VST',
            value: 'VST, Indochina Summer Time, GMT + 07: 00'
        },
        {
            key: 'Asia/Brunei',
            value: 'Asia / Brunei, Brunei Summer Time, GMT + 08: 00'
        },
        {
            key: 'Asia/Choibalsan',
            value: 'Asia / Choibalsan, Choibalsan Summer Time, GMT + 08: 00'
        },
        {
            key: 'Asia/Chongqing',
            value: 'Asia / Chongqing, China Daylight Time, GMT + 08: 00'
        },
        {
            key: 'Asia/Chungking',
            value: 'Asia / Chungking, China Daylight Time, GMT + 08: 00'
        },
        {
            key: 'Asia/Harbin',
            value: 'Asia / Harbin, China Daylight Time, GMT + 08: 00'
        },
        {
            key: 'Asia/Hong_Kong',
            value: 'Asia / Hong Kong, Hong Kong Summer Time, GMT + 08: 00'
        },
        {
            key: 'Asia/Irkutsk',
            value: 'Asia / Irkutsk, Irkutsk Summer Time, GMT + 08: 00'
        },
        {
            key: 'Asia/Kuala_Lumpur',
            value: 'Asia / Kuala Lumpur, Malaysia Summer Time, GMT + 08: 00'
        },
        {
            key: 'Asia/Kuching',
            value: 'Asia / Kuching, Malaysia Summer Time, GMT + 08: 00'
        },
        {
            key: 'Asia/Macao',
            value: 'Asia / Macao, China Daylight Time, GMT + 08: 00'
        },
        {
            key: 'Asia/Macau',
            value: 'Asia / Macau, China Daylight Time, GMT + 08: 00'
        },
        {
            key: 'Asia/Makassar',
            value: 'Asia / Makassar, Central Indonesia Summer Time, GMT + 08: 00'
        },
        {
            key: 'Asia/Manila',
            value: 'Asia / Manila, Philippines Summer Time, GMT + 08: 00'
        },
        {
            key: 'Asia/Shanghai',

            value: 'Asia / Shanghai, China Daylight Time, GMT + 08: 00'
        },
        {
            key: 'Asia/Singapore',
            value: 'Asia / Singapore, Singapore Summer Time, GMT + 08: 00'
        },
        {
            key: 'Asia/Taipei',
            value: 'Asia / Taipei, China Daylight Time, GMT + 08: 00'
        },
        {
            key: 'Asia/Ujung_Pandang',
            value: 'Asia / Ujung Pandang, Central Indonesia Summer Time, GMT + 08: 00'
        },
        {
            key: 'Asia/Ulaanbaatar',
            value: 'Asia / Ulaanbaatar, Ulaanbaatar Summer Time, GMT + 08: 00'
        },
        {
            key: 'Asia/Ulan_Bator',
            value: 'Asia / Ulan Bator, Ulaanbaatar Summer Time, GMT + 08: 00'
        },
        {
            key: 'Australia/Perth',
            value: 'Australia / Perth, Australian Western Daylight Time, GMT + 08: 00'
        },
        {
            key: 'Australia/West',
            value: 'Australia / West, Australian Western Daylight Time, GMT + 08: 00'
        },
        {
            key: 'CTT',
            value: 'CTT, China Daylight Time, GMT + 08: 00'
        },
        {
            key: 'Etc/GMT-8',
            value: 'Etc / GMT - 8, GMT + 08: 00'
        },
        {
            key: 'Hongkong',
            value: 'Hongkong, Hong Kong Summer Time, GMT + 08: 00'
        },
        {
            key: 'PRC',
            value: 'PRC, China Daylight Time, GMT + 08: 00'
        },
        {
            key: 'Singapore',
            value: 'Singapore, Singapore Summer Time, GMT + 08: 00'
        },
        {
            key: 'Asia/Pyongyang',
            value: 'Asia / Pyongyang, Korea Daylight Time, GMT + 08: 30'
        },
        {
            key: 'Australia/Eucla',
            value: 'Australia / Eucla, Australian Central Western Daylight Time, GMT + 08: 45'
        },
        {
            key: 'Asia/Chita',
            value: 'Asia / Chita, Yakutsk Summer Time, GMT + 09: 00'
        },
        {
            key: 'Asia/Dili',
            value: 'Asia / Dili, Timor - Leste Summer Time, GMT + 09: 00'
        },
        {
            key: 'Asia/Jayapura',
            value: 'Asia / Jayapura, East Indonesia Summer Time, GMT + 09: 00'
        },
        {
            key: 'Asia/Khandyga',
            value: 'Asia / Khandyga, Yakutsk Summer Time, GMT + 09: 00'
        },
        {
            key: 'Asia/Seoul',
            value: 'Asia / Seoul, Korea Daylight Time, GMT + 09: 00'
        },
        {
            key: 'Asia/Tokyo',
            value: 'Asia / Tokyo, Japan Daylight Time, GMT + 09: 00'
        },
        {
            key: 'Asia/Yakutsk',
            value: 'Asia / Yakutsk, Yakutsk Summer Time, GMT + 09: 00'
        },
        {
            key: 'Etc/GMT-9',
            value: 'Etc / GMT - 9, GMT + 09: 00'
        },
        {
            key: 'JST',
            value: 'JST, Japan Daylight Time, GMT + 09: 00'
        },
        {
            key: 'Japan',
            value: 'Japan, Japan Daylight Time, GMT + 09: 00'
        },
        {
            key: 'Pacific/Palau',
            value: 'Pacific / Palau, Palau Summer Time, GMT + 09: 00'
        },
        {
            key: 'ROK',
            value: 'ROK, Korea Daylight Time, GMT + 09: 00'
        },
        {
            key: 'ACT',
            value: 'ACT, Australian Central Daylight Time(Northern Territory), GMT + 09: 30'
        },
        {
            key: 'Australia/Adelaide',
            value: 'Australia / Adelaide, Australian Central Daylight Time(South Australia), GMT + 09: 30, DST'
        },
        {
            key: 'Australia/Broken_Hill',
            value: 'Australia / Broken Hill, Australian Central Daylight Time(South Australia / New South Wales), GMT + 09: 30, DST'
        },
        {
            key: 'Australia/Darwin',
            value: 'Australia / Darwin, Australian Central Daylight Time(Northern Territory), GMT + 09: 30'
        },
        {
            key: 'Australia/North',
            value: 'Australia / North, Australian Central Daylight Time(Northern Territory), GMT + 09: 30'
        },
        {
            key: 'Australia/South',
            value: 'Australia / South, Australian Central Daylight Time(South Australia), GMT + 09: 30, DST'
        },
        {
            key: 'Australia/Yancowinna',
            value: 'Australia / Yancowinna, Australian Central Daylight Time(South Australia / New South Wales), GMT + 09: 30, DST'
        },
        {
            key: 'AET',
            value: 'AET, Australian Eastern Daylight Time(New South Wales), GMT + 10: 00, DST'
        },
        {
            key: 'Antarctica/DumontDUrville',
            value: 'Antarctica / DumontDUrville, Dumont - d\'Urville Summer Time, GMT + 10: 00'
        },
        {
            key: 'Asia/Ust-Nera',
            value: 'Asia / Ust - Nera, Ust - Nera Summer Time, GMT + 10: 00'
        },
        {
            key: 'Asia/Vladivostok',
            value: 'Asia / Vladivostok, Vladivostok Summer Time, GMT + 10: 00'
        },
        {
            key: 'Australia/ACT',
            value: 'Australia / ACT, Australian Eastern Daylight Time(New South Wales),GMT + 10: 00, DST'
        },
        {
            key: 'Australia/Brisbane',
            value: 'Australia / Brisbane, Australian Eastern Daylight Time(Queensland), GMT + 10: 00'
        },
        {
            key: 'Australia/Canberra',
            value: 'Australia / Canberra, Australian Eastern Daylight Time(New South Wales), GMT + 10: 00, DST'
        },
        {
            key: 'Australia/Currie',
            value: 'Australia / Currie, Australian Eastern Daylight Time(New South Wales), GMT + 10: 00, DST'
        },
        {
            key: 'Australia/Hobart',
            value: 'Australia / Hobart, Australian Eastern Daylight Time(Tasmania), GMT + 10: 00, DST'
        },
        {
            key: 'Australia/Lindeman',
            value: 'Australia / Lindeman, Australian Eastern Daylight Time(Queensland), GMT + 10: 00'
        },
        {
            key: 'Australia/Melbourne',
            value: 'Australia / Melbourne, Australian Eastern Daylight Time(Victoria), GMT + 10: 00, DST'
        },
        {
            key: 'Australia/NSW',
            value: 'Australia / NSW, Australian Eastern Daylight Time(New South Wales), GMT + 10: 00, DST'
        },
        {
            key: 'Australia/Queensland',
            value: 'Australia / Queensland, Australian Eastern Daylight Time (Queensland), GMT + 10: 00'
        },
        {
            key: 'Australia/Sydney',
            value: 'Australia / Sydney, Australian Eastern Daylight Time(New South Wales), GMT + 10: 00, DST'
        },
        {
            key: 'Australia/Tasmania',
            value: 'Australia / Tasmania, Australian Eastern Daylight Time(Tasmania), GMT + 10: 00, DST'
        },
        {
            key: 'Australia/Victoria',
            value: 'Australia / Victoria, Australian Eastern Daylight Time(Victoria), GMT + 10: 00, DST'
        },
        {
            key: 'Etc/GMT-10',
            value: 'Etc / GMT - 10, GMT + 10: 00'
        },
        {
            key: 'Pacific/Chuuk',
            value: 'Pacific / Chuuk, Chuuk Summer Time, GMT + 10: 00'
        },
        {
            key: 'Pacific/Guam',
            value: 'Pacific / Guam, Chamorro Daylight Time, GMT + 10: 00'
        },
        {
            key: 'Pacific/Port_Moresby',
            value: 'Pacific / Port Moresby, Papua New Guinea Summer Time, GMT + 10: 00'
        },
        {
            key: 'Pacific/Saipan',
            value: 'Pacific / Saipan, Chamorro Daylight Time, GMT + 10: 00'
        },
        {
            key: 'Pacific/Truk',
            value: 'Pacific / Truk, Chuuk Summer Time, GMT + 10: 00'
        },
        {
            key: 'Pacific/Yap',
            value: 'Pacific / Yap, Chuuk Summer Time, GMT + 10: 00'
        },
        {
            key: 'Australia/LHI',
            value: 'Australia / LHI, Lord Howe Daylight Time, GMT + 10: 30, DST'
        },
        {
            key: 'Australia/Lord_Howe',
            value: 'Australia / Lord Howe, Lord Howe Daylight Time, GMT + 10: 30, DST'
        },
        {
            key: 'Antarctica/Casey',
            value: 'Antarctica / Casey, Australian Western Daylight Time, GMT + 11: 00'
        },
        {
            key: 'Antarctica/Macquarie',
            value: 'Antarctica / Macquarie, Macquarie Island Daylight Time, GMT + 11: 00'
        },
        {
            key: 'Asia/Magadan',
            value: 'Asia / Magadan, Magadan Summer Time, GMT + 11: 00'
        },
        {
            key: 'Asia/Sakhalin',
            value: 'Asia / Sakhalin, Sakhalin Summer Time, GMT + 11: 00'
        },
        {
            key: 'Asia/Srednekolymsk',
            value: 'Asia / Srednekolymsk, Srednekolymsk Daylight Time, GMT + 11: 00'
        },
        {
            key: 'Etc/GMT-11',
            value: 'Etc / GMT - 11, GMT + 11: 00'
        },
        {
            key: 'Pacific/Bougainville',
            value: 'Pacific / Bougainville, Bougainville Daylight Time, GMT + 11: 00'
        },
        {
            key: 'Pacific/Efate',
            value: 'Pacific / Efate, Vanuatu Summer Time, GMT + 11: 00'
        },
        {
            key: 'Pacific/Guadalcanal',
            value: 'Pacific / Guadalcanal, Solomon Is.Summer Time, GMT + 11: 00'
        },
        {
            key: 'Pacific/Kosrae',
            value: 'Pacific / Kosrae, Kosrae Summer Time, GMT + 11: 00'
        },
        {
            key: 'Pacific/Norfolk',
            value: 'Pacific / Norfolk, Norfolk Summer Time, GMT + 11: 00'
        },
        {
            key: 'Pacific/Noumea',
            value: 'Pacific / Noumea, New Caledonia Summer Time, GMT + 11: 00'
        },
        {
            key: 'Pacific/Pohnpei',
            value: 'Pacific / Pohnpei, Pohnpei Summer Time, GMT + 11: 00'
        },
        {
            key: 'Pacific/Ponape',
            value: 'Pacific / Ponape, Pohnpei Summer Time, GMT + 11: 00'
        },
        {
            key: 'SST',
            value: 'SST, Solomon Is.Summer Time, GMT + 11: 00'
        },
        {
            key: 'Antarctica/McMurdo',
            value: 'Antarctica / McMurdo, New Zealand Daylight Time, GMT + 12: 00, DST'
        },
        {
            key: 'Antarctica/South_Pole',
            value: 'Antarctica / South Pole, New Zealand Daylight Time, GMT + 12: 00, DST'
        },
        {
            key: 'Asia/Anadyr',
            value: 'Asia / Anadyr, Anadyr Summer Time, GMT + 12: 00'
        },
        {
            key: 'Asia/Kamchatka',
            value: 'Asia / Kamchatka, Petropavlovsk - Kamchatski Summer Time, GMT + 12: 00'
        },
        {
            key: 'Etc/GMT-12',
            value: 'Etc / GMT - 12, GMT + 12: 00'
        },
        {
            key: 'Kwajalein',
            value: 'Kwajalein, Marshall Islands Summer Time, GMT + 12: 00'
        },
        {
            key: 'NST',
            value: 'NST, New Zealand Daylight Time, GMT + 12: 00, DST'
        },
        {
            key: 'NZ',
            value: 'NZ, New Zealand Daylight Time, GMT + 12: 00, DST'
        },
        {
            key: 'Pacific/Auckland',
            value: 'Pacific / Auckland, New Zealand Daylight Time, GMT + 12: 00, DST'
        },
        {
            key: 'Pacific/Fiji',
            value: 'Pacific / Fiji, Fiji Summer Time, GMT + 12: 00, DST'
        },
        {
            key: 'Pacific/Funafuti',
            value: 'Pacific / Funafuti, Tuvalu Summer Time, GMT + 12: 00'
        },
        {
            key: 'Pacific/Kwajalein',
            value: 'Pacific / Kwajalein, Marshall Islands Summer Time, GMT + 12: 00'
        },
        {
            key: 'Pacific/Majuro',
            value: 'Pacific / Majuro, Marshall Islands Summer Time, GMT + 12: 00'
        },
        {
            key: 'Pacific/Nauru',
            value: 'Pacific / Nauru, Nauru Summer Time, GMT + 12: 00'
        },
        {
            key: 'Pacific/Tarawa',
            value: 'Pacific / Tarawa, Gilbert Is.Summer Time, GMT + 12: 00'
        },
        {
            key: 'Pacific/Wake',
            value: 'Pacific / Wake, Wake Summer Time, GMT + 12: 00'
        },
        {
            key: 'Pacific/Wallis',
            value: 'Pacific / Wallis, Wallis & amp; Futuna Summer Time, GMT + 12: 00'
        },
        {
            key: 'NZ-CHAT',
            value: 'NZ - CHAT, Chatham Daylight Time, GMT + 12: 45, DST'
        },
        {
            key: 'Pacific/Chatham',
            value: 'Pacific / Chatham, Chatham Daylight Time, GMT + 12: 45, DST'
        },
        {
            key: 'Etc/GMT-13',
            value: 'Etc / GMT - 13, GMT + 13: 00'
        },
        {
            key: 'MIT',
            value: 'MIT, West Samoa Daylight Time, GMT + 13: 00, DST'
        },
        {
            key: 'Pacific/Apia',
            value: 'Pacific / Apia, West Samoa Daylight Time, GMT + 13: 00, DST'
        },
        {
            key: 'Pacific/Enderbury',
            value: 'Pacific / Enderbury, Phoenix Is.Summer Time, GMT + 13: 00'
        },
        {
            key: 'Pacific/Fakaofo',
            value: 'Pacific / Fakaofo, Tokelau Summer Time, GMT + 13: 00'
        },
        {
            key: 'Pacific/Tongatapu',
            value: 'Pacific / Tongatapu, Tonga Summer Time, GMT + 13: 00, DST'
        },
        {
            key: 'Etc/GMT-14',
            value: 'Etc / GMT - 14, GMT + 14: 00'
        },
        {
            key: 'Pacific/Kiritimati',
            value: 'Pacific / Kiritimati, Line Is.Summer Time, GMT + 14: 00'
        },
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
        { key: 'LT_1750', value: '&lt; 1750 sf' },
        { key: 'LT_3500', value: '&gt; 1750 sf and &lt; 3500 sf' },
        { key: 'GT_3500', value: '&gt; 3500 sf' },
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
        { key: 'factorCode', sort: 'factorCode', displayName: 'Factor Code' },
        { key: 'place', sort: 'place', displayName: 'Place' },
        { key: 'year', sort: 'year', displayName: 'Year' },
        { key: 'name', sort: 'name', displayName: 'Name' },
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
        { key: 'lookupCode', sort: 'lookupCode', displayName: 'Lookup Code' },
        { key: 'lookupName', sort: 'lookupName', displayName: 'Lookup Name' },
        { key: 'defaultValue', sort: 'defaultValue', displayName: 'Default Value' },
    ];

    static readonly LOOKUP_VALUE_KEYS: Array<TABLECOLUMN> = [
        { key: 'lookupValue', displayName: 'Lookup Value' },
        { key: 'valueName', displayName: 'Value Name' },
    ];

    static readonly SYSTEM_PARAMETER_KEYS: Array<TABLECOLUMN> = [
        { key: 'parameterCode', sort: 'parameterCode', displayName: 'Parameter Code' },
        { key: 'description', sort: 'description', displayName: 'Description' },
        { key: 'parameterValue', sort: 'parameterValue', displayName: 'Parameter Value' },
        { key: 'format', sort: 'format', displayName: 'Format' },
    ];

    static readonly WEATHER_STATION_KEYS: Array<TABLECOLUMN> = [
        { key: 'stationId', sort: 'stationId', displayName: 'Station Id' },
        { key: 'stationName', sort: 'stationName', displayName: 'Station Name' },
    ];

    static readonly LOGS_KEYS: Array<TABLECOLUMN> = [
        { key: 'username', sort: 'username', displayName: 'Username' },
        { key: 'recordType', sort: 'recordType', displayName: 'Record Type' },
        { key: 'comment', sort: 'comment', displayName: 'Comment' },
        { key: 'entry', sort: 'entry', displayName: 'Entity' },
        { key: 'logDate', sort: 'logDate', displayName: 'Log Date' }
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
        { key: 'stationId', sort: 'stationId', displayName: 'Station ID' },
        { key: 'type', sort: 'type', displayName: 'Type' },
        { key: 'date', sort: 'date', displayName: 'Date' },
        { key: 'baseTemperature', sort: 'baseTemperature', displayName: 'Base Temprature' },
        { key: 'degreeDays', sort: 'degreeDays', displayName: 'Degree Days' },
    ];

    static readonly CIMIS_STATION_KEY: Array<TABLECOLUMN> = [
        { key: 'stationNumber', sort: 'stationNumber', displayName: 'Station Number', isEdit: true },
        { key: 'stationName', sort: 'stationName', displayName: 'Station Name' },
        { key: 'active', sort: 'active', displayName: 'Active' }
    ];

    static readonly CIMIS_MEASUREMENTS_KEY: Array<TABLECOLUMN> = [
        { key: 'stationNumber', sort: 'stationNumber', displayName: 'Station Number' },
        { key: 'date', sort: 'date', displayName: 'Date' },
        { key: 'hour', sort: 'hour', displayName: 'Hour' },
        { key: 'irradiance', displayName: 'Irradiance' }
    ];

    static readonly CIMIS_STATION_DATA: Array<any> = [
        { key: '2', value: '2 - FivePoints' },
        { key: '5', value: '5 - Shafter' },
        { key: '6', value: '6 - Davis' },
        { key: '7', value: '7 - Firebaugh / Telles' },
        { key: '12', value: '12 - Durham' },
        { key: '13', value: '13 - Camino' },
        { key: '15', value: '15 - Stratford' },
        { key: '35', value: '35 - Bishop' },
        { key: '39', value: '39 - Parlier' },
        { key: '41', value: '41 - Calipatria / Mulberry' },
        { key: '43', value: '43 - McArthur' },
        { key: '44', value: '44 - U.C.Riverside' },
        { key: '47', value: '47 - Brentwood' },
        { key: '52', value: '52 - San Luis Obispo' },
        { key: '54', value: '54 - Blackwells Corner' },
        { key: '56', value: '56 - Los Banos' },
        { key: '57', value: '57 - Buntingville' },
        { key: '62', value: '62 - Temecula' },
        { key: '64', value: '64 - Santa Ynez' },
        { key: '68', value: '68 - Seeley' },
        { key: '70', value: '70 - Manteca' },
        { key: '71', value: '71 - Modesto' },
        { key: '75', value: '75 - Irvine' },
        { key: '77', value: '77 - Oakville' },
        { key: '78', value: '78 - Pomona' },
        { key: '80', value: '80 - Fresno State' },
        { key: '83', value: '83 - Santa Rosa' },
        { key: '84', value: '84 - Browns Valley' },
        { key: '86', value: '86 - Lindcove' },
        { key: '87', value: '87 - Meloland' },
        { key: '88', value: '88 - Cuyama' },
        { key: '90', value: '90 - Alturas' },
        { key: '91', value: '91 - Tulelake FS' },
        { key: '92', value: '92 - Kesterson' },
        { key: '99', value: '99 - Santa Monica' },
        { key: '103', value: '103 - Windsor' },
        { key: '104', value: '104 - De Laveaga' },
        { key: '105', value: '105 - Westlands' },
        { key: '106', value: '106 - Sanel Valley' },
        { key: '107', value: '107 - Santa Barbara' },
        { key: '109', value: '109 - Carneros' },
        { key: '111', value: '111 - Green Valley Road' },
        { key: '113', value: '113 - King City - Oasis Rd.' },
        { key: '114', value: '114 - Arroyo Seco' },
        { key: '116', value: '116 - Salinas North' },
        { key: '117', value: '117 - Victorville' },
        { key: '121', value: '121 - Dixon' },
        { key: '124', value: '124 - Panoche' },
        { key: '125', value: '125 - Arvin - Edison' },
        { key: '126', value: '126 - San Benito' },
        { key: '129', value: '129 - Pajaro' },
        { key: '131', value: '131 - Fair Oaks' },
        { key: '135', value: '135 - Blythe NE' },
        { key: '136', value: '136 - Oasis' },
        { key: '139', value: '139 - Winters' },
        { key: '140', value: '140 - Twitchell Island' },
        { key: '142', value: '142 - Orange Cove' },
        { key: '143', value: '143 - San Juan Valley' },
        { key: '144', value: '144 - Petaluma East' },
        { key: '146', value: '146 - Belridge' },
        { key: '147', value: '147 - Otay Lake' },
        { key: '148', value: '148 - Merced' },
        { key: '150', value: '150 - Miramar' },
        { key: '151', value: '151 - Ripley' },
        { key: '152', value: '152 - Camarillo' },
        { key: '153', value: '153 - Escondido SPV' },
        { key: '155', value: '155 - Bryte(experimental)' },
        { key: '157', value: '157 - Point San Pedro' },
        { key: '158', value: '158 - Bennett Valley' },
        { key: '159', value: '159 - Monrovia' },
        { key: '160', value: '160 - San Luis Obispo West' },
        { key: '163', value: '163 - Atascadero' },
        { key: '165', value: '165 - Sisquoc' },
        { key: '169', value: '169 - Porterville' },
        { key: '170', value: '170 - Concord' },
        { key: '171', value: '171 - Union City' },
        { key: '173', value: '173 - Torrey Pines' },
        { key: '174', value: '174 - Long Beach' },
        { key: '175', value: '175 - Palo Verde II' },
        { key: '178', value: '178 - Moraga' },
        { key: '179', value: '179 - Winchester' },
        { key: '181', value: '181 - Westmorland North' },
        { key: '182', value: '182 - Delano' },
        { key: '183', value: '183 - Owens Lake North' },
        { key: '184', value: '184 - San Diego II' },
        { key: '187', value: '187 - Black Point' },
        { key: '189', value: '189 - Owens Lake South' },
        { key: '191', value: '191 - Pleasanton' },
        { key: '192', value: '192 - Lake Arrowhead' },
        { key: '193', value: '193 - Pacific Grove' },
        { key: '194', value: '194 - Oakdale' },
        { key: '195', value: '195 - Auburn' },
        { key: '197', value: '197 - Palmdale' },
        { key: '198', value: '198 - Santa Paula' },
        { key: '199', value: '199 - Big Bear Lake' },
        { key: '200', value: '200 - Indio 2' },
        { key: '202', value: '202 - Nipomo' },
        { key: '204', value: '204 - Santa Clarita' },
        { key: '205', value: '205 - Coalinga' },
        { key: '206', value: '206 - Denair II' },
        { key: '207', value: '207 - Borrego Springs' },
        { key: '208', value: '208 - La Quinta II' },
        { key: '209', value: '209 - Watsonville West II' },
        { key: '210', value: '210 - Carmel' },
        { key: '211', value: '211 - Gilroy' },
        { key: '212', value: '212 - Hastings Tract East' },
        { key: '213', value: '213 - El Cerrito' },
        { key: '214', value: '214 - Salinas South II' },
        { key: '215', value: '215 - Chatsworth' },
        { key: '216', value: '216 - Arleta' },
        { key: '217', value: '217 - Moorpark' },
        { key: '218', value: '218 - Thermal South' },
        { key: '219', value: '219 - West Hills' },
        { key: '220', value: '220 - Palmdale Central' },
        { key: '221', value: '221 - Cadiz Valley' },
        { key: '222', value: '222 - Gerber South' },
        { key: '223', value: '223 - North Hollywood' },
        { key: '224', value: '224 - Shasta College' },
        { key: '225', value: '225 - Scott Valley' },
        { key: '226', value: '226 - Woodland' },
        { key: '227', value: '227 - Plymouth' },
        { key: '228', value: '228 - Diamond Springs' },
        { key: '229', value: '229 - Laguna Seca' },
        { key: '231', value: '231 - Lompoc' },
        { key: '232', value: '232 - Santa Maria II' },
        { key: '233', value: '233 - Joshua Tree' },
        { key: '234', value: '234 - Newberry Springs II' },
        { key: '235', value: '235 - Verona' },
        { key: '236', value: '236 - Macdoel II' },
        { key: '237', value: '237 - Temecula East III' },
        { key: '239', value: '239 - Hemet' },
        { key: '240', value: '240 - Perris - Menifee' },
        { key: '241', value: '241 - San Clemente' },
        { key: '242', value: '242 - Staten Island' },
        { key: '243', value: '243 - Ryde' },
        { key: '244', value: '244 - Biggs' },
        { key: '245', value: '245 - Coto de Caza' },
        { key: '246', value: '246 - Markleeville' },
        { key: '247', value: '247 - Jersey Island' },
        { key: '248', value: '248 - Holt' },
        { key: '249', value: '249 - Ripon' },
        { key: '250', value: '250 - Williams' },
        { key: '251', value: '251 - Highland' },
        { key: '252', value: '252 - Soledad II' },
        { key: '253', value: '253 - Pescadero' },
        { key: '254', value: '254 - Oakland Metro' },
        { key: '255', value: '255 - Chino' },
        { key: '256', value: '256 - Lancaster' },
        { key: '257', value: '257 - Ridgecrest' },
        { key: '258', value: '258 - Lemon Cove' },
        { key: '259', value: '259 - Ferndale Plain' },
        { key: '260', value: '260 - Montague' },
        { key: '261', value: '261 - Gazelle' },
        { key: '262', value: '262 - Linden' },
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
        { key: 'id', sort: 'id', displayName: 'Id' },
        { key: 'target', sort: 'target', displayName: 'Target' },
        { key: 'alertType', sort: 'alertType', displayName: 'Alert Type' },
        { key: 'alertLevel', sort: 'alertLevel', displayName: 'Alert Level' },
        { key: 'message', sort: 'message', displayName: 'Message' },
        { key: 'createdDate', sort: 'createdDate', displayName: 'Created Date' },
        { key: 'active', displayName: 'Active' },
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
        { key: 'id', sort: 'id', displayName: 'ID', isEdit: true },
        { key: 'mailName', sort: 'mailName', displayName: 'Mail Name' },
        { key: 'period', sort: 'period', displayName: 'Period' },
        { key: 'periodDay', sort: 'periodDay', displayName: 'Period' },
        { key: 'runtime', sort: 'runtime', displayName: 'Runtime' },
        { key: 'subject', sort: 'subject', displayName: 'Subject' },
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

    static readonly CUSTOMER_GROUP_DATA: any[] = [
        { key: '', value: '' },
        { key: '1', value: 'CEC' },
        { key: '2', value: 'EUMV' },
        { key: '5', value: 'HEA' },
        { key: '6', value: 'Vermont VEIC (disabled)' },
        { key: '7', value: 'Home Energy Tuneup' },
        { key: '8', value: 'Test Accounts' },
        { key: '9', value: 'Alameda' },
        { key: '10', value: 'PG&amp;E Direct Pay (disabled)' },
        { key: '11', value: 'SVEW (disabled)' },
        { key: '12', value: 'CalWater (disabled)' },
        { key: '13', value: 'Claremont' },
        { key: '14', value: 'Purissima Water (disabled)' },
        { key: '15', value: 'Energy Fitness (disabled)' },
        { key: '16', value: 'Dr Power' },
        { key: '17', value: 'Pay for Performance' },
        { key: '18', value: 'Sunnyvale Green At Home (disabled)' },
        { key: '20', value: 'ConSol PG&amp;E' },
        { key: '23', value: 'SC High Energy' },
        { key: '24', value: 'Rising Sun' }
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
        { key: 'pageName', sort: 'pageName', displayName: 'Page Name' },
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
