import { HttpParams } from "@angular/common/http";

export enum TopicActionTypes {
    GET_TOPIC_DESCRIPTION_LIST = 'Get All Topic Description List',
    GET_ALL_POSSIBLE_TOPIC_DESCRIPTION_LIST = 'Get Complete Topic Description List',
    GET_TOPIC_DESCRIPTION_LIST_COUNT = 'Get All Topic Description List Count',
    GET_TOPIC_DESCRIPTION_BY_ID = 'Get Topic Description By Id',
    CREATE_COPY_TOPIC_DESCRIPTION_FROM_ID = 'Create Copy Topic Description From Id',
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
    SAVE_TOPIC_DESCRIPTION_VARIABLES = 'Save Topic Description Variables',
    UPDATE_TOPIC_DESCRIPTION_VARIABLES = 'Update Topic Description Variables',
    DELETE_TOPIC_DESCRIPTION_VARIABLES = 'Delete Topic Description Variables',
    LOAD_TOPIC_PANE_BY_ID = "Load Topic Pane By Id",
    LOAD_DATA_BLOCK_BY_PANE_ID = 'Load Data Block By Pane Id',
    UPDATE_DATA_BLOCK_BY_PANE_ID ='Update Data Block By Id',
    DATA_BLOCK_DATA_FIELD_FIELD_VALUES_BY_DATA_FIELD_ID = 'Data Block Data Field Values By Data Field Id',
    SAVE_DATA_BLOCK_DATA_FIELD_FIELD_VALUES_BY_DATA_FIELD_ID = 'Save Data Block Data Field Values By Data Field',
    DELETE_DATA_BLOCK_DATA_FIELD_FIELD_VALUES_BY_DATA_FIELD_ID = 'Delete Data Block Data Field Values By Data Field',
    SAVE_DATA_BLOCK_BY_PANE_ID ='Save Data Block By Id',
    LOAD_DATA_BLOCK_BY_ID = 'Load Data Block By Id',
    DELETE_DATA_BLOCK_BY_ID = 'Delete Data Block By Id',
    LOAD_DATA_FIELD_BY_DATA_BLOCK = 'Load Data Field By Data Block',
    LOAD_DATA_BLOCK_DATA_FIELD_BY_ID = 'Load Data Block Data Field By Id',
    SAVE_DATA_BLOCK_DATA_FIELD = 'Save Data Block Data Field',
    UPDATE_DATA_BLOCK_DATA_FIELD_BY_ID = 'Update Data Block Data Field By Id',
    DELETE_DATA_BLOCK_DATA_FIELD_BY_ID = 'Delete Data Block Data Field',
    LOAD_DATA_FIELD_BY_PANE_ID = 'Load Data Field By Pane Id',
    LOAD_DATA_FIELD_BY_ID = 'Load Data Field By Id',
    LOAD_TOPIC_DESCRIPTION_BY_PANE_ID = 'Load Topic Description by Pane Id',
    SAVE_DATA_FIELD_BY_PANE = 'Save Data Field By Pane',
    UPDATE_DATA_FIELD_BY_PANE_ID = 'Update Data Field By Pane Id',
    DELETE_DATA_FIELD_BY_ID = 'Delete Data Field',
    LOAD_LOOKUP_VALUE_BY_TYPE = 'Load Lookup Value By Type',
    LOAD_FIELD_VALUES_FOR_DATA_FIELD = 'Load Field Values For Data Field',
    DELETE_FIELD_VALUE_BY_ID = 'Delete Field Value By Id',
    SAVE_FIELD_VALUES_FOR_DATA_FIELD= 'Save Field Values For Data Field',
    LOAD_ALL_POSSIBLE_COLORS_FOR_CHARTS = 'Load All Available Colors For Chart',
    LOAD_ALL_POSSIBLE_STYLE_FOR_CHARTS = 'Load All Available Style For Chart',
    LOAD_ALL_AVALIABLES_FONT_FAMILY_NAMES_FOR_CHARTS = 'Load All Available Font Family Names For Chart',
    LOAD_PANES_FOR_SELECTION_AS_NEXT = 'Load PANes For Selection As Next',
    LOAS_PANE_REPORTS_PANE_ID = 'Load Pane Reports By Pane Id',
    LOAD_PANE_REPORT_ID = 'Load Pane Report By Id',
    SAVE_NEW_PANE_REPORT = 'Save New Pane Report',
    SAVE_EXISTING_PANE_REPORT = 'Save Existing Pane Report',
    DELETE_PANE_REPORT_BY_ID = 'Delete Pane Report By Id',
    SAVE_PANE_REPORT_PARAMETER = 'Save Pane Report Parameter',
    DELETE_PANE_REPORT_PARAMETER_BY_ID = 'Delete Pane Report Param',
    GET_ALL_PANE_CHARTS_BY_ID = 'Get All Pane Chart By Pane Id',
    LOAD_PANE_CHART_BY_ID = 'Load Pane Chart By Id',
    DELETE_PANE_CHART_BY_ID = 'Delete Pane Chart By Id',
    SAVE_NEW_PANE_CHART = 'Save New Pane Chart',
    SAVE_EXISTING_PANE_CHART = 'Save Existing Pane Chart',
    LOAD_CHART_SERIES_DEFINATION_BY_ID = 'Load Series Definition By Id',
    SAVE_NEW_CHART_SERIES = 'Save New  Chart Series',
    SAVE_EXISTING_CHART_SERIES = 'Save Existing Chart Series',
    DELETE_CHART_SERIES_BY_ID = 'Delete Chart Series By Id',
    GET_PANE_CHART_PARAMETER_BY_PANE_CHART_ID_AND_SERIES_ID = ' Get Pane Chart Parameters By Pane Chart Id and Series Id',
    SAVE_NEW_OR_EXISTING_PANE_CHART_PARAMETER = 'Save New Or Existing Pane Chart Parameter',
    DELETE_PANE_CHART_PARAMETER = 'Delete Pane Chart Parameter',
    SAVE_NEW_PANE = 'Save New Pane',
    UPDATE_PANE_BY_ID = 'Update Pane By Id',
    DELETE_PANE_BY_ID = 'Delete Pane By Id',
    CREATE_COPY_PANE_BY_ID = 'Create Copy Pane By Id',
}
export class GetTopicDescriptionListAction {
    static readonly type: TopicActionTypes = TopicActionTypes.GET_TOPIC_DESCRIPTION_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetAllPossibleTopicDescriptionListAction {
    static readonly type: TopicActionTypes = TopicActionTypes.GET_ALL_POSSIBLE_TOPIC_DESCRIPTION_LIST;
    constructor(readonly force: boolean) {
    }
}

export class GetTopicDescriptionListCountAction {
    static readonly type: TopicActionTypes = TopicActionTypes.GET_TOPIC_DESCRIPTION_LIST_COUNT;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetTopicDescriptionByIdAction {
    static readonly type: TopicActionTypes = TopicActionTypes.GET_TOPIC_DESCRIPTION_BY_ID;
    constructor(readonly id: number, readonly force : boolean) {
    }
}

export class CopyCreateTopicDescriptionFromIdAction{
    static readonly type: TopicActionTypes = TopicActionTypes.CREATE_COPY_TOPIC_DESCRIPTION_FROM_ID;
    constructor(readonly topicDescriptionId: number, readonly params : HttpParams) {
    }
}

export class LoadLookUpCalculationPeriodAction{
    static readonly type: TopicActionTypes = TopicActionTypes.LOAD_LOOK_UP_CALCULATION_PERIOD;
    constructor(readonly type : string) { }
}

export class LoadSelectedTopicDescriptionVariableAction{
    static readonly type: TopicActionTypes = TopicActionTypes.SAVE_TOPIC_DESCRIPTION_VARIABLES;
    constructor(readonly id : string , readonly surevyDescriptionId : string) { }
}

export class SaveTopicDescriptionVariableAction{
    static readonly type: TopicActionTypes = TopicActionTypes.LOAD_SELECTED_TOPIC_DESCRIPTION_VARIABLES;
    constructor(readonly surevyDescriptionId : number,readonly body : any) { }
}

export class UpdateTopicDescriptionVariableAction{
    static readonly type: TopicActionTypes = TopicActionTypes.UPDATE_TOPIC_DESCRIPTION_VARIABLES;
    constructor(readonly surevyDescriptionId : number, readonly id : number, readonly body : any) { }
}

export class DeleteTopicDescriptionVariableAction{
    static readonly type: TopicActionTypes = TopicActionTypes.DELETE_TOPIC_DESCRIPTION_VARIABLES;
    constructor(readonly surevyDescriptionId : number, readonly id : number) { }
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

export class SaveDataBlockByPaneIdAction{
    static readonly type: TopicActionTypes = TopicActionTypes.SAVE_DATA_BLOCK_BY_PANE_ID;
    constructor(readonly body : any, readonly paneId : number){}
}

export class DeleteDataBlockByIdAction{
    static readonly type: TopicActionTypes = TopicActionTypes.DELETE_DATA_BLOCK_BY_ID;
    constructor(readonly paneId : number, readonly id : number){}
}

export class GetDataFieldsbyDataBlockAction{
    static readonly type: TopicActionTypes = TopicActionTypes.LOAD_DATA_FIELD_BY_DATA_BLOCK;
    constructor(readonly force : boolean, readonly paneId : number, readonly dataBlockId : number){}
}

export class GetDataBlockDataFieldByIdAction{
    static readonly type: TopicActionTypes = TopicActionTypes.LOAD_DATA_BLOCK_DATA_FIELD_BY_ID;
    constructor(readonly paneId : number, readonly dataBlockId : number, readonly dataFieldId : number){}
}

export class SaveDataBlockDataFieldAction{
    static readonly type: TopicActionTypes = TopicActionTypes.SAVE_DATA_BLOCK_DATA_FIELD
    constructor(readonly paneId : number, readonly dataBlockId : number, readonly body : any ) {}
}

export class UpdateDataBlockDataFieldByIdAction{
    static readonly type: TopicActionTypes = TopicActionTypes.UPDATE_DATA_BLOCK_DATA_FIELD_BY_ID
    constructor(readonly paneId : number, readonly dataBlockId : number , readonly id : number, readonly body : any ) {}
}

export class DeleteDataBlockDataFieldByIdAction{
    static readonly type: TopicActionTypes = TopicActionTypes.DELETE_DATA_BLOCK_DATA_FIELD_BY_ID;
    constructor(readonly paneId : number, readonly dataBlockId : number , readonly id : number) {}
}

export class UpdateDataBlockByPaneIdAction{
    static readonly type: TopicActionTypes = TopicActionTypes.UPDATE_DATA_BLOCK_BY_PANE_ID;
    constructor(readonly body : any, readonly id : number, readonly paneId : number){}
}

export class GetDataBlockDataFieldFieldValues{
    static readonly type : TopicActionTypes = TopicActionTypes.DATA_BLOCK_DATA_FIELD_FIELD_VALUES_BY_DATA_FIELD_ID;
    constructor(readonly paneId : number , readonly dataBlockId : number, readonly dataFieldId : number){}
}

export class SaveDataBlockDataFieldFieldValues{
    static readonly type : TopicActionTypes = TopicActionTypes.SAVE_DATA_BLOCK_DATA_FIELD_FIELD_VALUES_BY_DATA_FIELD_ID;
    constructor(readonly paneId : number , readonly dataBlockId : number, readonly dataFieldId : number, readonly body : any){}
}

export class DeleteDataBlockDataFieldFieldValues{
    static readonly type : TopicActionTypes = TopicActionTypes.DELETE_DATA_BLOCK_DATA_FIELD_FIELD_VALUES_BY_DATA_FIELD_ID;
    constructor(readonly paneId : number , readonly dataBlockId : number, readonly dataFieldId : number, readonly fieldValueId : number){}
}

export class LoadDataFiledByPaneId{
    static readonly type: TopicActionTypes = TopicActionTypes.LOAD_DATA_FIELD_BY_PANE_ID;
    constructor(readonly id : number, readonly force ?: boolean){}
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
    constructor(readonly id : number, readonly params : HttpParams, readonly getAll ?: boolean){}
}

export class SaveDataFieldByPaneIdAction{
    static readonly type: TopicActionTypes = TopicActionTypes.SAVE_DATA_FIELD_BY_PANE;
    constructor(readonly paneId : number, readonly body : any){}
}

export class UpdateDateFieldByPaneIdAction{
    static readonly type: TopicActionTypes = TopicActionTypes.UPDATE_DATA_FIELD_BY_PANE_ID;
    constructor(readonly paneId : number, readonly id : number, readonly body : any){}
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
    constructor(readonly paneId : number, readonly dataFieldId : number){}
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

export class LoadPanesForSelectionAsNext{
    static readonly type: TopicActionTypes = TopicActionTypes.LOAD_PANES_FOR_SELECTION_AS_NEXT;
    constructor(readonly surveyDescriptionId : number, readonly paneId : number){}
}

export class LoadPaneReportsByPaneId{
    static readonly type: TopicActionTypes = TopicActionTypes.LOAS_PANE_REPORTS_PANE_ID;
    constructor(readonly paneId : number){}
}

export class LoadPaneReportById{
    static readonly type : TopicActionTypes = TopicActionTypes.LOAD_PANE_REPORT_ID;
    constructor(readonly paneId : number, readonly id : number){}
}

export class SaveNewPaneReport{
    static readonly type : TopicActionTypes = TopicActionTypes.SAVE_NEW_PANE_REPORT
    constructor(readonly paneId : number, readonly body : any){}
}

export class SaveExistingPaneReportAction{
    static readonly type : TopicActionTypes = TopicActionTypes.SAVE_EXISTING_PANE_REPORT;
    constructor(readonly paneId : number , readonly body: any, readonly id : number){}
}

export class DeletePaneReportByIdAction{
    static readonly type : TopicActionTypes = TopicActionTypes.DELETE_PANE_REPORT_BY_ID;
    constructor(readonly paneId : number, readonly id : number){}
}

export class SaveNewPaneReportParameterAction{
    static readonly type : TopicActionTypes = TopicActionTypes.SAVE_PANE_REPORT_PARAMETER;
    constructor(readonly paneId : number, readonly paneReportId : number, readonly body : any){}
}

export class DeletePaneReportParameterAction{
    static readonly type : TopicActionTypes = TopicActionTypes.DELETE_PANE_REPORT_PARAMETER_BY_ID;
    constructor(readonly paneId : number , readonly paneReportId : number , readonly id : number){}
}

export class GetAppPaneChartByPaneIdAction{
    static readonly type : TopicActionTypes = TopicActionTypes.GET_ALL_PANE_CHARTS_BY_ID;
    constructor(readonly paneId : number){}
}

export class LoadPaneChartByIdAction{
    static readonly type : TopicActionTypes = TopicActionTypes.LOAD_PANE_CHART_BY_ID;
    constructor(readonly paneId : number, readonly chartId : number, readonly force : boolean){}
}

export class DeletePaneChartByIdAction{
    static readonly type : TopicActionTypes = TopicActionTypes.DELETE_PANE_CHART_BY_ID;
    constructor(readonly paneId : number, readonly chartId : number){}
}

export class SaveNewPaneChartAction{
    static readonly type : TopicActionTypes = TopicActionTypes.SAVE_NEW_PANE_CHART;
    constructor(readonly paneId : number, readonly chartBody : any){}
}

export class SaveExistingPaneChartAction{
    static readonly type : TopicActionTypes = TopicActionTypes.SAVE_EXISTING_PANE_CHART;
    constructor(readonly paneId : number,readonly chartId: number,readonly chartBody : any){}
}

export class LoadChartSeriesDefinationById{
    static readonly type : TopicActionTypes = TopicActionTypes.LOAD_CHART_SERIES_DEFINATION_BY_ID;
    constructor(readonly paneId : number, readonly paneChartId : number,  readonly id : number ){}
}

export class SaveNewChartSeriesAction{
    static readonly type : TopicActionTypes = TopicActionTypes.SAVE_NEW_CHART_SERIES;
    constructor(readonly paneId : number, readonly chartId : number,  readonly body : any ){}
}

export class SaveExistingChartSeriesAction{
    static readonly type : TopicActionTypes = TopicActionTypes.SAVE_EXISTING_CHART_SERIES;
    constructor(readonly paneId : number, readonly chartId : number,  readonly id : number , readonly body : any){}
}

export class DeleteChartSeriesAction{
    static readonly type : TopicActionTypes = TopicActionTypes.DELETE_CHART_SERIES_BY_ID;
    constructor(readonly paneId : number, readonly chartId : number,  readonly id : number ){}
}

export class GetPaneChartParametersListByPaneChartIdAndSeriesIdAction{
    static readonly type : TopicActionTypes = TopicActionTypes.GET_PANE_CHART_PARAMETER_BY_PANE_CHART_ID_AND_SERIES_ID;
    constructor(readonly paneId : number, readonly paneChartId : number, readonly chartSeriesId : number){}
}

export class SaveNewOrExistingPaneChartParameter{
    static readonly type : TopicActionTypes = TopicActionTypes.SAVE_NEW_OR_EXISTING_PANE_CHART_PARAMETER;
    constructor(readonly paneId : number, readonly paneChartId : number, readonly chartSeriesId : number, readonly body : any){}
}

export class DeletePaneChartParameter{
    static readonly type : TopicActionTypes = TopicActionTypes.DELETE_PANE_CHART_PARAMETER;
    constructor(readonly paneId : number, readonly paneChartId : number, readonly chartSeriesId : number, readonly chartParameterId : number){}
}

export class SaveNewPaneAction{
    static readonly type : TopicActionTypes = TopicActionTypes.SAVE_NEW_PANE;
    constructor(readonly body : any,readonly surveyDescriptionId : number){}
}


export class UpdadePaneByIdAction{
    static readonly type : TopicActionTypes = TopicActionTypes.UPDATE_PANE_BY_ID;
    constructor(readonly body : any,readonly surveyDescriptionId : number, readonly paneId : number){}
}

export class DeletePaneByIdAction{
    static readonly type : TopicActionTypes = TopicActionTypes.DELETE_PANE_BY_ID;
    constructor(readonly surveyDescriptionId : number, readonly paneId : number){}
}

export class CreateCopyPaneByIdAction{
    static readonly type : TopicActionTypes = TopicActionTypes.CREATE_COPY_PANE_BY_ID;
    constructor(readonly surveyDescriptionId : number, readonly paneId : number, readonly params : HttpParams){}
}