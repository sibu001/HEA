export enum AdministrativeActionTypes {
    GET_ADMINISTRATIVE_REPORT_LIST = 'Get All Administrative Report List',
    GET_ADMINISTRATIVE_REPORT_BY_ID = 'Get Administrative Report By Id',
    SAVE_ADMINISTRATIVE_REPORT = 'Save Administrative Report',
    UPDATE_ADMINISTRATIVE_REPORT = 'Update Administrative Report',
    DELETE_ADMINISTRATIVE_REPORT_BY_ID = 'Delete Administrative Report By Id',
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
    GET_EVENT_HISTORY_BY_ID = 'Get EventHistory By Id',
    SAVE_EVENT_HISTORY = 'Save EventHistory',
    UPDATE_EVENT_HISTORY = 'Update EventHistory',
    DELETE_EVENT_HISTORY_BY_ID = 'Delete EventHistory By Id',
}
export class GetAdministrativeReportListAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.GET_ADMINISTRATIVE_REPORT_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
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

export class GetEventHistoryByIdAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.GET_EVENT_HISTORY_BY_ID;
    constructor(readonly id: number) {
    }
}

export class SaveEventHistoryAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.SAVE_EVENT_HISTORY;
    constructor(readonly eventHistory: any) {
    }
}

export class UpdateEventHistoryAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.UPDATE_EVENT_HISTORY;
    constructor(readonly id: number, readonly eventHistory: any) {
    }
}

export class DeleteEventHistoryByIdAction {
    static readonly type: AdministrativeActionTypes = AdministrativeActionTypes.DELETE_EVENT_HISTORY_BY_ID;
    constructor(readonly id: number) {
    }
}
