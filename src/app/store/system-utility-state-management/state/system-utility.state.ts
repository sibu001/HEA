import { Injectable } from '@angular/core';
import { Action, Actions, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { SystemUtilityTransformer } from '../transformer/transformer';
import {
    DeleteCustomerComparisonGroupByIdAction,
    DeleteCustomerEventTypeByIdAction,
    DeleteDegreeDaysByIdAction,
    DeleteFactorByIdAction,
    DeleteLogsByIdAction,
    DeleteLookupByIdAction,
    DeletePlaceByIdAction,
    DeleteSystemParameterByIdAction,
    DeleteWeatherStationByIdAction,
    DeleteZipCodeByIdAction,
    GetCustomerComparisonGroupByIdAction,
    GetCustomerComparisonGroupListAction,
    GetCustomerEventTypeByIdAction,
    GetCustomerEventTypeCountAction,
    GetCustomerEventTypeListAction,
    GetDegreeDaysByIdAction,
    GetDegreeDaysListAction,
    GetFactorByIdAction,
    GetFactorListAction,
    GetLogsByIdAction,
    GetLogsListAction,
    GetLookupByIdAction,
    GetLookupListAction,
    GetPlaceByIdAction,
    GetPlaceListAction,
    GetSystemParameterByIdAction,
    GetSystemParameterCountAction,
    GetSystemParameterListAction,
    GetTimeZoneListAction,
    GetWeatherStationByIdAction,
    GetWeatherStationListAction,
    GetZipCodeListAction,
    SaveCustomerComparisonGroupAction,
    SaveCustomerEventTypeAction,
    SaveDegreeDaysAction,
    SaveFactorAction,
    SaveLogsAction,
    SaveLookupAction,
    SavePlaceAction,
    SaveSystemParameterAction,
    SaveWeatherStationAction,
    SaveZipCodeAction,
    UpdateCustomerComparisonGroupAction,
    UpdateCustomerEventTypeAction,
    UpdateDegreeDaysAction,
    UpdateFactorAction,
    UpdateLogsAction,
    UpdateLookupAction,
    UpdatePlaceAction,
    UpdateSystemParameterAction,
    UpdateWeatherStationAction
} from './system-utility.action';
import { SystemUtilityManagementModel } from './system-utility.model';

@State<SystemUtilityManagementModel>({
    name: 'systemUtilityManagement',
    defaults: {
        placeList: undefined,
        place: undefined,
        customerEventTypeList: undefined,
        customerEventType: undefined,
        customerEventTypeCount: undefined,
        customerComparisonGroupList: undefined,
        customerComparisonGroup: undefined,
        factorList: undefined,
        factor: undefined,
        lookupList: undefined,
        lookup: undefined,
        systemParameterList: undefined,
        systemParameter: undefined,
        systemParameterCount: undefined,
        logList: undefined,
        logs: undefined,
        weatherStationList: undefined,
        weatherStation: undefined,
        degreeDaysList: undefined,
        degreeDays: undefined,
        zipCodeList: undefined,
        zipCode: undefined,
        timeZoneList: undefined,
        error: undefined
    }
})

@Injectable()
export class SystemUtilityManagementState {

    constructor(private readonly loginService: LoginService, private readonly utilityService: UtilityService) { }

    @Selector()
    static getPlaceList(state: SystemUtilityManagementModel): any {
        return state.placeList;
    }

    @Selector()
    static getPlaceById(state: SystemUtilityManagementModel): any {
        return state.place;
    }

    @Selector()
    static getCustomerEventTypeList(state: SystemUtilityManagementModel): any {
        return state.customerEventTypeList;
    }

    @Selector()
    static getCustomerEventTypeById(state: SystemUtilityManagementModel): any {
        return state.customerEventType;
    }

    @Selector()
    static getCustomerComparisonGroupList(state: SystemUtilityManagementModel): any {
        return state.customerComparisonGroupList;
    }

    @Selector()
    static getCustomerComparisonGroupById(state: SystemUtilityManagementModel): any {
        return state.customerComparisonGroup;
    }

    @Selector()
    static getFactorList(state: SystemUtilityManagementModel): any {
        return state.factorList;
    }

    @Selector()
    static getFactorById(state: SystemUtilityManagementModel): any {
        return state.factor;
    }

    @Selector()
    static getLookupList(state: SystemUtilityManagementModel): any {
        return state.lookupList;
    }

    @Selector()
    static getLookupById(state: SystemUtilityManagementModel): any {
        return state.lookup;
    }

    @Selector()
    static getSystemParameterList(state: SystemUtilityManagementModel): any {
        return state.systemParameterList;
    }

    @Selector()
    static getSystemParameterById(state: SystemUtilityManagementModel): any {
        return state.systemParameter;
    }

    @Selector()
    static getDegreeDaysList(state: SystemUtilityManagementModel): any {
        return state.degreeDaysList;
    }

    @Selector()
    static getDegreeDaysById(state: SystemUtilityManagementModel): any {
        return state.logs;
    }

    @Selector()
    static getWeatherStationList(state: SystemUtilityManagementModel): any {
        return state.weatherStationList;
    }

    @Selector()
    static getWeatherStationById(state: SystemUtilityManagementModel): any {
        return state.weatherStation;
    }

    @Selector()
    static getLogList(state: SystemUtilityManagementModel): any {
        return state.logList;
    }

    @Selector()
    static getLogById(state: SystemUtilityManagementModel): any {
        return state.logs;
    }

    @Selector()
    static getZipCodeList(state: SystemUtilityManagementModel): any {
        return state.zipCodeList;
    }

    @Selector()
    static getTimeZoneList(state: SystemUtilityManagementModel): any {
        return state.timeZoneList;
    }

    @Action(GetPlaceListAction)
    getAllPlace(ctx: StateContext<SystemUtilityManagementModel>, action: GetPlaceListAction): Actions {
        const force: boolean = action.force || SystemUtilityManagementState.getPlaceList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGet(AppConstant.places + action.filter)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            placeList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(GetPlaceByIdAction)
    getPlaceById(ctx: StateContext<SystemUtilityManagementModel>, action: GetPlaceByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.places + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        place: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(DeletePlaceByIdAction)
    deletePlaceById(ctx: StateContext<SystemUtilityManagementModel>, action: DeletePlaceByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.places + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Deleted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(SavePlaceAction)
    savePlace(ctx: StateContext<SystemUtilityManagementModel>, action: SavePlaceAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.place, AppConstant.places)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        place: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(UpdatePlaceAction)
    updatePlace(ctx: StateContext<SystemUtilityManagementModel>, action: UpdatePlaceAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.place, AppConstant.places + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        place: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetCustomerEventTypeListAction)
    getAllCustomerEventType(ctx: StateContext<SystemUtilityManagementModel>, action: GetCustomerEventTypeListAction): Actions {
        const force: boolean = action.force || SystemUtilityManagementState.getCustomerEventTypeList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.customerEventTypes, action.filter)
                .pipe(
                    tap((response: any) => {
                        const res = SystemUtilityTransformer.transformCustomerEventTypeTableData(response);
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            customerEventTypeList: res,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.errorMessage);
                        }));
        }
        return result;
    }
    @Action(GetCustomerEventTypeCountAction)
    getCustomerEventTypeCount(ctx: StateContext<SystemUtilityManagementModel>, action: GetCustomerEventTypeCountAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customerEventTypes + '/count')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        customerEventTypeCount: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.errorMessage);
                    }));

    }

    @Action(GetCustomerEventTypeByIdAction)
    getCustomerEventTypeById(ctx: StateContext<SystemUtilityManagementModel>, action: GetCustomerEventTypeByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customerEventTypes + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        customerEventType: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(DeleteCustomerEventTypeByIdAction)
    deleteCustomerEventTypeById(ctx: StateContext<SystemUtilityManagementModel>, action: DeleteCustomerEventTypeByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.customerEventTypes + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Deleted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(SaveCustomerEventTypeAction)
    saveCustomerEventType(ctx: StateContext<SystemUtilityManagementModel>, action: SaveCustomerEventTypeAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.customerEventType, AppConstant.customerEventTypes)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        customerEventType: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(UpdateCustomerEventTypeAction)
    updateCustomerEventType(ctx: StateContext<SystemUtilityManagementModel>, action: UpdateCustomerEventTypeAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.customerEventType, AppConstant.customerEventTypes + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        customerEventType: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetCustomerComparisonGroupListAction)
    getAllCustomerComparisonGroup(ctx: StateContext<SystemUtilityManagementModel>, action: GetCustomerComparisonGroupListAction): Actions {
        const force: boolean = action.force || SystemUtilityManagementState.getCustomerComparisonGroupList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGet(AppConstant.customerComparisonGroups + action.filter)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            customerComparisonGroupList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(GetCustomerComparisonGroupByIdAction)
    getCustomerComparisonGroupById(ctx: StateContext<SystemUtilityManagementModel>, action: GetCustomerComparisonGroupByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customerComparisonGroups + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        customerComparisonGroup: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(DeleteCustomerComparisonGroupByIdAction)
    deleteCustomerComparisonGroupById(ctx: StateContext<SystemUtilityManagementModel>, action: DeleteCustomerComparisonGroupByIdAction):
        Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.customerComparisonGroups + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Deleted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(SaveCustomerComparisonGroupAction)
    saveCustomerComparisonGroup(ctx: StateContext<SystemUtilityManagementModel>, action: SaveCustomerComparisonGroupAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.customerComparisonGroup, AppConstant.customerComparisonGroups)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        customerComparisonGroup: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(UpdateCustomerComparisonGroupAction)
    updateCustomerComparisonGroup(ctx: StateContext<SystemUtilityManagementModel>, action: UpdateCustomerComparisonGroupAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.customerComparisonGroup, AppConstant.customerComparisonGroups + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        customerComparisonGroup: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetFactorListAction)
    getAllFactorList(ctx: StateContext<SystemUtilityManagementModel>, action: GetFactorListAction): Actions {
        const force: boolean = action.force || SystemUtilityManagementState.getFactorList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.factor, action.filter)
                .pipe(
                    tap((response: any) => {
                        // const res = Transformer.transformFactorTableData(response);
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            factorList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.message);
                        }));
        }
        return result;
    }

    @Action(GetFactorByIdAction)
    getFactorById(ctx: StateContext<SystemUtilityManagementModel>, action: GetFactorByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.factor + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        factor: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(DeleteFactorByIdAction)
    deleteFactorById(ctx: StateContext<SystemUtilityManagementModel>, action: DeleteFactorByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.factor + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Deleted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(SaveFactorAction)
    saveFactor(ctx: StateContext<SystemUtilityManagementModel>, action: SaveFactorAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.factor, AppConstant.factor)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        factor: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(UpdateFactorAction)
    updateFactor(ctx: StateContext<SystemUtilityManagementModel>, action: UpdateFactorAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.factor, AppConstant.factor + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        factor: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(GetLookupListAction)
    getAllLookupList(ctx: StateContext<SystemUtilityManagementModel>, action: GetLookupListAction): Actions {
        const force: boolean = action.force || SystemUtilityManagementState.getLookupList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.lookup, action.filter)
                .pipe(
                    tap((response: any) => {
                        // const res = Transformer.transformLookupTableData(response);
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            lookupList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.message);
                        }));
        }
        return result;
    }

    @Action(GetLookupByIdAction)
    getLookupById(ctx: StateContext<SystemUtilityManagementModel>, action: GetLookupByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.lookup + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        lookup: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(DeleteLookupByIdAction)
    deleteLookupById(ctx: StateContext<SystemUtilityManagementModel>, action: DeleteLookupByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.lookup + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Deleted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(SaveLookupAction)
    saveLookup(ctx: StateContext<SystemUtilityManagementModel>, action: SaveLookupAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.factor, AppConstant.lookup)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        lookup: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(UpdateLookupAction)
    updateLookup(ctx: StateContext<SystemUtilityManagementModel>, action: UpdateLookupAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.factor, AppConstant.lookup + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        lookup: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(GetSystemParameterListAction)
    getAllSystemParameterList(ctx: StateContext<SystemUtilityManagementModel>, action: GetSystemParameterListAction): Actions {
        const force: boolean = action.force || SystemUtilityManagementState.getSystemParameterList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.systemParameter, action.filter)
                .pipe(
                    tap((response: any) => {
                        const res = SystemUtilityTransformer.transformSystemParameterTableData(response);
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            systemParameterList: res,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.message);
                        }));
        }
        return result;
    }

    @Action(GetSystemParameterCountAction)
    getSystemParameterCount(ctx: StateContext<SystemUtilityManagementModel>, action: GetSystemParameterCountAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.systemParameter + '/count')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        systemParameterCount: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(GetSystemParameterByIdAction)
    getSystemParameterById(ctx: StateContext<SystemUtilityManagementModel>, action: GetSystemParameterByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.systemParameter + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        systemParameter: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(DeleteSystemParameterByIdAction)
    deleteSystemParameterById(ctx: StateContext<SystemUtilityManagementModel>, action: DeleteSystemParameterByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.systemParameter + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Deleted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(SaveSystemParameterAction)
    saveSystemParameter(ctx: StateContext<SystemUtilityManagementModel>, action: SaveSystemParameterAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.factor, AppConstant.systemParameter)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        systemParameter: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(UpdateSystemParameterAction)
    updateSystemParameter(ctx: StateContext<SystemUtilityManagementModel>, action: UpdateSystemParameterAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.factor, AppConstant.systemParameter + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        systemParameter: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(GetLogsListAction)
    getAllLogsList(ctx: StateContext<SystemUtilityManagementModel>, action: GetLogsListAction): Actions {
        const force: boolean = action.force || SystemUtilityManagementState.getLogList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.logs, action.filter)
                .pipe(
                    tap((response: any) => {
                        // const res = Transformer.transformLogTableData(response);
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            logList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.message);
                        }));
        }
        return result;
    }

    @Action(GetLogsByIdAction)
    getLogsById(ctx: StateContext<SystemUtilityManagementModel>, action: GetLogsByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.logs + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        logs: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(DeleteLogsByIdAction)
    deleteLogsById(ctx: StateContext<SystemUtilityManagementModel>, action: DeleteLogsByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.logs + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Deleted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(SaveLogsAction)
    saveLogs(ctx: StateContext<SystemUtilityManagementModel>, action: SaveLogsAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.factor, AppConstant.logs)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        logs: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(UpdateLogsAction)
    updateLogs(ctx: StateContext<SystemUtilityManagementModel>, action: UpdateLogsAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.factor, AppConstant.logs + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        logs: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(GetWeatherStationListAction)
    getAllWeatherStationList(ctx: StateContext<SystemUtilityManagementModel>, action: GetWeatherStationListAction): Actions {
        const force: boolean = action.force || SystemUtilityManagementState.getWeatherStationList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.weatherStation, action.filter)
                .pipe(
                    tap((response: any) => {
                        // const res = Transformer.transformLogTableData(response);
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            weatherStationList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.message);
                        }));
        }
        return result;
    }

    @Action(GetWeatherStationByIdAction)
    getWeatherStationById(ctx: StateContext<SystemUtilityManagementModel>, action: GetWeatherStationByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.weatherStation + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        weatherStation: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(DeleteWeatherStationByIdAction)
    deleteWeatherStationById(ctx: StateContext<SystemUtilityManagementModel>, action: DeleteWeatherStationByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.weatherStation + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Deleted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(SaveWeatherStationAction)
    saveWeatherStation(ctx: StateContext<SystemUtilityManagementModel>, action: SaveWeatherStationAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.factor, AppConstant.weatherStation)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        weatherStation: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(UpdateWeatherStationAction)
    updateWeatherStation(ctx: StateContext<SystemUtilityManagementModel>, action: UpdateWeatherStationAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.factor, AppConstant.weatherStation + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        weatherStation: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(GetDegreeDaysListAction)
    getAllDegreeDaysList(ctx: StateContext<SystemUtilityManagementModel>, action: GetDegreeDaysListAction): Actions {
        const force: boolean = action.force || SystemUtilityManagementState.getDegreeDaysList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.degreeDays, action.filter)
                .pipe(
                    tap((response: any) => {
                        // const res = Transformer.transformLogTableData(response);
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            degreeDaysList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.message);
                        }));
        }
        return result;
    }

    @Action(GetDegreeDaysByIdAction)
    getDegreeDaysById(ctx: StateContext<SystemUtilityManagementModel>, action: GetDegreeDaysByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.degreeDays + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        degreeDays: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(DeleteDegreeDaysByIdAction)
    deleteDegreeDaysById(ctx: StateContext<SystemUtilityManagementModel>, action: DeleteDegreeDaysByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.degreeDays + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Deleted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(SaveDegreeDaysAction)
    saveDegreeDays(ctx: StateContext<SystemUtilityManagementModel>, action: SaveDegreeDaysAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.degreeDays, AppConstant.degreeDays)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        degreeDays: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(UpdateDegreeDaysAction)
    updateDegreeDays(ctx: StateContext<SystemUtilityManagementModel>, action: UpdateDegreeDaysAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.degreeDays, AppConstant.degreeDays + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        degreeDays: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(GetZipCodeListAction)
    getAllZipCodeList(ctx: StateContext<SystemUtilityManagementModel>, action: GetZipCodeListAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGetWithParams(AppConstant.places + '/' + action.placeCode + '/' + AppConstant.zipCode, action.filter)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        zipCodeList: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(DeleteZipCodeByIdAction)
    deleteZipCodeById(ctx: StateContext<SystemUtilityManagementModel>, action: DeleteZipCodeByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.places + '/' + action.placeCode + '/' + AppConstant.zipCode + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Deleted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(SaveZipCodeAction)
    saveZipCode(ctx: StateContext<SystemUtilityManagementModel>, action: SaveZipCodeAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.zipCode, AppConstant.places + '/' + action.placeCode + '/' + AppConstant.zipCode)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        zipCode: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(GetTimeZoneListAction)
    getAllTimeZoneList(ctx: StateContext<SystemUtilityManagementModel>, action: GetTimeZoneListAction): Actions {
        const force: boolean = action.force || SystemUtilityManagementState.getTimeZoneList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGet(AppConstant.timezone)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            timeZoneList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.message);
                        }));
        }
        return result;
    }
}
