import { Injectable } from '@angular/core';
import { Action, Actions, Selector, State, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AppConstant } from 'src/app/utility/app.constant';
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
        dataFieldList : undefined,
        dataField : undefined,
        paneList : undefined,
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
        return state.dataBlockList;
    }

    @Selector()
    static getDataBlockByPaneId(state: TopicManagementModel): any {
        return state.dataBlock;
    }

    @Selector()
    static getDataFieldByPaneId(state: TopicManagementModel): any {
        return state.dataFieldList;
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
        return state.fieldValueList;
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
        return state.paneReportList;
    }

    @Selector()
    static getPaneReportById(state : TopicManagementModel) : any{
        return state.paneReport;
    }

    @Selector() 
    static getPaneChartListByPaneId(state : TopicManagementModel) : any{
        return state.paneChartList;
    }

    @Selector()
    static getPaneChart(state : TopicManagementModel) : any{
        return state.paneChart;
    }

    @Selector()
    static getChartSeries(state : TopicManagementModel) : any{
        return state.paneChartSeriesDefination;
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
        // const dataBlockList = ctx.getState().dataBlockList;
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.pane + '/' + action.paneId + '/' + AppConstant.dataBlock)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    response = TopicUtilityTransformer.transformDataBlocksTableData(response);
                    ctx.patchState({
                        dataBlockList: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    })
            );

    }

    @Action(LoadDataFiledByPaneId)
    loadDataFiledByPaneId(ctx: StateContext<TopicManagementModel>, action: LoadDataFiledByPaneId) : Actions{
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.pane + '/' + action.id + '/' + AppConstant.dataField)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        dataFieldList: response,
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
        const currentState = ctx.getState();
        if(currentState.dataBlock && currentState.dataBlock.id == action.id) return null;
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
            
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGetWithParams(AppConstant.topicDescription + '/' + action.id + '/' + AppConstant.pane, action.params)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        paneList: TopicUtilityTransformer.convertPaneListDataForParentSectionLabel(response),
                    });
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
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        dataField: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                }));
    }

    @Action(DeleteDataFieldByIdAction)
    deleteDataFieldByIdAction(ctx: StateContext<TopicManagementModel>, action: DeleteDataFieldByIdAction): Actions {            
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.pane + '/' + action.paneId + '/' + AppConstant.dataField + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    let dataFieldList = ctx.getState().dataFieldList;
                    dataFieldList = dataFieldList.filter( data => data.id != action.id);
                    ctx.patchState({
                        dataFieldList: dataFieldList
                    })
                    ctx.patchState({
                        dataField: undefined,
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

        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.pane + '/' + action.paneId + '/' + AppConstant.dataField + '/' + action.dataField + '/' + AppConstant.fieldValues)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');

                    response = TopicUtilityTransformer.transformFieldValuesTableData(response);
                    ctx.patchState({
                        fieldValueList: response
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
                        fieldValueList = fieldValueList.filter( data => data.id != action.id );
                        ctx.patchState({ 
                            fieldValueList: fieldValueList
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
                        const index = fieldValueList.findIndex( res => res.id == response.id);
                        if(index == -1) fieldValueList.push(TopicUtilityTransformer.transformFieldValuesSingleData(response));
                        else fieldValueList[index] = TopicUtilityTransformer.transformFieldValuesSingleData(response);
                        ctx.patchState({ 
                            fieldValueList: [...fieldValueList]
                        })

                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                }));
    }

    @Action(LoadAllPossibleColorForChartAction)
    loadAllPossibleColorForChartAction(ctx: StateContext<TopicManagementModel>, action: LoadAllPossibleColorForChartAction): Actions {

        // if(ctx.getState().possibleColors){
        //     return null;
        // }

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

        // if(ctx.getState().possibleStyle){
        //     return null;
        // }
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

            // if(ctx.getState().fontFamilyNames){
            //     return null;
            // }
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
        if(paneReports && paneReports[0] && paneReports[0].paneId == action.paneId){
            return null;
        }

        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.pane + '/' + action.paneId + '/' + AppConstant.reports)
          .pipe(
              tap((response: any) => {
                ctx.patchState({paneReportList : TopicUtilityTransformer.paneReportsUtility(response)});
              },
                  error => {
                      document.getElementById('loader').classList.remove('loading');
                      this.utilityService.showErrorMessage(error.message);
              }));

    }

    @Action(LoadPaneReportById)
    loadPaneReportById(ctx: StateContext<TopicManagementModel>, action: LoadPaneReportById) : Actions{
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
                paneReportList = paneReportList.filter( (data) => data.id != action.id);

                ctx.patchState({paneReport : undefined});
                ctx.patchState({paneReportList : paneReportList});
              
            },
                error => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showErrorMessage(error.message);
            })
      );   
    }


    @Action(GetAppPaneChartByPaneIdAction)
    getAppPaneChartByPaneIdAction(ctx: StateContext<TopicManagementModel>, action: GetAppPaneChartByPaneIdAction) : Actions{

        const paneChartList = ctx.getState().paneChartList;
        if(paneChartList && paneChartList[0] && paneChartList[0].paneId == action.paneId){
            return null;
        }

        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.pane + '/' + action.paneId + '/' + AppConstant.charts)
        .pipe(
            tap(
                (response) =>{
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({paneChartList : TopicUtilityTransformer.paneChartListDataTransformer(response as Array<any>)});
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
        if(paneChart && paneChart.id == action.chartId){
            return null;
        }

        document.getElementById('loader').classList.add('loading');
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
                    if(!paneChartList){
                        paneChartList = [];
                    }
                    const index = paneChartList.findIndex((data)=> data.id == action.chartId);
                    paneChartList.splice(index, 1);
                    ctx.patchState({paneChartList : paneChartList});
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
                    if(!paneChartList){
                        paneChartList = [];
                    }
                    paneChartList.push(response);
                    paneChartList[paneChartList.length-1].chartCode = response.chart.chartCode;
                    ctx.patchState({paneChartList : paneChartList});
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
                    if(!paneChartList){
                        paneChartList = [];
                    }
                    const index = paneChartList.findIndex((data)=> data.id == response.id);
                    paneChartList[index] = response
                    paneChartList[index].chartCode = response.chart.chartCode;
                    ctx.patchState({paneChartList : paneChartList});
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
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet( AppConstant.pane + '/' + action.paneId + '/' + AppConstant.charts +  '/' + action.chartId  + '/' + AppConstant.series + '/' + action.id)
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
                    ctx.patchState({ paneChartSeriesDefination : response})
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
        return this.loginService.performPost(action.body,AppConstant.pane + '/' + action.paneId + '/' + AppConstant.charts +  '/' + action.chartId + '/' + AppConstant.series)
        .pipe(
            tap(
                (response : any) =>{
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({ paneChartSeriesDefination : response})
                    const paneChart = ctx.getState();
                    if(paneChart){
                        // const chartSeries =  paneChart.chart.chartSeries.map(data =>{
                        //     if(data.id == response.id){
                        //         return response;
                        //     }
                        //     return data;
                        // })
                        // paneChart.chart.chartSeries = chartSeries;
                        // ctx.patchState({paneChart : paneChart});
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
                    const paneChartSeriesDefination =  ctx.getState().paneChartSeriesDefination;
                    if(paneChartSeriesDefination.chartParameters){
                        paneChartSeriesDefination.chartParameters = [response];
                    }else{
                        if(action.body.id){
                            const templist = paneChartSeriesDefination.chartParameters.map(
                                (data) =>{
                                    if(data.id == action.body.id){
                                        return response;
                                    }
                                    return data;
                                }
                            );

                            paneChartSeriesDefination.chartParameters = templist;
                        }
                    }
                    ctx.patchState({ paneChartSeriesDefination : paneChartSeriesDefination});
                    document.getElementById('loader').classList.remove('loading');
                }, (error : any) =>{
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showErrorMessage(error.message);
                }            
            )
        )
        
    }

    @Action(DeletePaneChartParameter)
    deletePaneChartParameter(ctx : StateContext<TopicManagementModel>, action: DeletePaneChartParameter) : Actions{
        document.getElementById('loader').classList.remove('loading')
        return this.loginService.
            performDelete(AppConstant.pane + '/' + action.paneId + '/' + AppConstant.charts + '/' 
            + action.paneChartId + '/' + AppConstant.series + '/' + action.chartSeriesId + '/' + AppConstant.parameters + '/' + action.chartParameterId)
            .pipe(
                tap((response) =>{
                    document.getElementById('loader').classList.remove('loading');
                    const paneChartSeriesDefination =  ctx.getState().paneChartSeriesDefination;
                    const index =  paneChartSeriesDefination.chartParameters.findIndex(
                        (data) =>{
                            if (data.id = action.chartParameterId){
                                return true;
                            }
                            return false;
                        }
                    )
                    paneChartSeriesDefination.chartParameters = paneChartSeriesDefination.chartParameters.slice(index,1);
                    ctx.patchState({paneChartSeriesDefination : paneChartSeriesDefination});
                    
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
    this.utilityService.showErrorMessage(errorResponse.error.errorMessage);
   }

}
