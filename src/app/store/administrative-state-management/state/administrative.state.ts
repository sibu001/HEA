import { Injectable, Pipe } from '@angular/core';
import { Action, Actions, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/internal/operators/tap';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { CustomerError } from '../../customer-state-management/state/customer.action';
import { SystemUtilityTransformer } from '../../system-utility-state-management/transformer/transformer';
import { AdministrativeReportTransformer } from '../transformer/transformer';
import {
    GetAdministrativeReportListAction,
    GetAdministrativeReportByIdAction,
    DeleteAdministrativeReportByIdAction,
    SaveAdministrativeReportAction,
    UpdateAdministrativeReportAction,
    DeleteTopicByIdAction,
    GetTopicByIdAction,
    GetTopicListAction,
    SaveTopicAction,
    UpdateTopicAction,
    GetProspectsListAction,
    DeleteProspectsByIdAction,
    GetProspectsByIdAction,
    SaveProspectsAction,
    UpdateProspectsAction,
    DeleteEventHistoryByIdAction,
    GetEventHistoryByIdAction,
    GetEventHistoryListAction,
    SaveEventHistoryAction,
    UpdateEventHistoryAction,
    GetAdministrativeReportCountAction,
    DeleteAdministrativeReportParamsByIdAction,
    GetAdministrativeReportParamsByIdAction,
    GetAdministrativeReportParamsListAction,
    SaveAdministrativeReportParamsAction,
    UpdateAdministrativeReportParamsAction,
    CallAdministrativeReportAction,
    GetEventHistoryCountAction,
    UploadEventHistoryFileAction,
    GetCustomerListAction,
    DeleteProspectsListAction,
} from './administrative.action';
import { AdministrativeManagementModel } from './administrative.model';

@State<AdministrativeManagementModel>({
    name: 'administrativeManagement',
    defaults: {
        administrativeReportList: undefined,
        administrativeReport: undefined,
        administrativeReportCount: undefined,
        administrativeReportDataSource: undefined,
        administrativeReportParamsList: undefined,
        administrativeReportParams: undefined,
        callAdministrativeReport: undefined,
        topicList: undefined,
        topic: undefined,
        prospectsList: undefined,
        prospects: undefined,
        eventHistoryList: undefined,
        eventHistoryCount: undefined,
        eventHistory: undefined,
        customerList: undefined,
    }
})

@Injectable()
export class AdministrativeManagementState {

    constructor(private readonly loginService: LoginService, private readonly utilityService: UtilityService) { }

    @Selector()
    static getAdministrativeReportList(state: AdministrativeManagementModel): any {
        return state.administrativeReportList;
    }

    @Selector()
    static getAdministrativeReportDataSource(state: AdministrativeManagementModel): any {
        return state.administrativeReportDataSource;
    }

    @Selector()
    static getAdministrativeReportById(state: AdministrativeManagementModel): any {
        return state.administrativeReport;
    }

    @Selector()
    static getAdministrativeReportParamsList(state: AdministrativeManagementModel): any {
        return state.administrativeReportParamsList;
    }

    @Selector()
    static getAdministrativeReportParamsById(state: AdministrativeManagementModel): any {
        return state.administrativeReportParams;
    }

    @Selector()
    static getTopicList(state: AdministrativeManagementModel): any {
        return state.topicList;
    }

    @Selector()
    static getTopicById(state: AdministrativeManagementModel): any {
        return state.topic;
    }

    @Selector()
    static getProspectsList(state: AdministrativeManagementModel): any {
        return state.prospectsList;
    }

    @Selector()
    static getProspectsById(state: AdministrativeManagementModel): any {
        return state.prospects;
    }

    @Selector() 
    static getEventHistoryCount(state: AdministrativeManagementModel) :any{
        return state.eventHistoryCount
    }

    @Selector()
    static getEventHistoryList(state: AdministrativeManagementModel): any {
        return state.eventHistoryList;
    }

    @Selector()
    static getEventHistoryById(state: AdministrativeManagementModel): any {
        return state.eventHistory;
    }

    @Action(GetAdministrativeReportListAction)
    getAllAdministrativeReportList(ctx: StateContext<AdministrativeManagementModel>, action: GetAdministrativeReportListAction): Actions {
        const force: boolean = action.force || AdministrativeManagementState.getAdministrativeReportList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.administrativeReport, action.filter)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        const res = AdministrativeReportTransformer.transformTableData(response, action.filter);
                        ctx.patchState({
                            administrativeReportList: res,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.message);
                        }));
        }
        return result;
    }

    @Action(GetAdministrativeReportCountAction)
    getAdministrativeReportCount(ctx: StateContext<AdministrativeManagementModel>, action: GetAdministrativeReportCountAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGetWithParams(AppConstant.administrativeReport + '/count', action.filter)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        administrativeReportCount: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.errorMessage);
                    }));

    }

    @Action(GetAdministrativeReportByIdAction)
    getAdministrativeReportById(ctx: StateContext<AdministrativeManagementModel>, action: GetAdministrativeReportByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.administrativeReport + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        administrativeReport: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(DeleteAdministrativeReportByIdAction)
    deleteAdministrativeReportById(ctx: StateContext<AdministrativeManagementModel>, action: DeleteAdministrativeReportByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.administrativeReport + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Deleted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(SaveAdministrativeReportAction)
    saveAdministrativeReport(ctx: StateContext<AdministrativeManagementModel>, action: SaveAdministrativeReportAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.administrativeReport, AppConstant.administrativeReport)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        administrativeReport: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(UpdateAdministrativeReportAction)
    updateAdministrativeReport(ctx: StateContext<AdministrativeManagementModel>, action: UpdateAdministrativeReportAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.administrativeReport, AppConstant.administrativeReport + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        administrativeReport: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        console.log(error);
                        // this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetAdministrativeReportParamsListAction)
    getAllAdministrativeReportParamsList(ctx: StateContext<AdministrativeManagementModel>, action: GetAdministrativeReportParamsListAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.administrativeReport + '/' + action.reportId + '/reportParams')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // const res = AdministrativeReportTransformer.transformTableData(response, action.filter);
                    ctx.patchState({
                        administrativeReportParamsList: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(GetAdministrativeReportParamsByIdAction)
    getAdministrativeReportParamsById(ctx: StateContext<AdministrativeManagementModel>, action: GetAdministrativeReportParamsByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.administrativeReport + '/' + action.reportId + '/reportParams/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        administrativeReportParams: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(DeleteAdministrativeReportParamsByIdAction)
    deleteAdministrativeReportParamsById(ctx: StateContext<AdministrativeManagementModel>, action: DeleteAdministrativeReportParamsByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.administrativeReport + '/' + action.reportId + '/reportParams/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Deleted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(SaveAdministrativeReportParamsAction)
    saveAdministrativeReportParams(ctx: StateContext<AdministrativeManagementModel>, action: SaveAdministrativeReportParamsAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.parameters, AppConstant.administrativeReport + '/' + action.reportId + '/reportParams')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        administrativeReportParams: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(UpdateAdministrativeReportParamsAction)
    updateAdministrativeReportParams(ctx: StateContext<AdministrativeManagementModel>, action: UpdateAdministrativeReportParamsAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.paramObj, AppConstant.administrativeReport + '/' + action.reportId + '/reportParams/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        administrativeReportParams: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(CallAdministrativeReportAction)
    callAdministrativeReport(ctx: StateContext<AdministrativeManagementModel>, action: CallAdministrativeReportAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPostForBlob(action.parameters, AppConstant.callAdministrativeReport)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Call Successfully');
                    ctx.patchState({
                        callAdministrativeReport: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        const file = new Blob([error.error.text], { type: 'application/pdf' });
                        const fileURL = URL.createObjectURL(file);
                        window.open(fileURL);
                    }));
    }

    @Action(GetTopicListAction)
    getAllTopicList(ctx: StateContext<AdministrativeManagementModel>, action: GetTopicListAction): Actions {
        const force: boolean = action.force || AdministrativeManagementState.getTopicList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.topic, action.filter)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        // const dataSource = Transformer.transformTopicTableData(response, action.viewType);
                        ctx.patchState({
                            topicList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.message);
                        }));
        }
        return result;
    }

    @Action(GetTopicByIdAction)
    getTopicById(ctx: StateContext<AdministrativeManagementModel>, action: GetTopicByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.topic + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        topic: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }
    // @Action(EnableDisableTopicListFilter)
    // disableTopicListFilter(state:any,action : EnableDisableTopicListFilter) : Actions {
    //     document.getElementById('loader').classList.add('loading');
    //     return this.loginService.performPost( {},AppConstant.topic + (action.isEnabled ? '/enableFilter' : '/disableFilter')).
    //     pipe(
    //         tap((response : any) => {
    //             document.getElementById('loader').classList.remove('loading');
    //             this.utilityService.showSuccessMessage('successfully ' +  (action.isEnabled ? 'enable' : 'disable')+ ' the filter');
    //         },
    //         error =>{
    //             document.getElementById('loader').classList.remove('loading');
    //             this.utilityService.showErrorMessage("Requset Failed to change filter.");
    //         })
    //     ); 
    // }

    // @Action(EnableDisableCacheValue)
    // enableDisableCacheValue(status : any, action: EnableDisableCacheValue) : Actions{
    //     document.getElementById('loader').classList.add('loading');
    //     return this.loginService.performPost( {},AppConstant.topic + (action.isEnabled ? '/enableValueCache' : '/disableValueCache')).
    //     pipe(
    //         tap((response : any) => {
    //             document.getElementById('loader').classList.remove('loading');
    //             this.utilityService.showSuccessMessage('successfully ' +(action.isEnabled ? 'enable' : 'disable') + ' the cache value' ); 
    //         },
    //         error =>{
    //             document.getElementById('loader').classList.remove('loading');
    //             this.utilityService.showErrorMessage("Requset Failed to change Cache value.");
    //         })
    //     ); 
    // }

    @Action(DeleteTopicByIdAction)
    deleteTopicById(ctx: StateContext<AdministrativeManagementModel>, action: DeleteTopicByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.topic + '/' + action.id)
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

    @Action(SaveTopicAction)
    saveTopic(ctx: StateContext<AdministrativeManagementModel>, action: SaveTopicAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.topic, AppConstant.topic)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        topic: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(UpdateTopicAction)
    updateTopic(ctx: StateContext<AdministrativeManagementModel>, action: UpdateTopicAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.topic, AppConstant.topic + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');4
                    ctx.patchState({
                        topic: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }
    @Action(GetProspectsListAction)
    getAllProspectsList(ctx: StateContext<AdministrativeManagementModel>, action: GetProspectsListAction): Actions {
        const force: boolean = action.force || AdministrativeManagementState.getProspectsList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.prospects, action.filter)
                .pipe(
                    tap((response: any) => {
                        response.list = SystemUtilityTransformer.transformCustomerEventTypeTableData(response.list);
                        response.list.forEach( (element) => { 
                        element.customer !== undefined && element.customer !== null ? element.customer.auditId !== undefined ? element.auditId =  element.customer.auditId : '' : ''
                        element.coachUserId =  element.coachUser !== undefined && element.coachUser !== null ? element.coachUser.name : '';
                    });
                        document.getElementById('loader').classList.remove('loading');
                        // const dataSource = Transformer.transformProspectsTableData(response, action.viewType);
                        ctx.patchState({
                            prospectsList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.message);
                        }));
        }
        return result;
    }

    @Action(DeleteProspectsListAction)
    deleteProspectsListIdAction(ctx: StateContext<AdministrativeManagementModel>, action: DeleteProspectsListAction) : Actions{
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.prospects + '?registrationIds=' + action.ids)
        .pipe(
            tap((response: any) => {
                document.getElementById('loader').classList.remove('loading');
            },  
            error => {
                document.getElementById('loader').classList.remove('loading');
                this.utilityService.showErrorMessage(error.message);
            }));
    }

    @Action(GetProspectsByIdAction)
    getProspectsById(ctx: StateContext<AdministrativeManagementModel>, action: GetProspectsByIdAction): Actions {

        const prospects = ctx.getState().prospects;
        if(prospects && prospects.id == action.id){
            return;
        }

        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet("registrations" + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        prospects: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(DeleteProspectsByIdAction)
    deleteProspectsById(ctx: StateContext<AdministrativeManagementModel>, action: DeleteProspectsByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.prospectsEdit + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        prospects : undefined
                    })
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(SaveProspectsAction)
    saveProspects(ctx: StateContext<AdministrativeManagementModel>, action: SaveProspectsAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.prospects, AppConstant.prospects)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        prospects: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(UpdateProspectsAction)
    updateProspects(ctx: StateContext<AdministrativeManagementModel>, action: UpdateProspectsAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.prospects, AppConstant.prospectsEdit + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        prospects: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(GetEventHistoryListAction)
    getAllEventHistoryList(ctx: StateContext<AdministrativeManagementModel>, action: GetEventHistoryListAction): Actions {
        // const force: boolean = action.force || AdministrativeManagementState.getEventHistoryList(ctx.getState()) === undefined;
        // let result: Actions;
        // if (force) {
            document.getElementById('loader').classList.add('loading');
            return this.loginService.performGetWithParams(AppConstant.eventHistory, action.filter)
                .pipe(
                    tap((response: any) => {
                        const res = AdministrativeReportTransformer.transformEventHistoryTableData(response);
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            eventHistoryList: res,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.message);
                            ctx.dispatch(new CustomerError(error));
                        }));
        // }
        // return result;
    }

    @Action(GetEventHistoryCountAction)
    getAllEventHistoryCount(ctx: StateContext<AdministrativeManagementModel>, action: GetEventHistoryCountAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGetWithParams(AppConstant.eventHistory + '/count', action.filter)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        eventHistoryCount: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                        ctx.dispatch(new CustomerError(error));
                    }));
    }

    @Action(GetEventHistoryByIdAction)
    getEventHistoryById(ctx: StateContext<AdministrativeManagementModel>, action: GetEventHistoryByIdAction): Actions {
        const eventHistory = ctx.getState().eventHistory;

        if(eventHistory && eventHistory.customerEventId == action.customerEventId){
            return;
        }

        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customer + '/' + action.customerId + '/' + AppConstant.eventHistory + '/' + action.customerEventId)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        eventHistory: response.data,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(DeleteEventHistoryByIdAction)
    deleteEventHistoryById(ctx: StateContext<AdministrativeManagementModel>, action: DeleteEventHistoryByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.customer + '/' + action.customerId + '/' + AppConstant.eventHistory + '/' + action.customerEventId)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        eventHistory: undefined,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(SaveEventHistoryAction)
    saveEventHistory(ctx: StateContext<AdministrativeManagementModel>, action: SaveEventHistoryAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.eventHistory, AppConstant.customer + '/' + action.customerId + '/' + AppConstant.eventHistory)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        eventHistory: response.data,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(UpdateEventHistoryAction)
    updateEventHistory(ctx: StateContext<AdministrativeManagementModel>, action: UpdateEventHistoryAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.eventHistory, AppConstant.customer + '/' + action.customerId + '/' + AppConstant.eventHistory + '/' + action.customerEventId)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        eventHistory: response.data,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(UploadEventHistoryFileAction)
    uploadEventHistoryFile(ctx: StateContext<AdministrativeManagementModel>, action: UploadEventHistoryFileAction): Actions {
        document.getElementById('loader').classList.add('loading');
        const formData = new FormData();
        formData.append('fileBody',action.fileBody);
        return this.loginService.performPostMultiPartFromData(formData, AppConstant.eventHistory + '/files')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(GetCustomerListAction)
    getAllCustomerList(ctx: StateContext<AdministrativeManagementModel>, action: GetCustomerListAction): Actions {
        return this.loginService.performGetWithParams(AppConstant.customer, action.filter)
            .pipe(
                tap((response: any) => {
                    ctx.patchState({
                        customerList: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

}
