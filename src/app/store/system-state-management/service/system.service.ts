import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  GetCoachUserListAction,
  GetCredentialTypeByIdAction,
  GetCredentialTypeListAction,
  GetCustomerAlertTypeByIdAction,
  GetCustomerAlertTypeListAction,
  GetCustomerGroupByIdAction,
  GetCustomerGroupListAction,
  GetProgramGroupByIdAction,
  GetProgramGroupListAction,
  GetViewConfigurationListAction
} from '../state/system.action';
import { SystemManagementState } from '../state/system.state';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(private readonly store: Store) { }

  getCustomerGroupList(): Observable<any> {
    return this.store.select(SystemManagementState.getCustomerGroupList);
  }

  getCustomerGroupById(): Observable<any> {
    return this.store.select(SystemManagementState.getCustomerGroupById);
  }

  getViewConfigurationList(): Observable<any> {
    return this.store.select(SystemManagementState.getViewConfigurationList);
  }

  getProgramGroupList(): Observable<any> {
    return this.store.select(SystemManagementState.getProgramGroupList);
  }

  getProgramGroupById(): Observable<any> {
    return this.store.select(SystemManagementState.getProgramGroupById);
  }

  getCustomerAlertTypeList(): Observable<any> {
    return this.store.select(SystemManagementState.getCustomerAlertTypeList);
  }

  getCustomerAlertTypeById(): Observable<any> {
    return this.store.select(SystemManagementState.getCustomerAlertTypeById);
  }

  getCredentialTypeList(): Observable<any> {
    return this.store.select(SystemManagementState.getCredentialTypeList);
  }

  getCredentialTypeById(): Observable<any> {
    return this.store.select(SystemManagementState.getCredentialTypeById);
  }

  getCoachUserList(): Observable<any> {
    return this.store.select(SystemManagementState.getCoachUserList);
  }

  loadCustomerGroupList(force: boolean): Observable<SystemManagementState> {
    return this.store.dispatch(new GetCustomerGroupListAction(force));
  }

  loadCustomerGroupById(id: number): Observable<SystemManagementState> {
    return this.store.dispatch(new GetCustomerGroupByIdAction(id));
  }

  loadViewConfigurationList(force: boolean): Observable<SystemManagementState> {
    return this.store.dispatch(new GetViewConfigurationListAction(force));
  }

  loadProgramGroupsList(force: boolean): Observable<SystemManagementState> {
    return this.store.dispatch(new GetProgramGroupListAction(force));
  }

  loadProgramGroupById(id: number): Observable<SystemManagementState> {
    return this.store.dispatch(new GetProgramGroupByIdAction(id));
  }

  loadGetCustomerAlertTypeList(force: boolean): Observable<SystemManagementState> {
    return this.store.dispatch(new GetCustomerAlertTypeListAction(force));
  }

  loadCustomerAlertTypeById(id: number): Observable<SystemManagementState> {
    return this.store.dispatch(new GetCustomerAlertTypeByIdAction(id));
  }

  loadCredentialTypeList(force: boolean, filter: string): Observable<SystemManagementState> {
    return this.store.dispatch(new GetCredentialTypeListAction(force, filter));
  }

  loadCredentialTypeById(id: string): Observable<SystemManagementState> {
    return this.store.dispatch(new GetCredentialTypeByIdAction(id));
  }

  loadCoachUserList(force: boolean, filter: string): Observable<SystemManagementState> {
    return this.store.dispatch(new GetCoachUserListAction(force, filter));
  }

}
