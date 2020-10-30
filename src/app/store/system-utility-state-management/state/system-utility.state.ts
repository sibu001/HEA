import { Injectable } from '@angular/core';
import { Action, Actions, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AppConstant } from 'src/app/utility/app.constant';
import {
    DeleteCustomerComparisonGroupByIdAction,
    DeleteCustomerEventTypeByIdAction,
    DeletePlaceByIdAction,
    GetCustomerComparisonGroupByIdAction,
    GetCustomerComparisonGroupListAction,
    GetCustomerEventTypeByIdAction,
    GetCustomerEventTypeListAction,
    GetPlaceByIdAction,
    GetPlaceListAction,
    SaveCustomerComparisonGroupAction,
    SaveCustomerEventTypeAction,
    SavePlaceAction,
    UpdateCustomerComparisonGroupAction,
    UpdateCustomerEventTypeAction,
    UpdatePlaceAction
} from './system-utility.action';
import { SystemUtilityManagementModel } from './system-utility.model';

@State<SystemUtilityManagementModel>({
    name: 'systemUtilityManagement',
    defaults: {
        placeList: undefined,
        place: undefined,
        customerEventTypeList: undefined,
        customerEventType: undefined,
        customerComparisonGroupList: undefined,
        customerComparisonGroup: undefined,
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
            result = this.loginService.performGet(AppConstant.customerEventTypes + action.filter)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            customerEventTypeList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.errorMessage);
                        }));
        }
        return result;
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


}
