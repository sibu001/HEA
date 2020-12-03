export enum SystemActionTypes {
    GET_PLACE_LIST = 'Get All Place List',
    GET_PLACE_BY_ID = 'Get Place By Id',
    UPDATE_PLACE = 'Update Place',
    SAVE_PLACE = 'Save Place',
    DELETE_PLACE_BY_ID = 'Delete Place By Id',
    GET_CUSTOMER_EVENT_TYPE_LIST = 'Get All Customer Event Type List',
    GET_CUSTOMER_EVENT_TYPE_COUNT = 'Get Customer Event Type Count',
    GET_CUSTOMER_EVENT_TYPE_BY_ID = 'Get Customer Event Type By Id',
    UPDATE_CUSTOMER_EVENT_TYPE = 'Update Customer Event Type',
    SAVE_CUSTOMER_EVENT_TYPE = 'Save Customer Event Type',
    DELETE_CUSTOMER_EVENT_TYPE_BY_ID = 'Delete Customer Event Type By Id',
    GET_CUSTOMER_COMPARISON_GROUP_LIST = 'Get All Customer Comparison Group List',
    GET_CUSTOMER_COMPARISON_GROUP_BY_ID = 'Get Customer Comparison Group By Id',
    UPDATE_CUSTOMER_COMPARISON_GROUP = 'Update Customer Comparison Group',
    SAVE_CUSTOMER_COMPARISON_GROUP = 'Save Customer Comparison Group',
    DELETE_CUSTOMER_COMPARISON_GROUP_BY_ID = 'Delete Customer Comparison Group By Id',
    GET_FACTOR_LIST = 'Get All Factor List',
    GET_FACTOR_BY_ID = 'Get Factor By Id',
    SAVE_FACTOR = 'Save Factor',
    UPDATE_FACTOR = 'Update Factor',
    DELETE_FACTOR_BY_ID = 'Delete Factor By Id',
    GET_LOOKUP_LIST = 'Get All Lookup List',
    GET_LOOKUP_BY_ID = 'Get Lookup By Id',
    SAVE_LOOKUP = 'Save Lookup',
    UPDATE_LOOKUP = 'Update Lookup',
    DELETE_LOOKUP_BY_ID = 'Delete Lookup By Id',
    GET_SYSTEM_PARAMETER_LIST = 'Get All System Parameter List',
    GET_SYSTEM_PARAMETER_COUNT = 'Get System Parameter Count',
    GET_SYSTEM_PARAMETER_BY_ID = 'Get System Parameter By Id',
    SAVE_SYSTEM_PARAMETER = 'Save System Parameter',
    UPDATE_SYSTEM_PARAMETER = 'Update System Parameter',
    DELETE_SYSTEM_PARAMETER_BY_ID = 'Delete System Parameter By Id',
    GET_LOGS_LIST = 'Get All Logs List',
    GET_LOGS_BY_ID = 'Get Logs By Id',
    SAVE_LOGS = 'Save Logs',
    UPDATE_LOGS = 'Update Logs',
    DELETE_LOGS_BY_ID = 'Delete Logs By Id',
    GET_WEATHER_STATION_LIST = 'Get All WeatherStation List',
    GET_WEATHER_STATION_BY_ID = 'Get WeatherStation By Id',
    SAVE_WEATHER_STATION = 'Save WeatherStation',
    UPDATE_WEATHER_STATION = 'Update WeatherStation',
    DELETE_WEATHER_STATION_BY_ID = 'Delete WeatherStation By Id',
    GET_DEGREE_DAYS_LIST = 'Get All DegreeDays List',
    GET_DEGREE_DAYS_BY_ID = 'Get DegreeDays By Id',
    SAVE_DEGREE_DAYS = 'Save DegreeDays',
    UPDATE_DEGREE_DAYS = 'Update DegreeDays',
    DELETE_DEGREE_DAYS_BY_ID = 'Delete DegreeDays By Id',
    GET_ZIP_CODE_LIST = 'Get All ZIpCode List',
    SAVE_ZIP_CODE = 'Save ZIpCode',
    DELETE_ZIP_CODE_BY_ID = 'Delete ZIpCode By Id',
    GET_TIMEZONE_LIST = 'Get Time Zone List'
}
export class GetPlaceListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_PLACE_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetPlaceByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_PLACE_BY_ID;
    constructor(readonly id: number) {
    }
}
export class UpdatePlaceAction {
    static readonly type: SystemActionTypes = SystemActionTypes.UPDATE_PLACE;
    constructor(readonly id: number, readonly place: any) {
    }
}

export class SavePlaceAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_PLACE;
    constructor(readonly place: any) {
    }
}

export class DeletePlaceByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_PLACE_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetCustomerEventTypeListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CUSTOMER_EVENT_TYPE_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetCustomerEventTypeCountAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CUSTOMER_EVENT_TYPE_COUNT;
}

export class GetCustomerEventTypeByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CUSTOMER_EVENT_TYPE_BY_ID;
    constructor(readonly id: number) {
    }
}
export class UpdateCustomerEventTypeAction {
    static readonly type: SystemActionTypes = SystemActionTypes.UPDATE_CUSTOMER_EVENT_TYPE;
    constructor(readonly id: number, readonly customerEventType: any) {
    }
}

export class SaveCustomerEventTypeAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_CUSTOMER_EVENT_TYPE;
    constructor(readonly customerEventType: any) {
    }
}

export class DeleteCustomerEventTypeByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_CUSTOMER_EVENT_TYPE_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetCustomerComparisonGroupListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CUSTOMER_COMPARISON_GROUP_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetCustomerComparisonGroupByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CUSTOMER_COMPARISON_GROUP_BY_ID;
    constructor(readonly id: number) {
    }
}
export class UpdateCustomerComparisonGroupAction {
    static readonly type: SystemActionTypes = SystemActionTypes.UPDATE_CUSTOMER_COMPARISON_GROUP;
    constructor(readonly id: number, readonly customerComparisonGroup: any) {
    }
}

export class SaveCustomerComparisonGroupAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_CUSTOMER_COMPARISON_GROUP;
    constructor(readonly customerComparisonGroup: any) {
    }
}

export class DeleteCustomerComparisonGroupByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_CUSTOMER_COMPARISON_GROUP_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetFactorListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_FACTOR_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetFactorByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_FACTOR_BY_ID;
    constructor(readonly id: number) {
    }
}

export class SaveFactorAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_FACTOR;
    constructor(readonly factor: any) {
    }
}

export class UpdateFactorAction {
    static readonly type: SystemActionTypes = SystemActionTypes.UPDATE_FACTOR;
    constructor(readonly id: number, readonly factor: any) {
    }
}

export class DeleteFactorByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_FACTOR_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetLookupListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_LOOKUP_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetLookupByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_LOOKUP_BY_ID;
    constructor(readonly id: number) {
    }
}

export class SaveLookupAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_LOOKUP;
    constructor(readonly factor: any) {
    }
}

export class UpdateLookupAction {
    static readonly type: SystemActionTypes = SystemActionTypes.UPDATE_LOOKUP;
    constructor(readonly id: number, readonly factor: any) {
    }
}

export class DeleteLookupByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_LOOKUP_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetSystemParameterListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_SYSTEM_PARAMETER_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetSystemParameterCountAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_SYSTEM_PARAMETER_COUNT;
}

export class GetSystemParameterByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_SYSTEM_PARAMETER_BY_ID;
    constructor(readonly id: number) {
    }
}

export class SaveSystemParameterAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_SYSTEM_PARAMETER;
    constructor(readonly factor: any) {
    }
}

export class UpdateSystemParameterAction {
    static readonly type: SystemActionTypes = SystemActionTypes.UPDATE_SYSTEM_PARAMETER;
    constructor(readonly id: number, readonly factor: any) {
    }
}

export class DeleteSystemParameterByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_SYSTEM_PARAMETER_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetLogsListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_LOGS_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetLogsByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_LOGS_BY_ID;
    constructor(readonly id: number) {
    }
}

export class SaveLogsAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_LOGS;
    constructor(readonly factor: any) {
    }
}

export class UpdateLogsAction {
    static readonly type: SystemActionTypes = SystemActionTypes.UPDATE_LOGS;
    constructor(readonly id: number, readonly factor: any) {
    }
}

export class DeleteLogsByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_LOGS_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetWeatherStationListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_WEATHER_STATION_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetWeatherStationByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_WEATHER_STATION_BY_ID;
    constructor(readonly id: number) {
    }
}

export class SaveWeatherStationAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_WEATHER_STATION;
    constructor(readonly factor: any) {
    }
}

export class UpdateWeatherStationAction {
    static readonly type: SystemActionTypes = SystemActionTypes.UPDATE_WEATHER_STATION;
    constructor(readonly id: number, readonly factor: any) {
    }
}

export class DeleteWeatherStationByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_WEATHER_STATION_BY_ID;
    constructor(readonly id: number) {
    }
}


export class GetDegreeDaysListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_DEGREE_DAYS_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetDegreeDaysByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_DEGREE_DAYS_BY_ID;
    constructor(readonly id: number) {
    }
}

export class SaveDegreeDaysAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_DEGREE_DAYS;
    constructor(readonly degreeDays: any) {
    }
}

export class UpdateDegreeDaysAction {
    static readonly type: SystemActionTypes = SystemActionTypes.UPDATE_DEGREE_DAYS;
    constructor(readonly id: number, readonly degreeDays: any) {
    }
}

export class DeleteDegreeDaysByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_DEGREE_DAYS_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetZipCodeListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_ZIP_CODE_LIST;
    constructor(readonly placeCode: any, readonly filter: any) {
    }
}

export class SaveZipCodeAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_ZIP_CODE;
    constructor(readonly placeCode: any, readonly zipCode: any) {
    }
}

export class DeleteZipCodeByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_ZIP_CODE_BY_ID;
    constructor(readonly placeCode: any, readonly id: number) {
    }
}

export class GetTimeZoneListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_TIMEZONE_LIST;
    constructor(readonly force: boolean) {
    }
}
