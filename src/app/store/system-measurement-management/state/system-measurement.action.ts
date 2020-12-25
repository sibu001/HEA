export enum SystemMeasurementActionTypes {
    GET_CIMIS_STATION_LIST = 'Get All CimisStation List',
    GET_CIMIS_STATION_COUNT = 'Get Cimis Station Count',
    GET_CIMIS_STATION_BY_ID = 'Get CimisStation By Id',
    SAVE_CIMIS_STATION = 'Save CimisStation',
    UPDATE_CIMIS_STATION = 'Update CimisStation',
    DELETE_CIMIS_STATION_BY_ID = 'Delete CimisStation By Id',
    GET_CIMIS_MEASUREMENT_LIST = 'Get All CimisMeasurement List',
    GET_CIMIS_MEASUREMENT_COUNT = 'Get Cimis Measurement Count',
    GET_CIMIS_MEASUREMENT_BY_ID = 'Get CimisMeasurement By Id',
    SAVE_CIMIS_MEASUREMENT = 'Save CimisMeasurement',
    UPDATE_CIMIS_MEASUREMENT = 'Update CimisMeasurement',
    DELETE_CIMIS_MEASUREMENT_BY_ID = 'Delete CimisMeasurement By Id',
    GET_SCRIPT_CONSOLE_LIST = 'Get All ScriptConsole List',
    GET_SCRIPT_CONSOLE_BY_ID = 'Get ScriptConsole By Id',
    SAVE_SCRIPT_CONSOLE = 'Save ScriptConsole',
    UPDATE_SCRIPT_CONSOLE = 'Update ScriptConsole',
    DELETE_SCRIPT_CONSOLE_BY_ID = 'Delete ScriptConsole By Id',
    GET_SCRIPT_BATCH_LIST = 'Get All ScriptBatch List',
    GET_SCRIPT_BATCH_BY_ID = 'Get ScriptBatch By Id',
    SAVE_SCRIPT_BATCH = 'Save ScriptBatch',
    UPDATE_SCRIPT_BATCH = 'Update ScriptBatch',
    DELETE_SCRIPT_BATCH_BY_ID = 'Delete ScriptBatch By Id',
    GET_SYSTEM_JOBS_LIST = 'Get All SystemJobs List',
    GET_SYSTEM_JOBS_BY_ID = 'Get SystemJobs By Id',
    SAVE_SYSTEM_JOBS = 'Save SystemJobs',
    UPDATE_SYSTEM_JOBS = 'Update SystemJobs',
    DELETE_SYSTEM_JOBS_BY_ID = 'Delete SystemJobs By Id',
    GET_EC2_INSTANCE_LIST = 'Get All EC2Instance List',
    GET_EC2_INSTANCE_BY_ID = 'Get EC2Instance By Id',
    SAVE_EC2_INSTANCE = 'Save EC2Instance',
    UPDATE_EC2_INSTANCE = 'Update EC2Instance',
    DELETE_EC2_INSTANCE_BY_ID = 'Delete EC2Instance By Id',
    GET_ALERT_MESSAGE_LIST = 'Get All AlertMessage List',
    GET_ALERT_MESSAGE_BY_ID = 'Get AlertMessage By Id',
    SAVE_ALERT_MESSAGE = 'Save AlertMessage',
    UPDATE_ALERT_MESSAGE = 'Update AlertMessage',
    DELETE_ALERT_MESSAGE_BY_ID = 'Delete AlertMessage By Id',
}

export class GetCimisStationListAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.GET_CIMIS_STATION_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetCimisStationCountAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.GET_CIMIS_STATION_COUNT;
    constructor(readonly filter: any) {
    }
}

export class GetCimisStationByIdAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.GET_CIMIS_STATION_BY_ID;
    constructor(readonly id: number) {
    }
}

export class SaveCimisStationAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.SAVE_CIMIS_STATION;
    constructor(readonly cimisStation: any) {
    }
}

export class UpdateCimisStationAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.UPDATE_CIMIS_STATION;
    constructor(readonly id: number, readonly cimisStation: any) {
    }
}

export class DeleteCimisStationByIdAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.DELETE_CIMIS_STATION_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetCimisMeasurementListAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.GET_CIMIS_MEASUREMENT_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetCimisMeasurementCountAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.GET_CIMIS_MEASUREMENT_COUNT;
    constructor(readonly filter: any) {
    }
}


export class GetCimisMeasurementByIdAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.GET_CIMIS_MEASUREMENT_BY_ID;
    constructor(readonly id: number) {
    }
}

export class SaveCimisMeasurementAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.SAVE_CIMIS_MEASUREMENT;
    constructor(readonly cimisMeasurement: any) {
    }
}

export class UpdateCimisMeasurementAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.UPDATE_CIMIS_MEASUREMENT;
    constructor(readonly id: number, readonly cimisMeasurement: any) {
    }
}

export class DeleteCimisMeasurementByIdAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.DELETE_CIMIS_MEASUREMENT_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetScriptConsoleListAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.GET_SCRIPT_CONSOLE_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetScriptConsoleByIdAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.GET_SCRIPT_CONSOLE_BY_ID;
    constructor(readonly id: number) {
    }
}

export class SaveScriptConsoleAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.SAVE_SCRIPT_CONSOLE;
    constructor(readonly scriptConsole: any) {
    }
}

export class UpdateScriptConsoleAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.UPDATE_SCRIPT_CONSOLE;
    constructor(readonly id: number, readonly scriptConsole: any) {
    }
}

export class DeleteScriptConsoleByIdAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.DELETE_SCRIPT_CONSOLE_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetScriptBatchListAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.GET_SCRIPT_BATCH_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetScriptBatchByIdAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.GET_SCRIPT_BATCH_BY_ID;
    constructor(readonly id: number) {
    }
}

export class SaveScriptBatchAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.SAVE_SCRIPT_BATCH;
    constructor(readonly scriptBatch: any) {
    }
}

export class UpdateScriptBatchAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.UPDATE_SCRIPT_BATCH;
    constructor(readonly id: number, readonly scriptBatch: any) {
    }
}

export class DeleteScriptBatchByIdAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.DELETE_SCRIPT_BATCH_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetSystemJobsListAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.GET_SYSTEM_JOBS_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetSystemJobsByIdAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.GET_SYSTEM_JOBS_BY_ID;
    constructor(readonly id: number) {
    }
}

export class SaveSystemJobsAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.SAVE_SYSTEM_JOBS;
    constructor(readonly systemJobs: any) {
    }
}

export class UpdateSystemJobsAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.UPDATE_SYSTEM_JOBS;
    constructor(readonly id: number, readonly systemJobs: any) {
    }
}

export class DeleteSystemJobsByIdAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.DELETE_SYSTEM_JOBS_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetEC2InstanceListAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.GET_EC2_INSTANCE_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetEC2InstanceByIdAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.GET_EC2_INSTANCE_BY_ID;
    constructor(readonly id: number) {
    }
}

export class SaveEC2InstanceAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.SAVE_EC2_INSTANCE;
    constructor(readonly ec2Instance: any) {
    }
}

export class UpdateEC2InstanceAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.UPDATE_EC2_INSTANCE;
    constructor(readonly id: number, readonly ec2Instance: any) {
    }
}

export class DeleteEC2InstanceByIdAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.DELETE_EC2_INSTANCE_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetAlertMessageListAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.GET_ALERT_MESSAGE_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetAlertMessageByIdAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.GET_ALERT_MESSAGE_BY_ID;
    constructor(readonly id: number) {
    }
}

export class SaveAlertMessageAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.SAVE_ALERT_MESSAGE;
    constructor(readonly alertMessage: any) {
    }
}

export class UpdateAlertMessageAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.UPDATE_ALERT_MESSAGE;
    constructor(readonly id: number, readonly alertMessage: any) {
    }
}

export class DeleteAlertMessageByIdAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.DELETE_ALERT_MESSAGE_BY_ID;
    constructor(readonly id: number) {
    }
}
