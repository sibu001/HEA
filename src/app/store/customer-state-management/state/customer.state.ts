import { Injectable } from '@angular/core';
import { Action, Actions, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/internal/operators/tap';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { Transformer } from '../transformer/transformer';
import { CustomerError, GetCustomerListAction } from './customer.action';
import { CustomerManagementModel } from './customer.model';


@State<CustomerManagementModel>({
    name: 'customerManagement',
    defaults: {
        customerList: undefined,
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

    @Action(GetCustomerListAction)
    getAllCustomerGroup(ctx: StateContext<CustomerManagementModel>, action: GetCustomerListAction): Actions {
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

    @Action(CustomerError)
    loadCustomerGroupError(ctx: StateContext<CustomerManagementModel>, action: CustomerError): void {
        /* istanbul ignore next */
        ctx.patchState({
            error: action.error,
            customerList: undefined
        });
    }
}
