import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeleteCustomerByIdAction, GetCustomerByIdAction, GetCustomerListAction, SaveCustomerAction, UpdateCustomerAction } from '../state/customer.action';
import { CustomerManagementState } from '../state/customer.state';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private readonly store: Store) { }

  getCustomerList(): Observable<any> {
    return this.store.select(CustomerManagementState.getCustomerList);
  }

  getCustomerDataSource(): Observable<any> {
    return this.store.select(CustomerManagementState.getCustomerDataSource);
  }

  getCustomerById(): Observable<any> {
    return this.store.select(CustomerManagementState.getCustomerById);
  }

  loadCustomerList(force: boolean, filter: string, viewType: number): Observable<CustomerManagementState> {
    return this.store.dispatch(new GetCustomerListAction(force, filter, viewType));
  }

  loadCustomerById(id: number): Observable<CustomerManagementState> {
    return this.store.dispatch(new GetCustomerByIdAction(id));
  }

  saveCustomer(customer: any): Observable<CustomerManagementState> {
    return this.store.dispatch(new SaveCustomerAction(customer));
  }

  updateCustomer(id: number, customer: any): Observable<CustomerManagementState> {
    return this.store.dispatch(new UpdateCustomerAction(id, customer));
  }

  deleteCustomerById(id: number): Observable<CustomerManagementState> {
    return this.store.dispatch(new DeleteCustomerByIdAction(id));
  }
}
