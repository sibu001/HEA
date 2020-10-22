import { Injectable } from '@angular/core';
import { Action, Actions, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/internal/operators/tap';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AppConstant } from 'src/app/utility/app.constant';
import {
    CustomerGroupError,
    GetCoachUserListAction,
    GetCredentialTypeByIdAction,
    GetCredentialTypeListAction,
    GetCustomerAlertTypeByIdAction,
    GetCustomerAlertTypeListAction,
    GetCustomerGroupByIdAction,
    GetCustomerGroupListAction,
    GetProgramGroupByIdAction,
    GetProgramGroupListAction,
    GetViewConfigurationListAction
} from './system.action';
import { SystemManagementModel } from './system.model';

@State<SystemManagementModel>({
    name: 'systemManagement',
    defaults: {
        customerGroupList: undefined,
        customerGroup: undefined,
        viewConfigurationList: undefined,
        programGroupList: undefined,
        programGroup: undefined,
        customerAlertTypeList: undefined,
        customerAlertType: undefined,
        credentialTypeList: undefined,
        credentialType: undefined,
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
    static getCustomerGroupById(state: SystemManagementModel): any {
        return state.customerGroup;
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
    static getProgramGroupById(state: SystemManagementModel): any {
        return state.programGroup;
    }

    @Selector()
    static getCustomerAlertTypeList(state: SystemManagementModel): any {
        return state.customerAlertTypeList;
    }

    @Selector()
    static getCustomerAlertTypeById(state: SystemManagementModel): any {
        return state.customerAlertType;
    }

    @Selector()
    static getCredentialTypeList(state: SystemManagementModel): any {
        return state.credentialTypeList;
    }

    @Selector()
    static getCredentialTypeById(state: SystemManagementModel): any {
        return state.credentialType;
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

    @Action(GetCustomerGroupByIdAction)
    getCustomerGroupById(ctx: StateContext<SystemManagementModel>, action: GetCustomerGroupByIdAction): void {
        const customerGroupList = SystemManagementState.getCustomerGroupList(ctx.getState());
        let customerGroup: any;
        if (customerGroupList !== undefined) {
            const i = customerGroupList.findIndex((item: any) => item.id === action.id);
            if (i !== -1) {
                customerGroup = customerGroupList[i];
            }
        }
        ctx.patchState({
            customerGroup: customerGroup
        });
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

    @Action(GetProgramGroupByIdAction)
    getAllProgramGroupById(ctx: StateContext<SystemManagementModel>, action: GetProgramGroupByIdAction): void {
        const programGroupList = SystemManagementState.getProgramGroupList(ctx.getState());
        let programGroup: any;
        if (programGroupList !== undefined) {
            const i = programGroupList.findIndex((item: any) => item.id === action.id);
            if (i !== -1) {
                programGroup = programGroupList[i];
            }
        }
        ctx.patchState({
            programGroup: programGroup
        });
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

    @Action(GetCustomerAlertTypeByIdAction)
    getCustomerAlertTypeById(ctx: StateContext<SystemManagementModel>, action: GetCustomerAlertTypeByIdAction): void {
        const customerAlertTypesList = SystemManagementState.getCustomerAlertTypeList(ctx.getState());
        let customerAlertType: any;
        if (customerAlertTypesList !== undefined) {
            const i = customerAlertTypesList.findIndex((item: any) => item.id === action.id);
            if (i !== -1) {
                customerAlertType = customerAlertTypesList[i];
            }
        }
        ctx.patchState({
            customerAlertType: customerAlertType
        });
    }


    @Action(GetCredentialTypeListAction)
    getAllCredentialType(ctx: StateContext<SystemManagementModel>, action: GetCredentialTypeListAction): Actions {
        const force: boolean = action.force || SystemManagementState.getCredentialTypeList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            result = this.loginService.performGet(AppConstant.credentialTypes + action.filter)
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

    @Action(GetCredentialTypeByIdAction)
    getCredentialTypesById(ctx: StateContext<SystemManagementModel>, action: GetCredentialTypeByIdAction): void {
        const credentialTypesList = SystemManagementState.getCredentialTypeList(ctx.getState());
        let credentialType: any;
        if (credentialTypesList !== undefined) {
            const i = credentialTypesList.findIndex((item: any) => item.id === action.id);
            if (i !== -1) {
                credentialType = credentialTypesList[i];
            }
        }
        ctx.patchState({
            credentialType: credentialType
        });
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
