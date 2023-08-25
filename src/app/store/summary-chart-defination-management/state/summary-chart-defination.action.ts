import { HttpParams } from "@angular/common/http";

export enum SummaryChartDefinationActionType {
    GET_SUMMARY_CHART_DEFINATION_LIST = 'Get Summary Chart Definition List',
    GET_SUMMARY_CHART_DEFINATION_BY_ID = 'Get Summary Chart Definition By ID',
    SAVE_SUMMARY_CHART_DEFINITION = 'Save Summary Chart Definition',
    UPDATE_SUMMARY_CHART_DEFINITION = 'Update Summary Chart Defination',
    DELETE_SUMMARY_CHART_DEFINITION = 'Delete Summary Chart Definition',
    COPY_SUMMARY_CHART_DEFINITION = 'Copy Summary Chart Definition',
    GET_SUMMARY_CHART_SERIES_BY_ID = 'Get Summary Chart Series By Id',
    SAVE_SUMMARY_CHART_SERIES = 'Save Summary Chart Series',
    UPDATE_SUMMARY_CHART_SERIES_BY_ID = 'Update Summary Series By Id',
    DELETE_SUMMARY_CHART_SERIES_BY_ID = ' Delete Summary Chart Series By Id',
    GET_CHART_SERIES_PARAMETERS = 'Get Chart Series Parameters',
    SAVE_CHART_SERIES_PARAMETERS = 'Save Chart Series Parameters',
    DELETE_CHART_SERIES_PARAMETERS = 'Delete Chart Series Parameters'
}

export class LoadSummaryChartDefinationListAction{
    static readonly type : SummaryChartDefinationActionType = SummaryChartDefinationActionType.GET_SUMMARY_CHART_DEFINATION_LIST;
    constructor(readonly force : boolean, readonly params : HttpParams){}
}

export class GetSummaryChartDefinationByIdAction{
    static readonly type : SummaryChartDefinationActionType = SummaryChartDefinationActionType.GET_SUMMARY_CHART_DEFINATION_BY_ID;
    constructor(readonly force : boolean, readonly id : number){}
}

export class SaveSummaryChartDefinationAction{
    static readonly type : SummaryChartDefinationActionType = SummaryChartDefinationActionType.SAVE_SUMMARY_CHART_DEFINITION;
    constructor(readonly requestBody : any) {}
}

export class UpdateSummaryChartDefinationAction{
    static readonly type : SummaryChartDefinationActionType = SummaryChartDefinationActionType.UPDATE_SUMMARY_CHART_DEFINITION;
    constructor( readonly id : number, readonly requestBody : any) {}
}

export class DeleteSummaryChartDefinationAction{
    static readonly type : SummaryChartDefinationActionType = SummaryChartDefinationActionType.DELETE_SUMMARY_CHART_DEFINITION;
    constructor( readonly id : number) {}
}

export class SummaryChartDefinationCopyAction{
    static readonly type : SummaryChartDefinationActionType = SummaryChartDefinationActionType.COPY_SUMMARY_CHART_DEFINITION;
    constructor( readonly summaryChartId : number, readonly params : HttpParams) {}
}


export class GetSummaryChartSeriesByIdAction{
    static readonly type : SummaryChartDefinationActionType = SummaryChartDefinationActionType.GET_SUMMARY_CHART_SERIES_BY_ID;
    constructor(readonly force : boolean, readonly summaryChartId : number, readonly id : number){}
}

export class SaveSummaryChartSeriesAction{
    static readonly type : SummaryChartDefinationActionType = SummaryChartDefinationActionType.SAVE_SUMMARY_CHART_SERIES;
    constructor(readonly summaryChartId : number, readonly requestBody : any) {}
}

export class UpdateSummaryChartSeriesAction{
    static readonly type : SummaryChartDefinationActionType = SummaryChartDefinationActionType.UPDATE_SUMMARY_CHART_SERIES_BY_ID;
    constructor(readonly summaryChartId : number, readonly id : number, readonly requestBody : any) {}
}

export class DeleteSummaryChartSeriesAction{
    static readonly type : SummaryChartDefinationActionType = SummaryChartDefinationActionType.DELETE_SUMMARY_CHART_SERIES_BY_ID;
    constructor(readonly summaryChartId : number, readonly id : number) {}
}

export class GetChartSeriesParameterAction{
    static readonly type : SummaryChartDefinationActionType = SummaryChartDefinationActionType.GET_CHART_SERIES_PARAMETERS;
    constructor(readonly force : boolean, readonly summaryChartId : number , readonly seriesId : number){}
}

export class SaveChartSeriesParameterAction{
    static readonly type : SummaryChartDefinationActionType = SummaryChartDefinationActionType.SAVE_CHART_SERIES_PARAMETERS;
    constructor(readonly summaryChartId : number , readonly seriesId : number, readonly requestBody : any){}
}

export class DeleteChartSeriesParameterAction{
    static readonly type : SummaryChartDefinationActionType = SummaryChartDefinationActionType.DELETE_CHART_SERIES_PARAMETERS;
    constructor(readonly summaryChartId : number , readonly seriesId : number, readonly id : number){}
}
