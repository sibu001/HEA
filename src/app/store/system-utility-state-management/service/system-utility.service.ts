import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  GetPlaceListAction,
  GetPlaceByIdAction,
  SavePlaceAction,
  UpdatePlaceAction,
  DeletePlaceByIdAction,
  DeleteCustomerEventTypeByIdAction,
  GetCustomerEventTypeByIdAction,
  GetCustomerEventTypeListAction,
  SaveCustomerEventTypeAction,
  UpdateCustomerEventTypeAction,
  DeleteCustomerComparisonGroupByIdAction,
  GetCustomerComparisonGroupByIdAction,
  GetCustomerComparisonGroupListAction,
  SaveCustomerComparisonGroupAction,
  UpdateCustomerComparisonGroupAction,
  GetFactorListAction,
  GetFactorByIdAction,
  SaveFactorAction,
  DeleteFactorByIdAction,
  UpdateFactorAction,
  DeleteLookupByIdAction,
  GetLookupByIdAction,
  GetLookupListAction,
  SaveLookupAction,
  UpdateLookupAction,
  GetSystemParameterListAction,
  SaveSystemParameterAction,
  DeleteSystemParameterByIdAction,
  GetSystemParameterByIdAction,
  UpdateSystemParameterAction,
  DeleteLogsByIdAction,
  GetLogsByIdAction,
  GetLogsListAction,
  SaveLogsAction,
  UpdateLogsAction,
  DeleteDegreeDaysByIdAction,
  DeleteWeatherStationByIdAction,
  GetDegreeDaysByIdAction,
  GetDegreeDaysListAction,
  GetWeatherStationByIdAction,
  GetWeatherStationListAction,
  SaveDegreeDaysAction,
  SaveWeatherStationAction,
  UpdateDegreeDaysAction,
  UpdateWeatherStationAction,
  GetZipCodeListAction,
  SaveZipCodeAction,
  DeleteZipCodeByIdAction,
  GetTimeZoneListAction,
  GetCustomerEventTypeCountAction,
  GetSystemParameterCountAction
} from '../state/system-utility.action';
import { SystemUtilityManagementState } from '../state/system-utility.state';

@Injectable({
  providedIn: 'root'
})
export class SystemUtilityService {
  constructor(private readonly store: Store) { }

  getPlaceList(): Observable<any> {
    return this.store.select(SystemUtilityManagementState.getPlaceList);
  }

  getPlaceById(): Observable<any> {
    return this.store.select(SystemUtilityManagementState.getPlaceById);
  }

  getCustomerEventTypeList(): Observable<any> {
    return this.store.select(SystemUtilityManagementState.getCustomerEventTypeList);
  }

  getCustomerEventTypeById(): Observable<any> {
    return this.store.select(SystemUtilityManagementState.getCustomerEventTypeById);
  }

  getCustomerComparisonGroupList(): Observable<any> {
    return this.store.select(SystemUtilityManagementState.getCustomerComparisonGroupList);
  }

  getCustomerComparisonGroupById(): Observable<any> {
    return this.store.select(SystemUtilityManagementState.getCustomerComparisonGroupById);
  }

  getFactorList(): Observable<any> {
    return this.store.select(SystemUtilityManagementState.getFactorList);
  }

  getFactorById(): Observable<any> {
    return this.store.select(SystemUtilityManagementState.getFactorById);
  }

  getLookupList(): Observable<any> {
    return this.store.select(SystemUtilityManagementState.getLookupList);
  }

  getLookupById(): Observable<any> {
    return this.store.select(SystemUtilityManagementState.getLookupById);
  }

  getSystemParameterList(): Observable<any> {
    return this.store.select(SystemUtilityManagementState.getSystemParameterList);
  }

  getSystemParameterById(): Observable<any> {
    return this.store.select(SystemUtilityManagementState.getSystemParameterById);
  }

  getLogsList(): Observable<any> {
    return this.store.select(SystemUtilityManagementState.getLogList);
  }

  getLogsById(): Observable<any> {
    return this.store.select(SystemUtilityManagementState.getLogById);
  }

  getWeatherStationList(): Observable<any> {
    return this.store.select(SystemUtilityManagementState.getWeatherStationList);
  }

  getWeatherStationById(): Observable<any> {
    return this.store.select(SystemUtilityManagementState.getWeatherStationById);
  }

  getDegreeDaysList(): Observable<any> {
    return this.store.select(SystemUtilityManagementState.getDegreeDaysList);
  }

  getDegreeDaysById(): Observable<any> {
    return this.store.select(SystemUtilityManagementState.getDegreeDaysById);
  }

  loadPlaceList(force: boolean, filter: any): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new GetPlaceListAction(force, filter));
  }

  loadPlaceById(id: number): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new GetPlaceByIdAction(id));
  }

  savePlace(place: any): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new SavePlaceAction(place));
  }

  updatePlace(id: number, place: any): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new UpdatePlaceAction(id, place));
  }

  deletePlaceById(id: number): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new DeletePlaceByIdAction(id));
  }

  loadCustomerEventTypeList(force: boolean, filter: any): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new GetCustomerEventTypeListAction(force, filter));
  }

  loadCustomerEventTypeCount(): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new GetCustomerEventTypeCountAction());
  }

  loadCustomerEventTypeById(id: number): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new GetCustomerEventTypeByIdAction(id));
  }

  saveCustomerEventType(customerEventType: any): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new SaveCustomerEventTypeAction(customerEventType));
  }

  updateCustomerEventType(id: number, customerEventType: any): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new UpdateCustomerEventTypeAction(id, customerEventType));
  }

  deleteCustomerEventTypeById(id: number): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new DeleteCustomerEventTypeByIdAction(id));
  }

  loadCustomerComparisonGroupList(force: boolean, filter: any): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new GetCustomerComparisonGroupListAction(force, filter));
  }

  loadCustomerComparisonGroupById(id: number): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new GetCustomerComparisonGroupByIdAction(id));
  }

  saveCustomerComparisonGroup(customerComparisonGroup: any): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new SaveCustomerComparisonGroupAction(customerComparisonGroup));
  }

  updateCustomerComparisonGroup(id: number, customerComparisonGroup: any): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new UpdateCustomerComparisonGroupAction(id, customerComparisonGroup));
  }

  deleteCustomerComparisonGroupById(id: number): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new DeleteCustomerComparisonGroupByIdAction(id));
  }

  loadFactorList(force: boolean, filter: any): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new GetFactorListAction(force, filter));
  }

  loadFactorById(id: number): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new GetFactorByIdAction(id));
  }

  saveFactor(factor: any): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new SaveFactorAction(factor));
  }

  updateFactor(id: number, factor: any): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new UpdateFactorAction(id, factor));
  }

  deleteFactorById(id: number): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new DeleteFactorByIdAction(id));
  }

  loadLookupList(force: boolean, filter: any): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new GetLookupListAction(force, filter));
  }

  loadLookupById(id: number): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new GetLookupByIdAction(id));
  }

  saveLookup(lookup: any): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new SaveLookupAction(lookup));
  }

  updateLookup(id: number, lookup: any): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new UpdateLookupAction(id, lookup));
  }

  deleteLookupById(id: number): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new DeleteLookupByIdAction(id));
  }

  loadSystemParameterList(force: boolean, filter: any): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new GetSystemParameterListAction(force, filter));
  }

  loadSystemParameterCount(): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new GetSystemParameterCountAction());
  }

  loadSystemParameterById(id: number): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new GetSystemParameterByIdAction(id));
  }

  saveSystemParameter(systemParameter: any): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new SaveSystemParameterAction(systemParameter));
  }

  updateSystemParameter(id: number, systemParameter: any): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new UpdateSystemParameterAction(id, systemParameter));
  }

  deleteSystemParameterById(id: number): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new DeleteSystemParameterByIdAction(id));
  }

  loadLogsList(force: boolean, filter: any): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new GetLogsListAction(force, filter));
  }

  loadLogsById(id: number): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new GetLogsByIdAction(id));
  }

  saveLogs(logs: any): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new SaveLogsAction(logs));
  }

  updateLogs(id: number, logs: any): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new UpdateLogsAction(id, logs));
  }

  deleteLogsById(id: number): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new DeleteLogsByIdAction(id));
  }

  loadWeatherStationList(force: boolean, filter: any): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new GetWeatherStationListAction(force, filter));
  }

  loadWeatherStationById(id: number): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new GetWeatherStationByIdAction(id));
  }

  saveWeatherStation(logs: any): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new SaveWeatherStationAction(logs));
  }

  updateWeatherStation(id: number, logs: any): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new UpdateWeatherStationAction(id, logs));
  }

  deleteWeatherStationById(id: number): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new DeleteWeatherStationByIdAction(id));
  }

  loadDegreeDaysList(force: boolean, filter: any): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new GetDegreeDaysListAction(force, filter));
  }

  loadDegreeDaysById(id: number): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new GetDegreeDaysByIdAction(id));
  }

  saveDegreeDays(logs: any): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new SaveDegreeDaysAction(logs));
  }

  updateDegreeDays(id: number, logs: any): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new UpdateDegreeDaysAction(id, logs));
  }

  deleteDegreeDaysById(id: number): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new DeleteDegreeDaysByIdAction(id));
  }

  loadZipCodeList(placeCode: any, filter: any): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new GetZipCodeListAction(placeCode, filter));
  }

  saveZipCode(placeCode: any, zipCode: any): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new SaveZipCodeAction(placeCode, zipCode));
  }

  deleteZipCodeById(placeCode: number, id: number): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new DeleteZipCodeByIdAction(placeCode, id));
  }

  getTimeZoneList(): Observable<any> {
    return this.store.select(SystemUtilityManagementState.getTimeZoneList);
  }

  loadTimeZoneList(force: boolean): Observable<SystemUtilityManagementState> {
    return this.store.dispatch(new GetTimeZoneListAction(force));
  }

}
