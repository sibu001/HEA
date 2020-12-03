import { Injectable } from '@angular/core';
import { Action, Actions, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/internal/operators/tap';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { SystemTransformer } from '../transformer/transformer';
import {
    AssignPlaceToCustomerGroupAction,
    AssignProgramGroupToCustomerGroupAction,
    CustomerGroupError,
    DeleteCredentialTypeByIdAction,
    DeleteCustomerAlertTypeByIdAction,
    DeleteCustomerGroupByIdAction,
    DeletePlaceOfCustomerGroupAction,
    DeleteProgramGroupByIdAction,
    DeleteProgramGroupOfCustomerGroupAction,
    DeleteRoleByIdAction,
    GetCoachUserListAction,
    GetCredentialTypeByIdAction,
    GetCredentialTypeListAction,
    GetCustomerAlertTypeByIdAction,
    GetCustomerAlertTypeListAction,
    GetCustomerGroupByIdAction,
    GetCustomerGroupListAction,
    GetPlaceListByCustomerGroupIdAction,
    GetProgramGroupByIdAction,
    GetProgramGroupListAction,
    GetProgramGroupListByCustomerGroupIdAction,
    GetRoleByIdAction,
    GetRoleListAction,
    GetScrapingPeriodListAction,
    GetScrapingUtilityListAction,
    GetThemesListAction,
    GetViewConfigurationListAction,
    SaveCredentialTypeAction,
    SaveCustomerAlertTypeAction,
    SaveCustomerGroupAction,
    SaveProgramGroupAction,
    SaveRoleAction,
    UpdateCredentialTypeAction,
    UpdateCustomerAlertTypeAction,
    UpdateCustomerGroupAction,
    UpdateProgramGroupAction,
    UpdateRoleAction
} from './system.action';
import { SystemManagementModel } from './system.model';

@State<SystemManagementModel>({
    name: 'systemManagement',
    defaults: {
        customerGroupList: undefined,
        customerGroup: undefined,
        placeListByCustomerGroupId: undefined,
        programGroupListByCustomerGroupId: undefined,
        viewConfigurationList: undefined,
        programGroupList: undefined,
        programGroup: undefined,
        customerAlertTypeList: undefined,
        customerAlertType: undefined,
        credentialTypeList: undefined,
        credentialType: undefined,
        coachUserList: undefined,
        roleList: undefined,
        role: undefined,
        themesList: undefined,
        scrapingUtility: undefined,
        scrapingPeriod: undefined,
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
    static getPlaceListByCustomerGroupId(state: SystemManagementModel): any {
        return state.programGroupListByCustomerGroupId;
    }

    @Selector()
    static getProgramGroupListByCustomerGroupId(state: SystemManagementModel): any {
        return state.placeListByCustomerGroupId;
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

    @Selector()
    static getRoleList(state: SystemManagementModel): any {
        return state.roleList;
    }

    @Selector()
    static getRoleById(state: SystemManagementModel): any {
        return state.role;
    }

    @Selector()
    static getThemeList(state: SystemManagementModel): any {
        return state.themesList;
    }

    @Selector()
    static getScrapingUtilityList(state: SystemManagementModel): any {
        return state.scrapingUtility;
    }

    @Selector()
    static getScrapingPeriodList(state: SystemManagementModel): any {
        return state.scrapingPeriod;
    }

    @Action(GetCustomerGroupListAction)
    getAllCustomerGroup(ctx: StateContext<SystemManagementModel>, action: GetCustomerGroupListAction): Actions {
        const force: boolean = action.force || SystemManagementState.getCustomerGroupList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.customerGroups, action.filter)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            customerGroupList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.errorMessage);
                            ctx.dispatch(new CustomerGroupError(error));
                        }));
        }
        return result;
    }

    @Action(GetCustomerGroupByIdAction)
    getCustomerGroupById(ctx: StateContext<SystemManagementModel>, action: GetCustomerGroupByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customerGroups + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        customerGroup: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(DeleteCustomerGroupByIdAction)
    deleteCustomerGroupById(ctx: StateContext<SystemManagementModel>, action: DeleteCustomerGroupByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.customerGroups + '/' + action.id)
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

    @Action(SaveCustomerGroupAction)
    saveCustomerGroup(ctx: StateContext<SystemManagementModel>, action: SaveCustomerGroupAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.customerGroup, AppConstant.customerGroups)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        customerGroup: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(UpdateCustomerGroupAction)
    updateCustomerGroup(ctx: StateContext<SystemManagementModel>, action: UpdateCustomerGroupAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.customerGroup, AppConstant.customerGroups + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        customerGroup: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetPlaceListByCustomerGroupIdAction)
    getPlaceListByCustomerGroupId(ctx: StateContext<SystemManagementModel>, action: GetPlaceListByCustomerGroupIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customerGroups + '/' + action.customerGroupId + '/' + AppConstant.places)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        placeListByCustomerGroupId: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.errorMessage);
                        ctx.dispatch(new CustomerGroupError(error));
                    }));
    }

    @Action(DeletePlaceOfCustomerGroupAction)
    deletePlaceOfCustomerGroup(ctx: StateContext<SystemManagementModel>, action: DeletePlaceOfCustomerGroupAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.customerGroups + '/' + action.customerGroupId + '/' + AppConstant.places + '/' + action.placeCode)
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

    @Action(AssignPlaceToCustomerGroupAction)
    assignPlaceToCustomerGroup(ctx: StateContext<SystemManagementModel>, action: AssignPlaceToCustomerGroupAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(null, AppConstant.customerGroups + '/' + action.customerGroupId + '/' + AppConstant.places + '/' + action.placeCode)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Save Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetProgramGroupListByCustomerGroupIdAction)
    getProgramGroupListByCustomerGroupId(ctx: StateContext<SystemManagementModel>, action: GetProgramGroupListByCustomerGroupIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customerGroups + '/' + action.customerGroupId + '/' + AppConstant.programGroups)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        programGroupListByCustomerGroupId: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.errorMessage);
                        ctx.dispatch(new CustomerGroupError(error));
                    }));
    }

    @Action(DeleteProgramGroupOfCustomerGroupAction)
    deleteProgramGroupOfCustomerGroup(ctx: StateContext<SystemManagementModel>, action: DeleteProgramGroupOfCustomerGroupAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.customerGroups + '/' + action.customerGroupId + '/' + AppConstant.programGroups + '/' + action.programGroupId)
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

    @Action(AssignProgramGroupToCustomerGroupAction)
    assignProgramGroupToCustomerGroup(ctx: StateContext<SystemManagementModel>, action: AssignProgramGroupToCustomerGroupAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost('', AppConstant.customerGroups + '/' + action.customerGroupId + '/' + AppConstant.programGroups + '/' + action.programGroupId)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Save Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetViewConfigurationListAction)
    getAllViewConfiguration(ctx: StateContext<SystemManagementModel>, action: GetViewConfigurationListAction): Actions {
        const force: boolean = action.force || SystemManagementState.getViewConfigurationList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGet(AppConstant.viewConfigurations)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            viewConfigurationList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.error.errorMessage);
                        }));
        }
        return result;
    }
    @Action(GetProgramGroupListAction)
    getAllProgramGroup(ctx: StateContext<SystemManagementModel>, action: GetProgramGroupListAction): Actions {
        const force: boolean = action.force || SystemManagementState.getProgramGroupList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.programGroups, action.filter)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            programGroupList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(GetProgramGroupByIdAction)
    getAllProgramGroupById(ctx: StateContext<SystemManagementModel>, action: GetProgramGroupByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.programGroups + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        programGroup: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(DeleteProgramGroupByIdAction)
    deleteProgramGroupById(ctx: StateContext<SystemManagementModel>, action: DeleteProgramGroupByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.programGroups + '/' + action.id)
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

    @Action(SaveProgramGroupAction)
    saveProgramGroup(ctx: StateContext<SystemManagementModel>, action: SaveProgramGroupAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.programGroup, AppConstant.programGroups)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        programGroup: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(UpdateProgramGroupAction)
    updateProgramGroup(ctx: StateContext<SystemManagementModel>, action: UpdateProgramGroupAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.programGroup, AppConstant.programGroups + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        programGroup: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }


    @Action(GetCustomerAlertTypeListAction)
    getAllCustomerAlertType(ctx: StateContext<SystemManagementModel>, action: GetCustomerAlertTypeListAction): Actions {
        const force: boolean = action.force || SystemManagementState.getCustomerAlertTypeList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.customerAlertTypes, action.filter)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            customerAlertTypeList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(GetCustomerAlertTypeByIdAction)
    getCustomerAlertTypeById(ctx: StateContext<SystemManagementModel>, action: GetCustomerAlertTypeByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customerAlertTypes + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        customerAlertType: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(DeleteCustomerAlertTypeByIdAction)
    deleteCustomerAlertTypeById(ctx: StateContext<SystemManagementModel>, action: DeleteCustomerAlertTypeByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.customerAlertTypes + '/' + action.id)
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

    @Action(SaveCustomerAlertTypeAction)
    saveCustomerAlertType(ctx: StateContext<SystemManagementModel>, action: SaveCustomerAlertTypeAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.customerAlertType, AppConstant.customerAlertTypes)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        customerAlertType: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(UpdateCustomerAlertTypeAction)
    updateCustomerAlertType(ctx: StateContext<SystemManagementModel>, action: UpdateCustomerAlertTypeAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.customerAlertType, AppConstant.customerAlertTypes + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        customerAlertType: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }



    @Action(GetCredentialTypeListAction)
    getAllCredentialType(ctx: StateContext<SystemManagementModel>, action: GetCredentialTypeListAction): Actions {
        const force: boolean = action.force || SystemManagementState.getCredentialTypeList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.credentialTypes , action.filter)
                .pipe(
                    tap((response: any) => {
                        const res = SystemTransformer.transformCredentialType(response);
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            credentialTypeList: res,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(GetCredentialTypeByIdAction)
    getCredentialTypesById(ctx: StateContext<SystemManagementModel>, action: GetCredentialTypeByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.credentialTypes + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        credentialType: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));

    }


    @Action(DeleteCredentialTypeByIdAction)
    deleteCredentialTypeById(ctx: StateContext<SystemManagementModel>, action: DeleteCredentialTypeByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.credentialTypes + '/' + action.id)
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

    @Action(SaveCredentialTypeAction)
    saveCredentialType(ctx: StateContext<SystemManagementModel>, action: SaveCredentialTypeAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.credentialType, AppConstant.credentialTypes)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        credentialType: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(UpdateCredentialTypeAction)
    updateCredentialType(ctx: StateContext<SystemManagementModel>, action: UpdateCredentialTypeAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.credentialType, AppConstant.credentialTypes + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        credentialType: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetCoachUserListAction)
    getAllCoachUser(ctx: StateContext<SystemManagementModel>, action: GetCoachUserListAction): Actions {
        const force: boolean = action.force || SystemManagementState.getCoachUserList(ctx.getState()) !== undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGet(AppConstant.users + action.filter)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            coachUserList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(GetRoleListAction)
    getAllRole(ctx: StateContext<SystemManagementModel>, action: GetRoleListAction): Actions {
        const force: boolean = action.force || SystemManagementState.getRoleList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.roles, action.params)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            roleList: response.data,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(GetRoleByIdAction)
    getRolesById(ctx: StateContext<SystemManagementModel>, action: GetRoleByIdAction) {
        return this.loginService.performGet(AppConstant.roles + '/' + action.roleCode)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        role: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));

    }


    @Action(DeleteRoleByIdAction)
    deleteRoleById(ctx: StateContext<SystemManagementModel>, action: DeleteRoleByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.roles + '/' + action.roleCode)
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

    @Action(SaveRoleAction)
    saveRole(ctx: StateContext<SystemManagementModel>, action: SaveRoleAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.role, AppConstant.roles)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        role: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(UpdateRoleAction)
    updateRole(ctx: StateContext<SystemManagementModel>, action: UpdateRoleAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.role, AppConstant.roles + '/' + action.roleCode)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        role: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetScrapingUtilityListAction)
    getAllScrapingUtilityList(ctx: StateContext<SystemManagementModel>, action: GetScrapingUtilityListAction): Actions {
        const force: boolean = action.force || SystemManagementState.getScrapingUtilityList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGet(AppConstant.lookupValues + '/' + action.params)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            scrapingUtility: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(GetScrapingPeriodListAction)
    getAllScrapingPeriodList(ctx: StateContext<SystemManagementModel>, action: GetScrapingPeriodListAction): Actions {
        const force: boolean = action.force || SystemManagementState.getScrapingPeriodList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGet(AppConstant.lookupValues + '/' + action.params)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            scrapingPeriod: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(GetThemesListAction)
    getAllThemesList(ctx: StateContext<SystemManagementModel>, action: GetThemesListAction): Actions {
        const force: boolean = action.force || SystemManagementState.getThemeList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGet(AppConstant.themes)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            themesList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.error.errorMessage);
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
