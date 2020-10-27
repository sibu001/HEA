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
    GetCustomerByIdAction,
    GetCustomerListAction,
    SaveCustomerAction,
    UpdateCustomerAction
} from './customer.action';
import { CustomerManagementModel } from './customer.model';


@State<CustomerManagementModel>({
    name: 'customerManagement',
    defaults: {
        customerList: undefined,
        customer: undefined,
        customerDataSource: undefined,
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

    @Action(GetCustomerListAction)
    getAllCustomerList(ctx: StateContext<CustomerManagementModel>, action: GetCustomerListAction): Actions {
        const force: boolean = action.force || CustomerManagementState.getCustomerList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            result = this.loginService.performGet(AppConstant.findCustomer + action.filter)
                .pipe(
                    tap((response: any) => {
                        const dataSource = Transformer.transformCustomerTableData(response, action.viewType);
                        ctx.patchState({
                            customerList: response,
                            customerDataSource: dataSource
                        });
                    },
                        error => {
                            this.utilityService.showErrorMessage(error.message);
                            ctx.dispatch(new CustomerError(error));
                        }));
        }
        return result;
    }

    @Action(GetCustomerByIdAction)
    getCustomerById(ctx: StateContext<CustomerManagementModel>, action: GetCustomerByIdAction): Actions {
        return this.loginService.performGet(AppConstant.customer + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    ctx.patchState({
                        customer: response,
                    });
                },
                    error => {
                        this.utilityService.showErrorMessage(error.message);
                        ctx.dispatch(new CustomerError(error));
                    }));
    }

    @Action(DeleteCustomerByIdAction)
    deleteCustomerById(ctx: StateContext<CustomerManagementModel>, action: DeleteCustomerByIdAction): Actions {
        return this.loginService.performDelete(AppConstant.customer + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    this.utilityService.showSuccessMessage(response.message);
                },
                    error => {
                        this.utilityService.showErrorMessage(error.message);
                        ctx.dispatch(new CustomerError(error));
                    }));
    }

    @Action(SaveCustomerAction)
    saveCustomer(ctx: StateContext<CustomerManagementModel>, action: SaveCustomerAction): Actions {
        return this.loginService.performPost(action.customer, AppConstant.customer)
            .pipe(
                tap((response: any) => {
                    this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        customer: response,
                    });
                },
                    error => {
                        this.utilityService.showErrorMessage(error.message);
                        ctx.dispatch(new CustomerError(error));
                    }));
    }

    @Action(UpdateCustomerAction)
    updateCustomer(ctx: StateContext<CustomerManagementModel>, action: UpdateCustomerAction): Actions {
        return this.loginService.performPut(action.customer, AppConstant.customer + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        customer: response,
                    });
                },
                    error => {
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
}
