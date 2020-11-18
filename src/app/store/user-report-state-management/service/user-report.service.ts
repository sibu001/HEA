import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  DeleteUserReportDefinitionByIdAction,
  DeleteUserReportDefinitionContentPartByIdAction,
  DeleteUserReportDefinitionContextVariableTypeByIdAction,
  GetUserReportDefinitionByIdAction,
  GetUserReportDefinitionContentPartByIdAction,
  GetUserReportDefinitionContentPartListAction,
  GetUserReportDefinitionContextVariableTypeByIdAction,
  GetUserReportDefinitionContextVariableTypeListAction,
  GetUserReportDefinitionListAction,
  SaveUserReportDefinitionAction,
  SaveUserReportDefinitionContentPartAction,
  SaveUserReportDefinitionContextVariableTypeAction,
  UpdateUserReportDefinitionAction,
  UpdateUserReportDefinitionContentPartAction,
  UpdateUserReportDefinitionContextVariableTypeAction
} from '../state/user-report.action';
import { UserReportManagementState } from '../state/user-report.state';

@Injectable({
  providedIn: 'root'
})
export class UserReportService {

  constructor(private readonly store: Store) { }

  getUserReportDefinitionList(): Observable<any> {
    return this.store.select(UserReportManagementState.getUserReportDefinitionList);
  }

  getUserReportDefinitionById(): Observable<any> {
    return this.store.select(UserReportManagementState.getUserReportDefinitionById);
  }

  getUserReportDefinitionContextVariableTypeList(): Observable<any> {
    return this.store.select(UserReportManagementState.getUserReportDefinitionContextVariableTypeList);
  }

  getUserReportDefinitionContextVariableTypeById(): Observable<any> {
    return this.store.select(UserReportManagementState.getUserReportDefinitionContextVariableTypeById);
  }

  getUserReportDefinitionContentPartList(): Observable<any> {
    return this.store.select(UserReportManagementState.getUserReportDefinitionContentPartList);
  }

  getUserReportDefinitionContentPartById(): Observable<any> {
    return this.store.select(UserReportManagementState.getUserReportDefinitionContentPartById);
  }

  loadUserReportDefinitionList(force: boolean, filter: any): Observable<UserReportManagementState> {
    return this.store.dispatch(new GetUserReportDefinitionListAction(force, filter));
  }

  loadUserReportDefinitionById(id: number): Observable<UserReportManagementState> {
    return this.store.dispatch(new GetUserReportDefinitionByIdAction(id));
  }

  saveUserReportDefinition(userReportDefinition: any): Observable<UserReportManagementState> {
    return this.store.dispatch(new SaveUserReportDefinitionAction(userReportDefinition));
  }

  updateUserReportDefinition(id: number, userReportDefinition: any): Observable<UserReportManagementState> {
    return this.store.dispatch(new UpdateUserReportDefinitionAction(id, userReportDefinition));
  }

  deleteUserReportDefinitionById(id: number): Observable<UserReportManagementState> {
    return this.store.dispatch(new DeleteUserReportDefinitionByIdAction(id));
  }

  loadUserReportDefinitionContextVariableTypeList(force: boolean, filter: any): Observable<UserReportManagementState> {
    return this.store.dispatch(new GetUserReportDefinitionContextVariableTypeListAction(force, filter));
  }

  loadUserReportDefinitionContextVariableTypeById(id: number): Observable<UserReportManagementState> {
    return this.store.dispatch(new GetUserReportDefinitionContextVariableTypeByIdAction(id));
  }

  saveUserReportDefinitionContextVariableType(userReportDefinitionContextVariableType: any): Observable<UserReportManagementState> {
    return this.store.dispatch(new SaveUserReportDefinitionContextVariableTypeAction(userReportDefinitionContextVariableType));
  }

  updateUserReportDefinitionContextVariableType(id: number, userReportDefinitionContextVariableType: any): Observable<UserReportManagementState> {
    return this.store.dispatch(new UpdateUserReportDefinitionContextVariableTypeAction(id, userReportDefinitionContextVariableType));
  }

  deleteUserReportDefinitionContextVariableTypeById(id: number): Observable<UserReportManagementState> {
    return this.store.dispatch(new DeleteUserReportDefinitionContextVariableTypeByIdAction(id));
  }

  loadUserReportDefinitionContentPartList(force: boolean, filter: any): Observable<UserReportManagementState> {
    return this.store.dispatch(new GetUserReportDefinitionContentPartListAction(force, filter));
  }

  loadUserReportDefinitionContentPartById(id: number): Observable<UserReportManagementState> {
    return this.store.dispatch(new GetUserReportDefinitionContentPartByIdAction(id));
  }

  saveUserReportDefinitionContentPart(userReportDefinitionContentPart: any): Observable<UserReportManagementState> {
    return this.store.dispatch(new SaveUserReportDefinitionContentPartAction(userReportDefinitionContentPart));
  }

  updateUserReportDefinitionContentPart(id: number, userReportDefinitionContentPart: any): Observable<UserReportManagementState> {
    return this.store.dispatch(new UpdateUserReportDefinitionContentPartAction(id, userReportDefinitionContentPart));
  }

  deleteUserReportDefinitionContentPartById(id: number): Observable<UserReportManagementState> {
    return this.store.dispatch(new DeleteUserReportDefinitionContentPartByIdAction(id));
  }

}
