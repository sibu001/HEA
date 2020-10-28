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
        { 'zone': 'Pacific/Midway', 'gmt': '(GMT-11:00)', 'name': 'Midway Island' },
        { 'zone': 'US/Samoa', 'gmt': '(GMT-11:00)', 'name': 'Samoa' },
        { 'zone': 'US/Hawaii', 'gmt': '(GMT-10:00)', 'name': 'Hawaii' },
        { 'zone': 'US/Alaska', 'gmt': '(GMT-09:00)', 'name': 'Alaska' },
        { 'zone': 'US/Pacific', 'gmt': '(GMT-08:00)', 'name': 'Pacific Time (US &amp; Canada)' },
        { 'zone': 'America/Tijuana', 'gmt': '(GMT-08:00)', 'name': 'Tijuana' },
        { 'zone': 'US/Arizona', 'gmt': '(GMT-07:00)', 'name': 'Arizona' },
        { 'zone': 'US/Mountain', 'gmt': '(GMT-07:00)', 'name': 'Mountain Time (US &amp; Canada)' },
        { 'zone': 'America/Chihuahua', 'gmt': '(GMT-07:00)', 'name': 'Chihuahua' },
        { 'zone': 'America/Mazatlan', 'gmt': '(GMT-07:00)', 'name': 'Mazatlan' },
        { 'zone': 'America/Mexico_City', 'gmt': '(GMT-06:00)', 'name': 'Mexico City' },
        { 'zone': 'America/Monterrey', 'gmt': '(GMT-06:00)', 'name': 'Monterrey' },
        { 'zone': 'Canada/Saskatchewan', 'gmt': '(GMT-06:00)', 'name': 'Saskatchewan' },
        { 'zone': 'US/Central', 'gmt': '(GMT-06:00)', 'name': 'Central Time (US &amp; Canada)' },
        { 'zone': 'US/Eastern', 'gmt': '(GMT-05:00)', 'name': 'Eastern Time (US &amp; Canada)' },
        { 'zone': 'US/East-Indiana', 'gmt': '(GMT-05:00)', 'name': 'Indiana (East)' },
        { 'zone': 'America/Bogota', 'gmt': '(GMT-05:00)', 'name': 'Bogota' },
        { 'zone': 'America/Lima', 'gmt': '(GMT-05:00)', 'name': 'Lima' },
        { 'zone': 'America/Caracas', 'gmt': '(GMT-04:30)', 'name': 'Caracas' },
        { 'zone': 'Canada/Atlantic', 'gmt': '(GMT-04:00)', 'name': 'Atlantic Time (Canada)' },
        { 'zone': 'America/La_Paz', 'gmt': '(GMT-04:00)', 'name': 'La_Paz' },
        { 'zone': 'America/Santiago', 'gmt': '(GMT-04:00)', 'name': 'Santiago' },
        { 'zone': 'Canada/Newfoundland', 'gmt': '(GMT-03:30)', 'name': 'Newfoundland' },
        { 'zone': 'America/Buenos_Aires', 'gmt': '(GMT-03:00)', 'name': 'Buenos Aires' },
        { 'zone': 'Greenland', 'gmt': '(GMT-03:00)', 'name': 'Greenland' },
        { 'zone': 'Atlantic/Stanley', 'gmt': '(GMT-02:00)', 'name': 'Stanley' },
        { 'zone': 'Atlantic/Azores', 'gmt': '(GMT-01:00)', 'name': 'Azores' },
        { 'zone': 'Atlantic/Cape_Verde', 'gmt': '(GMT-01:00)', 'name': 'Cape Verde Is.' },
        { 'zone': 'Africa/Casablanca', 'gmt': '(GMT)', 'name': 'Casablanca' },
        { 'zone': 'Europe/Dublin', 'gmt': '(GMT)', 'name': 'Dublin' },
        { 'zone': 'Europe/Lisbon', 'gmt': '(GMT)', 'name': 'Libson' },
        { 'zone': 'Europe/London', 'gmt': '(GMT)', 'name': 'London' },
        { 'zone': 'Africa/Monrovia', 'gmt': '(GMT)', 'name': 'Monrovia' },
        { 'zone': 'Europe/Amsterdam', 'gmt': '(GMT+01:00)', 'name': 'Amsterdam' },
        { 'zone': 'Europe/Belgrade', 'gmt': '(GMT+01:00)', 'name': 'Belgrade' },
        { 'zone': 'Europe/Berlin', 'gmt': '(GMT+01:00)', 'name': 'Berlin' },
        { 'zone': 'Europe/Bratislava', 'gmt': '(GMT+01:00)', 'name': 'Bratislava' },
        { 'zone': 'Europe/Brussels', 'gmt': '(GMT+01:00)', 'name': 'Brussels' },
        { 'zone': 'Europe/Budapest', 'gmt': '(GMT+01:00)', 'name': 'Budapest' },
        { 'zone': 'Europe/Copenhagen', 'gmt': '(GMT+01:00)', 'name': 'Copenhagen' },
        { 'zone': 'Europe/Ljubljana', 'gmt': '(GMT+01:00)', 'name': 'Ljubljana' },
        { 'zone': 'Europe/Madrid', 'gmt': '(GMT+01:00)', 'name': 'Madrid' },
        { 'zone': 'Europe/Paris', 'gmt': '(GMT+01:00)', 'name': 'Paris' },
        { 'zone': 'Europe/Prague', 'gmt': '(GMT+01:00)', 'name': 'Prague' },
        { 'zone': 'Europe/Rome', 'gmt': '(GMT+01:00)', 'name': 'Rome' },
        { 'zone': 'Europe/Sarajevo', 'gmt': '(GMT+01:00)', 'name': 'Sarajevo' },
        { 'zone': 'Europe/Skopje', 'gmt': '(GMT+01:00)', 'name': 'Skopje' },
        { 'zone': 'Europe/Stockholm', 'gmt': '(GMT+01:00)', 'name': 'Stockholm' },
        { 'zone': 'Europe/Vienna', 'gmt': '(GMT+01:00)', 'name': 'Vienna' },
        { 'zone': 'Europe/Warsaw', 'gmt': '(GMT+01:00)', 'name': 'Warsaw' },
        { 'zone': 'Europe/Zagreb', 'gmt': '(GMT+01:00)', 'name': 'Zagreb' },
        { 'zone': 'Europe/Athens', 'gmt': '(GMT+02:00)', 'name': 'Athens' },
        { 'zone': 'Europe/Bucharest', 'gmt': '(GMT+02:00)', 'name': 'Bucharest' },
        { 'zone': 'Africa/Cairo', 'gmt': '(GMT+02:00)', 'name': 'Cairo' },
        { 'zone': 'Africa/Harare', 'gmt': '(GMT+02:00)', 'name': 'Harare' },
        { 'zone': 'Europe/Helsinki', 'gmt': '(GMT+02:00)', 'name': 'Helsinki' },
        { 'zone': 'Europe/Istanbul', 'gmt': '(GMT+02:00)', 'name': 'Istanbul' },
        { 'zone': 'Asia/Jerusalem', 'gmt': '(GMT+02:00)', 'name': 'Jerusalem' },
        { 'zone': 'Europe/Kiev', 'gmt': '(GMT+02:00)', 'name': 'Kiev' },
        { 'zone': 'Europe/Minsk', 'gmt': '(GMT+02:00)', 'name': 'Minsk' },
        { 'zone': 'Europe/Riga', 'gmt': '(GMT+02:00)', 'name': 'Riga' },
        { 'zone': 'Europe/Sofia', 'gmt': '(GMT+02:00)', 'name': 'Sofia' },
        { 'zone': 'Europe/Tallinn', 'gmt': '(GMT+02:00)', 'name': 'Tallinn' },
        { 'zone': 'Europe/Vilnius', 'gmt': '(GMT+02:00)', 'name': 'Vilnius' },
        { 'zone': 'Asia/Baghdad', 'gmt': '(GMT+03:00)', 'name': 'Baghdad' },
        { 'zone': 'Asia/Kuwait', 'gmt': '(GMT+03:00)', 'name': 'Kuwait' },
        { 'zone': 'Africa/Nairobi', 'gmt': '(GMT+03:00)', 'name': 'Nairobi' },
        { 'zone': 'Asia/Riyadh', 'gmt': '(GMT+03:00)', 'name': 'Riyadh' },
        { 'zone': 'Asia/Tehran', 'gmt': '(GMT+03:30)', 'name': 'Tehran' },
        { 'zone': 'Europe/Moscow', 'gmt': '(GMT+04:00)', 'name': 'Moscow' },
        { 'zone': 'Asia/Baku', 'gmt': '(GMT+04:00)', 'name': 'Baku' },
        { 'zone': 'Europe/Volgograd', 'gmt': '(GMT+04:00)', 'name': 'Volgograd' },
        { 'zone': 'Asia/Muscat', 'gmt': '(GMT+04:00)', 'name': 'Muscat' },
        { 'zone': 'Asia/Tbilisi', 'gmt': '(GMT+04:00)', 'name': 'Tbilisi' },
        { 'zone': 'Asia/Yerevan', 'gmt': '(GMT+04:00)', 'name': 'Yerevan' },
        { 'zone': 'Asia/Kabul', 'gmt': '(GMT+04:30)', 'name': 'Kabul' },
        { 'zone': 'Asia/Karachi', 'gmt': '(GMT+05:00)', 'name': 'Karachi' },
        { 'zone': 'Asia/Tashkent', 'gmt': '(GMT+05:00)', 'name': 'Tashkent' },
        { 'zone': 'Asia/Kolkata', 'gmt': '(GMT+05:30)', 'name': 'Kolkata' },
        { 'zone': 'Asia/Kathmandu', 'gmt': '(GMT+05:45)', 'name': 'Kathmandu' },
        { 'zone': 'Asia/Yekaterinburg', 'gmt': '(GMT+06:00)', 'name': 'Yekaterinburg' },
        { 'zone': 'Asia/Almaty', 'gmt': '(GMT+06:00)', 'name': 'Almaty' },
        { 'zone': 'Asia/Dhaka', 'gmt': '(GMT+06:00)', 'name': 'Dhaka' },
        { 'zone': 'Asia/Novosibirsk', 'gmt': '(GMT+07:00)', 'name': 'Novosibirsk' },
        { 'zone': 'Asia/Bangkok', 'gmt': '(GMT+07:00)', 'name': 'Bangkok' },
        { 'zone': 'Asia/Jakarta', 'gmt': '(GMT+07:00)', 'name': 'Jakarta' },
        { 'zone': 'Asia/Krasnoyarsk', 'gmt': '(GMT+08:00)', 'name': 'Krasnoyarsk' },
        { 'zone': 'Asia/Chongqing', 'gmt': '(GMT+08:00)', 'name': 'Chongqing' },
        { 'zone': 'Asia/Hong_Kong', 'gmt': '(GMT+08:00)', 'name': 'Hong Kong' },
        { 'zone': 'Asia/Kuala_Lumpur', 'gmt': '(GMT+08:00)', 'name': 'Kuala Lumpur' },
        { 'zone': 'Australia/Perth', 'gmt': '(GMT+08:00)', 'name': 'Perth' },
        { 'zone': 'Asia/Singapore', 'gmt': '(GMT+08:00)', 'name': 'Singapore' },
        { 'zone': 'Asia/Taipei', 'gmt': '(GMT+08:00)', 'name': 'Taipei' },
        { 'zone': 'Asia/Ulaanbaatar', 'gmt': '(GMT+08:00)', 'name': 'Ulaan Bataar' },
        { 'zone': 'Asia/Urumqi', 'gmt': '(GMT+08:00)', 'name': 'Urumqi' },
        { 'zone': 'Asia/Irkutsk', 'gmt': '(GMT+09:00)', 'name': 'Irkutsk' },
        { 'zone': 'Asia/Seoul', 'gmt': '(GMT+09:00)', 'name': 'Seoul' },
        { 'zone': 'Asia/Tokyo', 'gmt': '(GMT+09:00)', 'name': 'Tokyo' },
        { 'zone': 'Australia/Adelaide', 'gmt': '(GMT+09:30)', 'name': 'Adelaide' },
        { 'zone': 'Australia/Darwin', 'gmt': '(GMT+09:30)', 'name': 'Darwin' },
        { 'zone': 'Asia/Yakutsk', 'gmt': '(GMT+10:00)', 'name': 'Yakutsk' },
        { 'zone': 'Australia/Brisbane', 'gmt': '(GMT+10:00)', 'name': 'Brisbane' },
        { 'zone': 'Australia/Canberra', 'gmt': '(GMT+10:00)', 'name': 'Canberra' },
        { 'zone': 'Pacific/Guam', 'gmt': '(GMT+10:00)', 'name': 'Guam' },
        { 'zone': 'Australia/Hobart', 'gmt': '(GMT+10:00)', 'name': 'Hobart' },
        { 'zone': 'Australia/Melbourne', 'gmt': '(GMT+10:00)', 'name': 'Melbourne' },
        { 'zone': 'Pacific/Port_Moresby', 'gmt': '(GMT+10:00)', 'name': 'Port Moresby' },
        { 'zone': 'Australia/Sydney', 'gmt': '(GMT+10:00)', 'name': 'Sydney' },
        { 'zone': 'Asia/Vladivostok', 'gmt': '(GMT+11:00)', 'name': 'Vladivostok' },
        { 'zone': 'Asia/Magadan', 'gmt': '(GMT+12:00)', 'name': 'Magadan' },
        { 'zone': 'Pacific/Auckland', 'gmt': '(GMT+12:00)', 'name': 'Auckland' },
        { 'zone': 'Pacific/Fiji', 'gmt': '(GMT+12:00)', 'name': 'Fiji' }
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
    ]
}
