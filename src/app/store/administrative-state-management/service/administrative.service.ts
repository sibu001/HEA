import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  DeleteAdministrativeReportByIdAction,
  DeleteProspectsByIdAction,
  DeleteTopicByIdAction,
  GetAdministrativeReportByIdAction,
  GetAdministrativeReportListAction,
  GetProspectsByIdAction,
  GetProspectsListAction,
  GetTopicByIdAction,
  GetTopicListAction,
  SaveAdministrativeReportAction,
  SaveProspectsAction,
  SaveTopicAction,
  UpdateAdministrativeReportAction,
  UpdateProspectsAction,
  UpdateTopicAction
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


  loadAdministrativeReportList(force: boolean, filter: any): Observable<AdministrativeManagementState> {
    return this.store.dispatch(new GetAdministrativeReportListAction(force, filter));
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
}
