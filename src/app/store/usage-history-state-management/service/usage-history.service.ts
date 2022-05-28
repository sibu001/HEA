import { DeleteSelectedUsageHistory, UpdateUsageServiceByUsageServiceId, ShareMyProcessCustomerAction } from './../state/usage-history.action';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UsageHistoryManagementState } from '../state/usage-history.state';
import {
  GetShareMyDataByIdAction,
  DeleteShareMyDataByIdAction,
  UpdateShareMyDataAction,
  GetGasByIdAction,
  DeleteElectricityByIdAction,
  DeleteElectricityChargeByIdAction,
  DeleteElectricityDailySmartMeterByIdAction,
  DeleteElectricitySmartMeterByIdAction,
  DeleteGasByIdAction,
  DeleteGasChargeByIdAction,
  DeleteGasSmartMeterByIdAction,
  DeleteWaterByIdAction,
  DeleteWaterChargeByIdAction,
  DeleteWaterSmartMeterByIdAction,
  GetElectricityByIdAction,
  GetElectricityChargeByIdAction,
  GetElectricityDailySmartMeterByIdAction,
  GetElectricitySmartMeterByIdAction,
  GetGasChargeByIdAction,
  GetGasSmartMeterByIdAction,
  GetWaterByIdAction,
  GetWaterChargeByIdAction,
  GetWaterSmartMeterByIdAction,
  UpdateElectricityAction,
  UpdateElectricityChargeAction,
  UpdateElectricityDailySmartMeterAction,
  UpdateElectricitySmartMeterAction,
  UpdateGasAction,
  UpdateGasChargeAction,
  UpdateGasSmartMeterAction,
  UpdateWaterAction,
  UpdateWaterChargeAction,
  UpdateWaterSmartMeterAction,
  GetShareMyDataListAction,
  GetGasListAction,
  GetGasChargeListAction,
  GetGasSmartMeterListAction,
  GetElectricityListAction,
  GetElectricityChargeListAction,
  GetElectricitySmartMeterListAction,
  GetElectricityDailySmartMeterListAction,
  GetWaterChargeListAction,
  GetWaterSmartMeterListAction,
  GetWaterListAction,
  LoadUsageHistoryDataByTypeAndId
} from '../state/usage-history.action';
@Injectable({
  providedIn: 'root'
})
export class UsageHistoryService {

  constructor(private readonly store: Store) { }

  getShareMyDataList(): Observable<any> {
    return this.store.select(UsageHistoryManagementState.getShareMyDataList);
  }

  getGasList(): Observable<any> {
    return this.store.select(UsageHistoryManagementState.getGasList);
  }

  getGasChargeList(): Observable<any> {
    return this.store.select(UsageHistoryManagementState.getGasChargeList);
  }

  getShareMyStateProcessConsumer()  : Observable<any>{
    return this.store.select(UsageHistoryManagementState.getShareMyCustomerProcess);
  }

  getGasSmartMeterList(): Observable<any> {
    return this.store.select(UsageHistoryManagementState.getGasSmartMeterList);
  }

  getSelectedGas() : Observable<any> {
    return this.store.selectOnce(UsageHistoryManagementState.getSelectedGas)
  }

  getElectricityList(): Observable<any> {
    return this.store.select(UsageHistoryManagementState.getElectricityList);
  }

  getElectricityChargeList(): Observable<any> {
    return this.store.select(UsageHistoryManagementState.getElectricityChargeList);
  }

  getElectricitySmartMeterList(): Observable<any> {
    return this.store.select(UsageHistoryManagementState.getElectricitySmartMeterList);
  }

  getElectricityDailySmartMeterList(): Observable<any> {
    return this.store.select(UsageHistoryManagementState.getElectricityDailySmartMeterList);
  }

  getWaterChargeList(): Observable<any> {
    return this.store.select(UsageHistoryManagementState.getWaterChargeList);
  }

  getWaterList(): Observable<any> {
    return this.store.select(UsageHistoryManagementState.getWaterList);
  }

  getWaterSmartMeterList(): Observable<any> {
    return this.store.select(UsageHistoryManagementState.getWaterSmartMeterList);
  }

  loadShareMyDataList(force: boolean, filter: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new GetShareMyDataListAction(force, filter));
  }

  loadShareMyDataProcessCustomer(filters : any){
    return this.store.dispatch(new ShareMyProcessCustomerAction(filters));
  }

  GetShareMyDataByIdAction(id: number): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new GetShareMyDataByIdAction(id));
  }

  UpdateShareMyDataAction(id: number, shareMyData: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new UpdateShareMyDataAction(id, shareMyData));
  }

  DeleteShareMyDataByIdAction(id: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new DeleteShareMyDataByIdAction(id));
  }

  loadGasList(force: boolean, userId: any, filter: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new GetGasListAction(force, userId, filter));
  }

  GetGasByIdAction(id: number): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new GetGasByIdAction(id));
  }

  UpdateGasAction(id: number, shareMyData: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new UpdateGasAction(id, shareMyData));
  }

  DeleteGasByIdAction(id: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new DeleteGasByIdAction(id));
  }

  loadGasChargeList(force: boolean, userId: any, filter: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new GetGasChargeListAction(force, userId, filter));
  }

  GetGasChargeByIdAction(id: number): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new GetGasChargeByIdAction(id));
  }

  UpdateGasChargeAction(id: number, shareMyData: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new UpdateGasChargeAction(id, shareMyData));
  }

  DeleteGasChargeByIdAction(id: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new DeleteGasChargeByIdAction(id));
  }

  loadGasSmartMeterList(force: boolean, userId: any, filter: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new GetGasSmartMeterListAction(force, userId, filter));
  }

  GetGasSmartMeterByIdAction(id: number): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new GetGasSmartMeterByIdAction(id));
  }

  UpdateGasSmartMeterAction(id: number, shareMyData: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new UpdateGasSmartMeterAction(id, shareMyData));
  }

  DeleteGasSmartMeterByIdAction(id: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new DeleteGasSmartMeterByIdAction(id));
  }

  loadElectricityList(force: boolean, userId: any, filter: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new GetElectricityListAction(force, userId, filter));
  }

  GetElectricityByIdAction(id: number): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new GetElectricityByIdAction(id));
  }

  UpdateElectricityAction(id: number, shareMyData: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new UpdateElectricityAction(id, shareMyData));
  }

  DeleteElectricityByIdAction(id: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new DeleteElectricityByIdAction(id));
  }

  loadElectricityChargeList(force: boolean, userId: any, filter: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new GetElectricityChargeListAction(force, userId, filter));
  }

  GetElectricityChargeByIdAction(id: number): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new GetElectricityChargeByIdAction(id));
  }

  UpdateElectricityChargeAction(id: number, shareMyData: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new UpdateElectricityChargeAction(id, shareMyData));
  }

  DeleteElectricityChargeByIdAction(id: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new DeleteElectricityChargeByIdAction(id));
  }

  loadElectricitySmartMeterList(force: boolean, userId: any, filter: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new GetElectricitySmartMeterListAction(force, userId, filter));
  }

  GetElectricitySmartMeterByIdAction(id: number): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new GetElectricitySmartMeterByIdAction(id));
  }

  UpdateElectricitySmartMeterAction(id: number, shareMyData: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new UpdateElectricitySmartMeterAction(id, shareMyData));
  }

  DeleteElectricitySmartMeterByIdAction(id: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new DeleteElectricitySmartMeterByIdAction(id));
  }

  loadElectricityDailySmartMeterList(force: boolean, userId: any, filter: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new GetElectricityDailySmartMeterListAction(force, userId, filter));
  }

  GetElectricityDailySmartMeterByIdAction(id: number): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new GetElectricityDailySmartMeterByIdAction(id));
  }

  UpdateElectricityDailySmartMeterAction(id: number, shareMyData: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new UpdateElectricityDailySmartMeterAction(id, shareMyData));
  }

  DeleteElectricityDailySmartMeterByIdAction(id: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new DeleteElectricityDailySmartMeterByIdAction(id));
  }

  loadWaterList(force: boolean, userId : string ,filter: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new GetWaterListAction(force , userId, filter));
  }

  GetWaterByIdAction(id: number): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new GetWaterByIdAction(id));
  }

  UpdateWaterAction(id: number, shareMyData: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new UpdateWaterAction(id, shareMyData));
  }

  DeleteWaterByIdAction(id: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new DeleteWaterByIdAction(id));
  }

  loadWaterChargeList(force: boolean, filter: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new GetWaterChargeListAction(force, filter));
  }

  GetWaterChargeByIdAction(id: number): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new GetWaterChargeByIdAction(id));
  }

  UpdateWaterChargeAction(id: number, shareMyData: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new UpdateWaterChargeAction(id, shareMyData));
  }

  DeleteWaterChargeByIdAction(id: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new DeleteWaterChargeByIdAction(id));
  }

  loadWaterSmartMeterList(force: boolean, userId : string, filter: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new GetWaterSmartMeterListAction(force, userId, filter));
  }

  GetWaterSmartMeterByIdAction(id: number): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new GetWaterSmartMeterByIdAction(id));
  }

  UpdateWaterSmartMeterAction(id: number, shareMyData: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new UpdateWaterSmartMeterAction(id, shareMyData));
  }

  DeleteWaterSmartMeterByIdAction(id: any): Observable<UsageHistoryManagementState> {
    return this.store.dispatch(new DeleteWaterSmartMeterByIdAction(id));
  }

  loadUsageHistoryDataByTypeAndId(userId,type,usageHistoryId){
    return this.store.dispatch(new LoadUsageHistoryDataByTypeAndId(userId,type,usageHistoryId));
  }

  DeleteSelectedUsageHistory(userId,type,usageHistoryId){
    // this.store.dispatch(new LoadUsageHistoryDataByTypeAndId(userId,type,usageHistoryId));
    return this.store.dispatch(new DeleteSelectedUsageHistory(userId,type,usageHistoryId))
  }

  upadatesageServiceByUsageHistoryId(body,usageServiceId,type,userId){
    return this.store.dispatch(new UpdateUsageServiceByUsageServiceId(body,usageServiceId,type,userId));
  }
}
