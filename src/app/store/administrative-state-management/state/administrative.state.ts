import { Injectable } from '@angular/core';
import { Action, Actions, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/internal/operators/tap';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { CustomerError } from '../../customer-state-management/state/customer.action';
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
    UpdateEventHistoryAction
} from './administrative.action';
import { AdministrativeManagementModel } from './administrative.model';

@State<AdministrativeManagementModel>({
    name: 'administrativeManagement',
    defaults: {
        administrativeReportList: undefined,
        administrativeReport: undefined,
        administrativeReportDataSource: undefined,
        topicList: undefined,
        topic: undefined,
        prospectsList: undefined,
        prospects: undefined,
        eventHistoryList: undefined,
        eventHistory: undefined,
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
                        // const dataSource = Transformer.transformAdministrativeReportTableData(response, action.viewType);
                        ctx.patchState({
                            administrativeReportList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.message);
                        }));
        }
        return result;
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
                    this.utilityService.showSuccessMessage(response.message);
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
                    this.utilityService.showSuccessMessage('Save Successfully');
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
                    this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        administrativeReport: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
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

    @Action(DeleteTopicByIdAction)
    deleteTopicById(ctx: StateContext<AdministrativeManagementModel>, action: DeleteTopicByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.topic + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage(response.message);
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
                    this.utilityService.showSuccessMessage('Save Successfully');
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
                    this.utilityService.showSuccessMessage('Updated Successfully');
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

    @Action(GetProspectsByIdAction)
    getProspectsById(ctx: StateContext<AdministrativeManagementModel>, action: GetProspectsByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.prospects + '/' + action.id)
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
        return this.loginService.performDelete(AppConstant.prospects + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage(response.message);
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
                    this.utilityService.showSuccessMessage('Save Successfully');
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
        return this.loginService.performPut(action.prospects, AppConstant.prospects + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Updated Successfully');
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
        const force: boolean = action.force || AdministrativeManagementState.getEventHistoryList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.eventHistory, action.filter)
                .pipe(
                    tap((response: any) => {
                        // const res = Transformer.transformEventHistoryTableData(response);
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            eventHistoryList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.message);
                            ctx.dispatch(new CustomerError(error));
                        }));
        }
        return result;
    }

    @Action(GetEventHistoryByIdAction)
    getEventHistoryById(ctx: StateContext<AdministrativeManagementModel>, action: GetEventHistoryByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.eventHistory + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        eventHistory: response,
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
        return this.loginService.performDelete(AppConstant.eventHistory + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage(response.message);
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(SaveEventHistoryAction)
    saveEventHistory(ctx: StateContext<AdministrativeManagementModel>, action: SaveEventHistoryAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.eventHistory, AppConstant.eventHistory)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        eventHistory: response,
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
        return this.loginService.performPut(action.eventHistory, AppConstant.eventHistory + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        eventHistory: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

}
