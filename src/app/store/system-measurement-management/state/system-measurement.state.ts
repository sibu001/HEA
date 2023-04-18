import { Injectable } from '@angular/core';
import { Action, Actions, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { SystemMeasurementUtilityTransformer } from '../transformer/transformer';
import {
    DeleteAlertMessageByIdAction,
    DeleteCimisMeasurementByIdAction,
    DeleteCimisStationByIdAction,
    DeleteScriptBatchByIdAction,
    DeleteScriptBatchGroupAction,
    GetThreadInfoAction,
    ExecuteScriptBatchResultAction,
    GetAlertMessageByIdAction,
    GetAlertMessageListAction,
    GetCimisMeasurementByIdAction,
    GetCimisMeasurementCountAction,
    GetCimisMeasurementListAction,
    GetCimisStationByIdAction,
    GetCimisStationCountAction,
    GetCimisStationListAction,
    GetEC2InstanceListAction,
    GetScriptBatchByIdAction,
    GetScriptBatchCountAction,
    GetScriptBatchGroupAction,
    GetScriptBatchListAction,
    GetOperatingSystemInfoAction,
    GetSystemJobsListAction,
    ProcessScriptBatchAction,
    SaveAlertMessageAction,
    SaveCimisMeasurementAction,
    SaveCimisStationAction,
    SaveScriptBatchAction,
    SaveScriptBatchGroupAction,
    UpdateAlertMessageAction,
    UpdateCimisMeasurementAction,
    UpdateCimisStationAction,
    UpdateScriptBatchAction,
    ExecuteSystemJobsAction,
    InterruptSystemJobsAction,
    ResumeSystemJobsAction,
    PauseSystemJobsAction,
    StartEC2InstanceAction
} from './system-measurement.action';
import { SystemMeasurementModel } from './system-measurement.model';

@State<SystemMeasurementModel>({
    name: 'systemMeasurement',
    defaults: {
        cimisStationList: undefined,
        cimisStationCount: undefined,
        cimisStation: undefined,
        cimisMeasurementList: undefined,
        cimisMeasurementCount: undefined,
        cimisMeasurement: undefined,
        scriptBatchList: undefined,
        scriptBatchCount: undefined,
        scriptBatchGroup: undefined,
        scriptBatch: undefined,
        systemJobsList: undefined,
        systemJobs: undefined,
        operatingSystemInfo: undefined,
        threadInfo: undefined,
        ec2InstanceList: undefined,
        alertMessageList: undefined,
        alertMessage: undefined,
        error: undefined
    }
})

@Injectable()
export class SystemMeasurementManagementState {

    constructor(private readonly loginService: LoginService, private readonly utilityService: UtilityService) { }

    @Selector()
    static getCimisStationList(state: SystemMeasurementModel): any {
        return state.cimisStationList;
    }

    @Selector()
    static getCimisStationCount(state : SystemMeasurementModel): number {
        return state.cimisStationCount;
    }

    @Selector()
    static getCimisStationById(state: SystemMeasurementModel): any {
        return state.cimisStation;
    }

    @Selector()
    static getCimisMeasurementList(state: SystemMeasurementModel): any {
        return state.cimisMeasurementList;
    }

    @Selector()
    static getCimisMeasurementCount(state: SystemMeasurementModel): any {
        return state.cimisMeasurementCount;
    }

    @Selector()
    static getCimisMeasurementById(state: SystemMeasurementModel): any {
        return state.cimisMeasurementList;
    }

    @Selector()
    static getScriptBatchList(state: SystemMeasurementModel): any {
        return state.scriptBatchList;
    }

    @Selector()
    static getScriptBatchCount(state: SystemMeasurementModel): any {
        return state.scriptBatchCount;
    }

    @Selector()
    static getScriptBatchById(state: SystemMeasurementModel): any {
        return state.scriptBatch;
    }

    @Selector()
    static getSystemJobsList(state: SystemMeasurementModel): any {
        return state.systemJobsList;
    }

    @Selector()
    static getOperatingSystemInfo(state: SystemMeasurementModel): any {
        return state.operatingSystemInfo;
    }

    @Selector()
    static getThreadInfo(state: SystemMeasurementModel): any {
        return state.threadInfo;
    }

    @Selector()
    static getEC2InstanceList(state: SystemMeasurementModel): any {
        return state.ec2InstanceList;
    }

    @Selector()
    static getAlertMessageList(state: SystemMeasurementModel): any {
        return state.alertMessageList;
    }

    @Selector()
    static getAlertMessageById(state: SystemMeasurementModel): any {
        return state.alertMessage;
    }

    @Action(GetCimisStationListAction)
    getAllCimisStationList(ctx: StateContext<SystemMeasurementModel>, action: GetCimisStationListAction): Actions {
        const force: boolean = action.force || !ctx.getState().cimisStationList;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.cimisStation, action.filter)
                .pipe(
                    tap((response: any) => {
                        const res = SystemMeasurementUtilityTransformer.transformCimisStationTableData(response);
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            cimisStationList: res,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            // this.utilityService.showErrorMessage(error.error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(GetCimisStationCountAction)
    getCimisStationCount(ctx: StateContext<SystemMeasurementModel>, action: GetCimisStationCountAction): Actions {
        
        const force = action.force || !ctx.getState().cimisStationCount;
        if (!force) return null;

        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGetWithParams(AppConstant.cimisStation + '/count', action.filter)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        cimisStationCount: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        // this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetCimisStationByIdAction)
    getCimisStationById(ctx: StateContext<SystemMeasurementModel>, action: GetCimisStationByIdAction): Actions {

        const cimisStation : any = ctx.getState().cimisStation;
        const force : boolean = !cimisStation || cimisStation.id != action.id;

        if(!force) return null;

        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.cimisStation + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        cimisStation: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        // this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(DeleteCimisStationByIdAction)
    deleteCimisStationById(ctx: StateContext<SystemMeasurementModel>, action: DeleteCimisStationByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.cimisStation + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        cimisStation: undefined,
                    });
                    // this.utilityService.showSuccessMessage('Deleted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        // this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(SaveCimisStationAction)
    saveCimisStation(ctx: StateContext<SystemMeasurementModel>, action: SaveCimisStationAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.cimisStation, AppConstant.cimisStation)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        cimisStation: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        // this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(UpdateCimisStationAction)
    updateCimisStation(ctx: StateContext<SystemMeasurementModel>, action: UpdateCimisStationAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.cimisStation, AppConstant.cimisStation + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        cimisStation: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        // this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetCimisMeasurementListAction)
    getAllCimisMeasurementList(ctx: StateContext<SystemMeasurementModel>, action: GetCimisMeasurementListAction): Actions {
        const force: boolean = action.force || ctx.getState().cimisMeasurementList == undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.cimisMeasurement, action.filter)
                .pipe(
                    tap((response: any) => {
                        const res = SystemMeasurementUtilityTransformer.transformCimisMeasurementTableData(response, action.filter);
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            cimisMeasurementList: res,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(GetCimisMeasurementCountAction)
    getCimisMeasurementCount(ctx: StateContext<SystemMeasurementModel>, action: GetCimisMeasurementCountAction): Actions {
        const force: boolean = action.force || ctx.getState().cimisMeasurementList == undefined;
        let result: Actions;

        if(!force) return null;

        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGetWithParams(AppConstant.cimisMeasurement + '/count', action.filter)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        cimisMeasurementCount: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetCimisMeasurementByIdAction)
    getCimisMeasurementById(ctx: StateContext<SystemMeasurementModel>, action: GetCimisMeasurementByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.cimisMeasurement + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        cimisMeasurement: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(DeleteCimisMeasurementByIdAction)
    deleteCimisMeasurementById(ctx: StateContext<SystemMeasurementModel>, action: DeleteCimisMeasurementByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.cimisMeasurement + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage(response.message);
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(SaveCimisMeasurementAction)
    saveCimisMeasurement(ctx: StateContext<SystemMeasurementModel>, action: SaveCimisMeasurementAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.cimisMeasurement, AppConstant.cimisMeasurement)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        cimisMeasurement: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(UpdateCimisMeasurementAction)
    updateCimisMeasurement(ctx: StateContext<SystemMeasurementModel>, action: UpdateCimisMeasurementAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.cimisMeasurement, AppConstant.cimisMeasurement + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        cimisMeasurement: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetScriptBatchListAction)
    getAllScriptBatchList(ctx: StateContext<SystemMeasurementModel>, action: GetScriptBatchListAction): Actions {
        const force: boolean = action.force || ctx.getState().scriptBatchList === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.scriptBatch, action.filter)
                .pipe(
                    tap((response: any) => {
                        const res = SystemMeasurementUtilityTransformer.transformBatchScriptTableData(response, action.filter);
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            scriptBatchList: res,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(GetScriptBatchCountAction)
    getScriptBatchCount(ctx: StateContext<SystemMeasurementModel>, action: GetScriptBatchCountAction): Actions {
        const force: boolean = action.force || ctx.getState().scriptBatchList === undefined;
        if(!force) return null;

        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGetWithParams(AppConstant.scriptBatch + '/count', action.filter)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        scriptBatchCount: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetScriptBatchByIdAction)
    getScriptBatchById(ctx: StateContext<SystemMeasurementModel>, action: GetScriptBatchByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.scriptBatch + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        scriptBatch: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(DeleteScriptBatchByIdAction)
    deleteScriptBatchById(ctx: StateContext<SystemMeasurementModel>, action: DeleteScriptBatchByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.scriptBatch + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage(response.message);
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(SaveScriptBatchAction)
    saveScriptBatch(ctx: StateContext<SystemMeasurementModel>, action: SaveScriptBatchAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.scriptBatch, AppConstant.scriptBatch)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        scriptBatch: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(UpdateScriptBatchAction)
    updateScriptBatch(ctx: StateContext<SystemMeasurementModel>, action: UpdateScriptBatchAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.scriptBatch, AppConstant.scriptBatch + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        scriptBatch: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(ProcessScriptBatchAction)
    processScriptBatch(ctx: StateContext<SystemMeasurementModel>, action: ProcessScriptBatchAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost('', AppConstant.scriptBatch + '/' + action.id + '/process')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Processed Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(ExecuteScriptBatchResultAction)
    executeScriptBatchResult(ctx: StateContext<SystemMeasurementModel>, action: ExecuteScriptBatchResultAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.scriptBatch + '/' + action.id + '/results')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Result Executed');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetScriptBatchGroupAction)
    getScriptBatchGroup(ctx: StateContext<SystemMeasurementModel>, action: GetScriptBatchGroupAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.scriptBatch + '/' + action.id + '/batchScriptGroups')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        scriptBatchGroup: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }


    @Action(SaveScriptBatchGroupAction)
    saveScriptBatchGroup(ctx: StateContext<SystemMeasurementModel>, action: SaveScriptBatchGroupAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost('', AppConstant.scriptBatch + '/' + action.id + '/batchScriptGroups/' + action.customerGroupId)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(DeleteScriptBatchGroupAction)
    deleteScriptBatchGroup(ctx: StateContext<SystemMeasurementModel>, action: DeleteScriptBatchGroupAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.scriptBatch + '/' + action.id + '/batchScriptGroups/' + action.customerGroupId)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Deleted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetSystemJobsListAction)
    getAllSystemJobsList(ctx: StateContext<SystemMeasurementModel>, action: GetSystemJobsListAction): Actions {
        const force: boolean = action.force || SystemMeasurementManagementState.getSystemJobsList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.systemJobs, action.filter)
                .pipe(
                    tap((response: any) => {
                        const res = SystemMeasurementUtilityTransformer.transformSystemJobTableData(response);
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            systemJobsList: res,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(GetOperatingSystemInfoAction)
    getOperatingSystemInfo(ctx: StateContext<SystemMeasurementModel>, action: GetOperatingSystemInfoAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.systemJobs + '/operatingSystemInfo')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        operatingSystemInfo: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetThreadInfoAction)
    getThreadInfo(ctx: StateContext<SystemMeasurementModel>, action: GetThreadInfoAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.threadInfo)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    const res = SystemMeasurementUtilityTransformer.transformThreadInfoTableData(response);
                    ctx.patchState({
                        threadInfo: res,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(ExecuteSystemJobsAction)
    executeSystemJobs(ctx: StateContext<SystemMeasurementModel>, action: ExecuteSystemJobsAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost('', AppConstant.systemJobs + '/' + action.schedulerName + '/' + action.groupName + '/' + action.jobName + '/executeJob')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Execute Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(InterruptSystemJobsAction)
    interruptSystemJobs(ctx: StateContext<SystemMeasurementModel>, action: InterruptSystemJobsAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost('', AppConstant.systemJobs + '/' + action.schedulerName + '/' + action.groupName + '/' + action.jobName + '/interruptJob')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Interrupted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(ResumeSystemJobsAction)
    resumeSystemJobs(ctx: StateContext<SystemMeasurementModel>, action: ResumeSystemJobsAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost('', AppConstant.systemJobs + '/' + action.schedulerName + '/' + action.groupName + '/' + action.jobName + '/resumeJob')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Resume Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(PauseSystemJobsAction)
    pauseSystemJobs(ctx: StateContext<SystemMeasurementModel>, action: PauseSystemJobsAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost('', AppConstant.systemJobs + '/' + action.schedulerName + '/' + action.groupName + '/' + action.jobName + '/pauseJob')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Pause Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetEC2InstanceListAction)
    getAllEC2InstanceList(ctx: StateContext<SystemMeasurementModel>, action: GetEC2InstanceListAction): Actions {
        const force: boolean = action.force || SystemMeasurementManagementState.getEC2InstanceList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.eC2Instance, action.filter)
                .pipe(
                    tap((response: any) => {
                        // const res = SystemMeasurementUtilityTransformer.transformEC2InstanceTableData(response);
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            ec2InstanceList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(StartEC2InstanceAction)
    startEC2Instance(ctx: StateContext<SystemMeasurementModel>, action: StartEC2InstanceAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost('', AppConstant.eC2Instance + '/' + action.instanceId + '/startInstance')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Start Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(StartEC2InstanceAction)
    stopEC2Instance(ctx: StateContext<SystemMeasurementModel>, action: StartEC2InstanceAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost('', AppConstant.eC2Instance + '/' + action.instanceId + '/stopInstance')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Stop Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetAlertMessageListAction)
    getAllAlertMessageList(ctx: StateContext<SystemMeasurementModel>, action: GetAlertMessageListAction): Actions {
        const force: boolean = action.force || SystemMeasurementManagementState.getAlertMessageList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.alertMessage, action.filter)
                .pipe(
                    tap((response: any) => {
                        const res = SystemMeasurementUtilityTransformer.transformAlertMessageTableData(response);
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            alertMessageList: res,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(GetAlertMessageByIdAction)
    getAlertMessageById(ctx: StateContext<SystemMeasurementModel>, action: GetAlertMessageByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.alertMessage + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        alertMessage: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(DeleteAlertMessageByIdAction)
    deleteAlertMessageById(ctx: StateContext<SystemMeasurementModel>, action: DeleteAlertMessageByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.alertMessage + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Deleted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(SaveAlertMessageAction)
    saveAlertMessage(ctx: StateContext<SystemMeasurementModel>, action: SaveAlertMessageAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.alertMessage, AppConstant.alertMessage)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        alertMessage: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(UpdateAlertMessageAction)
    updateAlertMessage(ctx: StateContext<SystemMeasurementModel>, action: UpdateAlertMessageAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.alertMessage, AppConstant.alertMessage + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        alertMessage: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }
}
