export enum AdministrativeActionTypes {
    GET_ADMINISTRATIVE_REPORT_LIST = 'Get All Administrative Report List',
    GET_ADMINISTRATIVE_REPORT_LIST_COUNT = 'Get All Administrative Report List Count',
    GET_ADMINISTRATIVE_REPORT_BY_ID = 'Get Administrative Report By Id',
    SAVE_ADMINISTRATIVE_REPORT = 'Save Administrative Report',
    UPDATE_ADMINISTRATIVE_REPORT = 'Update Administrative Report',
    DELETE_ADMINISTRATIVE_REPORT_BY_ID = 'Delete Administrative Report By Id',
    GET_ADMINISTRATIVE_REPORT_PARAMS_LIST = 'Get All Administrative Report Params List',
    GET_ADMINISTRATIVE_REPORT_PARAMS_BY_ID = 'Get Administrative Report Params By Id',
    SAVE_ADMINISTRATIVE_REPORT_PARAMS = 'Save Administrative Report Params',
    UPDATE_ADMINISTRATIVE_REPORT_PARAMS = 'Update Administrative Report Params',
    DELETE_ADMINISTRATIVE_REPORT_PARAMS_BY_ID = 'Delete Administrative Report Params By Id',
    CALL_ADMINISTRATIVE_REPORT = 'Call the administrative report',
    GET_TOPIC_LIST = 'Get All Topic List',
    GET_TOPIC_BY_ID = 'Get Topic By Id',
    SAVE_TOPIC = 'Save Topic',
    UPDATE_TOPIC = 'Update Topic',
    DELETE_TOPIC_BY_ID = 'Delete Topic By Id',
    GET_PROSPECTS_LIST = 'Get All Prospects List',
    GET_PROSPECTS_BY_ID = 'Get Prospects By Id',
    SAVE_PROSPECTS = 'Save Prospects',
    UPDATE_PROSPECTS = 'Update Prospects',
    DELETE_PROSPECTS_BY_ID = 'Delete Prospects By Id',
    GET_EVENT_HISTORY_LIST = 'Get All EventHistory List',
    GET_EVENT_HISTORY_COUNT = 'Get All EventHistory Count',
    GET_EVENT_HISTORY_BY_ID = 'Get EventHistory By Id',
    SAVE_EVENT_HISTORY = 'Save EventHistory',
    UPDATE_EVENT_HISTORY = 'Update EventHistory',
    UPLOAD_EVENT_HISTORY_FILE = 'Upload Event History File',
    DELETE_EVENT_HISTORY_BY_ID = 'Delete EventHistory By Id',
    GET_CUSTOMER_LIST = 'Get Customer List',
    DELETE_PROSPECT_LIST_ACTION = 'Delete Prospects List Action'
}
export class GetAdministrativeReportListAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.GET_ADMINISTRATIVE_REPORT_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetAdministrativeReportCountAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.GET_ADMINISTRATIVE_REPORT_LIST_COUNT;
    constructor(readonly force : boolean , readonly filter: any) {
    }
}

export class GetAdministrativeReportByIdAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.GET_ADMINISTRATIVE_REPORT_BY_ID;
    constructor(readonly id: number) {
    }
}

export class SaveAdministrativeReportAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.SAVE_ADMINISTRATIVE_REPORT;
    constructor(readonly administrativeReport: any) {
    }
}

export class UpdateAdministrativeReportAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.UPDATE_ADMINISTRATIVE_REPORT;
    constructor(readonly id: number, readonly administrativeReport: any) {
    }
}

export class DeleteAdministrativeReportByIdAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.DELETE_ADMINISTRATIVE_REPORT_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetAdministrativeReportParamsListAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.GET_ADMINISTRATIVE_REPORT_PARAMS_LIST;
    constructor(readonly reportId: any) {
    }
}

export class GetAdministrativeReportParamsByIdAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.GET_ADMINISTRATIVE_REPORT_PARAMS_BY_ID;
    constructor(readonly reportId: any, readonly id: any) {
    }
}

export class SaveAdministrativeReportParamsAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.SAVE_ADMINISTRATIVE_REPORT_PARAMS;
    constructor(readonly reportId: any, readonly parameters: any) {
    }
}

export class UpdateAdministrativeReportParamsAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.UPDATE_ADMINISTRATIVE_REPORT_PARAMS;
    constructor(readonly reportId: any, readonly id: any, readonly paramObj: any) {
    }
}

export class DeleteAdministrativeReportParamsByIdAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.DELETE_ADMINISTRATIVE_REPORT_PARAMS_BY_ID;
    constructor(readonly reportId: any, readonly id: any) {
    }
}

export class CallAdministrativeReportAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.CALL_ADMINISTRATIVE_REPORT;
    constructor(readonly reportId: any, readonly parameters: any) {
    }
}


export class GetTopicListAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.GET_TOPIC_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetTopicByIdAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.GET_TOPIC_BY_ID;
    constructor(readonly id: number) {
    }
}

export class SaveTopicAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.SAVE_TOPIC;
    constructor(readonly topic: any) {
    }
}

export class UpdateTopicAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.UPDATE_TOPIC;
    constructor(readonly id: number, readonly topic: any) {
    }
}

export class DeleteTopicByIdAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.DELETE_TOPIC_BY_ID;
    constructor(readonly id: number) {
    }
}


export class GetProspectsListAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.GET_PROSPECTS_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class DeleteProspectsListAction{
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.DELETE_PROSPECT_LIST_ACTION;
    constructor(readonly ids : any) {}
}

export class GetProspectsByIdAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.GET_PROSPECTS_BY_ID;
    constructor(readonly id: number) {
    }
}

export class SaveProspectsAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.SAVE_PROSPECTS;
    constructor(readonly prospects: any) {
    }
}

export class UpdateProspectsAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.UPDATE_PROSPECTS;
    constructor(readonly id: number, readonly prospects: any) {
    }
}

export class DeleteProspectsByIdAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.DELETE_PROSPECTS_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetEventHistoryListAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.GET_EVENT_HISTORY_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetEventHistoryCountAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.GET_EVENT_HISTORY_COUNT;
    constructor(readonly filter: any) {
    }
}

export class GetEventHistoryByIdAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.GET_EVENT_HISTORY_BY_ID;
    constructor(readonly customerId: any, readonly customerEventId: any) {
    }
}

export class SaveEventHistoryAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.SAVE_EVENT_HISTORY;
    constructor(readonly customerId: any, readonly eventHistory: any) {
    }
}

export class UpdateEventHistoryAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.UPDATE_EVENT_HISTORY;
    constructor(readonly customerId: any, readonly customerEventId: any, readonly eventHistory: any) {
    }
}

export class UploadEventHistoryFileAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.UPLOAD_EVENT_HISTORY_FILE;
    constructor(readonly fileBody: any) {
    }
}

export class DeleteEventHistoryByIdAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.DELETE_EVENT_HISTORY_BY_ID;
    constructor(readonly customerId: any, readonly customerEventId: any) {
    }
}

export class GetCustomerListAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.GET_CUSTOMER_LIST;
    constructor(readonly filter: any) {
    }
}
