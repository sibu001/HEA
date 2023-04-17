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
    GET_SCRIPT_BATCH_LIST = 'Get All ScriptBatch List',
    GET_SCRIPT_BATCH_COUNT = 'Get ScriptBatch Count',
    GET_SCRIPT_BATCH_BY_ID = 'Get ScriptBatch By Id',
    SAVE_SCRIPT_BATCH = 'Save ScriptBatch',
    UPDATE_SCRIPT_BATCH = 'Update ScriptBatch',
    DELETE_SCRIPT_BATCH_BY_ID = 'Delete ScriptBatch By Id',
    PROCESS_SCRIPT_BATCH = 'Process Script Batch',
    EXECUTE_SCRIPT_BATCH_RESULT = 'Execute Script Batch Result',
    GET_SCRIPT_BATCH_GROUP = 'Get Script Batch Group',
    SAVE_SCRIPT_BATCH_GROUP = 'Save Script Batch Group',
    DELETE_SCRIPT_BATCH_GROUP = 'Delete Script Batch Group',
    GET_SYSTEM_JOBS_LIST = 'Get All SystemJobs List',
    GET_SYSTEM_JOBS_BY_ID = 'Get SystemJobs By Id',
    EXECUTE_SYSTEM_JOBS = 'Execute SystemJobs',
    INTERRUPT_SYSTEM_JOBS = 'Interrupt SystemJobs',
    PAUSE_SYSTEM_JOBS = 'Pause SystemJobs',
    RESUME_SYSTEM_JOBS = 'Resume SystemJobs',
    GET_THREAD_INFO = 'Get Thread Info',
    GET_OPERATING_SYSTEM_INFO = 'Get Operating System Info',
    DELETE_SYSTEM_JOBS_BY_ID = 'Delete SystemJobs By Id',
    GET_EC2_INSTANCE_LIST = 'Get All EC2Instance List',
    START_EC2_INSTANCE = 'Start EC2Instance',
    STOP_EC2_INSTANCE = 'Stop EC2Instance',
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
    constructor(readonly force: boolean, readonly filter: any) {
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

export class GetScriptBatchListAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.GET_SCRIPT_BATCH_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetScriptBatchCountAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.GET_SCRIPT_BATCH_COUNT;
    constructor(readonly filter: any) {
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

export class ProcessScriptBatchAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.PROCESS_SCRIPT_BATCH;
    constructor(readonly id: number) {
    }
}

export class ExecuteScriptBatchResultAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.EXECUTE_SCRIPT_BATCH_RESULT;
    constructor(readonly id: number) {
    }
}

export class GetScriptBatchGroupAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.GET_SCRIPT_BATCH_GROUP;
    constructor(readonly id: number) {
    }
}

export class SaveScriptBatchGroupAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.SAVE_SCRIPT_BATCH_GROUP;
    constructor(readonly id: number, readonly customerGroupId: any) {
    }
}

export class DeleteScriptBatchGroupAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.DELETE_SCRIPT_BATCH_GROUP;
    constructor(readonly id: number, readonly customerGroupId: any) {
    }
}

export class GetSystemJobsListAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.GET_SYSTEM_JOBS_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetOperatingSystemInfoAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.GET_OPERATING_SYSTEM_INFO;
}

export class ExecuteSystemJobsAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.EXECUTE_SYSTEM_JOBS;
    constructor(readonly schedulerName: any, readonly groupName: any, readonly jobName: any) {
    }
}

export class InterruptSystemJobsAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.INTERRUPT_SYSTEM_JOBS;
    constructor(readonly schedulerName: any, readonly groupName: any, readonly jobName: any) {
    }
}

export class ResumeSystemJobsAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.RESUME_SYSTEM_JOBS;
    constructor(readonly schedulerName: any, readonly groupName: any, readonly jobName: any) {
    }
}

export class PauseSystemJobsAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.PAUSE_SYSTEM_JOBS;
    constructor(readonly schedulerName: any, readonly groupName: any, readonly jobName: any) {
    }
}

export class GetThreadInfoAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.GET_THREAD_INFO;
}

export class GetEC2InstanceListAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.GET_EC2_INSTANCE_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class StartEC2InstanceAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.START_EC2_INSTANCE;
    constructor(readonly instanceId: any) {
    }
}

export class StopEC2InstanceAction {
    static readonly type: SystemMeasurementActionTypes = SystemMeasurementActionTypes.STOP_EC2_INSTANCE;
    constructor(readonly instanceId: any) {
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
