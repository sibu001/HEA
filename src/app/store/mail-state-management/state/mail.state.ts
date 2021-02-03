import { Injectable } from '@angular/core';
import { Action, Actions, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/internal/operators/tap';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { CustomerError } from '../../customer-state-management/state/customer.action';
import { MailTransformer } from '../transformer/transformer';
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
    UpdateMailContentPartAction,
    GetCustomerGroupListByMailDescriptionIdAction,
    DeleteMailDescriptionCustomerGroupAction,
    AssignCustomerGroupToMailDescriptionAction,
    DeleteCustomerGroupMailPartByIdAction,
    GetCustomerGroupMailPartByIdAction,
    GetCustomerGroupMailPartCountAction,
    GetCustomerGroupMailPartListAction,
    SaveCustomerGroupMailPartAction,
    UpdateCustomerGroupMailPartAction,
    GetMailDescriptionCountAction,
    GenerateEmbedImageAction,
    MailDescriptionProcessAction
} from './mail.action';
import { MailManagementModel } from './mail.model';


@State<MailManagementModel>({
    name: 'mailManagement',
    defaults: {
        mailContentPartList: undefined,
        mailContentPartCount: undefined,
        mailContentPart: undefined,
        contextVariableList: undefined,
        contextVariable: undefined,
        mailDescriptionList: undefined,
        mailDescriptionCount: undefined,
        mailDescriptionDataSourceList: undefined,
        mailDescription: undefined,
        mailDescriptionCustomerGroupList: undefined,
        mailEmbedImage: undefined,
        customerGroupMailPartList: undefined,
        customerGroupMailPart: undefined,
        customerGroupMailPartCount: undefined
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

    @Selector()
    static getCustomerGroupMailPartList(state: MailManagementModel): any {
        return state.customerGroupMailPartList;
    }

    @Selector()
    static getCustomerGroupMailPartById(state: MailManagementModel): any {
        return state.customerGroupMailPart;
    }


    @Action(GetMailDescriptionListAction)
    getAllMailDescriptionList(ctx: StateContext<MailManagementModel>, action: GetMailDescriptionListAction): Actions {
        const force: boolean = action.force || MailManagementState.getMailDescriptionList(ctx.getState()) === undefined;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            return this.loginService.performGetWithParams(AppConstant.mailDescription, action.filter)
                .pipe(
                    tap((response: any) => {
                        const res = MailTransformer.transformMailDescription(response, action.filter);
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            mailDescriptionList: res,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.message);
                            ctx.dispatch(new CustomerError(error));
                        }));
        }
    }

    @Action(GetMailDescriptionCountAction)
    getAllMailDescriptionCount(ctx: StateContext<MailManagementModel>, action: GetMailDescriptionCountAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGetWithParams(AppConstant.mailDescription + '/count', action.filter)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        mailContentPartCount: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.errorMessage);
                    }));

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
                    // this.utilityService.showSuccessMessage(response.message);
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
                    // this.utilityService.showSuccessMessage('Save Successfully');
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
                    // this.utilityService.showSuccessMessage('Updated Successfully');
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
        return this.loginService.performGet(AppConstant.mailDescription + '/' + action.mailDescriptionId + '/' + AppConstant.contextVariable)
            .pipe(
                tap((response: any) => {
                    const res = MailTransformer.transformContextVariableTableData(response);
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        contextVariableList: res,
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
        return this.loginService.performGet(AppConstant.mailDescription + '/' + action.mailDescriptionId + '/' + AppConstant.contextVariable + '/' + action.mailVariableId)
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
        return this.loginService.performDelete(AppConstant.mailDescription + '/' + action.mailDescriptionId + '/' + AppConstant.contextVariable + '/' + action.mailVariableId)
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

    @Action(SaveContextVariableAction)
    saveContextVariable(ctx: StateContext<MailManagementModel>, action: SaveContextVariableAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.contextVariableObj, AppConstant.mailDescription + '/' + action.mailDescriptionId + '/' + AppConstant.contextVariable)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
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
        return this.loginService.performPut(action.contextVariableObj, AppConstant.mailDescription + '/' + action.mailDescriptionId + '/' + AppConstant.contextVariable + '/' + action.mailVariableId)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
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
        return this.loginService.performGet(AppConstant.mailDescription + '/' + action.mailDescriptionId + '/' + AppConstant.mailContentPart)
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
        return this.loginService.performGet(AppConstant.mailDescription + '/' + action.mailDescriptionId + '/' + AppConstant.mailContentPart + '/' + action.mailContentId)
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
        return this.loginService.performDelete(AppConstant.mailDescription + '/' + action.mailDescriptionId + '/' + AppConstant.mailContentPart + '/' + action.mailContentId)
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

    @Action(SaveMailContentPartAction)
    saveMailContentPart(ctx: StateContext<MailManagementModel>, action: SaveMailContentPartAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.mailContentObj, AppConstant.mailDescription + '/' + action.mailDescriptionId + '/' + AppConstant.mailContentPart)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
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
        return this.loginService.performPut(action.mailContentObj, AppConstant.mailDescription + '/' + action.mailDescriptionId + '/' + AppConstant.mailContentPart + '/' + action.mailContentId)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        mailContentPart: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(GenerateEmbedImageAction)
    generateEmbedImage(ctx: StateContext<MailManagementModel>, action: GenerateEmbedImageAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPostMultiPartFromData(action.fileObj,
            AppConstant.mailDescription + '/' + action.mailDescriptionId + '/' + AppConstant.mailContentPart + '/' + action.mailContentId + '/' + AppConstant.generateEmbedImage, action.params)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        mailEmbedImage: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(MailDescriptionProcessAction)
    mailDescriptionProcess(ctx: StateContext<MailManagementModel>, action: MailDescriptionProcessAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost('', AppConstant.mailDescription + '/' + action.mailDescriptionId + '/' + AppConstant.mailDescriptionProcess)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(GetCustomerGroupListByMailDescriptionIdAction)
    getCustomerGroupListByMailDescriptionId(ctx: StateContext<MailManagementModel>, action: GetCustomerGroupListByMailDescriptionIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.mailDescription + '/' + action.mailDescriptionId + '/' + AppConstant.customerGroups)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        mailDescriptionCustomerGroupList: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }


    @Action(DeleteMailDescriptionCustomerGroupAction)
    deleteCustomerGroupListByMailDescriptionId(ctx: StateContext<MailManagementModel>, action: DeleteMailDescriptionCustomerGroupAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.mailDescription + '/' + action.mailDescriptionId + '/' + AppConstant.customerGroups + '/' + action.groupCode)
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

    @Action(AssignCustomerGroupToMailDescriptionAction)
    saveCustomerGroupListByMailDescriptionId(ctx: StateContext<MailManagementModel>, action: AssignCustomerGroupToMailDescriptionAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPostWithParam('', AppConstant.mailDescription + '/' + action.mailDescriptionId + '/' + AppConstant.customerGroups + '/' + action.groupCode, action.params)
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

    @Action(GetCustomerGroupMailPartListAction)
    getAllCustomerGroupMailPartList(ctx: StateContext<MailManagementModel>, action: GetCustomerGroupMailPartListAction): Actions {
        const force: boolean = action.force || MailManagementState.getCustomerGroupMailPartList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.customerGroupMailPart, action.filter)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        const res = MailTransformer.transformCustomerGroupMailPartTableData(response, action.filter);
                        ctx.patchState({
                            customerGroupMailPartList: res,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.message);
                        }));
        }
        return result;
    }

    @Action(GetCustomerGroupMailPartCountAction)
    getCustomerGroupMailPartCount(ctx: StateContext<MailManagementModel>, action: GetCustomerGroupMailPartCountAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGetWithParams(AppConstant.customerGroupMailPart + '/count', action.filter)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        customerGroupMailPartCount: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.errorMessage);
                    }));

    }

    @Action(GetCustomerGroupMailPartByIdAction)
    getCustomerGroupMailPartById(ctx: StateContext<MailManagementModel>, action: GetCustomerGroupMailPartByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customerGroupMailPart + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        customerGroupMailPart: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(DeleteCustomerGroupMailPartByIdAction)
    deleteCustomerGroupMailPartById(ctx: StateContext<MailManagementModel>, action: DeleteCustomerGroupMailPartByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.customerGroupMailPart + '/' + action.id)
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

    @Action(SaveCustomerGroupMailPartAction)
    saveCustomerGroupMailPart(ctx: StateContext<MailManagementModel>, action: SaveCustomerGroupMailPartAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.customerGroupMailPart, AppConstant.customerGroupMailPart)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        customerGroupMailPart: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(UpdateCustomerGroupMailPartAction)
    updateCustomerGroupMailPart(ctx: StateContext<MailManagementModel>, action: UpdateCustomerGroupMailPartAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.customerGroupMailPart, AppConstant.customerGroupMailPart + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        customerGroupMailPart: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

}
