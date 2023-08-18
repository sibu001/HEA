import { HttpParams } from "@angular/common/http";

export enum TrendingDefinitionActionTypes {
    GET_KEY_INDICATOR_LIST = 'Get All Key Indicator List',
    GET_KEY_INDICATOR_BY_ID = 'Get Key Indicator By Id',
    UPDATE_KEY_INDICATOR = 'Update Key Indicator',
    SAVE_KEY_INDICATOR = 'Save Key Indicator',
    DELETE_KEY_INDICATOR_BY_ID = 'Delete Key Indicator By Id',
    GET_KEY_INDICATOR_VARIABLE_LIST = 'Get All Key Indicator Variable List',
    GET_KEY_INDICATOR_VARIABLE_BY_ID = 'Get Key Indicator Variable By Id',
    UPDATE_KEY_INDICATOR_VARIABLE = 'Update Key Indicator Variable',
    SAVE_KEY_INDICATOR_VARIABLE = 'Save Key Indicator Variable',
    DELETE_KEY_INDICATOR_VARIABLE_BY_ID = 'Delete Key Indicator Variable By Id',
    GET_KEY_INDICATOR_CUSTOMER_GROUP_LIST = 'Get All Key Indicator Customer Group List',
    GET_KEY_INDICATOR_CUSTOMER_GROUP_BY_ID = 'Get Key Indicator Customer Group By Id',
    UPDATE_KEY_INDICATOR_CUSTOMER_GROUP = 'Update Key Indicator Customer Group',
    SAVE_KEY_INDICATOR_CUSTOMER_GROUP = 'Save Key Indicator Customer Group',
    DELETE_KEY_INDICATOR_CUSTOMER_GROUP_BY_ID = 'Delete Key Indicator Customer Group By Id',
    GET_TRENDING_PARTS_LIST = 'Get All TrendingParts List',
    GET_TRENDING_PARTS_BY_ID = 'Get TrendingParts By Id',
    UPDATE_TRENDING_PARTS_ = 'Update TrendingParts',
    SAVE_TRENDING_PARTS_ = 'Save TrendingParts',
    DELETE_TRENDING_PARTS_BY_ID = 'Delete TrendingParts By Id',
    LOAD_TRENDING_CHART_BY_TRENDING_PARTS_ID = ' Load Trending Charts By Trending Parts Id',
    LOAD_TRENDING_PARTS_CHARTS_BY_ID = ' Load Trending Parts Chart By Id',
    SAVE_TRENDING_PARTS_CHARTS_BY_ID = ' Save Trending Parts Chart ',
    UPDATE_TRENDING_PARTS_CHARTS_BY_ID = ' Update Trending Parts Charts By Id',
    DELETE_TRENDING_PARTS_CHARTS_BY_ID = ' Delete Trending Parts Charts By Id',
    GET_TRENDING_CHART_SERIES_LIST_BY_CHART_ID = ' Get Trending Charts Series By Chart Id',
    GET_TRENDING_CHART_SERIES_BY_CHART_ID = ' Get Trending Charts Series By Charts Id',
    SAVE_TRENDING_CHART_SERIES = 'Save Trending Charts Series',
    DELETE_TRENDING_CHART_SERIES_BY_CHART_ID = 'Delete Trending Charts Series By Chart Id',
    UPDATE_TRENDING_CHART_SERIES_BY_CHART_ID = 'Update Trending Charts Series By Chart Id',
    GET_CHART_DATA_SETS_FROM_CHART_SERIES = 'Get Chart Data Sets Charts Series By Id',
    ADD_CHART_DATA_SETS_FROM_CHART_SERIES = 'Add Chart Data Sets Charts Series By Id',
    DELETE_CHART_DATA_SETS_FROM_CHART_SERIES = 'Delete Chart Data Sets Charts Series By Id'
}
export class GetKeyIndicatorListAction {
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.GET_KEY_INDICATOR_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetKeyIndicatorByIdAction {
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.GET_KEY_INDICATOR_BY_ID;
    constructor(readonly id: number) {
    }
}
export class UpdateKeyIndicatorAction {
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.UPDATE_KEY_INDICATOR;
    constructor(readonly id: number, readonly keyIndicator: any) {
    }
}

export class SaveKeyIndicatorAction {
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.SAVE_KEY_INDICATOR;
    constructor(readonly keyIndicator: any) {
    }
}

export class DeleteKeyIndicatorByIdAction {
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.DELETE_KEY_INDICATOR_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetKeyIndicatorVariableListAction {
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.GET_KEY_INDICATOR_VARIABLE_LIST;
    constructor(readonly force: boolean, readonly keyIndicatorId: number, readonly filter : any) {
    }
}

export class GetKeyIndicatorVariableByIdAction {
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.GET_KEY_INDICATOR_VARIABLE_BY_ID;
    constructor(readonly keyIndicatorId : number, readonly id: number) {
    }
}
export class UpdateKeyIndicatorVariableAction {
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.UPDATE_KEY_INDICATOR_VARIABLE;
    constructor(readonly id: number, readonly keyIndicatorId : number,  readonly keyIndicatorVariable: any) {
    }
}

export class SaveKeyIndicatorVariableAction {
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.SAVE_KEY_INDICATOR_VARIABLE;
    constructor(readonly keyIndicatorVariable: any,readonly keyIndicatorId : number) {
    }
}

export class DeleteKeyIndicatorVariableByIdAction {
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.DELETE_KEY_INDICATOR_VARIABLE_BY_ID;
    constructor(readonly id: number, readonly keyIndicatorId : number) {
    }
}

export class GetKeyIndicatorCustomerGroupListAction {
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.GET_KEY_INDICATOR_CUSTOMER_GROUP_LIST;
    constructor(readonly force: boolean, readonly keyIndicatorId : number, readonly filter: any) {
    }
}

export class GetKeyIndicatorCustomerGroupByIdAction {
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.GET_KEY_INDICATOR_CUSTOMER_GROUP_BY_ID;
    constructor(readonly id: number) {
    }
}
export class UpdateKeyIndicatorCustomerGroupAction {
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.UPDATE_KEY_INDICATOR_CUSTOMER_GROUP;
    constructor(readonly id: number, readonly keyIndicatorCustomerGroup: any) {
    }
}

export class AddKeyIndicatorCustomerGroupAction {
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.SAVE_KEY_INDICATOR_CUSTOMER_GROUP;
    constructor(readonly keyIndicatorId: number, readonly customerGroupId : number ) {
    }
}

export class RemoveKeyIndicatorCustomerGroupByIdAction {
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.DELETE_KEY_INDICATOR_CUSTOMER_GROUP_BY_ID;
    constructor(readonly keyIndicatorId: number, readonly customerGroupId : number ) {
    }
}

export class GetTrendingPartsListAction {
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.GET_TRENDING_PARTS_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetTrendingPartsByIdAction {
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.GET_TRENDING_PARTS_BY_ID;
    constructor(readonly force : boolean, readonly id: number) {
    }
}
export class UpdateTrendingPartsAction {
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.UPDATE_TRENDING_PARTS_;
    constructor(readonly id: number, readonly trendingParts: any) {
    }
}

export class SaveTrendingPartsAction {
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.SAVE_TRENDING_PARTS_;
    constructor(readonly trendingParts: any) {
    }
}

export class DeleteTrendingPartsByIdAction {
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.DELETE_TRENDING_PARTS_BY_ID;
    constructor(readonly id: number) {
    }
}

export class LoadTrendingChartsByTrendingPartsIdAction{
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.LOAD_TRENDING_CHART_BY_TRENDING_PARTS_ID;
    constructor(readonly force : boolean, readonly id: number, readonly params : HttpParams) {
    }
}

export class LoadTrenginPartChartByIdAction{
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.LOAD_TRENDING_PARTS_CHARTS_BY_ID;
    constructor(readonly force : boolean, readonly trendingPartId: number, readonly id: number) {
    }
}

export class SaveTrenginPartChartByAction{
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.SAVE_TRENDING_PARTS_CHARTS_BY_ID;
    constructor(readonly trendingPartId: number, readonly body : any) {
    }
}

export class UpdateTrenginPartChartByIdAction{
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.UPDATE_TRENDING_PARTS_CHARTS_BY_ID;
    constructor(readonly trendingPartId: number, readonly id: number, readonly body : any) {
    }
}

export class DeleteTrenginPartChartByIdAction{
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.DELETE_TRENDING_PARTS_CHARTS_BY_ID;
    constructor(readonly trendingPartId: number, readonly id: number) {
    }
}

export class GetTrendingChartSeriesbyChartIdAction{
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.GET_TRENDING_CHART_SERIES_BY_CHART_ID;
    constructor(readonly force: boolean, readonly trendingPartId: number, readonly chartId: number, readonly seriesId : number) {
 }
}

export class DeleteTrendingChartSeriesByChartIdAction{
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.DELETE_TRENDING_CHART_SERIES_BY_CHART_ID;
    constructor(readonly trendingPartId: number, readonly chartId: number, readonly seriesId : number) {
 }
}

export class SaveTrendingChartSeriesAction{
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.SAVE_TRENDING_CHART_SERIES;
    constructor(readonly trendingPartId: number, readonly chartId: number, readonly seriesBody : any) {
 }
}

export class UpdateTrendingChartSeriesByChartIdAction{
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.UPDATE_TRENDING_CHART_SERIES_BY_CHART_ID;
    constructor(readonly trendingPartId: number, readonly chartId: number, readonly seriesId : number, readonly seriesBody : any) {
 }
}


export class GetChartDataSetToTrendingChartSeriesAction{
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.GET_CHART_DATA_SETS_FROM_CHART_SERIES;
    constructor(readonly trendingPartId: number, readonly chartId: number, readonly seriesId : number) {
 }
}

export class AddChartDataSetToTrendingChartSeriesAction{
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.ADD_CHART_DATA_SETS_FROM_CHART_SERIES;
    constructor(readonly trendingPartId: number, readonly chartId: number, readonly seriesId : number, readonly datasetbody : any) {
 }
}

export class DeleteChartDataSetToTrendingChartSeriesAction{
    static readonly type: TrendingDefinitionActionTypes = TrendingDefinitionActionTypes.DELETE_CHART_DATA_SETS_FROM_CHART_SERIES;
    constructor(readonly trendingPartId: number, readonly chartId: number, readonly seriesId : number, readonly dataSetId : number) {
 }
}