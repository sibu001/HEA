import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action, Actions, Selector, State, StateContext } from '@ngxs/store';
import { of, pipe } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
import { TopicUtilityTransformer } from '../transformer/transformer';
import {
    GetTopicDescriptionListAction,
    GetTopicDescriptionByIdAction,
    DeleteTopicDescriptionByIdAction,
    SaveTopicDescriptionAction,
    UpdateTopicDescriptionAction,
    GetContextMethodListAction,
    ScriptDebugAction,
    GetPaidServiceListAction,
    LoadTopicVariablesAction,
    LoadLookUpCalculationPeriodAction,
    LoadSelectedTopicDescriptionVariableAction,
    LoadTopicPaneVariableById,
    LoadDataBlockByPaneId,
    LoadDataBlockById,
    LoadDataFiledByPaneId,
    LoadDataFieldById,
    LoadPaneListByTopicDescriptionId,
    SaveDataFieldByPaneIdAction,
    DeleteDataFieldByIdAction,
    LoadLookUpValueByType,
    LoadFieldValuesForDataField,
    DeleteFieldValuesForDataField,
    SaveFieldValuesForDataField,
    LoadAllPossibleColorForChartAction,
    LoadAllPossibleStyleForChartAction,
    LoadAllAvaliableFontFamiliesNamesForChartAction,
    LoadPanesForSelectionAsNext,
    LoadPaneReportsByPaneId,
    LoadPaneReportById,
    SaveNewPaneReport,
    SaveExistingPaneReportAction,
    DeletePaneReportByIdAction,
    GetAppPaneChartByPaneIdAction,
    LoadPaneChartByIdAction,
    DeletePaneChartByIdAction,
    SaveNewPaneChartAction,
    SaveExistingPaneChartAction,
    LoadChartSeriesDefinationById,
    SaveNewChartSeriesAction,
    SaveExistingChartSeriesAction,
    DeleteChartSeriesAction,
    SaveNewOrExistingPaneChartParameter,
    DeletePaneChartParameter,
    GetTopicDescriptionListCountAction,
    GetAllPossibleTopicDescriptionListAction,
    SaveNewPaneAction,
    UpdadePaneByIdAction,
    CopyCreateTopicDescriptionFromIdAction,
    DeletePaneByIdAction,
    CreateCopyPaneByIdAction,
    UpdateDataBlockByPaneIdAction,
    SaveDataBlockByPaneIdAction,
    DeleteDataBlockByIdAction,
    GetDataFieldsbyDataBlockAction,
    GetDataBlockDataFieldByIdAction,
    SaveDataBlockDataFieldAction,
    UpdateDataBlockDataFieldByIdAction,
    UpdateDateFieldByPaneIdAction,
    DeleteDataBlockDataFieldByIdAction,
    GetDataBlockDataFieldFieldValues,
    SaveDataBlockDataFieldFieldValues,
    DeleteDataBlockDataFieldFieldValues,
    GetPaneChartParametersListByPaneChartIdAndSeriesIdAction,
    SaveNewPaneReportParameterAction,
    DeletePaneReportParameterAction,
} from './topic.action';
import { TopicManagementModel } from './topic.model';

@State<TopicManagementModel>({
    name: 'topicManagement',
    defaults: {
        allPossibletopicDescriptionList : undefined,
        topicDescriptionList: undefined,
        topicDescriptionListCount : undefined,
        topicDescription: undefined,
        contextMethodList: undefined,
        scriptDebug: undefined,
        paidServiceList: undefined,
        topicDesctiptionPane : undefined,
        topicVariables : undefined,
        calculationPeriod : undefined,
        topicDescriptionVariable : undefined,
        topicPane : undefined,
        dataBlockList : undefined,
        dataBlock : undefined,
        dataBlockDataFieldList : undefined,
        dataBlockDataField : undefined,
        dataBlockDataFieldFieldValues :undefined,
        dataFieldList : undefined,
        dataField : undefined,
        paneList : undefined,
        allPossiblePaneInTopicDescription : undefined,
        FIELD_SOURCE : undefined,
        DATA_TYPE : undefined,
        INPUT_TYPE : undefined,
        CALCULATION_EVENT : undefined,
        CALCULATION_TYPE : undefined,
        CHART_TYPE  : undefined,
        TAKEBACK_TYPE : undefined,
        fieldValueList : undefined,
        possibleColors : undefined,
        possibleStyle : undefined,
        fontFamilyNames : undefined,
        TAKEBACK_IMAGE : undefined,
        TAKEBACK_ICON : undefined,
        CONSERVATION_CATEGORY : undefined,
        ACTION_TYPE : undefined,
        VARIABLE_PERIOD : undefined,
        panesForSelectionAsNext : undefined,
        paneReportList : undefined,
        paneReport : undefined,
        paneChartList : undefined,
        paneChart: undefined,
        paneChartParameters : undefined,
        paneChartSeriesDefination : undefined,
        SERIES_QUERY_TYPE : undefined,
        SERIES_COLOR : undefined,
    }
})

@Injectable()
export class TopicManagementState {

    constructor(private readonly loginService: LoginService, private readonly utilityService: UtilityService) { }

    @Selector()
    static getTopicDescriptionList(state: TopicManagementModel): any {
        return state.topicDescriptionList;
    }

    @Selector()
    static getAllPossibletopicDescriptionList(state : TopicManagementModel) : any{
        return state.allPossibletopicDescriptionList
    }

    @Selector()
    static getTopicDescriptionListCount(state: TopicManagementModel): any {
        return state.topicDescriptionListCount;
    }

    @Selector()
    static getTopicDescriptionById(state: TopicManagementModel): any {
        return state.topicDescription;
    }

    @Selector()
    static getContextMethodList(state: TopicManagementModel): any {
        return state.contextMethodList;
    }

    @Selector()
    static getSelectedTopicVariable(state: TopicManagementModel): any {
         return state.topicDescriptionVariable;
    }

    @Selector()
    static getScriptDebug(state: TopicManagementModel): any {
        return state.scriptDebug;
    }

    @Selector()
    static getCalculationPeriod(state: TopicManagementModel): any {
        return state.calculationPeriod;
    }

    @Selector()
    static getPaidServiceList(state: TopicManagementModel): any {
        return state.paidServiceList;
    }

    @Selector()
    static getTopicVariables(state : TopicManagementModel) : any {
        return state.topicVariables;
    }

    @Selector()
    static getSelectedTopicPane(state : TopicManagementModel) : any{
        return state.topicPane
    }

    @Selector()
    static getDataBlockListByPaneId(state: TopicManagementModel): any {
        return state.dataBlockList.response;
    }

    @Selector()
    static getDataBlockByPaneId(state: TopicManagementModel): any {
        return state.dataBlock;
    }

    @Selector()
    static getDataBlockDataFields(state : TopicManagementModel): any{
        return state.dataBlockDataFieldList.response;
    }

    @Selector()
    static getDataBlockDataFieldById(state : TopicManagementModel) : any{
        return state.dataBlockDataField;
    }

    @Selector()
    static getDataBlockDataFieldFieldValues(state  : TopicManagementModel) : any{
        return state.dataBlockDataFieldFieldValues.response;
    }

    @Selector()
    static getDataFieldByPaneId(state: TopicManagementModel): any {
        return state.dataFieldList.response;
    }

    @Selector()
    static getDataFieldById(state: TopicManagementModel): any {
        return state.dataField;
    }

    @Selector()
    static getPaneListByTopicDescriptionId(state: TopicManagementModel): any {
        return state.paneList;
    }

    @Selector()
    static getAllPanesByTopicDescriptionId(state: TopicManagementModel): any {
        return state.allPossiblePaneInTopicDescription;
    }

    @Selector()
    static getCalculationTypeLookUp(state: TopicManagementModel): any {
        return state.CALCULATION_TYPE;
    }

    @Selector()
    static getCalculationEventLookUp(state: TopicManagementModel): any {
        return state.CALCULATION_EVENT;
    }

    @Selector()
    static getSourceLookUp(state: TopicManagementModel): any {
        return state.FIELD_SOURCE;
    }

    @Selector()
    static getTakeBackTypeLookUp(state: TopicManagementModel): any {
        return state.TAKEBACK_TYPE;
    }

    @Selector()
    static getActionTypeLookUp(state: TopicManagementModel): any {
        return state.ACTION_TYPE;
    }

    @Selector()
    static getTakeBackIconLookUp(state: TopicManagementModel): any {
        return state.TAKEBACK_ICON;
    }

    @Selector()
    static getConservationCategoryLookUp(state: TopicManagementModel): any {
        return state.CONSERVATION_CATEGORY;
    }

    @Selector()
    static getActionImageLookUp(state: TopicManagementModel): any {
        return state.TAKEBACK_IMAGE;
    }


    @Selector()
    static getDataTypeLookUp(state: TopicManagementModel): any {
        return state.DATA_TYPE;
    }

    @Selector()
    static getTakeBackImageLookUp(state: TopicManagementModel): any {
        return state.TAKEBACK_IMAGE;
    }

    @Selector()
    static getInputTypeLookUp(state: TopicManagementModel): any {
        return state.INPUT_TYPE;
    }

    @Selector()
    static getVariablePeriodTypeLookUp(state : TopicManagementModel): any {
        return state.VARIABLE_PERIOD
    }

    @Selector()
    static getChartTypeLookUp(state: TopicManagementModel): any {
        return state.CHART_TYPE;
    }

    @Selector()
    static getChartSeriesQueryLookup(state: TopicManagementModel): any {
        return state.SERIES_QUERY_TYPE;
    }

    @Selector()
    static getChartSeriesColorLookup(state: TopicManagementModel): any {
        return state.SERIES_COLOR;
    }
    
    @Selector()
    static getFieldValueListForDataField(state: TopicManagementModel): any {
        return state.fieldValueList.response;
    }

    @Selector()
    static getAllPossibleColorsForChart(state: TopicManagementModel): any {
        return state.possibleColors;
    }

    @Selector()
    static getAllPossibleStyleForChart(state: TopicManagementModel): any {
        return state.possibleStyle;
    }

    @Selector()
    static getAllPossibleFontFamilyNames(state: TopicManagementModel): any {
        return state.fontFamilyNames;
    }

    @Selector()
    static getSelectionForPaneAsNext(state : TopicManagementModel) : any{
        return state.panesForSelectionAsNext;
    }

    @Selector()
    static getPaneReportsByPaneId(state : TopicManagementModel) : any{
        return state.paneReportList.response;
    }

    @Selector()
    static getPaneReportById(state : TopicManagementModel) : any{
        return state.paneReport;
    }

    @Selector() 
    static getPaneChartListByPaneId(state : TopicManagementModel) : any{
        return state.paneChartList.response;
    }

    @Selector()
    static getPaneChart(state : TopicManagementModel) : any{
        return state.paneChart;
    }

    @Selector()
    static getChartSeries(state : TopicManagementModel) : any{
        return state.paneChartSeriesDefination;
    }

    @Selector()
    static getPaneChartParameters(state : TopicManagementModel) : any{
        return state.paneChartParameters.response;
    }

    @Action(GetTopicDescriptionListAction)
    getAllTopicDescriptionList(ctx: StateContext<TopicManagementModel>, action: GetTopicDescriptionListAction): Actions {
        const force: boolean = action.force || TopicManagementState.getTopicDescriptionList(ctx.getState()) === undefined;
        // const force = ctx.getState().topicDescriptionList == undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.topicDescription, action.filter)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        const res = TopicUtilityTransformer.transformTopicDescriptionTableData(response);
                        ctx.patchState({
                            topicDescriptionList: res,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.message);
                        }));
        }
        return result;
    }

    @Action(GetAllPossibleTopicDescriptionListAction)
    getAllPossibleTopicDescriptionListAction(ctx: StateContext<TopicManagementModel>, action: GetAllPossibleTopicDescriptionListAction): Actions {
        const force = action.force || ctx.getState().allPossibletopicDescriptionList == undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGet(AppConstant.topicDescription)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            allPossibletopicDescriptionList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.message);
                        }));
        }
        return result;
    }
    

    @Action(GetTopicDescriptionListCountAction)
    getTopicDescriptionListCountAction(ctx: StateContext<TopicManagementModel>, action: GetTopicDescriptionListCountAction): Actions {
        const force: boolean = action.force || TopicManagementState.getTopicDescriptionListCount(ctx.getState()) === undefined;
        // const force = ctx.getState().topicDescriptionList == undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.topicDescription+'/count', action.filter)
                .pipe(
                    tap((response: any) => {
                        ctx.patchState({
                            topicDescriptionListCount: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.message);
                        }));
        }
        return result;
    }

    @Action(GetTopicDescriptionByIdAction)
    getTopicDescriptionById(ctx: StateContext<TopicManagementModel>, action: GetTopicDescriptionByIdAction): Actions {

        const topicDescription =  ctx.getState().topicDescription;
        if(topicDescription && topicDescription.id == action.id) {
            return ;
        }

        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.topicDescription + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        topicDescription: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(CopyCreateTopicDescriptionFromIdAction)
    copyCreateTopicDescriptionFromIdAction(ctx : StateContext<TopicManagementModel>, action : CopyCreateTopicDescriptionFromIdAction) : Actions {
        return this.loginService.performPostWithParam( {},
        AppConstant.topicDescription + '/' + action.topicDescriptionId + '/copy',action.params)
        .pipe(
            tap(
                (response) =>{
                    ctx.patchState({ topicDescription: response })
                },this.errorCallbak
            ));
    }

    @Action(LoadLookUpCalculationPeriodAction)
    loadLookUpCalculationPeriodAction(ctx : StateContext<TopicManagementModel>, action: LoadLookUpCalculationPeriodAction) {
        // if(ctx.getState().calculationPeriod != undefined){
        //     ctx.patchState({ calculationPeriod : Object.assign({},ctx.getState().calculationPeriod)} )
        // return;
        // }
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.lookupBaseURL + '/' + action.type + '/' + AppConstant.lookupValues)
        .pipe(
            tap(
                (response) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState(
                        { calculationPeriod : response}
                    )
                } , error =>{ 
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showErrorMessage(error.message);
                }));
    }

    @Action(LoadSelectedTopicDescriptionVariableAction)
    loadSelectedTopicDescriptionVariableAction(ctx : StateContext<TopicManagementModel>, action: LoadSelectedTopicDescriptionVariableAction) : Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.topicDescription + '/' + action.surevyDescriptionId + '/' + AppConstant.topicDescritptionVariable + '/' + action.id)
        .pipe(
            tap(
                (response : any) =>{
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        topicDescriptionVariable : response
                    })
                }, error => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showErrorMessage(error);
                }
            )
        )
    }

    @Action(LoadTopicVariablesAction)
    loadTopicVariablesAction(ctx : StateContext<TopicManagementModel>, action: LoadTopicVariablesAction) : Actions{
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGetWithParams(AppConstant.topicDescription + '/' + action.id  + '/' + AppConstant.topicDescritptionVariable ,action.params)
        .pipe(
            tap((response : any ) =>{
                document.getElementById('loader').classList.remove('loading');
                ctx.patchState({
                    topicVariables : response
                })
            }, error => { 
                document.getElementById('loader').classList.remove('loading');
                this.utilityService.showErrorMessage(error.message);
                console.log(error);
            }
            )
        )
    }

    @Action(DeleteTopicDescriptionByIdAction)
    deleteTopicDescriptionById(ctx: StateContext<TopicManagementModel>, action: DeleteTopicDescriptionByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.topicDescription + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({ topicDescription : undefined});
                }
                ,this.errorCallbak));
    }

    @Action(SaveTopicDescriptionAction)
    saveTopicDescription(ctx: StateContext<TopicManagementModel>, action: SaveTopicDescriptionAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.topicDescription, AppConstant.topicDescription)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        topicDescription: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(LoadDataBlockByPaneId)
    loadDataBlockByPaneId(ctx: StateContext<TopicManagementModel>, action: LoadDataBlockByPaneId) : Actions{
        const dataBlockList : any = ctx.getState().dataBlockList;
        if(dataBlockList && dataBlockList.id == action.paneId){
            return;
        }

        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.pane + '/' + action.paneId + '/' + AppConstant.dataBlock)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    response = TopicUtilityTransformer.transformDataBlocksTableData(response);
                    ctx.patchState({
                        dataBlockList: AppUtility.addCustomIdentifierForReducer({response : response}, action.paneId),
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    })
            );

    }

    @Action(UpdateDataBlockByPaneIdAction)
    updateDataBlockByPaneIdAction(ctx : StateContext<TopicManagementModel>, action : UpdateDataBlockByPaneIdAction) : Actions {
        return this.loginService.performPut(action.body,AppConstant.pane + '/' + action.paneId + '/' + AppConstant.dataBlock + '/' + action.id)
            .pipe(
                tap((response) =>{
                    const dataBlockList : any = ctx.getState().dataBlockList;
                    if(dataBlockList){
                        dataBlockList.response = dataBlockList.response.map((data)=>{
                            if(data.id == action.id){
                               return TopicUtilityTransformer.transformDataBlocksTableData([response])[0];
                            }
                            return data;
                        });

                        ctx.patchState({dataBlockList : {...dataBlockList}});
                    }
                    ctx.patchState({dataBlock : response});
                }, this.errorCallbak)
            );
    }

    @Action(GetDataBlockDataFieldFieldValues)
    getDataBlockDataFieldFieldValues(ctx : StateContext<TopicManagementModel>, action : GetDataBlockDataFieldFieldValues) : Actions {
        
        const dataBlockDataFieldFieldValues : any = ctx.getState().dataBlockDataFieldFieldValues;
        if(dataBlockDataFieldFieldValues && dataBlockDataFieldFieldValues.id == action.dataFieldId){
            return;
        }
        
        return this.loginService.performGet(AppUtility.endPointGenerator(
            [AppConstant.pane,action.paneId,AppConstant.dataBlock,action.dataBlockId,AppConstant.dataField,action.dataFieldId,AppConstant.fieldValues]))
            .pipe( tap((response) =>{
                ctx.patchState({ dataBlockDataFieldFieldValues : AppUtility.addCustomIdentifierForReducer({response : response},action.dataFieldId)});
            },this.errorCallbak))
    }

    @Action(SaveDataBlockDataFieldFieldValues)
    saveDataBlockDataFieldFieldValues(ctx : StateContext<TopicManagementModel>, action : SaveDataBlockDataFieldFieldValues) : Actions {
        return this.loginService.performPost(action.body,AppUtility.endPointGenerator(
            [AppConstant.pane,action.paneId,AppConstant.dataBlock,action.dataBlockId,AppConstant.dataField,action.dataFieldId,AppConstant.fieldValues]))
            .pipe( tap((response : any) =>{

                const dataBlockDataFieldFieldValues : any = ctx.getState().dataBlockDataFieldFieldValues;
                if(dataBlockDataFieldFieldValues){
                    const index =  dataBlockDataFieldFieldValues.response.findIndex(data => data.id == response.id);
                    
                    if(index == -1) dataBlockDataFieldFieldValues.response.push(response);
                    else dataBlockDataFieldFieldValues.response[index] = response;

                    ctx.patchState({dataBlockDataFieldFieldValues : {...dataBlockDataFieldFieldValues, response: [...dataBlockDataFieldFieldValues.response]}});
                }else {
                    ctx.patchState({ 
                        dataBlockDataFieldFieldValues: AppUtility.addCustomIdentifierForReducer({response : [response]},action.dataBlockId)
                    });
                }

            },this.errorCallbak));
    }

    @Action(DeleteDataBlockDataFieldFieldValues)
    deleteDataBlockDataFieldFieldValues(ctx : StateContext<TopicManagementModel>, action : DeleteDataBlockDataFieldFieldValues) : Actions {
        return this.loginService.performDelete(AppUtility.endPointGenerator(
            [AppConstant.pane,action.paneId,AppConstant.dataBlock,action.dataBlockId,AppConstant.dataField,action.dataFieldId,AppConstant.fieldValues,action.fieldValueId]))
            .pipe( tap((response : any) =>{

                if(response.data = 'OK'){
                    let dataBlockDataFieldFieldValues = ctx.getState().dataBlockDataFieldFieldValues;
                    if(dataBlockDataFieldFieldValues){
                        dataBlockDataFieldFieldValues.response = dataBlockDataFieldFieldValues.response.filter( data => data.id != action.fieldValueId );
                        ctx.patchState({ dataBlockDataFieldFieldValues: {...dataBlockDataFieldFieldValues, response : [...dataBlockDataFieldFieldValues.response]}});
                    }
                }else{
                    this.utilityService.showErrorMessage(response.errorMessage);
                }

            },this.errorCallbak));
    }

    @Action(SaveDataBlockByPaneIdAction)
    saveDataBlockByPaneIdAction(ctx : StateContext<TopicManagementModel>, action : SaveDataBlockByPaneIdAction) : Actions {
        return this.loginService.performPost(action.body,AppConstant.pane + '/' + action.paneId + '/' + AppConstant.dataBlock)
        .pipe(
            tap((response : any) =>{
                const dataBlockList : any = ctx.getState().dataBlockList;
                if(dataBlockList){
                    dataBlockList.response.push(TopicUtilityTransformer.transformDataBlocksTableData([response])[0]);
                    ctx.patchState({dataBlockList : {...dataBlockList}});
                }
                ctx.patchState({dataBlock : response, dataBlockDataFieldList : AppUtility.addCustomIdentifierForReducer({ response : [] }, response.id) });
            }, this.errorCallbak)
        );
    }

    @Action(DeleteDataBlockByIdAction)
    deleteDataBlockByIdAction(ctx : StateContext<TopicManagementModel>, action : DeleteDataBlockByIdAction){
        return this.loginService.performDelete( AppConstant.pane + '/' + action.paneId + '/' + AppConstant.dataBlock + '/' + action.id)
        .pipe(
            tap(
                (response) =>{
                    const dataBlockList = ctx.getState().dataBlockList;
                    if(dataBlockList){
                        dataBlockList.response = dataBlockList.response.filter((data) => data.id != action.id);
                        ctx.patchState({dataBlockList : {...dataBlockList}});
                    }
                    ctx.patchState({ dataBlock: undefined ,dataBlockDataFieldList : undefined});
                }));
    }

    @Action(GetDataFieldsbyDataBlockAction)
    getDataFieldsbyDataBlockAction(ctx : StateContext<TopicManagementModel>, action : GetDataFieldsbyDataBlockAction) : Actions {
        
        const dataBlockDataFields : any = ctx.getState().dataBlockDataFieldList;

        if( action.force || !dataBlockDataFields || dataBlockDataFields.id != action.dataBlockId)
        return this.loginService.performGet(AppUtility.endPointGenerator(
            [AppConstant.pane,action.paneId.toString(),AppConstant.dataBlock,action.dataBlockId.toString(),AppConstant.dataField]))
            .pipe(
                tap((response) =>{
                    ctx.patchState({dataBlockDataFieldList : AppUtility.addCustomIdentifierForReducer({response : response },action.dataBlockId)});
                },this.errorCallbak));

        return;
    }

    @Action(GetDataBlockDataFieldByIdAction)
    getDataBlockDataFieldByIdAction(ctx : StateContext<TopicManagementModel>, action : GetDataBlockDataFieldByIdAction) :Actions {

        const dataBlockDataFieldList : any = ctx.getState().dataBlockDataFieldList;
        const dataBlockDataField : any = ctx.getState().dataBlockDataField;

        if(dataBlockDataField && dataBlockDataField.id == action.dataFieldId){
            return;
        }

        if(dataBlockDataFieldList && dataBlockDataFieldList.response.length){
            const dataBlockDataField : any = dataBlockDataFieldList.response.find((data) => data.id == action.dataFieldId);
            ctx.patchState({dataBlockDataField: dataBlockDataField});
            return;
        }

        return this.loginService.performGet(
            AppUtility.endPointGenerator([AppConstant.pane,action.paneId.toString(),AppConstant.dataBlock,
                action.dataBlockId.toString(),AppConstant.dataField,action.dataFieldId.toString()]))
            .pipe(tap(
                (response : any)=>{
                    ctx.patchState({dataBlockDataField : response});
                }, this.errorCallbak
            ));
    }

    @Action(SaveDataBlockDataFieldAction)
    saveDataBlockDataField(ctx : StateContext<TopicManagementModel> , action : SaveDataBlockDataFieldAction) : Actions {
        return this.loginService.performPost(action.body,AppUtility
            .endPointGenerator([AppConstant.pane,action.paneId,AppConstant.dataBlock,action.dataBlockId,AppConstant.dataField]))
            .pipe(
                tap((response : any) =>{
                    const dataBlockDataFieldList : any = ctx.getState().dataBlockDataFieldList;
                    if(dataBlockDataFieldList){
                        dataBlockDataFieldList.response.push(response);
                        ctx.patchState({ dataBlockDataFieldList : {...dataBlockDataFieldList, response : [...dataBlockDataFieldList.response]}});
                    }

                    ctx.patchState({
                        dataBlockDataField : response,
                        dataBlockDataFieldFieldValues : AppUtility.addCustomIdentifierForReducer({ response : []},response.dataFieldId)
                    });
                },this.errorCallbak));
    }

    @Action(UpdateDataBlockDataFieldByIdAction)
    updateDataBlockDataFieldById(ctx : StateContext<TopicManagementModel> , action : UpdateDataBlockDataFieldByIdAction) : Actions {
        return this.loginService.performPut(action.body,AppUtility
            .endPointGenerator([AppConstant.pane,action.paneId,AppConstant.dataBlock,action.dataBlockId,AppConstant.dataField,action.id]))
            .pipe(
                tap((response : any) =>{
                    let dataBlockDataFieldList : any = ctx.getState().dataBlockDataFieldList;
                    if(dataBlockDataFieldList){
                        dataBlockDataFieldList.response = dataBlockDataFieldList.response.map((data)=>{
                            if(data.id == response.id) return response;
                            return data;
                        });
                        ctx.patchState({dataBlockDataFieldList : {...dataBlockDataFieldList, response : [...dataBlockDataFieldList.response]}});
                    }

                    ctx.patchState({dataBlockDataField : response});
                },this.errorCallbak));
    }

    @Action(DeleteDataBlockDataFieldByIdAction)
    deleteDataBlockDataFieldByIdAction(ctx : StateContext<TopicManagementModel>, action : DeleteDataBlockDataFieldByIdAction) : Actions{
    
        return this.loginService.performDelete(AppUtility
            .endPointGenerator([AppConstant.pane,action.paneId,AppConstant.dataBlock,action.dataBlockId,AppConstant.dataField,action.id]))
            .pipe(
                tap((response : any) =>{

                    const dataBlockDataFieldList : any = ctx.getState().dataBlockDataFieldList;
                    if(dataBlockDataFieldList && dataBlockDataFieldList.response.length){
                        dataBlockDataFieldList.response = dataBlockDataFieldList.response.filter((data) => data.id != action.id);
                        ctx.patchState({dataBlockDataFieldList: {...dataBlockDataFieldList}});
                    }

                    ctx.patchState({dataBlockDataField : undefined, dataBlockDataFieldFieldValues : undefined});
                },this.errorCallbak));
    }

    @Action(LoadDataFiledByPaneId)
    loadDataFiledByPaneId(ctx: StateContext<TopicManagementModel>, action: LoadDataFiledByPaneId) : Actions{


        const dataFieldList = ctx.getState().dataFieldList;
        const force : boolean = action.force || (!dataFieldList || dataFieldList.id != action.id );

        if(!force) return null;

        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGetWithParams(AppConstant.pane + '/' + action.id + '/' + AppConstant.dataField, new HttpParams().append('dataBlockIdEmpty','true'))
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        dataFieldList: AppUtility.addCustomIdentifierForReducer({response : response}, action.id),
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    })
            );

    }

    @Action(LoadDataFieldById)
    loadDataFiledById(ctx: StateContext<TopicManagementModel>, action: LoadDataFieldById) : Actions{
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.pane + '/' + action.paneId + '/' + AppConstant.dataField +'/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        dataField: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    })
            );

    }

    @Action(LoadTopicPaneVariableById)
    loadTopicPaneVariableById(ctx : StateContext<TopicManagementModel>, action: LoadTopicPaneVariableById){
        
        const topicPane = ctx.getState().topicPane;
        if(topicPane && action.paneId == topicPane.paneId && action.surevyDescriptionId == topicPane.surveyDescriptionId){
            return ;
        }

        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.topicDescription + '/' + action.surevyDescriptionId + '/' + AppConstant.pane + '/' + action.paneId)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        topicPane: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(LoadDataBlockById)
    loadDataBlockById(ctx : StateContext<TopicManagementModel>, action: LoadDataBlockById){

        const dataBlock = ctx.getState().dataBlock;
        if(dataBlock && dataBlock.id == action.id) return null;

        const dataBlockList = ctx.getState().dataBlockList;
        if(dataBlockList){
            const data = dataBlockList.response.find((data) => data.id == action.id);
            ctx.patchState({dataBlock : data});
            return;
        }

        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.pane + '/' + action.paneId + '/' + AppConstant.dataBlock + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        dataBlock: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }


    @Action(UpdateTopicDescriptionAction)
    updateTopicDescription(ctx: StateContext<TopicManagementModel>, action: UpdateTopicDescriptionAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.topicDescription, AppConstant.topicDescription + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
                    let allPossibleTopicDescription = ctx.getState().allPossibletopicDescriptionList;
                    if(allPossibleTopicDescription){
                        allPossibleTopicDescription = allPossibleTopicDescription.map((data) =>{
                            
                            if(data.id == response.id){
                                return response;
                            }
                            
                            return data;
                        });
                    }
                    ctx.patchState({
                        topicDescription: response,
                        allPossibletopicDescriptionList : allPossibleTopicDescription
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(GetContextMethodListAction)
    getAllContextMethodList(ctx: StateContext<TopicManagementModel>, action: GetContextMethodListAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.contextMethod)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // const dataSource = Transformer.transformTopicDescriptionTableData(response, action.viewType);
                    ctx.patchState({
                        contextMethodList: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(ScriptDebugAction)
    scriptDebug(ctx: StateContext<TopicManagementModel>, action: ScriptDebugAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.scriptDebugData, AppConstant.scriptDebugConsole)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Debug Successfully');
                    ctx.patchState({
                        scriptDebug: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetPaidServiceListAction)
    getPaidServiceList(ctx: StateContext<TopicManagementModel>, action: GetPaidServiceListAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.paidService)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        paidServiceList: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    
    @Action(LoadPaneListByTopicDescriptionId)
    loadPaneListByTopicDescriptionId(ctx: StateContext<TopicManagementModel>, action: LoadPaneListByTopicDescriptionId): Actions {
        // const paneList = ctx.getState().paneList;
        // if(paneList && paneList[0] && paneList[0].surveyDescriptionId == action.id)
        //     return null;

        if(action.getAll){
            const allPossiblePaneInTopicDescription = ctx.getState().allPossiblePaneInTopicDescription;
            if(allPossiblePaneInTopicDescription) return;
        }
            
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGetWithParams(AppConstant.topicDescription + '/' + action.id + '/' + AppConstant.pane, action.params)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    if(action.getAll){
                        ctx.patchState({ allPossiblePaneInTopicDescription : response});
                    }else{
                        ctx.patchState({
                            paneList: TopicUtilityTransformer.convertPaneListDataForParentSectionLabel(response)});
                    }

                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                }));
    }

    @Action(SaveDataFieldByPaneIdAction)
    saveDataFieldByPaneIdAction(ctx: StateContext<TopicManagementModel>, action: SaveDataFieldByPaneIdAction): Actions {            
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.body,AppConstant.pane + '/' + action.paneId + '/' + AppConstant.dataField)
            .pipe(
                tap((response: any) => {

                    const dataFieldList : any = ctx.getState().dataFieldList;
                    if(dataFieldList){
                        dataFieldList.response.push(response);
                        ctx.patchState({ dataFieldList : {...dataFieldList , response : [...dataFieldList.response]}});
                    }

                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        dataField: response,
                        fieldValueList : AppUtility.addCustomIdentifierForReducer({response: []},response.dataFieldId)
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                }));
    }

    @Action(UpdateDateFieldByPaneIdAction)
    updateDateFieldByPaneIdActio(ctx : StateContext<TopicManagementModel>, action : UpdateDateFieldByPaneIdAction) : Actions{
        return this.loginService.performPut(action.body,
            AppUtility.endPointGenerator([AppConstant.pane,action.paneId,AppConstant.dataField,action.id]))
            .pipe(
                tap((response : any) =>{

                    const dataFieldList : any = ctx.getState().dataFieldList;
                    if(dataFieldList){
                        dataFieldList.response = dataFieldList.response.map(data =>{
                            if(data.id == response.id) return response;
                            return data;
                        })
                        ctx.patchState({ dataFieldList : {...dataFieldList , response : [...dataFieldList.response]}});
                    }

                    ctx.patchState({dataField : response})
                },this.errorCallbak));

    }

    @Action(DeleteDataFieldByIdAction)
    deleteDataFieldByIdAction(ctx: StateContext<TopicManagementModel>, action: DeleteDataFieldByIdAction): Actions {            
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.pane + '/' + action.paneId + '/' + AppConstant.dataField + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    let dataFieldList = ctx.getState().dataFieldList;
                    dataFieldList.response = dataFieldList.response.filter( data => data.id != action.id);
                    ctx.patchState({
                        dataFieldList: {...dataFieldList, response : [...dataFieldList.response]}
                    })
                    ctx.patchState({
                        dataField: undefined,
                        fieldValueList : undefined
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                }));
    }

    @Action(LoadLookUpValueByType)
    loadLookUpValueByType(ctx: StateContext<TopicManagementModel>, action: LoadLookUpValueByType): Actions {

        const state = ctx.getState();
        if(state[action.type])
            return null;

        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.lookup + '/' + action.type + '/' + AppConstant.lookupValues)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    const currentState = ctx.getState();
                    // console.log("pre state :- " + JSON.stringify(state))
                    currentState[action.type] = response
                    // console.log("post state :- " + JSON.stringify(state))
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                }));
    }

    @Action(LoadFieldValuesForDataField)
    loadFieldValuesForDataField(ctx: StateContext<TopicManagementModel>, action: LoadFieldValuesForDataField): Actions {

        const fieldValueList = ctx.getState().fieldValueList;
        if(fieldValueList && fieldValueList.id == action.dataFieldId){
            return;
        }

        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.pane + '/' + action.paneId + '/' + AppConstant.dataField + '/' + action.dataFieldId + '/' + AppConstant.fieldValues)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');

                    response = TopicUtilityTransformer.transformFieldValuesTableData(response);
                    ctx.patchState({
                        fieldValueList: AppUtility.addCustomIdentifierForReducer({response : response}, action.dataFieldId)
                    });  
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                }));
    }

    @Action(DeleteFieldValuesForDataField)
    deleteFieldValuesForDataField(ctx: StateContext<TopicManagementModel>, action: DeleteFieldValuesForDataField): Actions {

        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.pane + '/' + action.paneId + '/' +  AppConstant.dataField + '/' + action.dataFieldId + '/' + AppConstant.fieldValues + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    if(response.data = 'OK'){
                        document.getElementById('loader').classList.remove('loading');
                        let fieldValueList = ctx.getState().fieldValueList;
                        fieldValueList.response = fieldValueList.response.filter( data => data.id != action.id );
                        ctx.patchState({ 
                            fieldValueList: {...fieldValueList, response: [...fieldValueList.response]}
                        })
                    }else{
                        this.utilityService.showErrorMessage(response.errorMessage);
                    }
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                }));
    }

    @Action(SaveFieldValuesForDataField)
    saveFieldValuesForDataField(ctx: StateContext<TopicManagementModel>, action: SaveFieldValuesForDataField): Actions {

        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.body, AppConstant.pane + '/' + action.paneId + '/' +  AppConstant.dataField + '/' + action.dataFieldId + '/' + AppConstant.fieldValues)
            .pipe(
                tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        let fieldValueList = ctx.getState().fieldValueList;
                        const index = fieldValueList.response.findIndex( res => res.id == response.id);
                        if(index == -1) fieldValueList.response.push(TopicUtilityTransformer.transformFieldValuesSingleData(response));
                        else fieldValueList.response[index] = TopicUtilityTransformer.transformFieldValuesSingleData(response);
                        
                        ctx.patchState({ 
                            fieldValueList: {...fieldValueList, response: [...fieldValueList.response]}
                        })

                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                }));
    }

    @Action(LoadAllPossibleColorForChartAction)
    loadAllPossibleColorForChartAction(ctx: StateContext<TopicManagementModel>, action: LoadAllPossibleColorForChartAction): Actions {

        const possibleColors : Array<any> = ctx.getState().possibleColors;
        if(possibleColors) return;

        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.charts + '/' + AppConstant.possibleColors)
            .pipe(
                tap((response: any) => {
                  ctx.patchState({possibleColors : response.data});
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                }));
    }


    @Action(LoadAllPossibleStyleForChartAction)
    loadAllPossibleStyleForChartAction(ctx: StateContext<TopicManagementModel>, action: LoadAllPossibleStyleForChartAction): Actions {

        if(ctx.getState().possibleStyle) return null;

        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.charts + '/' + AppConstant.possibleStyles)
            .pipe(
                tap((response: any) => {
                  ctx.patchState({possibleStyle : response.data});
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                }));
    }

    @Action(LoadAllAvaliableFontFamiliesNamesForChartAction)
    loadAllAvaliableFontFamiliesNamesForChartAction(ctx: StateContext<TopicManagementModel>, action: LoadAllAvaliableFontFamiliesNamesForChartAction): Actions {

        if(ctx.getState().fontFamilyNames) return null;

        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.charts + '/' + AppConstant.availableFontFamilyNames)
            .pipe(
                tap((response: any) => {
                  ctx.patchState({fontFamilyNames : response.data});
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                }));
    }

    @Action(LoadPanesForSelectionAsNext)
    loadPanesForSelectionAsNext(ctx: StateContext<TopicManagementModel>, action: LoadPanesForSelectionAsNext): Actions {

        const panesForSelectionAsNext = ctx.getState().panesForSelectionAsNext;
        if(panesForSelectionAsNext && panesForSelectionAsNext[0] && panesForSelectionAsNext[0].surveyDescriptionId == action.surveyDescriptionId){
            return;
        }

        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.topicDescription + '/' + action.surveyDescriptionId +  '/' + AppConstant.pane + 
          '/' + action.paneId + '/' + AppConstant.nextPane)
            .pipe(
                tap((response: any) => {
                  ctx.patchState({panesForSelectionAsNext : response});
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                }));
    }


    @Action(LoadPaneReportsByPaneId)
    loadPaneReportsByPaneId(ctx : StateContext<TopicManagementModel>, action: LoadPaneReportsByPaneId) : Actions{

        const paneReports = ctx.getState().paneReportList;
        if(paneReports && paneReports.id == action.paneId){
            return null;
        }

        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.pane + '/' + action.paneId + '/' + AppConstant.reports)
          .pipe(
              tap((response: any) => {
                const res = TopicUtilityTransformer.paneReportsUtility(response);
                ctx.patchState({paneReportList : AppUtility.addCustomIdentifierForReducer({response : res},action.paneId)});
              },
                  error => {
                      document.getElementById('loader').classList.remove('loading');
                      this.utilityService.showErrorMessage(error.message);
              }));

    }

    @Action(LoadPaneReportById)
    loadPaneReportById(ctx: StateContext<TopicManagementModel>, action: LoadPaneReportById) : Actions{

        const paneReport : any = ctx.getState().paneReport;
        if(paneReport && paneReport.id == action.id){
            return;
        }

        const paneReportList : any = ctx.getState().paneReportList;
        if(paneReportList && paneReportList.response[0]){
            const paneReport = paneReportList.response.find(data => data.id == action.id);
            ctx.patchState({paneReport : paneReport})
            return;
        }

        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.pane + '/' + action.paneId + '/' + AppConstant.reports + '/' + action.id)
          .pipe(
              tap((response: any) => {
                ctx.patchState({paneReport : response});
              },
                  error => {
                      document.getElementById('loader').classList.remove('loading');
                      this.utilityService.showErrorMessage(error.message);
              })
        );    
    }

    @Action(SaveNewPaneReport)
    saveNewPaneReport(ctx: StateContext<TopicManagementModel>, action: SaveNewPaneReport) :Actions{
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost( action.body ,AppConstant.pane + '/' + action.paneId + '/' + AppConstant.reports)
        .pipe(
            tap((response: any) => {

                const paneReportList =  ctx.getState().paneReportList;
                if(paneReportList){
                    paneReportList.response.push(TopicUtilityTransformer.paneReportsUtility(response));
                    ctx.patchState({paneReportList : {...paneReportList, response: [...paneReportList.response]}});
                }

              ctx.patchState({paneReport : response});
            },
                error => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showErrorMessage(error.message);
            })
      );       
    }

    @Action(SaveExistingPaneReportAction)
    saveExistingPaneReportAction(ctx: StateContext<TopicManagementModel>, action: SaveExistingPaneReportAction) : Actions{
        document.getElementById('loader').classList.add('loading');
     
        return this.loginService.performPut( action.body ,AppConstant.pane + '/' + action.paneId + '/' + AppConstant.reports + '/' + action.id)
        .pipe(
            tap((response: any) => {

                const paneReportList =  ctx.getState().paneReportList;
                if(paneReportList){
                    paneReportList.response = paneReportList.response.map((report) =>{
                        if(action.id == report.id) return TopicUtilityTransformer.paneReportsUtility(response);
                        return report;
                    })
                    ctx.patchState({paneReportList : {...paneReportList, response: [...paneReportList.response]}});
                }

              ctx.patchState({paneReport : response});
            },
                error => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showErrorMessage(error.message);
            })
      );   
    }

    @Action(DeletePaneReportByIdAction)
    deletePaneReportByIdAction(ctx: StateContext<TopicManagementModel>, action: DeletePaneReportByIdAction) : Actions {
        document.getElementById('loader').classList.add('loading');

        return this.loginService.performDelete(AppConstant.pane + '/' + action.paneId + '/' + AppConstant.reports + '/' + action.id)
        .pipe(
            tap((response: any) => {
                let paneReportList =  ctx.getState().paneReportList;

                if(paneReportList){
                    paneReportList.response = paneReportList.response.filter( (data) => data.id != action.id);
                    ctx.patchState({paneReportList : {...paneReportList, response : [...paneReportList.response]}});
                }
              
                ctx.patchState({paneReport : undefined});
            },
                error => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showErrorMessage(error.message);
            })
      );   
    }

    @Action(SaveNewPaneReportParameterAction)
    saveNewPaneReportParameter(ctx : StateContext<TopicManagementModel>, action : SaveNewPaneReportParameterAction) : Actions{
        return this.loginService.performPost(action.body,AppUtility.endPointGenerator(
            [AppConstant.pane,action.paneId,AppConstant.reports,action.paneReportId,AppConstant.parameters]))
            .pipe(tap(
                (response : any) =>{
                    console.log(response);
                    const topicManagementModel = ctx.getState();
                    const datafieldList = topicManagementModel.dataFieldList;
                    const paneReport = topicManagementModel.paneReport;
                    response.dataField = datafieldList.response.find(data => data.id == response.dataFieldId);
                    response.reportParam = paneReport.report.reportParams.find(data => data.id == response.reportParamId);

                    paneReport.paneReportParams.push(response);
                    ctx.patchState({paneReport : {...paneReport}});

                },this.errorCallbak
            ))
    }

    @Action(DeletePaneReportParameterAction)
    deletePaneReportParameter(ctx : StateContext<TopicManagementModel>, action : DeletePaneReportParameterAction) : Actions{
        return this.loginService.performDelete(AppUtility.endPointGenerator(
            [AppConstant.pane,action.paneId,AppConstant.reports,action.paneReportId,AppConstant.parameters,action.id]))
            .pipe(tap(
                (response : any) =>{
                    const paneReport = ctx.getState().paneReport;
                    paneReport.paneReportParams = paneReport.paneReportParams.filter(data => data.id != action.id);
                    ctx.patchState({paneReport : {...paneReport}});

                },this.errorCallbak
            ))
    }



    @Action(GetAppPaneChartByPaneIdAction)
    getAppPaneChartByPaneIdAction(ctx: StateContext<TopicManagementModel>, action: GetAppPaneChartByPaneIdAction) : Actions{

        const paneChartList = ctx.getState().paneChartList;
        if(paneChartList && paneChartList.id == action.paneId){
            return null;
        }

        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.pane + '/' + action.paneId + '/' + AppConstant.charts)
        .pipe(
            tap(
                (response) =>{
                    document.getElementById('loader').classList.remove('loading');
                    const res : Array<any> = TopicUtilityTransformer.paneChartListDataTransformer(response as Array<any>);
                    ctx.patchState({paneChartList : AppUtility.addCustomIdentifierForReducer({response : res},action.paneId)});

                },(error) =>{
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showErrorMessage(error.message);
                }
            )
        )
    }

    @Action(LoadPaneChartByIdAction)
    loadPaneChartByIdAction(ctx: StateContext<TopicManagementModel>, action: LoadPaneChartByIdAction) : Actions {

        const paneChart = ctx.getState().paneChart;
        const force : boolean = action.force || (!paneChart || paneChart.id != action.chartId);
        if( force)
        return this.loginService
        .performGet(AppConstant.pane + '/' + action.paneId + '/' + AppConstant.charts + '/' + action.chartId)
        .pipe(
            tap(
                (response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({paneChart : response});
                },(error) =>{
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showErrorMessage(error.message);
                }
            )
        )

        return null;
    }

    @Action(DeletePaneChartByIdAction)
    deletePaneChartByIdAction(ctx: StateContext<TopicManagementModel>, action: DeletePaneChartByIdAction) : Actions{
        document.getElementById('loader').classList.add('loading');
        return this.loginService
        .performDelete(AppConstant.pane + '/' + action.paneId + '/' + AppConstant.charts + '/' + action.chartId )
        .pipe(
            tap(
                (response : any) =>{
                    document.getElementById('loader').classList.remove('loading');
                    let paneChartList = ctx.getState().paneChartList;
                    if(paneChartList){
                        paneChartList.response = paneChartList.response.filter((data)=> data.id != action.chartId);
                        ctx.patchState({paneChartList : {...paneChartList, response :[...paneChartList.response]}});
                    }

                    ctx.patchState({paneChart : undefined})
                }
            ,(error : any) =>{
                document.getElementById('loader').classList.remove('loading');
                this.utilityService.showErrorMessage(error.message);
            })
        )
    }

    @Action(SaveNewPaneChartAction)
    saveNewPaneChartAction(ctx: StateContext<TopicManagementModel>, action: SaveNewPaneChartAction) : Actions{
        document.getElementById('loader').classList.add('loading');
        return this.loginService
        .performPost(action.chartBody, AppConstant.pane + '/' + action.paneId + '/' + AppConstant.charts)
        .pipe(
            tap(
                (response : any ) =>{
                    document.getElementById('loader').classList.remove('loading');
                    let paneChartList = ctx.getState().paneChartList;
                    if(paneChartList){
                        response.chartCode = response.chart.chartCode;
                        paneChartList.response.push( TopicUtilityTransformer.paneChartListDataTransformer([response])[0]);
                        ctx.patchState({paneChartList : {...paneChartList, response : [...paneChartList.response]}});
                    }

                    ctx.patchState({paneChart : response});
                }, (error : any) =>{
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showErrorMessage(error.message);
                }
            )
        )
    }

    @Action(SaveExistingPaneChartAction)
    saveExistingPaneChartAction(ctx: StateContext<TopicManagementModel>, action: SaveExistingPaneChartAction) : Actions{
        document.getElementById('loader').classList.add('loading');
        return this.loginService
        .performPut(action.chartBody, AppConstant.pane + '/' + action.paneId + '/' + AppConstant.charts + '/' + action.chartId)
        .pipe(
            tap(
                (response : any ) =>{   
                    document.getElementById('loader').classList.remove('loading');
                    let paneChartList = ctx.getState().paneChartList;
                    if(paneChartList){
                        response.chartCode = response.chart.chartCode
                        paneChartList.response = paneChartList.response.map((data) =>{
                            if(data.id == response.id) return TopicUtilityTransformer.paneChartListDataTransformer([response])[0];
                            return data;
                        });
                        ctx.patchState({paneChartList : {...paneChartList, response : [...paneChartList.response]}});
                    }
                    ctx.patchState({paneChart : response});
                }, (error : any) =>{
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showErrorMessage(error.message);
                }
            )
        )
    }

    @Action(LoadChartSeriesDefinationById)
    loadChartSeriesDefinationById(ctx : StateContext<TopicManagementModel>, action: LoadChartSeriesDefinationById) : Actions {


        const paneChartSeriesDefination : any = ctx.getState().paneChartSeriesDefination;
        if(paneChartSeriesDefination && paneChartSeriesDefination.id == action.id) return;

        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet( AppConstant.pane + '/' + action.paneId + '/' + AppConstant.charts +  '/' + action.paneChartId  + '/' + AppConstant.series + '/' + action.id)
        .pipe(
            tap(
                (response : any) =>{
                    ctx.patchState({ paneChartSeriesDefination : response})
                    document.getElementById('loader').classList.remove('loading');
                }, (error : any) =>{
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showErrorMessage(error.message);
                }            
            )
        )
        
    }

    @Action(SaveNewChartSeriesAction)
    saveNewChartSeriesAction(ctx : StateContext<TopicManagementModel>, action: SaveNewChartSeriesAction) : Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.body,AppConstant.pane + '/' + action.paneId + '/' + AppConstant.charts +  '/' + action.chartId + '/' + AppConstant.series)
        .pipe(
            tap(
                (response : any) =>{

                    const paneChart : any =  ctx.getState().paneChart;
                    if(paneChart){
                        paneChart.chart.chartSeries.push(response);
                        ctx.patchState({paneChart : {...paneChart}});
                    }

                    ctx.patchState({ paneChartSeriesDefination : response, 
                        paneChartParameters : AppUtility.addCustomIdentifierForReducer({response : []},response.id)});
                    document.getElementById('loader').classList.remove('loading');
                }, (error : any) =>{
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showErrorMessage(error.message);
                }            
            )
        )        
    }

    @Action(SaveExistingChartSeriesAction)
    saveExistingChartSeriesAction(ctx : StateContext<TopicManagementModel>, action: SaveExistingChartSeriesAction) : Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.body,AppConstant.pane + '/' + action.paneId + '/' + AppConstant.charts +  '/' + action.chartId + '/' + AppConstant.series + '/' + action.id)
        .pipe(
            tap(
                (response : any) =>{
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({ paneChartSeriesDefination : response});

                    const paneChart = ctx.getState().paneChart;
                    if(paneChart){
                        paneChart.chart.chartSeries = paneChart.chart.chartSeries.map((data) =>{
                            if(data.id == response.id) return response;
                            return data;
                        });
                        ctx.patchState({paneChart : {...paneChart}});
                    }
                }, (error : any) =>{
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showErrorMessage(error.message);
                }            
            )
        )
        
    }

    @Action(DeleteChartSeriesAction)
    deleteChartSeriesAction(ctx : StateContext<TopicManagementModel>, action: DeleteChartSeriesAction) : Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete( AppConstant.pane + '/' + action.paneId + '/' + AppConstant.charts +  '/' + action.chartId  + '/' + AppConstant.series + '/' + action.id)
        .pipe(
            tap(
                (response : any) =>{
                    ctx.patchState({ paneChartSeriesDefination : undefined})

                    const paneChart : any = ctx.getState().paneChart;
                    if(paneChart){
                        paneChart.chart.chartSeries = paneChart.chart.chartSeries.filter((data) => data.id != action.id);
                        ctx.patchState({paneChart: {...paneChart}});
                    }

                    document.getElementById('loader').classList.remove('loading');
                }, (error : any) =>{
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showErrorMessage(error.message);
                }            
            )
        )
        
    }

    @Action(SaveNewOrExistingPaneChartParameter)
    saveNewOrExistingPaneChartParameter(ctx : StateContext<TopicManagementModel>, action: SaveNewOrExistingPaneChartParameter) : Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.body, AppConstant.pane + '/' + action.paneId + '/' + AppConstant.charts + '/' 
        + action.paneChartId + '/' + AppConstant.series + '/' + action.chartSeriesId + '/' + AppConstant.parameters)
        .pipe(
            tap(
                (response : any) =>{

                    const paneChartParameter = ctx.getState().paneChartParameters;
                    if(paneChartParameter){
                        const dataFieldList =  ctx.getState().dataFieldList;
                        response.dataField = dataFieldList.response.find(data => data.id == response.dataFieldId);
                        paneChartParameter.response.push(response);
                        ctx.patchState({paneChartParameters : {...paneChartParameter, response : [...paneChartParameter.response]}});
                    }

                    //  commented for topic pane chart seried data sets.

                    // const paneChartSeriesDefination =  ctx.getState().paneChartSeriesDefination;
                    // if(paneChartSeriesDefination.chartParameters){
                    //     paneChartSeriesDefination.chartParameters = [response];
                    // }else{
                    //     if(action.body.id){
                    //         const templist = paneChartSeriesDefination.chartParameters.map(
                    //             (data) =>{
                    //                 if(data.id == action.body.id){
                    //                     return response;
                    //                 }
                    //                 return data;
                    //             }
                    //         );

                    //         paneChartSeriesDefination.chartParameters = templist;
                    //     }
                    // }
                    // ctx.patchState({ paneChartSeriesDefination : paneChartSeriesDefination});
                    document.getElementById('loader').classList.remove('loading');
                }, (error : any) =>{
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showErrorMessage(error.message);
                }            
            )
        )
        
    }

    @Action(GetPaneChartParametersListByPaneChartIdAndSeriesIdAction)
    GetPaneChartParametersListByPaneChartIdAndSeriesId(ctx : StateContext<TopicManagementModel>, action: GetPaneChartParametersListByPaneChartIdAndSeriesIdAction) : Actions{
    
    const paneChartParameter = ctx.getState().paneChartParameters;
    if(paneChartParameter && paneChartParameter.id == action.chartSeriesId)
        return;
    
    return this.loginService.performGet(AppUtility.endPointGenerator(
        [AppConstant.pane,action.paneId,AppConstant.charts,action.paneChartId,AppConstant.series,action.chartSeriesId,AppConstant.parameters]))
        .pipe(
            tap( (response) =>{
                ctx.patchState({paneChartParameters : AppUtility.addCustomIdentifierForReducer({response : response},action.chartSeriesId)});
            },this.errorCallbak));

    }

    @Action(DeletePaneChartParameter)
    deletePaneChartParameter(ctx : StateContext<TopicManagementModel>, action: DeletePaneChartParameter) : Actions{
        document.getElementById('loader').classList.remove('loading')
        return this.loginService.
            performDelete(AppConstant.pane + '/' + action.paneId + '/' + AppConstant.charts + '/' 
            + action.paneChartId + '/' + AppConstant.series + '/' + action.chartSeriesId + '/' + AppConstant.parameters + '/' + action.chartParameterId)
            .pipe(
                tap((response) =>{

                    const paneChartParameter = ctx.getState().paneChartParameters;
                    if(paneChartParameter){
                        paneChartParameter.response = paneChartParameter.response.filter(data => data.id != action.chartParameterId);
                        ctx.patchState({ paneChartParameters : { ...paneChartParameter, response : [...paneChartParameter.response]}});
                    }        
                
                    // ----------- commented for the effectively working pane chart -> series data -> data sets

                    // const paneChartSeriesDefination =  ctx.getState().paneChartSeriesDefination;
                    // const index =  paneChartSeriesDefination.chartParameters.findIndex(
                    //     (data) =>{
                    //         if (data.id = action.chartParameterId){
                    //             return true;
                    //         }
                    //         return false;
                    //     }
                    // )
                    // paneChartSeriesDefination.chartParameters = paneChartSeriesDefination.chartParameters.slice(index,1);
                    // ctx.patchState({paneChartSeriesDefination : paneChartSeriesDefination});
                    
                },((error) =>{
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showErrorMessage(error.message);
                }))
            )
    }

    @Action(SaveNewPaneAction)
    saveNewPane(ctx : StateContext<TopicManagementModel>, action : SaveNewPaneAction) : Actions {
        let result : any = null;
        
        result = this.loginService.performPost(action.body,AppConstant.topicDescription + '/' + action.surveyDescriptionId + '/' + AppConstant.pane)
        .pipe(
            tap((response) =>{
                ctx.patchState({
                    topicPane : response
                })
            },this.errorCallbak)
        )
        return result;
    }

    @Action(UpdadePaneByIdAction)
    UpdadePaneById(ctx : StateContext<TopicManagementModel>, action : UpdadePaneByIdAction) : Actions {
     let result : any = null;
        
      result = this.loginService.performPut(action.body,AppConstant.topicDescription + '/' + action.surveyDescriptionId 
        + '/' + AppConstant.pane + '/' + action.paneId)
        .pipe(
            tap((response) =>{
                ctx.patchState({
                    topicPane : response
                })
            },this.errorCallbak)
        )
        return result;
    }

    @Action(DeletePaneByIdAction)
    deletePaneByIdAction(ctx : StateContext<TopicManagementModel>, action : DeletePaneByIdAction): Actions{
        return this.loginService
        .performDelete(AppConstant.topicDescription + '/' + action.surveyDescriptionId + '/' + AppConstant.pane + '/' + action.paneId)
        .pipe(
            tap(
                (response) =>{

                    let paneList = ctx.getState().paneList;
                    if(paneList){
                        paneList = paneList.filter(data => data.id != action.paneId);
                        ctx.patchState({paneList : paneList});
                    }

                    ctx.patchState({ topicPane : undefined });
                }, this.errorCallbak
            ));
    }


    @Action(CreateCopyPaneByIdAction)
    createCopyPaneByIdAction(ctx : StateContext<TopicManagementModel>, action : CreateCopyPaneByIdAction) : Actions {
        return this.loginService
        .performPostWithParam({},AppConstant.topicDescription + '/' + action.surveyDescriptionId + '/' + AppConstant.pane + '/' + action.paneId + '/copy' ,action.params)
        .pipe(
            tap(
                (resposne) =>{
                    ctx.patchState({topicPane : resposne})
                }, this.errorCallbak
            ));
    }

    errorCallbak = async (errorResponse : any) =>{
    if(errorResponse.error.errors){
        for(let error of errorResponse.error.errors){
            this.utilityService.showErrorMessage(error.defaultMessage);
        }
        return;
    }
    if(errorResponse.error.errorMessage)
        this.utilityService.showErrorMessage(errorResponse.error.errorMessage);
    else
        this.utilityService.showErrorMessage(errorResponse.statusText)
   }

}
