export enum TopicActionTypes {
    GET_TOPIC_DESCRIPTION_LIST = 'Get All Topic Description List',
    GET_TOPIC_DESCRIPTION_BY_ID = 'Get Topic Description By Id',
    SAVE_TOPIC_DESCRIPTION = 'Save Topic Description',
    UPDATE_TOPIC_DESCRIPTION = 'Update Topic Description',
    DELETE_TOPIC_DESCRIPTION_BY_ID = 'Delete Topic Description By Id',
    GET_CONTEXT_METHOD_LIST = 'Get context Method List',
    SCRIPT_DEBUG = 'Debug Script',
    GET_PAID_SERVICE = 'Get Paid Service List',
    LOAD_TOPIC_DESCRIPTION_PANE_BY_ID = 'Load Topic Description Pane By Id',
    LOAD_TOPIC_VARIABLES = 'Load Topic Variables',
    LOAD_LOOK_UP_CALCULATION_PERIOD = 'Load Look Up Calculation Period',
    LOAD_SELECTED_TOPIC_DESCRIPTION_VARIABLES = 'Load Selected Topic Description Variables',
    
}
export class GetTopicDescriptionListAction {
    static readonly type: TopicActionTypes = TopicActionTypes.GET_TOPIC_DESCRIPTION_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetTopicDescriptionByIdAction {
    static readonly type: TopicActionTypes = TopicActionTypes.GET_TOPIC_DESCRIPTION_BY_ID;
    constructor(readonly id: number) {
    }
}

export class LoadLookUpCalculationPeriodAction{
    static readonly type: TopicActionTypes = TopicActionTypes.LOAD_LOOK_UP_CALCULATION_PERIOD;
    constructor(readonly type : string) { }
}

export class LoadSelectedTopicDescriptionVariableAction{
    static readonly type: TopicActionTypes = TopicActionTypes.LOAD_SELECTED_TOPIC_DESCRIPTION_VARIABLES;
    constructor(readonly id : string , readonly surevyDescriptionId : string) { }
}

export class LoadTopicVariablesAction{
    static readonly type: TopicActionTypes = TopicActionTypes.LOAD_TOPIC_VARIABLES;
    constructor(readonly id : number) {}
}

export class SaveTopicDescriptionAction {
    static readonly type: TopicActionTypes = TopicActionTypes.SAVE_TOPIC_DESCRIPTION;
    constructor(readonly topicDescription: any) {
    }
}

// export class LoadTopicDescriptionPaneByIdAction{
//     static readonly type: TopicActionTypes = TopicActionTypes.LOAD_TOPIC_DESCRIPTION_PANE_BY_ID;
//     constructor(readonly id: number) {}
// }

export class UpdateTopicDescriptionAction {
    static readonly type: TopicActionTypes = TopicActionTypes.UPDATE_TOPIC_DESCRIPTION;
    constructor(readonly id: number, readonly topicDescription: any) {
    }
}

export class DeleteTopicDescriptionByIdAction {
    static readonly type: TopicActionTypes = TopicActionTypes.DELETE_TOPIC_DESCRIPTION_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetContextMethodListAction {
    static readonly type: TopicActionTypes = TopicActionTypes.GET_CONTEXT_METHOD_LIST;
}

export class ScriptDebugAction {
    static readonly type: TopicActionTypes = TopicActionTypes.SCRIPT_DEBUG;
    constructor(readonly scriptDebugData: any) {
    }
}

export class GetPaidServiceListAction {
    static readonly type: TopicActionTypes = TopicActionTypes.GET_PAID_SERVICE;
}
