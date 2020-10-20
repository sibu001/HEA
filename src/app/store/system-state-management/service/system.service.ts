import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  GetCoachUserListAction,
  GetCredentialTypeListAction,
  GetCustomerAlertTypeListAction,
  GetCustomerGroupListAction,
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

  getViewConfigurationList(): Observable<any> {
    return this.store.select(SystemManagementState.getViewConfigurationList);
  }

  getProgramGroupList(): Observable<any> {
    return this.store.select(SystemManagementState.getProgramGroupList);
  }

  getCustomerAlertTypeList(): Observable<any> {
    return this.store.select(SystemManagementState.getCustomerAlertTypeList);
  }

  getCredentialTypeList(): Observable<any> {
    return this.store.select(SystemManagementState.getCredentialTypeList);
  }

  getCoachUserList(): Observable<any> {
    return this.store.select(SystemManagementState.getCoachUserList);
  }

  loadCustomerGroupList(force: boolean): Observable<SystemManagementState> {
    return this.store.dispatch(new GetCustomerGroupListAction(force));
  }

  loadViewConfigurationList(force: boolean): Observable<SystemManagementState> {
    return this.store.dispatch(new GetViewConfigurationListAction(force));
  }

  loadProgramGroupsList(force: boolean): Observable<SystemManagementState> {
    return this.store.dispatch(new GetProgramGroupListAction(force));
  }

  loadGetCustomerAlertTypeList(force: boolean): Observable<SystemManagementState> {
    return this.store.dispatch(new GetCustomerAlertTypeListAction(force));
  }
  loadCredentialTypeList(force: boolean): Observable<SystemManagementState> {
    return this.store.dispatch(new GetCredentialTypeListAction(force));
  }
  loadCoachUserList(force: boolean, filter: string): Observable<SystemManagementState> {
    return this.store.dispatch(new GetCoachUserListAction(force, filter));
  }

}
