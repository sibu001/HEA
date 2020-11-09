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
