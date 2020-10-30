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
}
