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
  DeleteScriptBatchByIdAction,
  GetScriptBatchByIdAction,
  GetScriptBatchListAction,
  SaveScriptBatchAction,
  UpdateScriptBatchAction,
  GetThreadInfoAction,
  GetOperatingSystemInfoAction,
  GetSystemJobsListAction,
  GetEC2InstanceListAction,
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
  DeleteScriptBatchGroupAction,
  ExecuteSystemJobsAction,
  PauseSystemJobsAction,
  ResumeSystemJobsAction,
  InterruptSystemJobsAction,
  StartEC2InstanceAction,
  StopEC2InstanceAction
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

  getScriptBatchList(): Observable<any> {
    return this.store.select(SystemMeasurementManagementState.getScriptBatchList);
  }

  getScriptBatchById(): Observable<any> {
    return this.store.select(SystemMeasurementManagementState.getScriptBatchById);
  }

  getSystemJobsList(): Observable<any> {
    return this.store.select(SystemMeasurementManagementState.getSystemJobsList);
  }

  getOperatingSystemInfo(): Observable<any> {
    return this.store.select(SystemMeasurementManagementState.getOperatingSystemInfo);
  }

  getThreadInfo(): Observable<any> {
    return this.store.select(SystemMeasurementManagementState.getThreadInfo);
  }

  getEC2InstanceList(): Observable<any> {
    return this.store.select(SystemMeasurementManagementState.getEC2InstanceList);
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

  loadCimisStationCount(force : boolean, filter: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new GetCimisStationCountAction(force,filter));
  }

  loadCimisStationById(id: number): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new GetCimisStationByIdAction(id));
  }

  getCimisStationCount() : Observable<number> {
    return this.store.select(SystemMeasurementManagementState.getCimisStationCount)
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

  loadOperatingSystemInfo(): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new GetOperatingSystemInfoAction());
  }

  executeSystemJobs(schedulerName: any, groupName: any, jobName: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new ExecuteSystemJobsAction(schedulerName, groupName, jobName));
  }

  pauseSystemJobs(schedulerName: any, groupName: any, jobName: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new PauseSystemJobsAction(schedulerName, groupName, jobName));
  }

  resumeSystemJobs(schedulerName: any, groupName: any, jobName: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new ResumeSystemJobsAction(schedulerName, groupName, jobName));
  }

  interruptSystemJobs(schedulerName: any, groupName: any, jobName: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new InterruptSystemJobsAction(schedulerName, groupName, jobName));
  }

  loadThreadInfo(): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new GetThreadInfoAction());
  }

  loadEC2InstanceList(force: boolean, filter: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new GetEC2InstanceListAction(force, filter));
  }

  startEC2Instance(instanceId: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new StartEC2InstanceAction(instanceId));
  }

  stopEC2Instance(instanceId: any): Observable<SystemMeasurementManagementState> {
    return this.store.dispatch(new StopEC2InstanceAction(instanceId));
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
