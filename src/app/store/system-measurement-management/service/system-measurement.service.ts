import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  GetCimisStationListAction,
  GetCimisStationByIdAction,
  SaveCimisStationAction,
  UpdateCimisStationAction,
  DeleteCimisStationByIdAction,
  DeleteCimisMeasurementByIdAction,
  GetCimisMeasurementByIdAction,
  GetCimisMeasurementListAction,
  SaveCimisMeasurementAction,
  UpdateCimisMeasurementAction,
  DeleteScriptConsoleByIdAction,
  GetScriptConsoleByIdAction,
  GetScriptConsoleListAction,
  SaveScriptConsoleAction,
  UpdateScriptConsoleAction,
  DeleteScriptBatchByIdAction,
  GetScriptBatchByIdAction,
  GetScriptBatchListAction,
  SaveScriptBatchAction,
  UpdateScriptBatchAction,
  DeleteSystemJobsByIdAction,
  GetSystemJobsByIdAction,
  GetSystemJobsListAction,
  SaveSystemJobsAction,
  UpdateSystemJobsAction,
  GetEC2InstanceListAction,
  DeleteEC2InstanceByIdAction,
  GetEC2InstanceByIdAction,
  SaveEC2InstanceAction,
  UpdateEC2InstanceAction,
  DeleteAlertMessageByIdAction,
  GetAlertMessageByIdAction,
  GetAlertMessageListAction,
  SaveAlertMessageAction,
  UpdateAlertMessageAction,
  GetCimisMeasurementCountAction,
  GetCimisStationCountAction,
  GetScriptBatchCountAction,
  ProcessScriptBatchAction,
  ExecuteScriptBatchResultAction,
  GetScriptBatchGroupAction,
  SaveScriptBatchGroupAction,
  DeleteScriptBatchGroupAction
} from '../state/system-measurement.action';
import { SystemMeasurementManagementState } from '../state/system-measurement.state';

@Injectable({
  providedIn: 'root'
})
export class SystemMeasurementService {
  constructor(private readonly store: Store) { }

  getCimisStationList(): Observable<any> {
    return this.store.select(SystemMeasurementManagementState.getCimisStationList);
  }

  getCimisStationById(): Observable<any> {
    return this.store.select(SystemMeasurementManagementState.getCimisStationById);
  }

  getCimisMeasurementList(): Observable<any> {
    return this.store.select(SystemMeasurementManagementState.getCimisMeasurementList);
  }

  getCimisMeasurementById(): Observable<any> {
    return this.store.select(SystemMeasurementManagementState.getCimisMeasurementById);
  }

  getScriptConsoleList(): Observable<any> {
    return this.store.select(SystemMeasurementManagementState.getScriptConsoleList);
  }

  getScriptConsoleById(): Observable<any> {
    return this.store.select(SystemMeasurementManagementState.getScriptConsoleById);
  }

  getScriptBatchList(): Observable<any> {
    return this.store.select(SystemMeasurementManagementState.getScriptBatchList);
  }

  getScriptBatchById(): Observable<any> {
    return this.store.select(SystemMeasurementManagementState.getScriptBatchById);
  }

  getSystemJobsList(): Observable<any> {
    return this.store.select(SystemMeasurementManagementState.getSystemJobsList);
  }

  getSystemJobsById(): Observable<any> {
    return this.store.select(SystemMeasurementManagementState.getSystemJobsById);
  }

  getEC2InstanceList(): Observable<any> {
    return this.store.select(SystemMeasurementManagementState.getEC2InstanceList);
  }

  getEC2InstanceById(): Observable<any> {
    return this.store.select(SystemMeasurementManagementState.getEC2InstanceById);
  }

  getAlertMessageList(): Observable<any> {
    return this.store.select(SystemMeasurementManagementState.getAlertMessageList);
  }

  getAlertMessageById(): Observable<any> {
    return this.store.select(SystemMeasurementManagementState.getAlertMessageById);
  }

  loadCimisStationList(force: boolean, filter: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new GetCimisStationListAction(force, filter));
  }

  loadCimisStationCount(filter: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new GetCimisStationCountAction(filter));
  }

  loadCimisStationById(id: number): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new GetCimisStationByIdAction(id));
  }

  saveCimisStation(logs: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new SaveCimisStationAction(logs));
  }

  updateCimisStation(id: number, logs: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new UpdateCimisStationAction(id, logs));
  }

  deleteCimisStationById(id: number): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new DeleteCimisStationByIdAction(id));
  }

  loadCimisMeasurementList(force: boolean, filter: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new GetCimisMeasurementListAction(force, filter));
  }

  loadCimisMeasurementCount(filter: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new GetCimisMeasurementCountAction(filter));
  }

  loadCimisMeasurementById(id: number): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new GetCimisMeasurementByIdAction(id));
  }

  saveCimisMeasurement(logs: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new SaveCimisMeasurementAction(logs));
  }

  updateCimisMeasurement(id: number, logs: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new UpdateCimisMeasurementAction(id, logs));
  }

  deleteCimisMeasurementById(id: number): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new DeleteCimisMeasurementByIdAction(id));
  }

  loadScriptConsoleList(force: boolean, filter: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new GetScriptConsoleListAction(force, filter));
  }

  loadScriptConsoleById(id: number): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new GetScriptConsoleByIdAction(id));
  }

  saveScriptConsole(logs: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new SaveScriptConsoleAction(logs));
  }

  updateScriptConsole(id: number, logs: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new UpdateScriptConsoleAction(id, logs));
  }

  deleteScriptConsoleById(id: number): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new DeleteScriptConsoleByIdAction(id));
  }

  loadScriptBatchList(force: boolean, filter: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new GetScriptBatchListAction(force, filter));
  }

  loadScriptBatchCount(filter: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new GetScriptBatchCountAction(filter));
  }

  loadScriptBatchById(id: number): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new GetScriptBatchByIdAction(id));
  }

  saveScriptBatch(logs: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new SaveScriptBatchAction(logs));
  }

  updateScriptBatch(id: number, logs: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new UpdateScriptBatchAction(id, logs));
  }

  deleteScriptBatchById(id: number): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new DeleteScriptBatchByIdAction(id));
  }

  processScriptBatch(id: number): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new ProcessScriptBatchAction(id));
  }

  ExecuteScriptBatchResult(id: number): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new ExecuteScriptBatchResultAction(id));
  }

  getScriptBatchGroup(id: number): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new GetScriptBatchGroupAction(id));
  }

  saveScriptBatchGroup(id: number, customerGroupId: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new SaveScriptBatchGroupAction(id, customerGroupId));
  }

  deleteScriptBatchGroup(id: number, customerGroupId: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new DeleteScriptBatchGroupAction(id, customerGroupId));
  }

  loadSystemJobsList(force: boolean, filter: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new GetSystemJobsListAction(force, filter));
  }

  loadSystemJobsById(id: number): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new GetSystemJobsByIdAction(id));
  }

  saveSystemJobs(logs: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new SaveSystemJobsAction(logs));
  }

  updateSystemJobs(id: number, logs: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new UpdateSystemJobsAction(id, logs));
  }

  deleteSystemJobsById(id: number): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new DeleteSystemJobsByIdAction(id));
  }

  loadEC2InstanceList(force: boolean, filter: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new GetEC2InstanceListAction(force, filter));
  }

  loadEC2InstanceById(id: number): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new GetEC2InstanceByIdAction(id));
  }

  saveEC2Instance(logs: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new SaveEC2InstanceAction(logs));
  }

  updateEC2Instance(id: number, logs: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new UpdateEC2InstanceAction(id, logs));
  }

  deleteEC2InstanceById(id: number): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new DeleteEC2InstanceByIdAction(id));
  }

  loadAlertMessageList(force: boolean, filter: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new GetAlertMessageListAction(force, filter));
  }

  loadAlertMessageById(id: number): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new GetAlertMessageByIdAction(id));
  }

  saveAlertMessage(logs: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new SaveAlertMessageAction(logs));
  }

  updateAlertMessage(id: number, logs: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new UpdateAlertMessageAction(id, logs));
  }

  deleteAlertMessageById(id: number): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new DeleteAlertMessageByIdAction(id));
  }

}
