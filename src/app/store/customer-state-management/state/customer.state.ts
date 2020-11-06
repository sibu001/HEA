import { Injectable } from '@angular/core';
import { Action, Actions, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/internal/operators/tap';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { Transformer } from '../transformer/transformer';
import {
    CustomerError,
    DeleteAlertByIdAction,
    DeleteCustomerByIdAction,
    DeleteCustomerEventByIdAction,
    DeleteCustomerFileByIdAction,
    DeleteStaffByIdAction,
    DeleteStaffNoteByIdAction,
    DeleteUtilityCredentialByIdAction,
    GetAlertByIdAction,
    GetAlertListAction,
    GetCustomerByIdAction,
    GetCustomerEventByIdAction,
    GetCustomerEventListAction,
    GetCustomerFileByIdAction,
    GetCustomerFileListAction,
    GetCustomerListAction,
    GetStaffByIdAction,
    GetStaffListAction,
    GetStaffNoteByIdAction,
    GetStaffNoteListAction,
    GetUtilityCredentialByIdAction,
    GetUtilityCredentialListAction,
    SaveAlertAction,
    SaveCustomerAction,
    SaveCustomerEventAction,
    SaveCustomerFileAction,
    SaveStaffAction,
    SaveStaffNoteAction,
    SaveUtilityCredentialAction,
    UpdateAlertAction,
    UpdateCustomerAction,
    UpdateCustomerEventAction,
    UpdateStaffAction,
    UpdateStaffNoteAction,
    UpdateUtilityCredentialAction
} from './customer.action';
import { CustomerManagementModel } from './customer.model';


@State<CustomerManagementModel>({
    name: 'customerManagement',
    defaults: {
        customerList: undefined,
        customer: undefined,
        customerDataSource: undefined,
        staffList: undefined,
        staff: undefined,
        utilityCredentialList: undefined,
        utilityCredentialDataSourceList: undefined,
        utilityCredential: undefined,
        customerEventList: undefined,
        customerEvent: undefined,
        alertList: undefined,
        alert: undefined,
        staffNoteList: undefined,
        staffNote: undefined,
        customerFileList: undefined,
        customerFile: undefined,
        error: undefined
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
    static getCustomerEventList(state: CustomerManagementModel): any {
        return state.customerEventList;
    }

    @Selector()
    static getCustomerEventById(state: CustomerManagementModel): any {
        return state.customerEvent;
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
                        const dataSource = Transformer.transformCustomerTableData(response, action.viewType);
                        ctx.patchState({
                            customerList: response,
                            customerDataSource: dataSource
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
                    this.utilityService.showSuccessMessage(response.message);
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
                    this.utilityService.showSuccessMessage('Save Successfully');
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

    @Action(UpdateCustomerAction)
    updateCustomer(ctx: StateContext<CustomerManagementModel>, action: UpdateCustomerAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.customer, AppConstant.customer + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Updated Successfully');
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
                        const res = Transformer.transformStaffTableData(response);
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
                    this.utilityService.showSuccessMessage('Save Successfully');
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
                    this.utilityService.showSuccessMessage('Updated Successfully');
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
                    this.utilityService.showSuccessMessage('Deleted Successfully');
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
                    this.utilityService.showSuccessMessage('Save Successfully');
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
                    this.utilityService.showSuccessMessage('Updated Successfully');
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

    @Action(DeleteCustomerEventByIdAction)
    deleteCustomerEventById(ctx: StateContext<CustomerManagementModel>, action: DeleteCustomerEventByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.customer + '/' + action.customerId + '/customerEvents/' + action.id)
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

    @Action(SaveCustomerEventAction)
    saveCustomerEvent(ctx: StateContext<CustomerManagementModel>, action: SaveCustomerEventAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.customerEvent, AppConstant.customer + '/' + action.customerId + '/customerEvents')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Save Successfully');
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
                    this.utilityService.showSuccessMessage('Updated Successfully');
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
                    this.utilityService.showSuccessMessage('Deleted Successfully');
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
                    this.utilityService.showSuccessMessage('Save Successfully');
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
                    this.utilityService.showSuccessMessage('Updated Successfully');
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
                    this.utilityService.showSuccessMessage('Deleted SuccessFully');
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
                    this.utilityService.showSuccessMessage('Save Successfully');
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
                    this.utilityService.showSuccessMessage('Updated Successfully');
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
        return this.loginService.performGet(AppConstant.customer + '/' + action.customerId + '/customerNotes')
            .pipe(
                tap((response: any) => {
                    // const res = Transformer.transformStaffTableData(response);
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        staffNoteList: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                        ctx.dispatch(new CustomerError(error));
                    }));
    }

    @Action(GetCustomerFileByIdAction)
    getCustomerFileById(ctx: StateContext<CustomerManagementModel>, action: GetCustomerFileByIdAction): Actions {
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

    @Action(DeleteCustomerFileByIdAction)
    deleteCustomerFileById(ctx: StateContext<CustomerManagementModel>, action: DeleteCustomerFileByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.customer + '/' + action.customerId + '/customerNotes/' + action.id)
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

    @Action(SaveCustomerFileAction)
    saveCustomerFile(ctx: StateContext<CustomerManagementModel>, action: SaveCustomerFileAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPostMultiPartDataPost(action.customerFile, AppConstant.customer + '/' + action.customerId + '/customerNotes')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        staffNote: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.message);
                    }));
    }
}
