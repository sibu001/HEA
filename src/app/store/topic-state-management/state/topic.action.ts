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
    LOAD_TOPIC_PANE_BY_ID = "Load Topic Pane By Id",
    LOAD_DATA_BLOCK_BY_PANE_ID = 'Load Data Block By Pane Id',
    LOAD_DATA_BLOCK_BY_ID = 'Load Data Block By Id',
    LOAD_DATA_FIELD_BY_PANE_ID = 'Load Data Field By Pane Id',
    LOAD_DATA_FIELD_BY_ID = 'Load Data Field By Id',
    LOAD_TOPIC_DESCRIPTION_BY_PANE_ID = 'Load Topic Description by Pane Id',
    SAVE_DATA_FIELD = 'Save Data Field',
    DELETE_DATA_FIELD_BY_ID = 'Delete Data Field',
    LOAD_LOOKUP_VALUE_BY_TYPE = 'Load Lookup Value By Type',
    LOAD_FIELD_VALUES_FOR_DATA_FIELD = 'Load Field Values For Data Field',
    DELETE_FIELD_VALUE_BY_ID = 'Delete Field Value By Id',
    SAVE_FIELD_VALUES_FOR_DATA_FIELD= 'Save Field Values For Data Field',
    LOAD_ALL_POSSIBLE_COLORS_FOR_CHARTS = 'Load All Available Colors For Chart',
    LOAD_ALL_POSSIBLE_STYLE_FOR_CHARTS = 'Load All Available Style For Chart',
    LOAD_ALL_AVALIABLES_FONT_FAMILY_NAMES_FOR_CHARTS = 'Load All Available Font Family Names For Chart',

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
    constructor(readonly id : number, readonly params : any) {}
}

export class LoadTopicPaneVariableById{
    static readonly type: TopicActionTypes = TopicActionTypes.LOAD_TOPIC_PANE_BY_ID;
    constructor(readonly surevyDescriptionId : number , readonly paneId : number){}
}

export class LoadDataBlockById{
    static readonly type: TopicActionTypes = TopicActionTypes.LOAD_DATA_BLOCK_BY_ID
    constructor(readonly id : number, readonly paneId : number){}
}

export class SaveTopicDescriptionAction {
    static readonly type: TopicActionTypes = TopicActionTypes.SAVE_TOPIC_DESCRIPTION;
    constructor(readonly topicDescription: any) {
    }
}

export class LoadDataBlockByPaneId{
    static readonly type: TopicActionTypes = TopicActionTypes.LOAD_DATA_BLOCK_BY_PANE_ID;
    constructor(readonly paneId : number){}
}

export class LoadDataFiledByPaneId{
    static readonly type: TopicActionTypes = TopicActionTypes.LOAD_DATA_FIELD_BY_PANE_ID;
    constructor(readonly id : number){}
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

export class LoadDataFieldById{
    static readonly type: TopicActionTypes = TopicActionTypes.LOAD_DATA_FIELD_BY_ID;
    constructor(readonly id: number, readonly paneId: number) {
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

export class LoadPaneListByTopicDescriptionId{
    static readonly type: TopicActionTypes = TopicActionTypes.LOAD_TOPIC_DESCRIPTION_BY_PANE_ID;
    constructor(readonly id : number){}
}

export class SaveDataFieldByPaneIdAction{
    static readonly type: TopicActionTypes = TopicActionTypes.SAVE_DATA_FIELD;
    constructor(readonly paneId : number, readonly body : any){}
}

export class DeleteDataFieldByIdAction{
    static readonly type: TopicActionTypes = TopicActionTypes.DELETE_DATA_FIELD_BY_ID;
    constructor(readonly paneId : number, readonly id : number){}
}

export class LoadLookUpValueByType{
    static readonly type: TopicActionTypes = TopicActionTypes.LOAD_LOOKUP_VALUE_BY_TYPE;
    constructor(readonly type : string){}
}   

export class LoadFieldValuesForDataField{
    static readonly type: TopicActionTypes = TopicActionTypes.LOAD_FIELD_VALUES_FOR_DATA_FIELD;
    constructor(readonly paneId : number, readonly dataField : number){}
}

export class DeleteFieldValuesForDataField{
    static readonly type: TopicActionTypes = TopicActionTypes.DELETE_FIELD_VALUE_BY_ID;
    constructor(readonly paneId : number ,readonly dataFieldId : number ,readonly id : number){}
}

export class SaveFieldValuesForDataField{
    static readonly type: TopicActionTypes = TopicActionTypes.SAVE_FIELD_VALUES_FOR_DATA_FIELD;
    constructor(readonly body : any,  readonly paneId : number ,readonly dataFieldId : number){}
}

export class LoadAllPossibleColorForChartAction{
    static readonly type: TopicActionTypes = TopicActionTypes.LOAD_ALL_POSSIBLE_COLORS_FOR_CHARTS;
    constructor(){}
}

export class LoadAllPossibleStyleForChartAction{
    static readonly type: TopicActionTypes = TopicActionTypes.LOAD_ALL_POSSIBLE_STYLE_FOR_CHARTS;
    constructor(){}
}

export class LoadAllAvaliableFontFamiliesNamesForChartAction{
    static readonly type: TopicActionTypes = TopicActionTypes.LOAD_ALL_AVALIABLES_FONT_FAMILY_NAMES_FOR_CHARTS;
    constructor(){}
}
