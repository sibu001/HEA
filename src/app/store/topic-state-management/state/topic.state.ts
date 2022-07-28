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
} from './topic.action';
import { TopicManagementModel } from './topic.model';

@State<TopicManagementModel>({
    name: 'topicManagement',
    defaults: {
        topicDescriptionList: undefined,
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
        CALCULATION_TYPE : undefined
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
    static getDataTypeLookUp(state: TopicManagementModel): any {
        return state.DATA_TYPE;
    }

    @Selector()
    static getInputTypeLookUp(state: TopicManagementModel): any {
        return state.INPUT_TYPE;
    }

    @Action(GetTopicDescriptionListAction)
    getAllTopicDescriptionList(ctx: StateContext<TopicManagementModel>, action: GetTopicDescriptionListAction): Actions {
        const force: boolean = action.force || TopicManagementState.getTopicDescriptionList(ctx.getState()) === undefined;
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

    @Action(GetTopicDescriptionByIdAction)
    getTopicDescriptionById(ctx: StateContext<TopicManagementModel>, action: GetTopicDescriptionByIdAction): Actions {
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

    @Action(LoadLookUpCalculationPeriodAction)
    loadLookUpCalculationPeriodAction(ctx : StateContext<TopicManagementModel>, action: LoadLookUpCalculationPeriodAction) {
        // if(ctx.getState().calculationPeriod != undefined){
        //     ctx.patchState({ calculationPeriod : Object.assign({},ctx.getState().calculationPeriod)} )
        // return;
        // }
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.lookupBaseURL + action.type + AppConstant.lookupValues)
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
                    // this.utilityService.showSuccessMessage(response.message);
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
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
                    ctx.patchState({
                        topicDescription: response,
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
                        this.utilityService.showErrorMessage(error.message);
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
        const paneList = ctx.getState().paneList;
        if( paneList && paneList[0].surveyDescriptionId == action.id)
            return null;
            
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.topicDescription + '/' + action.id + '/' + AppConstant.pane)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        paneList: response,
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
                    // console.log("pre state :- " + JSON.stringify(state))
                    state[action.type] = response
                    ctx.setState(state);
                    // console.log("post state :- " + JSON.stringify(state))
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                }));
    }
}
