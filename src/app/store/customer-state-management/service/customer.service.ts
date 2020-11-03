import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
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
} from '../state/customer.action';
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

  getStaffList(): Observable<any> {
    return this.store.select(CustomerManagementState.getStaffList);
  }

  getStaffById(): Observable<any> {
    return this.store.select(CustomerManagementState.getStaffById);
  }

  loadCustomerList(force: boolean, filter: any, viewType: number): Observable<CustomerManagementState> {
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

  loadStaffList(force: boolean, filter: any): Observable<CustomerManagementState> {
    return this.store.dispatch(new GetStaffListAction(force, filter));
  }

  loadStaffById(id: number): Observable<CustomerManagementState> {
    return this.store.dispatch(new GetStaffByIdAction(id));
  }

  saveStaff(staff: any): Observable<CustomerManagementState> {
    return this.store.dispatch(new SaveStaffAction(staff));
  }

  updateStaff(id: number, staff: any): Observable<CustomerManagementState> {
    return this.store.dispatch(new UpdateStaffAction(id, staff));
  }

  deleteStaffById(id: number): Observable<CustomerManagementState> {
    return this.store.dispatch(new DeleteStaffByIdAction(id));
  }
}
