import { Injectable } from '@angular/core';
import { Action, Actions, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/internal/operators/tap';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { Transformer } from '../transformer/transformer';
import {
    AssignRoleToUserAction,
    ClearCustomerValueCacheAction,
    CustomerError,
    DeleteAlertByIdAction,
    DeleteCustomerByIdAction,
    DeleteCustomerEventByIdAction,
    DeleteCustomerFileByIdAction,
    DeleteOptOutByIdAction,
    DeleteStaffByIdAction,
    DeleteStaffNoteByIdAction,
    DeleteUserCustomerGroupByIdAction,
    DeleteUserRoleAction,
    DeleteUtilityCredentialByIdAction,
    GetAlertByIdAction,
    GetAlertListAction,
    GetCustomerByIdAction,
    GetCustomerEventByIdAction,
    GetCustomerEventListAction,
    GetCustomerEventListByCodeAction,
    GetCustomerFileByIdAction,
    GetCustomerFileListAction,
    GetCustomerListAction,
    GetCustomerViewConfigurationListAction,
    GetElectricityRatePlanAction,
    GetEmailSettingListAction,
    GetHeatingRatePlanAction,
    GetOptOutByIdAction,
    GetOptOutListAction,
    GetPasswordValidationRuleAction,
    GetRoleListByUserIdAction,
    GetStaffByIdAction,
    GetStaffListAction,
    GetStaffNoteByIdAction,
    GetStaffNoteListAction,
    GetUserCustomerGroupByIdAction,
    GetUserCustomerGroupListAction,
    GetUtilityCredentialByIdAction,
    GetUtilityCredentialListAction,
    GetValidateNewPasswordAction,
    GetWeatherStationByCustomerIdAction,
    RecalculateCustomerVariableAction,
    ReorderCustomerBillAction,
    RescrapeCustomerUsageAction,
    RescrapeCustomerBillsAction,
    SaveAlertAction,
    SaveCustomerAction,
    SaveCustomerEventAction,
    SaveCustomerFileAction,
    SaveCustomerUsingFileAction,
    SaveOptOutAction,
    SaveStaffAction,
    SaveStaffNoteAction,
    SaveUserCustomerGroupAction,
    SaveUtilityCredentialAction,
    SaveValidateNewPasswordAction,
    SendActivationMailMessageAction,
    SetNewPasswordAction,
    UpdateAlertAction,
    UpdateCustomerAction,
    UpdateCustomerEventAction,
    UpdateCustomerFileAction,
    UpdateStaffAction,
    UpdateStaffNoteAction,
    UpdateUtilityCredentialAction,
    ValidateUtilityCredentialDataAction,
    OpenUtilityCredentialsAction,
    UsagePointsAction,
    OpenUtilityCredentialsByIdAction
} from './customer.action';
import { CustomerManagementModel } from './customer.model';


@State<CustomerManagementModel>({
    name: 'customerManagement',
    defaults: {
        customerList: undefined,
        customerViewConfigurationList: undefined,
        customer: undefined,
        customerDataSource: undefined,
        staffList: undefined,
        staff: undefined,
        utilityCredentialList: undefined,
        utilityCredentialDataSourceList: undefined,
        utilityCredential: undefined,
        customerEventList: undefined,
        customerEventListByCode: undefined,
        customerEvent: undefined,
        alertList: undefined,
        alert: undefined,
        staffNoteList: undefined,
        staffNote: undefined,
        emailSettingList: undefined,
        customerFileList: undefined,
        customerFile: undefined,
        clearCustomerValueCache: undefined,
        recalculateCustomerVariable: undefined,
        reorderCustomerBill: undefined,
        rescrapeCustomerUsage: undefined,
        sendActivationMail: undefined,
        validateCustomerData: undefined,
        passwordValidationRule: undefined,
        saveValidatePassword: undefined,
        setNewPassword: undefined,
        validateNewPassword: undefined,
        roleListByUserId: undefined,
        userCustomerGroupList: undefined,
        userCustomerGroup: undefined,
        optOutList: undefined,
        optOut: undefined,
        electricityRatePlan: undefined,
        heatingRatePlan: undefined,
        weatherStation: undefined,
        error: undefined,
        openedUtilityCredential : undefined,
        usagePoints : undefined,
        openedUtilityCredentialById : undefined
    }
})

@Injectable()
export class CustomerManagementState {

    constructor(private readonly loginService: LoginService, private readonly utilityService: UtilityService) { }

    @Selector()
    static getCustomerList(state: CustomerManagementModel): any {
        return state.customerList;
    }

    @Selector()
    static getCustomerViewConfigurationList(state: CustomerManagementModel): any {
        return state.customerViewConfigurationList;
    }

    @Selector()
    static getCustomerDataSource(state: CustomerManagementModel): any {
        return state.customerDataSource;
    }

    @Selector()
    static getCustomerById(state: CustomerManagementModel): any {
        return state.customer;
    }

    @Selector()
    static getStaffList(state: CustomerManagementModel): any {
        return state.staffList;
    }

    @Selector()
    static getStaffById(state: CustomerManagementModel): any {
        return state.staff;
    }

    @Selector()
    static getUtilityCredentialList(state: CustomerManagementModel): any {
        return state.utilityCredentialList;
    }

    @Selector()
    static getUtilityCredentialDataSourceList(state: CustomerManagementModel): any {
        return state.utilityCredentialDataSourceList;
    }

    @Selector()
    static getUtilityCredentialById(state: CustomerManagementModel): any {
        return state.utilityCredential;
    }

    @Selector()
    static getOpenedUtiliyCredentials(state: CustomerManagementModel) : any{
        return state.openedUtilityCredential;
    }

    @Selector()
    static getOpenedUtiliyCredentialsById(state : CustomerManagementModel) : any{
        return state.openedUtilityCredentialById;
    }

    @Selector()
    static getCustomerEventList(state: CustomerManagementModel): any {
        return state.customerEventList;
    }

    @Selector()
    static getCustomerEventById(state: CustomerManagementModel): any {
        return state.customerEvent;
    }

    @Selector()
    static getCustomerEventListByCode(state: CustomerManagementModel): any {
        return state.customerEventListByCode;
    }

    @Selector()
    static getAlertList(state: CustomerManagementModel): any {
        return state.alertList;
    }

    @Selector()
    static getAlertById(state: CustomerManagementModel): any {
        return state.alert;
    }

    @Selector()
    static getStaffNoteList(state: CustomerManagementModel): any {
        return state.staffNoteList;
    }

    @Selector()
    static getStaffNoteById(state: CustomerManagementModel): any {
        return state.staffNote;
    }

    @Selector()
    static getCustomerFileList(state: CustomerManagementModel): any {
        return state.customerFileList;
    }

    @Selector()
    static getCustomerFileById(state: CustomerManagementModel): any {
        return state.customerFile;
    }

    @Selector()
    static getEmailSettingList(state: CustomerManagementModel): any {
        return state.emailSettingList;
    }

    @Selector()
    static getPasswordValidationRule(state: CustomerManagementModel): any {
        return state.passwordValidationRule;
    }

    @Selector()
    static getValidateNewPassword(state: CustomerManagementModel): any {
        return state.validateNewPassword;
    }

    @Selector()
    static getSaveValidatePassword(state: CustomerManagementModel): any {
        return state.saveValidatePassword;
    }

    @Selector()
    static getSetNewPassword(state: CustomerManagementModel): any {
        return state.setNewPassword;
    }

    @Selector()
    static getUserCustomerGroupList(state: CustomerManagementModel): any {
        return state.userCustomerGroupList;
    }

    @Selector()
    static getUsagePoints(state: CustomerManagementModel): any {
        return state.usagePoints;
    }

    @Selector()
    static getOptOutList(state: CustomerManagementModel): any {
        return state.optOutList;
    }

    @Selector()
    static getOptOut(state: CustomerManagementModel): any {
        return state.optOut;
    }

    @Selector()
    static getElectricityRatePlan(state: CustomerManagementModel): any {
        return state.electricityRatePlan;
    }

    @Selector()
    static getHeatingRatePlan(state: CustomerManagementModel): any {
        return state.heatingRatePlan;
    }

    @Selector()
    static getWeatherStationByCustomerId(state: CustomerManagementModel): any {
        return state.weatherStation;
    }

    @Action(GetCustomerListAction)
    getAllCustomerList(ctx: StateContext<CustomerManagementModel>, action: GetCustomerListAction): Actions {
        const force: boolean = action.force || CustomerManagementState.getCustomerList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.findCustomer, action.filter)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            customerList: response,
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


    @Action(GetCustomerViewConfigurationListAction)
    getCustomerViewConfigurationList(ctx: StateContext<CustomerManagementModel>, action: GetCustomerViewConfigurationListAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGetWithParams(AppConstant.customer + '/' + AppConstant.viewConfigurations + '/' + action.viewConfigurationId, action.filter)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        customerViewConfigurationList: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                        ctx.dispatch(new CustomerError(error));
                    }));
    }

    @Action(GetCustomerByIdAction)
    getCustomerById(ctx: StateContext<CustomerManagementModel>, action: GetCustomerByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customer + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        customer: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                        ctx.dispatch(new CustomerError(error));
                    }));
    }

    @Action(DeleteCustomerByIdAction)
    deleteCustomerById(ctx: StateContext<CustomerManagementModel>, action: DeleteCustomerByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.customer + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage(response.message);
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                        ctx.dispatch(new CustomerError(error));
                    }));
    }

    @Action(SaveCustomerAction)
    saveCustomer(ctx: StateContext<CustomerManagementModel>, action: SaveCustomerAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.customer, AppConstant.customer)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        customer: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                        ctx.dispatch(new CustomerError(error));
                    }));
    }

    @Action(SaveCustomerUsingFileAction)
    saveCustomerUsingFile(ctx: StateContext<CustomerManagementModel>, action: SaveCustomerUsingFileAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPostMultiPartFromData(action.customer, AppConstant.customer + '/files/newCustomers')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    if (response.errorMessage) {
                        this.utilityService.showSuccessMessage(response.errorMessage);
                    } else {
                        // this.utilityService.showSuccessMessage('Save Successfully');
                    }
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(UpdateCustomerAction)
    updateCustomer(ctx: StateContext<CustomerManagementModel>, action: UpdateCustomerAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.customer, AppConstant.customer + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        customer: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                        ctx.dispatch(new CustomerError(error));
                    }));
    }

    @Action(ClearCustomerValueCacheAction)
    clearCustomerValueCache(ctx: StateContext<CustomerManagementModel>, action: ClearCustomerValueCacheAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost('', AppConstant.customer + '/' + action.customerId + '/' + AppConstant.clearCustomerValueCache)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Clear Value Cache Successfully');
                    ctx.patchState({
                        clearCustomerValueCache: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                        ctx.dispatch(new CustomerError(error));
                    }));
    }

    @Action(RecalculateCustomerVariableAction)
    recalculateCustomerVariable(ctx: StateContext<CustomerManagementModel>, action: RecalculateCustomerVariableAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost('', AppConstant.customer + '/' + action.customerId + '/' + AppConstant.recalculateVariables)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Recalculate Successfully');
                    ctx.patchState({
                        recalculateCustomerVariable: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                        ctx.dispatch(new CustomerError(error));
                    }));
    }

    @Action(RescrapeCustomerUsageAction)
    rescrapeCustomerUsage(ctx: StateContext<CustomerManagementModel>, action: RescrapeCustomerUsageAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPostWithParam('', AppConstant.customer + '/' + action.customerId + '/' + AppConstant.credentials + '/' + action.credentialId + '/' + AppConstant.rescrapeCustomerUsage, action.params)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Rescrape  Successfully');
                    ctx.patchState({
                        rescrapeCustomerUsage: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                        ctx.dispatch(new CustomerError(error));
                    }));
    }

    @Action(RescrapeCustomerBillsAction)
    rescrapeCustomerBills(ctx: StateContext<CustomerManagementModel>, action: RescrapeCustomerBillsAction): Actions {
        // document.getElementById('loader').classList.add('loading');
        return this.loginService.performPostWithParam('', AppConstant.customer + '/' + action.customerId + '/' + AppConstant.credentials + '/' + action.credentialId + '/' + AppConstant.meters + '/' + action.smartMeterId + '/' + AppConstant.rescrapeCustomerBills, action.params)
            .pipe(
                tap((response: any) => {
                    // document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Bills Rescrape  Successfully');
                    ctx.patchState({
                        rescrapeCustomerUsage: response,
                    });
                },
                    error => {
                        // document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                        ctx.dispatch(new CustomerError(error));
                    }));
    }

    @Action(ValidateUtilityCredentialDataAction)
    validateUtilityCredentialData(ctx: StateContext<CustomerManagementModel>, action: ValidateUtilityCredentialDataAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost('', AppConstant.customer + '/' + action.customerId + '/' + AppConstant.credentials + '/' + action.credentialId + '/' + AppConstant.validateUtilityData)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        validateCustomerData: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                        ctx.dispatch(new CustomerError(error));
                    }));
    }

    @Action(CustomerError)
    loadCustomerGroupError(ctx: StateContext<CustomerManagementModel>, action: CustomerError): void {
        /* istanbul ignore next */
        ctx.patchState({
            error: action.error,
            customerList: undefined
        });
    }

    @Action(GetStaffListAction)
    getAllStaffList(ctx: StateContext<CustomerManagementModel>, action: GetStaffListAction): Actions {
        const force: boolean = action.force || CustomerManagementState.getStaffList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.users, action.filter)
                .pipe(
                    tap((response: any) => {
                        const res = Transformer.transformStaffTableData(response, action.filter);
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            staffList: res,
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

    @Action(GetStaffByIdAction)
    getStaffById(ctx: StateContext<CustomerManagementModel>, action: GetStaffByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.users + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        staff: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(DeleteStaffByIdAction)
    deleteStaffById(ctx: StateContext<CustomerManagementModel>, action: DeleteStaffByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.users + '/' + action.id)
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

    @Action(SaveStaffAction)
    saveStaff(ctx: StateContext<CustomerManagementModel>, action: SaveStaffAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.staff, AppConstant.users)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        staff: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(UpdateStaffAction)
    updateStaff(ctx: StateContext<CustomerManagementModel>, action: UpdateStaffAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.staff, AppConstant.users + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        staff: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(GetUtilityCredentialListAction)
    getAllUtilityCredentialList(ctx: StateContext<CustomerManagementModel>, action: GetUtilityCredentialListAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customer + '/' + action.customerId + '/credentials')
            .pipe(
                tap((response: any) => {
                    const res = Transformer.transformUtilityCredentialTableData(response);
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        utilityCredentialList: response,
                        utilityCredentialDataSourceList: res
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                        ctx.dispatch(new CustomerError(error));
                    }));
    }

    @Action(OpenUtilityCredentialsAction)
    getOpnedUtilityCredentialById(ctx: StateContext<CustomerManagementModel>, action: OpenUtilityCredentialsAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet("customers/smd/" +action.customerId + "/" + action.subscriptionId)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        openedUtilityCredential: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(OpenUtilityCredentialsByIdAction)
    getOpenUtilityCredentialsByIdAction(ctx: StateContext<CustomerManagementModel>, action: OpenUtilityCredentialsByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet("customers/" +action.customerId + "/credentials/" + action.credendtiaId)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        openedUtilityCredentialById: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(UsagePointsAction)
    loadUsagePointsAction(ctx :StateContext<CustomerManagementModel> , action : UsagePointsAction) : Actions{
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet("usagePoints/" +action.customerCredentialsCode + "/" + action.subscriptionId)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        usagePoints: response.data,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(GetUtilityCredentialByIdAction)
    getUtilityCredentialById(ctx: StateContext<CustomerManagementModel>, action: GetUtilityCredentialByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customer + '/' + action.customerId + '/credentials/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        utilityCredential: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(DeleteUtilityCredentialByIdAction)
    deleteUtilityCredentialById(ctx: StateContext<CustomerManagementModel>, action: DeleteUtilityCredentialByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.customer + '/' + action.customerId + '/credentials/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    //  this.utilityService.showSuccessMessage('Deleted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(SaveUtilityCredentialAction)
    saveUtilityCredential(ctx: StateContext<CustomerManagementModel>, action: SaveUtilityCredentialAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.utilityCredential, AppConstant.customer + '/' + action.customerId + '/credentials')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        utilityCredential: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(UpdateUtilityCredentialAction)
    updateUtilityCredential(ctx: StateContext<CustomerManagementModel>, action: UpdateUtilityCredentialAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.utilityCredential, AppConstant.customer + '/' + action.customerId + '/credentials/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        utilityCredential: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(GetCustomerEventListAction)
    getAllCustomerEventList(ctx: StateContext<CustomerManagementModel>, action: GetCustomerEventListAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customer + '/' + action.customerId + '/customerEvents')
            .pipe(
                tap((response: any) => {
                    const res = Transformer.transformCustomerEventTableData(response);
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        customerEventList: res,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                        ctx.dispatch(new CustomerError(error));
                    }));
    }

    @Action(GetCustomerEventByIdAction)
    getCustomerEventById(ctx: StateContext<CustomerManagementModel>, action: GetCustomerEventByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customer + '/' + action.customerId + '/customerEvents/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        customerEvent: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(GetCustomerEventListByCodeAction)
    getCustomerEventListByCode(ctx: StateContext<CustomerManagementModel>, action: GetCustomerEventListByCodeAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customer + '/' + action.customerId + '/customerEvents/getByCode/' + action.eventCode)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        customerEventListByCode: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(DeleteCustomerEventByIdAction)
    deleteCustomerEventById(ctx: StateContext<CustomerManagementModel>, action: DeleteCustomerEventByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.customer + '/' + action.customerId + '/customerEvents/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    //  this.utilityService.showSuccessMessage('Deleted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(SaveCustomerEventAction)
    saveCustomerEvent(ctx: StateContext<CustomerManagementModel>, action: SaveCustomerEventAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.customerEvent, AppConstant.customer + '/' + action.customerId + '/customerEvents')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        customerEvent: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(UpdateCustomerEventAction)
    updateCustomerEvent(ctx: StateContext<CustomerManagementModel>, action: UpdateCustomerEventAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.customerEvent, AppConstant.customer + '/' + action.customerId + '/customerEvents/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        customerEvent: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(GetAlertListAction)
    getAllAlertList(ctx: StateContext<CustomerManagementModel>, action: GetAlertListAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customer + '/' + action.customerId + '/customerAlerts')
            .pipe(
                tap((response: any) => {
                    const res = Transformer.transformCustomerAlertTableData(response);
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        alertList: res,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                        ctx.dispatch(new CustomerError(error));
                    }));
    }

    @Action(GetAlertByIdAction)
    getAlertById(ctx: StateContext<CustomerManagementModel>, action: GetAlertByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customer + '/' + action.customerId + '/customerAlerts/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        alert: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(DeleteAlertByIdAction)
    deleteAlertById(ctx: StateContext<CustomerManagementModel>, action: DeleteAlertByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.customer + '/' + action.customerId + '/customerAlerts/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    //  this.utilityService.showSuccessMessage('Deleted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(SaveAlertAction)
    saveAlert(ctx: StateContext<CustomerManagementModel>, action: SaveAlertAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.alert, AppConstant.customer + '/' + action.customerId + '/customerAlerts')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        alert: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(UpdateAlertAction)
    updateAlert(ctx: StateContext<CustomerManagementModel>, action: UpdateAlertAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.alert, AppConstant.customer + '/' + action.customerId + '/customerAlerts/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        alert: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(GetStaffNoteListAction)
    getAllStaffNoteList(ctx: StateContext<CustomerManagementModel>, action: GetStaffNoteListAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customer + '/' + action.customerId + '/customerNotes')
            .pipe(
                tap((response: any) => {
                    const res = Transformer.transformStaffNoteTableData(response);
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        staffNoteList: res,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                        ctx.dispatch(new CustomerError(error));
                    }));
    }

    @Action(GetStaffNoteByIdAction)
    getStaffNoteById(ctx: StateContext<CustomerManagementModel>, action: GetStaffNoteByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customer + '/' + action.customerId + '/customerNotes/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        staffNote: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(DeleteStaffNoteByIdAction)
    deleteStaffNoteById(ctx: StateContext<CustomerManagementModel>, action: DeleteStaffNoteByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.customer + '/' + action.customerId + '/customerNotes/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    //  this.utilityService.showSuccessMessage('Deleted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(SaveStaffNoteAction)
    saveStaffNote(ctx: StateContext<CustomerManagementModel>, action: SaveStaffNoteAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.staffNote, AppConstant.customer + '/' + action.customerId + '/customerNotes')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        staffNote: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(UpdateStaffNoteAction)
    updateStaffNote(ctx: StateContext<CustomerManagementModel>, action: UpdateStaffNoteAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.staffNote, AppConstant.customer + '/' + action.customerId + '/customerNotes/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        staffNote: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(GetCustomerFileListAction)
    getAllCustomerFileList(ctx: StateContext<CustomerManagementModel>, action: GetCustomerFileListAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customer + '/' + action.customerId + '/files')
            .pipe(
                tap((response: any) => {
                    const res = Transformer.transformCustomerFileTableData(response);
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        customerFileList: res,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                        //     ctx.dispatch(new CustomerError(error));
                    }));
    }

    @Action(GetCustomerFileByIdAction)
    getCustomerFileById(ctx: StateContext<CustomerManagementModel>, action: GetCustomerFileByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customer + '/' + action.customerId + '/files/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        customerFile: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(DeleteCustomerFileByIdAction)
    deleteCustomerFileById(ctx: StateContext<CustomerManagementModel>, action: DeleteCustomerFileByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.customer + '/' + action.customerId + '/file?fileName=' + action.fileName)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    //  this.utilityService.showSuccessMessage('Deleted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(SaveCustomerFileAction)
    saveCustomerFile(ctx: StateContext<CustomerManagementModel>, action: SaveCustomerFileAction): Actions {
        document.getElementById('loader').classList.add('loading');
        const formData = new FormData();
        formData.append('customerFile', action.customerFile);
        return this.loginService.performPostMultiPartFromData(formData, AppConstant.customer + '/' + action.customerId + '/files' + action.description)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        customerFile: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(UpdateCustomerFileAction)
    updateCustomerFile(ctx: StateContext<CustomerManagementModel>, action: UpdateCustomerFileAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPostWithParam('', AppConstant.customer + '/' + action.customerId + '/file/description', action.params)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        customerFile: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(GetEmailSettingListAction)
    getAllEmailSettingList(ctx: StateContext<CustomerManagementModel>, action: GetEmailSettingListAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customer + '/' + action.customerId + '/' + AppConstant.emailSetting + '?optional=true')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    const res = Transformer.transformEmailSettingTableData(response);
                    ctx.patchState({
                        emailSettingList: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }


    @Action(SendActivationMailMessageAction)
    sendActivationMailMessage(ctx: StateContext<CustomerManagementModel>, action: SendActivationMailMessageAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.mailObject, AppConstant.sendMail)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Mail Send');
                    ctx.patchState({
                        sendActivationMail: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(GetPasswordValidationRuleAction)
    getPasswordValidationRule(ctx: StateContext<CustomerManagementModel>, action: GetPasswordValidationRuleAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.passwordValidationRule)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        passwordValidationRule: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(GetValidateNewPasswordAction)
    getValidateNewPassword(ctx: StateContext<CustomerManagementModel>, action: GetValidateNewPasswordAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.validateNewPassword + '/' + action.password)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        validateNewPassword: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(SaveValidateNewPasswordAction)
    saveValidateNewPassword(ctx: StateContext<CustomerManagementModel>, action: SaveValidateNewPasswordAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPostWithParam('', AppConstant.validateNewPassword, action.params)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        saveValidatePassword: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(SetNewPasswordAction)
    setNewPassword(ctx: StateContext<CustomerManagementModel>, action: SetNewPasswordAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPutWithMultiPart({'password': action.params}, AppConstant.users + '/' + action.userId + '/' + AppConstant.saveNewPassword)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        setNewPassword: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }

    @Action(GetRoleListByUserIdAction)
    getAllRoleListByUserId(ctx: StateContext<CustomerManagementModel>, action: GetRoleListByUserIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.users + '/' + action.userId + '/' + AppConstant.roles)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        roleListByUserId: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }


    @Action(DeleteUserRoleAction)
    deleteUserRole(ctx: StateContext<CustomerManagementModel>, action: DeleteUserRoleAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.users + '/' + action.userId + '/' + AppConstant.roles + '/' + action.roleCode)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    //  this.utilityService.showSuccessMessage('Deleted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(AssignRoleToUserAction)
    saveRole(ctx: StateContext<CustomerManagementModel>, action: AssignRoleToUserAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost('', AppConstant.users + '/' + action.userId + '/' + AppConstant.roles + '/' + action.roleCode)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    // ctx.patchState({
                    //     role: response,
                    // });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetUserCustomerGroupListAction)
    getAllUserCustomerGroupList(ctx: StateContext<CustomerManagementModel>, action: GetUserCustomerGroupListAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.users + '/' + action.userId + '/' + AppConstant.userCustomerGroups)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        userCustomerGroupList: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetUserCustomerGroupByIdAction)
    getUserCustomerGroupById(ctx: StateContext<CustomerManagementModel>, action: GetUserCustomerGroupByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.users + '/' + action.userId + '/' + AppConstant.userCustomerGroups + '/' + action.customerGroupId)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        userCustomerGroup: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(DeleteUserCustomerGroupByIdAction)
    deleteUserCustomerGroup(ctx: StateContext<CustomerManagementModel>, action: DeleteUserCustomerGroupByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.users + '/' + action.userId + '/' + AppConstant.userCustomerGroups + '/' + action.customerGroupId)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    //  this.utilityService.showSuccessMessage('Deleted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(SaveUserCustomerGroupAction)
    saveUserCustomerGroup(ctx: StateContext<CustomerManagementModel>, action: SaveUserCustomerGroupAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost('', AppConstant.users + '/' + action.userId + '/' + AppConstant.userCustomerGroups + '/' + action.customerGroupId)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        userCustomerGroup: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetOptOutListAction)
    getAllOptOutList(ctx: StateContext<CustomerManagementModel>, action: GetOptOutListAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customer + '/' + action.customerId + '/' + AppConstant.optOuts)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    const res = Transformer.transformOptTableData(response);
                    ctx.patchState({
                        optOutList: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetOptOutByIdAction)
    getOptOutById(ctx: StateContext<CustomerManagementModel>, action: GetOptOutByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.customer + '/' + action.customerId + '/' + AppConstant.optOuts + '/' + action.mailDescriptionId)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        optOut: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(DeleteOptOutByIdAction)
    deleteOptOut(ctx: StateContext<CustomerManagementModel>, action: DeleteOptOutByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.customer + '/' + action.customerId + '/' + AppConstant.optOuts + '/' + action.mailDescriptionId)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    //  this.utilityService.showSuccessMessage('Deleted Successfully');

                    let optOutList = ctx.getState().optOutList;
                    let emailSettingList = ctx.getState().emailSettingList;
                    emailSettingList.find( item => item.mailDescriptionId == action.mailDescriptionId).active = true;
                    optOutList = optOutList.filter(item => item.mailDescriptionId != action.mailDescriptionId);

                    ctx.patchState({
                        optOutList : [...optOutList]
                    })
                    
                    ctx.patchState({
                        emailSettingList: [...emailSettingList]
                    })


                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(SaveOptOutAction)
    saveOptOut(ctx: StateContext<CustomerManagementModel>, action: SaveOptOutAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost('', AppConstant.customer + '/' + action.customerId + '/' + AppConstant.optOuts + '/' + action.mailDescriptionId)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    
                   let optOutList = ctx.getState().optOutList;
                   let emailSettingList = ctx.getState().emailSettingList;                   
                   const removedElementList = emailSettingList.filter(item => item.mailDescriptionId == action.mailDescriptionId);
                   optOutList.push(removedElementList[0]);

                    ctx.patchState({
                        optOutList : [...optOutList]
                    })


                    ctx.patchState({
                        optOut: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetElectricityRatePlanAction)
    getElectricityRatePlan(ctx: StateContext<CustomerManagementModel>, action: GetElectricityRatePlanAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customer + '/' + action.customerId + '/' + AppConstant.electricityRatePlan )
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        electricityRatePlan: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetHeatingRatePlanAction)
    getHeatingRatePlan(ctx: StateContext<CustomerManagementModel>, action: GetHeatingRatePlanAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customer + '/' + action.customerId + '/' + AppConstant.heatingRatePlan )
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        heatingRatePlan: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetWeatherStationByCustomerIdAction)
    getWeatherStationByCustomerId(ctx: StateContext<CustomerManagementModel>, action: GetWeatherStationByCustomerIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customer + '/' + action.customerId + '/' + AppConstant.weatherStationByCustomerId )
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        weatherStation: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(ReorderCustomerBillAction)
    reorderCustomerBills(ctx: StateContext<CustomerManagementModel>, action: ReorderCustomerBillAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost('', AppConstant.users + '/' + action.userId + '/' + AppConstant.fixUsageHistoryData)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Reorder Successfully');
                    ctx.patchState({
                        reorderCustomerBill: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                        ctx.dispatch(new CustomerError(error));
                    }));
    }

}
