import { Injectable } from '@angular/core';
import { Action, Actions, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AppConstant } from 'src/app/utility/app.constant';
import {
    DeleteUserReportDefinitionByIdAction,
    DeleteUserReportDefinitionContentPartByIdAction,
    DeleteUserReportDefinitionContextVariableTypeByIdAction,
    GetUserReportDefinitionByIdAction,
    GetUserReportDefinitionContentPartByIdAction,
    GetUserReportDefinitionContentPartListAction,
    GetUserReportDefinitionContextVariableTypeByIdAction,
    GetUserReportDefinitionContextVariableTypeListAction,
    GetUserReportDefinitionListAction,
    SaveUserReportDefinitionAction,
    SaveUserReportDefinitionContentPartAction,
    SaveUserReportDefinitionContextVariableTypeAction,
    UpdateUserReportDefinitionAction,
    UpdateUserReportDefinitionContentPartAction,
    UpdateUserReportDefinitionContextVariableTypeAction
} from './user-report.action';
import { UserReportManagementModel } from './user-report.model';

@State<UserReportManagementModel>({
    name: 'userReportManagement',
    defaults: {
        userReportDefinitionList: undefined,
        userReportDefinition: undefined,
        userReportDefinitionContextVariableTypeList: undefined,
        userReportDefinitionContextVariableType: undefined,
        userReportDefinitionContentPartList: undefined,
        userReportDefinitionContentPart: undefined
    }
})

@Injectable()
export class UserReportManagementState {

    constructor(private readonly loginService: LoginService, private readonly utilityService: UtilityService) { }

    @Selector()
    static getUserReportDefinitionList(state: UserReportManagementModel): any {
        return state.userReportDefinitionList;
    }

    @Selector()
    static getUserReportDefinitionById(state: UserReportManagementModel): any {
        return state.userReportDefinition;
    }

    @Selector()
    static getUserReportDefinitionContextVariableTypeList(state: UserReportManagementModel): any {
        return state.userReportDefinitionContextVariableTypeList;
    }

    @Selector()
    static getUserReportDefinitionContextVariableTypeById(state: UserReportManagementModel): any {
        return state.userReportDefinitionContextVariableType;
    }

    @Selector()
    static getUserReportDefinitionContentPartList(state: UserReportManagementModel): any {
        return state.userReportDefinitionContentPartList;
    }

    @Selector()
    static getUserReportDefinitionContentPartById(state: UserReportManagementModel): any {
        return state.userReportDefinitionContentPart;
    }

    @Action(GetUserReportDefinitionListAction)
    getAllUserReportDefinition(ctx: StateContext<UserReportManagementModel>, action: GetUserReportDefinitionListAction): Actions {
        const force: boolean = action.force || UserReportManagementState.getUserReportDefinitionList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGet(AppConstant.userReportDefinitions + action.filter)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            userReportDefinitionList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(GetUserReportDefinitionByIdAction)
    getUserReportDefinitionById(ctx: StateContext<UserReportManagementModel>, action: GetUserReportDefinitionByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.userReportDefinitions + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        userReportDefinition: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(DeleteUserReportDefinitionByIdAction)
    deleteUserReportDefinitionById(ctx: StateContext<UserReportManagementModel>, action: DeleteUserReportDefinitionByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.userReportDefinitions + '/' + action.id)
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

    @Action(SaveUserReportDefinitionAction)
    saveUserReportDefinition(ctx: StateContext<UserReportManagementModel>, action: SaveUserReportDefinitionAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.userReportDefinition, AppConstant.userReportDefinitions)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        userReportDefinition: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(UpdateUserReportDefinitionAction)
    updateUserReportDefinition(ctx: StateContext<UserReportManagementModel>, action: UpdateUserReportDefinitionAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.userReportDefinition, AppConstant.userReportDefinitions + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        userReportDefinition: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetUserReportDefinitionContextVariableTypeListAction)
    getAllUserReportDefinitionContextVariableType(ctx: StateContext<UserReportManagementModel>, action: GetUserReportDefinitionContextVariableTypeListAction): Actions {
        const force: boolean = action.force || UserReportManagementState.getUserReportDefinitionContextVariableTypeList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGet(AppConstant.userReportDefinitionContextVariableTypes + action.filter)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            userReportDefinitionContextVariableTypeList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(GetUserReportDefinitionContextVariableTypeByIdAction)
    getUserReportDefinitionContextVariableTypeById(ctx: StateContext<UserReportManagementModel>, action: GetUserReportDefinitionContextVariableTypeByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.userReportDefinitionContextVariableTypes + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        userReportDefinitionContextVariableType: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(DeleteUserReportDefinitionContextVariableTypeByIdAction)
    deleteUserReportDefinitionContextVariableTypeById(ctx: StateContext<UserReportManagementModel>, action: DeleteUserReportDefinitionContextVariableTypeByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.userReportDefinitionContextVariableTypes + '/' + action.id)
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

    @Action(SaveUserReportDefinitionContextVariableTypeAction)
    saveUserReportDefinitionContextVariableType(ctx: StateContext<UserReportManagementModel>, action: SaveUserReportDefinitionContextVariableTypeAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.userReportDefinitionContextVariableType, AppConstant.userReportDefinitionContextVariableTypes)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        userReportDefinitionContextVariableType: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(UpdateUserReportDefinitionContextVariableTypeAction)
    updateUserReportDefinitionContextVariableType(ctx: StateContext<UserReportManagementModel>, action: UpdateUserReportDefinitionContextVariableTypeAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.userReportDefinitionContextVariableType, AppConstant.userReportDefinitionContextVariableTypes + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        userReportDefinitionContextVariableType: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetUserReportDefinitionContentPartListAction)
    getAllUserReportDefinitionContentPart(ctx: StateContext<UserReportManagementModel>, action: GetUserReportDefinitionContentPartListAction): Actions {
        const force: boolean = action.force || UserReportManagementState.getUserReportDefinitionContentPartList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGet(AppConstant.userReportDefinitionContentParts + action.filter)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            userReportDefinitionContentPartList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(GetUserReportDefinitionContentPartByIdAction)
    getUserReportDefinitionContentPartById(ctx: StateContext<UserReportManagementModel>, action: GetUserReportDefinitionContentPartByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.userReportDefinitionContentParts + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        userReportDefinitionContentPart: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(DeleteUserReportDefinitionContentPartByIdAction)
    deleteUserReportDefinitionContentPartById(ctx: StateContext<UserReportManagementModel>, action: DeleteUserReportDefinitionContentPartByIdAction):
        Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.userReportDefinitionContentParts + '/' + action.id)
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

    @Action(SaveUserReportDefinitionContentPartAction)
    saveUserReportDefinitionContentPart(ctx: StateContext<UserReportManagementModel>, action: SaveUserReportDefinitionContentPartAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.userReportDefinitionContentPart, AppConstant.userReportDefinitionContentParts)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        userReportDefinitionContentPart: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(UpdateUserReportDefinitionContentPartAction)
    updateUserReportDefinitionContentPart(ctx: StateContext<UserReportManagementModel>, action: UpdateUserReportDefinitionContentPartAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.userReportDefinitionContentPart, AppConstant.userReportDefinitionContentParts + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        userReportDefinitionContentPart: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

}
