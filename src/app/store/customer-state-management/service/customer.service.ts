import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
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

  getUtilityCredentialList(): Observable<any> {
    return this.store.select(CustomerManagementState.getUtilityCredentialList);
  }

  getUtilityCredentialDataSourceList(): Observable<any> {
    return this.store.select(CustomerManagementState.getUtilityCredentialDataSourceList);
  }


  getUtilityCredentialById(): Observable<any> {
    return this.store.select(CustomerManagementState.getUtilityCredentialById);
  }

  getCustomerEventList(): Observable<any> {
    return this.store.select(CustomerManagementState.getCustomerEventList);
  }

  getCustomerEventById(): Observable<any> {
    return this.store.select(CustomerManagementState.getCustomerEventById);
  }

  getAlertList(): Observable<any> {
    return this.store.select(CustomerManagementState.getAlertList);
  }

  getAlertById(): Observable<any> {
    return this.store.select(CustomerManagementState.getAlertById);
  }

  getStaffNoteList(): Observable<any> {
    return this.store.select(CustomerManagementState.getStaffNoteList);
  }

  getStaffNoteById(): Observable<any> {
    return this.store.select(CustomerManagementState.getStaffNoteById);
  }

  getCustomerFileList(): Observable<any> {
    return this.store.select(CustomerManagementState.getCustomerFileList);
  }

  getCustomerFileById(): Observable<any> {
    return this.store.select(CustomerManagementState.getCustomerFileById);
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

  loadUtilityCredentialList(customerId: any): Observable<CustomerManagementState> {
    return this.store.dispatch(new GetUtilityCredentialListAction(customerId));
  }

  loadUtilityCredentialById(customerId: any, id: number): Observable<CustomerManagementState> {
    return this.store.dispatch(new GetUtilityCredentialByIdAction(customerId, id));
  }

  saveUtilityCredential(customerId: any, utilityCredential: any): Observable<CustomerManagementState> {
    return this.store.dispatch(new SaveUtilityCredentialAction(customerId, utilityCredential));
  }

  updateUtilityCredential(customerId: any, id: number, utilityCredential: any): Observable<CustomerManagementState> {
    return this.store.dispatch(new UpdateUtilityCredentialAction(customerId, id, utilityCredential));
  }

  deleteUtilityCredentialById(customerId: any, id: number): Observable<CustomerManagementState> {
    return this.store.dispatch(new DeleteUtilityCredentialByIdAction(customerId, id));
  }

  loadCustomerEventList(customerId: any): Observable<CustomerManagementState> {
    return this.store.dispatch(new GetCustomerEventListAction(customerId));
  }

  loadCustomerEventById(customerId: any, id: number): Observable<CustomerManagementState> {
    return this.store.dispatch(new GetCustomerEventByIdAction(customerId, id));
  }

  saveCustomerEvent(customerId: any, customerEvent: any): Observable<CustomerManagementState> {
    return this.store.dispatch(new SaveCustomerEventAction(customerId, customerEvent));
  }

  updateCustomerEvent(customerId: any, id: number, customerEvent: any): Observable<CustomerManagementState> {
    return this.store.dispatch(new UpdateCustomerEventAction(customerId, id, customerEvent));
  }

  deleteCustomerEventById(customerId: any, id: number): Observable<CustomerManagementState> {
    return this.store.dispatch(new DeleteCustomerEventByIdAction(customerId, id));
  }

  loadAlertList(customerId: any): Observable<CustomerManagementState> {
    return this.store.dispatch(new GetAlertListAction(customerId));
  }

  loadAlertById(customerId: any, id: number): Observable<CustomerManagementState> {
    return this.store.dispatch(new GetAlertByIdAction(customerId, id));
  }

  saveAlert(customerId: any, alert: any): Observable<CustomerManagementState> {
    return this.store.dispatch(new SaveAlertAction(customerId, alert));
  }

  updateAlert(customerId: any, id: number, alert: any): Observable<CustomerManagementState> {
    return this.store.dispatch(new UpdateAlertAction(customerId, id, alert));
  }

  deleteAlertById(customerId: any, id: number): Observable<CustomerManagementState> {
    return this.store.dispatch(new DeleteAlertByIdAction(customerId, id));
  }

  loadStaffNoteList(customerId: any): Observable<CustomerManagementState> {
    return this.store.dispatch(new GetStaffNoteListAction(customerId));
  }

  loadStaffNoteById(customerId: any, id: number): Observable<CustomerManagementState> {
    return this.store.dispatch(new GetStaffNoteByIdAction(customerId, id));
  }

  saveStaffNote(customerId: any, staffNote: any): Observable<CustomerManagementState> {
    return this.store.dispatch(new SaveStaffNoteAction(customerId, staffNote));
  }

  updateStaffNote(customerId: any, id: number, staffNote: any): Observable<CustomerManagementState> {
    return this.store.dispatch(new UpdateStaffNoteAction(customerId, id, staffNote));
  }

  deleteStaffNoteById(customerId: any, id: number): Observable<CustomerManagementState> {
    return this.store.dispatch(new DeleteStaffNoteByIdAction(customerId, id));
  }

  loadCustomerFileList(customerId: any): Observable<CustomerManagementState> {
    return this.store.dispatch(new GetCustomerFileListAction(customerId));
  }

  loadCustomerFileById(customerId: any, id: number): Observable<CustomerManagementState> {
    return this.store.dispatch(new GetCustomerFileByIdAction(customerId, id));
  }

  saveCustomerFile(customerId: any, customerFile: any): Observable<CustomerManagementState> {
    return this.store.dispatch(new SaveCustomerFileAction(customerId, customerFile));
  }

  deleteCustomerFileById(customerId: any, id: number): Observable<CustomerManagementState> {
    return this.store.dispatch(new DeleteCustomerFileByIdAction(customerId, id));
  }
}
