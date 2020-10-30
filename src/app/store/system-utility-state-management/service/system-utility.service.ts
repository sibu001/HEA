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
  UpdateCustomerComparisonGroupAction
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


}
