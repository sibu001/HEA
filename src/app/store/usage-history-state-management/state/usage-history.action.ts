export enum UsageHistoryActionTypes {
    GET_SHARE_MY_DATA_LIST = 'Get All Share My Data List',
    GET_SHARE_MY_DATA_BY_ID = 'Get Share My Data By Id',
    UPDATE_SHARE_MY_DATA = 'Update Share My Data',
    DELETE_SHARE_MY_DATA_BY_ID = 'Delete Share My Data By Id',
    GET_GAS_LIST = 'Get All Gas List',
    GET_GAS_BY_ID = 'Get Gas By Id',
    UPDATE_GAS = 'Update Gas',
    DELETE_GAS_BY_ID = 'Delete Gas By Id',
    GET_GAS_CHARGE_LIST = 'Get All Gas Charge List',
    GET_GAS_CHARGE_BY_ID = 'Get Gas Charge By Id',
    UPDATE_GAS_CHARGE = 'Update Gas Charge',
    DELETE_GAS_CHARGE_BY_ID = 'Delete Gas Charge By Id',
    GET_GAS_SMART_METER_LIST = 'Get All Gas Smart Meter List',
    GET_GAS_SMART_METER_BY_ID = 'Get Gas Smart Meter By Id',
    UPDATE_GAS_SMART_METER = 'Update Gas Smart Meter',
    DELETE_GAS_SMART_METER_BY_ID = 'Delete Gas Smart Meter By Id',
    GET_ELECTRICITY_LIST = 'Get All Electricity List',
    GET_ELECTRICITY_BY_ID = 'Get Electricity By Id',
    UPDATE_ELECTRICITY = 'Update Electricity',
    DELETE_ELECTRICITY_BY_ID = 'Delete Electricity By Id',
    GET_ELECTRICITY_CHARGE_LIST = 'Get All Electricity Charge List',
    GET_ELECTRICITY_CHARGE_BY_ID = 'Get Electricity Charge By Id',
    UPDATE_ELECTRICITY_CHARGE = 'Update Electricity Charge',
    DELETE_ELECTRICITY_CHARGE_BY_ID = 'Delete Electricity Charge By Id',
    GET_ELECTRICITY_SMART_METER_LIST = 'Get All Electricity Smart Meter List',
    GET_ELECTRICITY_SMART_METER_BY_ID = 'Get Electricity Smart Meter By Id',
    UPDATE_ELECTRICITY_SMART_METER = 'Update Electricity Smart Meter',
    DELETE_ELECTRICITY_SMART_METER_BY_ID = 'Delete Electricity Smart Meter By Id',
    GET_ELECTRICITY_DAILY_SMART_METER_LIST = 'Get All Electricity Daily Smart Meter List',
    GET_ELECTRICITY_DAILY_SMART_METER_BY_ID = 'Get Electricity Daily Smart Meter By Id',
    UPDATE_ELECTRICITY_DAILY_SMART_METER = 'Update Electricity Daily Smart Meter',
    DELETE_ELECTRICITY_DAILY_SMART_METER_BY_ID = 'Delete Electricity Daily Smart Meter By Id',
    GET_WATER_LIST = 'Get All Water List',
    GET_WATER_BY_ID = 'Get Water By Id',
    UPDATE_WATER = 'Update Water',
    DELETE_WATER_BY_ID = 'Delete Water By Id',
    GET_WATER_CHARGE_LIST = 'Get All Water Charge List',
    GET_WATER_CHARGE_BY_ID = 'Get Water Charge By Id',
    UPDATE_WATER_CHARGE = 'Update Water Charge',
    DELETE_WATER_CHARGE_BY_ID = 'Delete Water Charge By Id',
    GET_WATER_SMART_METER_LIST = 'Get All Water Smart Meter List',
    GET_WATER_SMART_METER_BY_ID = 'Get Water Smart Meter By Id',
    UPDATE_WATER_SMART_METER = 'Update Water Smart Meter',
    DELETE_WATER_SMART_METER_BY_ID = 'Delete Water Smart Meter By Id',
}
export class GetShareMyDataListAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.GET_SHARE_MY_DATA_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetShareMyDataByIdAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.GET_SHARE_MY_DATA_BY_ID;
    constructor(readonly id: number) {
    }
}
export class UpdateShareMyDataAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.UPDATE_SHARE_MY_DATA;
    constructor(readonly id: number, readonly shareMyData: any) {
    }
}

export class DeleteShareMyDataByIdAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.DELETE_SHARE_MY_DATA_BY_ID;
    constructor(readonly id: number) {
    }
}


export class GetGasListAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.GET_GAS_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetGasByIdAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.GET_GAS_BY_ID;
    constructor(readonly id: number) {
    }
}
export class UpdateGasAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.UPDATE_GAS;
    constructor(readonly id: number, readonly gas: any) {
    }
}

export class DeleteGasByIdAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.DELETE_GAS_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetGasChargeListAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.GET_GAS_CHARGE_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetGasChargeByIdAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.GET_GAS_CHARGE_BY_ID;
    constructor(readonly id: number) {
    }
}
export class UpdateGasChargeAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.UPDATE_GAS_CHARGE;
    constructor(readonly id: number, readonly gasCharge: any) {
    }
}

export class DeleteGasChargeByIdAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.DELETE_GAS_CHARGE_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetGasSmartMeterListAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.GET_GAS_SMART_METER_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetGasSmartMeterByIdAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.GET_GAS_SMART_METER_BY_ID;
    constructor(readonly id: number) {
    }
}
export class UpdateGasSmartMeterAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.UPDATE_GAS_SMART_METER;
    constructor(readonly id: number, readonly gasSmartMeter: any) {
    }
}

export class DeleteGasSmartMeterByIdAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.DELETE_GAS_SMART_METER_BY_ID;
    constructor(readonly id: number) {
    }
}


export class GetElectricityListAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.GET_ELECTRICITY_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetElectricityByIdAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.GET_ELECTRICITY_BY_ID;
    constructor(readonly id: number) {
    }
}
export class UpdateElectricityAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.UPDATE_ELECTRICITY;
    constructor(readonly id: number, readonly electricity: any) {
    }
}

export class DeleteElectricityByIdAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.DELETE_ELECTRICITY_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetElectricityChargeListAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.GET_ELECTRICITY_CHARGE_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetElectricityChargeByIdAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.GET_ELECTRICITY_CHARGE_BY_ID;
    constructor(readonly id: number) {
    }
}
export class UpdateElectricityChargeAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.UPDATE_ELECTRICITY_CHARGE;
    constructor(readonly id: number, readonly electricityCharge: any) {
    }
}

export class DeleteElectricityChargeByIdAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.DELETE_ELECTRICITY_CHARGE_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetElectricitySmartMeterListAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.GET_ELECTRICITY_SMART_METER_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetElectricitySmartMeterByIdAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.GET_ELECTRICITY_SMART_METER_BY_ID;
    constructor(readonly id: number) {
    }
}
export class UpdateElectricitySmartMeterAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.UPDATE_ELECTRICITY_SMART_METER;
    constructor(readonly id: number, readonly electricitySmartMeter: any) {
    }
}

export class DeleteElectricitySmartMeterByIdAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.DELETE_ELECTRICITY_SMART_METER_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetElectricityDailySmartMeterListAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.GET_ELECTRICITY_DAILY_SMART_METER_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetElectricityDailySmartMeterByIdAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.GET_ELECTRICITY_DAILY_SMART_METER_BY_ID;
    constructor(readonly id: number) {
    }
}
export class UpdateElectricityDailySmartMeterAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.UPDATE_ELECTRICITY_DAILY_SMART_METER;
    constructor(readonly id: number, readonly electricityDailySmartMeter: any) {
    }
}

export class DeleteElectricityDailySmartMeterByIdAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.DELETE_ELECTRICITY_DAILY_SMART_METER_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetWaterListAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.GET_WATER_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetWaterByIdAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.GET_WATER_BY_ID;
    constructor(readonly id: number) {
    }
}
export class UpdateWaterAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.UPDATE_WATER;
    constructor(readonly id: number, readonly water: any) {
    }
}

export class DeleteWaterByIdAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.DELETE_WATER_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetWaterChargeListAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.GET_WATER_CHARGE_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetWaterChargeByIdAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.GET_WATER_CHARGE_BY_ID;
    constructor(readonly id: number) {
    }
}
export class UpdateWaterChargeAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.UPDATE_WATER_CHARGE;
    constructor(readonly id: number, readonly waterCharge: any) {
    }
}

export class DeleteWaterChargeByIdAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.DELETE_WATER_CHARGE_BY_ID;
    constructor(readonly id: number) {
    }
}


export class GetWaterSmartMeterListAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.GET_WATER_SMART_METER_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetWaterSmartMeterByIdAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.GET_WATER_SMART_METER_BY_ID;
    constructor(readonly id: number) {
    }
}
export class UpdateWaterSmartMeterAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.UPDATE_WATER_SMART_METER;
    constructor(readonly id: number, readonly waterSmartMeter: any) {
    }
}

export class DeleteWaterSmartMeterByIdAction {
    static readonly type: UsageHistoryActionTypes = UsageHistoryActionTypes.DELETE_WATER_SMART_METER_BY_ID;
    constructor(readonly id: number) {
    }
}
