import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  AssignPlaceToCustomerGroupAction,
  AssignProgramGroupToCustomerGroupAction,
  DeleteCredentialTypeByIdAction,
  DeleteCustomerAlertTypeByIdAction,
  DeleteCustomerGroupByIdAction,
  DeletePlaceOfCustomerGroupAction,
  DeleteProgramGroupByIdAction,
  DeleteProgramGroupOfCustomerGroupAction,
  DeleteRoleByIdAction,
  GetCoachUserListAction,
  GetCredentialTypeByIdAction,
  GetCredentialTypeListAction,
  GetCustomerAlertTypeByIdAction,
  GetCustomerAlertTypeListAction,
  GetCustomerGroupByIdAction,
  GetCustomerGroupListAction,
  GetPlaceListByCustomerGroupIdAction,
  GetProgramGroupByIdAction,
  GetProgramGroupListAction,
  GetProgramGroupListByCustomerGroupIdAction,
  GetRoleByIdAction,
  GetRoleListAction,
  GetLookupValueScrapingPeriodListAction,
  GetLookupValueBatchPeriodListAction,
  GetThemesListAction,
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
  UpdateRoleAction,
  GetLookupValueScrapingUtilityListAction,
  GetLookupValueCalculationTypeListAction,
  GetLookupValueComparisonCodeListAction,
  GetLookupValueHomeOccupancyListAction,
  GetLookupValueHomeTypeListAction,
  GetLookupValueLotSizeListAction,
  GetReportTypeListAction,
  SetDebugConsoleData,
  GetLookupValueHomeSizeListAction
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

  getPlaceByCustomerGroupId(): Observable<any> {
    return this.store.select(SystemManagementState.getPlaceListByCustomerGroupId);
  }

  getProgramGroupByCustomerGroupId(): Observable<any> {
    return this.store.select(SystemManagementState.getProgramGroupListByCustomerGroupId);
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

  getThemeList(): Observable<any> {
    return this.store.select(SystemManagementState.getThemeList);
  }

  getBatchPeriodList(): Observable<any> {
    return this.store.select(SystemManagementState.getBatchPeriodList);
  }

  getScrapingPeriodList(): Observable<any> {
    return this.store.select(SystemManagementState.getScrapingPeriodList);
  }

  getCalculationTypeList(): Observable<any> {
    return this.store.select(SystemManagementState.getCalculationTypeList);
  }

  getScrapingUtilityList(): Observable<any> {
    return this.store.select(SystemManagementState.getScrapingUtilityList);
  }

  getReportTypeList(): Observable<any> {
    return this.store.select(SystemManagementState.getReportTypeList);
  }

  getHomeSizeList(): Observable<any> {
    return this.store.select(SystemManagementState.getHomeSizeList);
  }

  getHomeOccupancyList(): Observable<any> {
    return this.store.select(SystemManagementState.getHomeOccupancyList);
  }

  getHomeTypeList(): Observable<any> {
    return this.store.select(SystemManagementState.getHomeTypeList);
  }

  getLotSizeList(): Observable<any> {
    return this.store.select(SystemManagementState.getLotSizeList);
  }

  getComparisonCodeList(): Observable<any> {
    return this.store.select(SystemManagementState.getComparisonCodeList);
  }

  getDebugConsoleData(): Observable<any> {
    return this.store.select(SystemManagementState.getDebugConsoleData);
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

  loadPlaceListByCustomerGroupId(customerGroupId: any): Observable<SystemManagementState> {
    return this.store.dispatch(new GetPlaceListByCustomerGroupIdAction(customerGroupId));
  }

  assignPlaceToCustomerGroup(customerGroupId: any, placeCode: any): Observable<SystemManagementState> {
    return this.store.dispatch(new AssignPlaceToCustomerGroupAction(customerGroupId, placeCode));
  }

  deletePlaceOfCustomerGroup(customerGroupId: any, placeCode: any): Observable<SystemManagementState> {
    return this.store.dispatch(new DeletePlaceOfCustomerGroupAction(customerGroupId, placeCode));
  }

  loadProgramGroupListByCustomerGroupId(customerGroupId: any): Observable<SystemManagementState> {
    return this.store.dispatch(new GetProgramGroupListByCustomerGroupIdAction(customerGroupId));
  }

  assignProgramGroupToCustomerGroup(customerGroupId: any, programGroupId: any): Observable<SystemManagementState> {
    return this.store.dispatch(new AssignProgramGroupToCustomerGroupAction(customerGroupId, programGroupId));
  }

  deleteProgramGroupOfCustomerGroup(customerGroupId: any, programGroupId: any): Observable<SystemManagementState> {
    return this.store.dispatch(new DeleteProgramGroupOfCustomerGroupAction(customerGroupId, programGroupId));
  }

  loadViewConfigurationList(force: boolean): Observable<SystemManagementState> {
    return this.store.dispatch(new GetViewConfigurationListAction(force));
  }

  loadProgramGroupsList(force: boolean, filter: any): Observable<SystemManagementState> {
    return this.store.dispatch(new GetProgramGroupListAction(force, filter));
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

  loadCredentialTypeList(force: boolean, filter: any): Observable<SystemManagementState> {
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

  loadRoleList(force: boolean, params: any): Observable<SystemManagementState> {
    return this.store.dispatch(new GetRoleListAction(force, params));
  }

  loadRoleById(roleCode: string): Observable<SystemManagementState> {
    return this.store.dispatch(new GetRoleByIdAction(roleCode));
  }

  saveRole(role: any): Observable<SystemManagementState> {
    return this.store.dispatch(new SaveRoleAction(role));
  }

  updateRole(roleCode: any, role: any): Observable<SystemManagementState> {
    return this.store.dispatch(new UpdateRoleAction(roleCode, role));
  }

  deleteRoleById(roleCode: any): Observable<SystemManagementState> {
    return this.store.dispatch(new DeleteRoleByIdAction(roleCode));
  }

  loadThemesList(force: boolean): Observable<SystemManagementState> {
    return this.store.dispatch(new GetThemesListAction(force));
  }

  loadBatchPeriodList(): Observable<SystemManagementState> {
    return this.store.dispatch(new GetLookupValueBatchPeriodListAction());
  }

  loadScrapingPeriodList(): Observable<SystemManagementState> {
    return this.store.dispatch(new GetLookupValueScrapingPeriodListAction());
  }

  loadCalculationTypeList(): Observable<SystemManagementState> {
    return this.store.dispatch(new GetLookupValueCalculationTypeListAction());
  }

  loadHomeTypeList(): Observable<SystemManagementState> {
    return this.store.dispatch(new GetLookupValueHomeTypeListAction());
  }

  loadHomeOccupancyList(): Observable<SystemManagementState> {
    return this.store.dispatch(new GetLookupValueHomeOccupancyListAction());
  }

  loadHomeSizeList(): Observable<SystemManagementState> {
    return this.store.dispatch(new GetLookupValueHomeSizeListAction());
  }

  loadComparisonCodeList(): Observable<SystemManagementState> {
    return this.store.dispatch(new GetLookupValueComparisonCodeListAction());
  }

  loadLotSizeList(): Observable<SystemManagementState> {
    return this.store.dispatch(new GetLookupValueLotSizeListAction());
  }

  loadScrapingUtilityList(): Observable<SystemManagementState> {
    return this.store.dispatch(new GetLookupValueScrapingUtilityListAction());
  }

  loadReportTypeList(): Observable<SystemManagementState> {
    return this.store.dispatch(new GetReportTypeListAction());
  }

  setDebugConsoleData(debugData: any): Observable<SystemManagementState> {
    return this.store.dispatch(new SetDebugConsoleData(debugData));
  }
}
