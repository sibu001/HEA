import { Injectable } from '@angular/core';
import { Action, Actions, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/internal/operators/tap';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { CustomerError } from '../../customer-state-management/state/customer.action';
import {
    GetMailDescriptionListAction,
    GetMailDescriptionByIdAction,
    DeleteMailDescriptionByIdAction,
    SaveMailDescriptionAction,
    UpdateMailDescriptionAction,
    GetContextVariableListAction,
    GetContextVariableByIdAction,
    DeleteContextVariableByIdAction,
    SaveContextVariableAction,
    UpdateContextVariableAction,
    GetMailContentPartListAction,
    GetMailContentPartByIdAction,
    DeleteMailContentPartByIdAction,
    SaveMailContentPartAction,
    UpdateMailContentPartAction
} from './mail.action';
import { MailManagementModel } from './mail.model';


@State<MailManagementModel>({
    name: 'mailManagement',
    defaults: {
        mailContentPartList: undefined,
        mailContentPart: undefined,
        contextVariableList: undefined,
        contextVariable: undefined,
        mailDescriptionList: undefined,
        mailDescription: undefined
    }
})

@Injectable()
export class MailManagementState {

    constructor(private readonly loginService: LoginService, private readonly utilityService: UtilityService) { }


    @Selector()
    static getMailDescriptionList(state: MailManagementModel): any {
        return state.mailDescriptionList;
    }

    @Selector()
    static getMailDescriptionById(state: MailManagementModel): any {
        return state.mailDescription;
    }

    @Selector()
    static getContextVariableList(state: MailManagementModel): any {
        return state.contextVariableList;
    }

    @Selector()
    static getContextVariableById(state: MailManagementModel): any {
        return state.contextVariable;
    }

    @Selector()
    static getMailContentPartList(state: MailManagementModel): any {
        return state.mailContentPartList;
    }

    @Selector()
    static getMailContentPartById(state: MailManagementModel): any {
        return state.mailContentPart;
    }


    @Action(GetMailDescriptionListAction)
    getAllMailDescriptionList(ctx: StateContext<MailManagementModel>, action: GetMailDescriptionListAction): Actions {
        const force: boolean = action.force || MailManagementState.getMailDescriptionList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.mailDescription, action.filter)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            mailDescriptionList: response,
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

    @Action(GetMailDescriptionByIdAction)
    getMailDescriptionById(ctx: StateContext<MailManagementModel>, action: GetMailDescriptionByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.mailDescription + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        mailDescription: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(DeleteMailDescriptionByIdAction)
    deleteMailDescriptionById(ctx: StateContext<MailManagementModel>, action: DeleteMailDescriptionByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.mailDescription + '/' + action.id)
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

    @Action(SaveMailDescriptionAction)
    saveMailDescription(ctx: StateContext<MailManagementModel>, action: SaveMailDescriptionAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.mailDescription, AppConstant.mailDescription)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        mailDescription: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(UpdateMailDescriptionAction)
    updateMailDescription(ctx: StateContext<MailManagementModel>, action: UpdateMailDescriptionAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.mailDescription, AppConstant.mailDescription + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        mailDescription: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(GetContextVariableListAction)
    getAllContextVariableList(ctx: StateContext<MailManagementModel>, action: GetContextVariableListAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.contextVariable)
            .pipe(
                tap((response: any) => {
                    // const res = Transformer.transformContextVariableTableData(response);
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        contextVariableList: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                        ctx.dispatch(new CustomerError(error));
                    }));
    }

    @Action(GetContextVariableByIdAction)
    getContextVariableById(ctx: StateContext<MailManagementModel>, action: GetContextVariableByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.contextVariable + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        contextVariable: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(DeleteContextVariableByIdAction)
    deleteContextVariableById(ctx: StateContext<MailManagementModel>, action: DeleteContextVariableByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.contextVariable + '/' + action.id)
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

    @Action(SaveContextVariableAction)
    saveContextVariable(ctx: StateContext<MailManagementModel>, action: SaveContextVariableAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.contextVariable, AppConstant.contextVariable)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        contextVariable: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(UpdateContextVariableAction)
    updateContextVariable(ctx: StateContext<MailManagementModel>, action: UpdateContextVariableAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.contextVariable, AppConstant.contextVariable + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        contextVariable: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(GetMailContentPartListAction)
    getAllMailContentPartList(ctx: StateContext<MailManagementModel>, action: GetMailContentPartListAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.mailContentPart)
            .pipe(
                tap((response: any) => {
                    // const res = Transformer.transformMailContentPartTableData(response);
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        mailContentPartList: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                        ctx.dispatch(new CustomerError(error));
                    }));
    }

    @Action(GetMailContentPartByIdAction)
    getMailContentPartById(ctx: StateContext<MailManagementModel>, action: GetMailContentPartByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.mailContentPart + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        mailContentPart: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(DeleteMailContentPartByIdAction)
    deleteMailContentPartById(ctx: StateContext<MailManagementModel>, action: DeleteMailContentPartByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.mailContentPart + '/' + action.id)
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

    @Action(SaveMailContentPartAction)
    saveMailContentPart(ctx: StateContext<MailManagementModel>, action: SaveMailContentPartAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.mailContentPart, AppConstant.mailContentPart)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        mailContentPart: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(UpdateMailContentPartAction)
    updateMailContentPart(ctx: StateContext<MailManagementModel>, action: UpdateMailContentPartAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.mailContentPart, AppConstant.mailContentPart + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        mailContentPart: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

}
