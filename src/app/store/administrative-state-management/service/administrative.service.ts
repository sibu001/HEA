import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  CallAdministrativeReportAction,
  DeleteAdministrativeReportByIdAction,
  DeleteAdministrativeReportParamsByIdAction,
  DeleteEventHistoryByIdAction,
  DeleteProspectsByIdAction,
  DeleteTopicByIdAction,
  GetAdministrativeReportByIdAction,
  GetAdministrativeReportCountAction,
  GetAdministrativeReportListAction,
  GetAdministrativeReportParamsByIdAction,
  GetAdministrativeReportParamsListAction,
  GetCustomerListAction,
  GetEventHistoryByIdAction,
  GetEventHistoryCountAction,
  GetEventHistoryListAction,
  GetProspectsByIdAction,
  GetProspectsListAction,
  GetTopicByIdAction,
  GetTopicListAction,
  SaveAdministrativeReportAction,
  SaveAdministrativeReportParamsAction,
  SaveEventHistoryAction,
  SaveProspectsAction,
  SaveTopicAction,
  UpdateAdministrativeReportAction,
  UpdateAdministrativeReportParamsAction,
  UpdateEventHistoryAction,
  UpdateProspectsAction,
  UpdateTopicAction,
  UploadEventHistoryFileAction
} from '../state/administrative.action';
import { AdministrativeManagementState } from '../state/administrative.state';

@Injectable({
  providedIn: 'root'
})
export class AdministrativeService {

  constructor(private readonly store: Store) { }

  getAdministrativeReportList(): Observable<any> {
    return this.store.select(AdministrativeManagementState.getAdministrativeReportList);
  }

  getAdministrativeReportDataSource(): Observable<any> {
    return this.store.select(AdministrativeManagementState.getAdministrativeReportDataSource);
  }

  getAdministrativeReportById(): Observable<any> {
    return this.store.select(AdministrativeManagementState.getAdministrativeReportById);
  }

  getAdministrativeReportParamsList(): Observable<any> {
    return this.store.select(AdministrativeManagementState.getAdministrativeReportParamsList);
  }


  getTopicList(): Observable<any> {
    return this.store.select(AdministrativeManagementState.getTopicList);
  }

  getTopicById(): Observable<any> {
    return this.store.select(AdministrativeManagementState.getTopicById);
  }

  getProspectsList(): Observable<any> {
    return this.store.select(AdministrativeManagementState.getProspectsList);
  }

  getProspectsById(): Observable<any> {
    return this.store.select(AdministrativeManagementState.getProspectsById);
  }

  getEventHistoryList(): Observable<any> {
    return this.store.select(AdministrativeManagementState.getEventHistoryList);
  }

  getEventHistoryById(): Observable<any> {
    return this.store.select(AdministrativeManagementState.getEventHistoryById);
  }


  loadAdministrativeReportList(force: boolean, filter: any): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new GetAdministrativeReportListAction(force, filter));
  }

  loadAdministrativeReportCount(filter: any): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new GetAdministrativeReportCountAction(filter));
  }

  loadAdministrativeReportById(id: number): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new GetAdministrativeReportByIdAction(id));
  }

  saveAdministrativeReport(customer: any): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new SaveAdministrativeReportAction(customer));
  }

  updateAdministrativeReport(id: number, customer: any): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new UpdateAdministrativeReportAction(id, customer));
  }

  deleteAdministrativeReportById(id: number): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new DeleteAdministrativeReportByIdAction(id));
  }

  loadAdministrativeReportParamsList(reportId: any): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new GetAdministrativeReportParamsListAction(reportId));
  }

  loadAdministrativeReportParamsById(reportId: any, id: number): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new GetAdministrativeReportParamsByIdAction(reportId, id));
  }

  saveAdministrativeReportParams(reportId: any, parameters: any): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new SaveAdministrativeReportParamsAction(reportId, parameters));
  }

  updateAdministrativeReportParams(reportId: any, id: any): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new UpdateAdministrativeReportParamsAction(reportId, id));
  }

  deleteAdministrativeReportParamsById(reportId: any, id: any): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new DeleteAdministrativeReportParamsByIdAction(reportId, id));
  }
  callAdministrativeReport(reportId: any, parameters: any): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new CallAdministrativeReportAction(reportId, parameters));
  }

  loadTopicList(force: boolean, filter: any): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new GetTopicListAction(force, filter));
  }

  loadTopicById(id: number): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new GetTopicByIdAction(id));
  }

  saveTopic(customer: any): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new SaveTopicAction(customer));
  }

  updateTopic(id: number, customer: any): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new UpdateTopicAction(id, customer));
  }

  deleteTopicById(id: number): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new DeleteTopicByIdAction(id));
  }

  loadProspectsList(force: boolean, filter: any): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new GetProspectsListAction(force, filter));
  }

  loadProspectsById(id: number): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new GetProspectsByIdAction(id));
  }

  saveProspects(customer: any): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new SaveProspectsAction(customer));
  }

  updateProspects(id: number, customer: any): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new UpdateProspectsAction(id, customer));
  }

  deleteProspectsById(id: number): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new DeleteProspectsByIdAction(id));
  }

  loadEventHistoryList(force: boolean, filter: any): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new GetEventHistoryListAction(force, filter));
  }

  getEventHistoryCount(filter: any): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new GetEventHistoryCountAction(filter));
  }

  loadEventHistoryById(customerId: any, customerEventId: any): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new GetEventHistoryByIdAction(customerId, customerEventId));
  }

  saveEventHistory(customerId: any, customer: any): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new SaveEventHistoryAction(customerId, customer));
  }

  updateEventHistory(customerId: any, customerEventId: any, customer: any): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new UpdateEventHistoryAction(customerId, customerEventId, customer));
  }

  uploadEventHistoryFile(fileBody: any): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new UploadEventHistoryFileAction(fileBody));
  }

  deleteEventHistoryById(customerId: any, customerEventId: any): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new DeleteEventHistoryByIdAction(customerId, customerEventId));
  }

  loadCustomerList(filter: any): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new GetCustomerListAction(filter));
  }
}
