import { Injectable } from '@angular/core';
import { Action, Actions, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/internal/operators/tap';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { Transformer } from '../transformer/transformer';
import {
    CustomerError,
    DeleteCustomerByIdAction,
    DeleteStaffByIdAction,
    GetCustomerByIdAction,
    GetCustomerListAction,
    GetStaffByIdAction,
    GetStaffListAction,
    SaveCustomerAction,
    SaveStaffAction,
    UpdateCustomerAction,
    UpdateStaffAction
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
}
