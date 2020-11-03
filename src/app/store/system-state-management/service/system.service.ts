import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  DeleteCredentialTypeByIdAction,
  DeleteCustomerAlertTypeByIdAction,
  DeleteCustomerGroupByIdAction,
  DeleteProgramGroupByIdAction,
  DeleteRoleByIdAction,
  GetCoachUserListAction,
  GetCredentialTypeByIdAction,
  GetCredentialTypeListAction,
  GetCustomerAlertTypeByIdAction,
  GetCustomerAlertTypeListAction,
  GetCustomerGroupByIdAction,
  GetCustomerGroupListAction,
  GetProgramGroupByIdAction,
  GetProgramGroupListAction,
  GetRoleByIdAction,
  GetRoleListAction,
  GetViewConfigurationListAction,
  SaveCredentialTypeAction,
  SaveCustomerAlertTypeAction,
  SaveCustomerGroupAction,
  SaveProgramGroupAction,
  SaveRoleAction,
  UpdateCredentialTypeAction,
  UpdateCustomerAlertTypeAction,
  UpdateCustomerGroupAction,
  UpdateProgramGroupAction,
  UpdateRoleAction
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

  getRoleList(): Observable<any> {
    return this.store.select(SystemManagementState.getRoleList);
  }

  getRoleById(): Observable<any> {
    return this.store.select(SystemManagementState.getRoleById);
  }

  getCoachUserList(): Observable<any> {
    return this.store.select(SystemManagementState.getCoachUserList);
  }

  loadCustomerGroupList(force: boolean, filter: any): Observable<SystemManagementState> {
    return this.store.dispatch(new GetCustomerGroupListAction(force, filter));
  }

  loadCustomerGroupById(id: number): Observable<SystemManagementState> {
    return this.store.dispatch(new GetCustomerGroupByIdAction(id));
  }

  saveCustomerGroup(customerGroup: any): Observable<SystemManagementState> {
    return this.store.dispatch(new SaveCustomerGroupAction(customerGroup));
  }

  updateCustomerGroup(id: number, customerGroup: any): Observable<SystemManagementState> {
    return this.store.dispatch(new UpdateCustomerGroupAction(id, customerGroup));
  }

  deleteCustomerGroupById(id: number): Observable<SystemManagementState> {
    return this.store.dispatch(new DeleteCustomerGroupByIdAction(id));
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

  saveProgramGroup(programGroup: any): Observable<SystemManagementState> {
    return this.store.dispatch(new SaveProgramGroupAction(programGroup));
  }

  updateProgramGroup(id: number, programGroup: any): Observable<SystemManagementState> {
    return this.store.dispatch(new UpdateProgramGroupAction(id, programGroup));
  }

  deleteProgramGroupById(id: number): Observable<SystemManagementState> {
    return this.store.dispatch(new DeleteProgramGroupByIdAction(id));
  }


  loadGetCustomerAlertTypeList(force: boolean, filter: any): Observable<SystemManagementState> {
    return this.store.dispatch(new GetCustomerAlertTypeListAction(force, filter));
  }

  loadCustomerAlertTypeById(id: number): Observable<SystemManagementState> {
    return this.store.dispatch(new GetCustomerAlertTypeByIdAction(id));
  }

  saveCustomerAlertType(customerAlertType: any): Observable<SystemManagementState> {
    return this.store.dispatch(new SaveCustomerAlertTypeAction(customerAlertType));
  }

  updateCustomerAlertType(id: number, customerAlertType: any): Observable<SystemManagementState> {
    return this.store.dispatch(new UpdateCustomerAlertTypeAction(id, customerAlertType));
  }

  deleteCustomerAlertTypeById(id: number): Observable<SystemManagementState> {
    return this.store.dispatch(new DeleteCustomerAlertTypeByIdAction(id));
  }

  loadCredentialTypeList(force: boolean, filter: string): Observable<SystemManagementState> {
    return this.store.dispatch(new GetCredentialTypeListAction(force, filter));
  }

  loadCredentialTypeById(id: string): Observable<SystemManagementState> {
    return this.store.dispatch(new GetCredentialTypeByIdAction(id));
  }

  saveCredentialType(credentialType: any): Observable<SystemManagementState> {
    return this.store.dispatch(new SaveCredentialTypeAction(credentialType));
  }

  updateCredentialType(id: number, credentialType: any): Observable<SystemManagementState> {
    return this.store.dispatch(new UpdateCredentialTypeAction(id, credentialType));
  }

  deleteCredentialTypeById(id: number): Observable<SystemManagementState> {
    return this.store.dispatch(new DeleteCredentialTypeByIdAction(id));
  }

  loadCoachUserList(force: boolean, filter: string): Observable<SystemManagementState> {
    return this.store.dispatch(new GetCoachUserListAction(force, filter));
  }

  loadRoleList(force: boolean, userId: any): Observable<SystemManagementState> {
    return this.store.dispatch(new GetRoleListAction(force, userId));
  }

  loadRoleById(id: string, userId: any): Observable<SystemManagementState> {
    return this.store.dispatch(new GetRoleByIdAction(id, userId));
  }

  saveRole(role: any, userId: any): Observable<SystemManagementState> {
    return this.store.dispatch(new SaveRoleAction(role, userId));
  }

  updateRole(id: string, role: any, userId: any): Observable<SystemManagementState> {
    return this.store.dispatch(new UpdateRoleAction(id, role, userId));
  }

  deleteRoleById(id: string, userId: any): Observable<SystemManagementState> {
    return this.store.dispatch(new DeleteRoleByIdAction(id, userId));
  }

}
