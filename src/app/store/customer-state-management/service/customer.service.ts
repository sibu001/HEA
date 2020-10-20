import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetCustomerListAction } from '../state/customer.action';
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

  loadCustomerList(force: boolean, filter: string, viewType: number): Observable<CustomerManagementState> {
    return this.store.dispatch(new GetCustomerListAction(force, filter, viewType));
  }
}
