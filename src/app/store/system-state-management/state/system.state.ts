import { Injectable } from '@angular/core';
import { Action, Actions, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/internal/operators/tap';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AppConstant } from 'src/app/utility/app.constant';
import {
    CustomerGroupError,
    GetCoachUserListAction,
    GetCredentialTypeListAction,
    GetCustomerAlertTypeListAction,
    GetCustomerGroupListAction,
    GetProgramGroupListAction,
    GetViewConfigurationListAction
} from './system.action';
import { SystemManagementModel } from './system.model';

@State<SystemManagementModel>({
    name: 'systemManagement',
    defaults: {
        customerGroupList: undefined,
        viewConfigurationList: undefined,
        programGroupList: undefined,
        customerAlertTypeList: undefined,
        credentialTypeList: undefined,
        coachUserList: undefined,
        error: undefined
    }
})

@Injectable()
export class SystemManagementState {

    constructor(private readonly loginService: LoginService, private readonly utilityService: UtilityService) { }

    @Selector()
    static getCustomerGroupList(state: SystemManagementModel): any {
        return state.customerGroupList;
    }

    @Selector()
    static getViewConfigurationList(state: SystemManagementModel): any {
        return state.viewConfigurationList;
    }

    @Selector()
    static getProgramGroupList(state: SystemManagementModel): any {
        return state.programGroupList;
    }

    @Selector()
    static getCustomerAlertTypeList(state: SystemManagementModel): any {
        return state.customerAlertTypeList;
    }

    @Selector()
    static getCredentialTypeList(state: SystemManagementModel): any {
        return state.credentialTypeList;
    }

    @Selector()
    static getCoachUserList(state: SystemManagementModel): any {
        return state.coachUserList;
    }

    @Action(GetCustomerGroupListAction)
    getAllCustomerGroup(ctx: StateContext<SystemManagementModel>, action: GetCustomerGroupListAction): Actions {
        const force: boolean = action.force || SystemManagementState.getCustomerGroupList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            result = this.loginService.performGet(AppConstant.customerGroups)
                .pipe(
                    tap((response: any) => {
                        ctx.patchState({
                            customerGroupList: response,
                        });
                    },
                        error => {
                            this.utilityService.showErrorMessage(error.message);
                            ctx.dispatch(new CustomerGroupError(error));
                        }));
        }
        return result;
    }

    @Action(GetViewConfigurationListAction)
    getAllViewConfiguration(ctx: StateContext<SystemManagementModel>, action: GetViewConfigurationListAction): Actions {
        const force: boolean = action.force || SystemManagementState.getViewConfigurationList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            result = this.loginService.performGet(AppConstant.viewConfigurations)
                .pipe(
                    tap((response: any) => {
                        ctx.patchState({
                            viewConfigurationList: response,
                        });
                    },
                        error => {
                            this.utilityService.showErrorMessage(error.message);
                        }));
        }
        return result;
    }
    @Action(GetProgramGroupListAction)
    getAllProgramGroup(ctx: StateContext<SystemManagementModel>, action: GetProgramGroupListAction): Actions {
        const force: boolean = action.force || SystemManagementState.getProgramGroupList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            result = this.loginService.performGet(AppConstant.programGroups)
                .pipe(
                    tap((response: any) => {
                        ctx.patchState({
                            programGroupList: response,
                        });
                    },
                        error => {
                            this.utilityService.showErrorMessage(error.message);
                        }));
        }
        return result;
    }

    @Action(GetCustomerAlertTypeListAction)
    getAllCustomerAlertType(ctx: StateContext<SystemManagementModel>, action: GetCustomerAlertTypeListAction): Actions {
        const force: boolean = action.force || SystemManagementState.getCustomerAlertTypeList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            result = this.loginService.performGet(AppConstant.customerAlertTypes)
                .pipe(
                    tap((response: any) => {
                        ctx.patchState({
                            customerAlertTypeList: response,
                        });
                    },
                        error => {
                            this.utilityService.showErrorMessage(error.message);
                        }));
        }
        return result;
    }

    @Action(GetCredentialTypeListAction)
    getAllCredentialType(ctx: StateContext<SystemManagementModel>, action: GetCredentialTypeListAction): Actions {
        const force: boolean = action.force || SystemManagementState.getCredentialTypeList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            result = this.loginService.performGet(AppConstant.credentialTypes)
                .pipe(
                    tap((response: any) => {
                        ctx.patchState({
                            credentialTypeList: response,
                        });
                    },
                        error => {
                            this.utilityService.showErrorMessage(error.message);
                        }));
        }
        return result;
    }

    @Action(GetCoachUserListAction)
    getAllCoachUser(ctx: StateContext<SystemManagementModel>, action: GetCoachUserListAction): Actions {
        const force: boolean = action.force || SystemManagementState.getCoachUserList(ctx.getState()) !== undefined;
        let result: Actions;
        if (force) {
            result = this.loginService.performGet(AppConstant.users + action.filter)
                .pipe(
                    tap((response: any) => {
                        ctx.patchState({
                            coachUserList: response,
                        });
                    },
                        error => {
                            this.utilityService.showErrorMessage(error.message);
                        }));
        }
        return result;
    }

    @Action(CustomerGroupError)
    loadCustomerGroupError(ctx: StateContext<SystemManagementModel>, action: CustomerGroupError): void {
        /* istanbul ignore next */
        ctx.patchState({
            error: action.error,
            customerGroupList: undefined
        });
    }
}
