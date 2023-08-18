import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  DeleteKeyIndicatorByIdAction,
  RemoveKeyIndicatorCustomerGroupByIdAction,
  DeleteKeyIndicatorVariableByIdAction,
  DeleteTrendingPartsByIdAction,
  GetKeyIndicatorByIdAction,
  GetKeyIndicatorCustomerGroupByIdAction,
  GetKeyIndicatorCustomerGroupListAction,
  GetKeyIndicatorListAction,
  GetKeyIndicatorVariableByIdAction,
  GetKeyIndicatorVariableListAction,
  GetTrendingPartsByIdAction,
  GetTrendingPartsListAction,
  SaveKeyIndicatorAction,
  AddKeyIndicatorCustomerGroupAction,
  SaveKeyIndicatorVariableAction,
  SaveTrendingPartsAction,
  UpdateKeyIndicatorAction,
  UpdateKeyIndicatorCustomerGroupAction,
  UpdateKeyIndicatorVariableAction,
  UpdateTrendingPartsAction,
  LoadTrendingChartsByTrendingPartsIdAction,
  LoadTrenginPartChartByIdAction,
  DeleteTrenginPartChartByIdAction,
  UpdateTrenginPartChartByIdAction,
  SaveTrenginPartChartByAction,
  GetTrendingChartSeriesbyChartIdAction,
  SaveTrendingChartSeriesAction,
  UpdateTrendingChartSeriesByChartIdAction,
  DeleteTrendingChartSeriesByChartIdAction,
  AddChartDataSetToTrendingChartSeriesAction,
  DeleteChartDataSetToTrendingChartSeriesAction,
  GetChartDataSetToTrendingChartSeriesAction
} from '../state/trending-definition.action';
import { TrendingDefinitionState } from '../state/trending-definition.state';

@Injectable({
  providedIn: 'root'
})
export class TrendingDefinitionService {
  constructor(private readonly store: Store) { }

  getKeyIndicatorList(): Observable<any> {
    return this.store.select(TrendingDefinitionState.getKeyIndicatorList);
  }

  getKeyIndicatorById(): Observable<any> {
    return this.store.select(TrendingDefinitionState.getKeyIndicatorById);
  }

  getKeyIndicatorCustomerGroupList(): Observable<any> {
    return this.store.select(TrendingDefinitionState.getKeyIndicatorCustomerGroupList);
  }

  getKeyIndicatorCustomerGroupById(): Observable<any> {
    return this.store.select(TrendingDefinitionState.getKeyIndicatorCustomerGroupById);
  }

  getKeyIndicatorVariableList() : Observable<any> {
    return this.store.select(TrendingDefinitionState.getKeyIndicatorVariableList);
  }

  getTrendingPartsList(): Observable<any> {
    return this.store.select(TrendingDefinitionState.getTrendingPartsList);
  }

  getTrendingPartsById(): Observable<any> {
    return this.store.select(TrendingDefinitionState.getTrendingPartsById);
  }

  getKeyIndicatorVariable() : Observable<any> {
    return this.store.select(TrendingDefinitionState.getKeyIndicatorVariable);
  }

  getTrendingPartsCharts() : Observable<any> {
    return this.store.select(TrendingDefinitionState.getTrendingPartsCharts);
  }

  getTrendingPartChartById() : Observable<any>{
    return this.store.select(TrendingDefinitionState.getTrendingPartChart);
  }

  getTrendingChartSeriesById() : Observable<any>{
    return this.store.select(TrendingDefinitionState.getTrendingChartSeries);
  }

  getChartParameterListBySeriesId() : Observable<any>  {
    return this.store.select(TrendingDefinitionState.getTrendingChartSeriesParameter);
  }

  loadKeyIndicatorList(force: boolean, filter: any): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new GetKeyIndicatorListAction(force, filter));
  }

  loadKeyIndicatorById(id: number): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new GetKeyIndicatorByIdAction(id));
  }

  saveKeyIndicator(KeyIndicator: any): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new SaveKeyIndicatorAction(KeyIndicator));
  }

  updateKeyIndicator(id: number, KeyIndicator: any): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new UpdateKeyIndicatorAction(id, KeyIndicator));
  }

  deleteKeyIndicatorById(id: number): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new DeleteKeyIndicatorByIdAction(id));
  }

  loadKeyIndicatorCustomerGroupList(force: boolean, keyIndicatorId : number, filter: any): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new GetKeyIndicatorCustomerGroupListAction(force, keyIndicatorId, filter));
  }

  loadKeyIndicatorCustomerGroupById(id: number): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new GetKeyIndicatorCustomerGroupByIdAction(id));
  }

  addIndicatorCustomerGroup(keyIndicatorId: number, customerGroupId : number): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new AddKeyIndicatorCustomerGroupAction(keyIndicatorId, customerGroupId));
  }

  updateKeyIndicatorCustomerGroup(id: number, keyIndicatorCustomerGroup: any): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new UpdateKeyIndicatorCustomerGroupAction(id, keyIndicatorCustomerGroup));
  }

  removeKeyIndicatorCustomerGroupById(keyIndicatorId: number, customerGroupId : number): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new RemoveKeyIndicatorCustomerGroupByIdAction(keyIndicatorId, customerGroupId));
  }

  loadTrendingPartsList(force: boolean, filter: any): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new GetTrendingPartsListAction(force, filter));
  }

  loadTrendingPartsById(force : boolean, id: number): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new GetTrendingPartsByIdAction( force, id));
  }

  saveTrendingParts(trendingParts: any): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new SaveTrendingPartsAction(trendingParts));
  }

  updateTrendingParts(id: number, trendingParts: any): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new UpdateTrendingPartsAction(id, trendingParts));
  }

  deleteTrendingPartsById(id: number): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new DeleteTrendingPartsByIdAction(id));
  }

  loadKeyIndicatorVariableList(force: boolean, keyIndicatorId: number, filter : any): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new GetKeyIndicatorVariableListAction(force, keyIndicatorId, filter));
  }

  loadKeyIndicatorVariableById(keyIndicatorId : number, id: number): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new GetKeyIndicatorVariableByIdAction(keyIndicatorId, id));
  }

  saveKeyIndicatorVariable(keyIndicatorVariable: any, keyIndicatorId : number): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new SaveKeyIndicatorVariableAction(keyIndicatorVariable, keyIndicatorId));
  }

  updateKeyIndicatorVariable(id: number, keyIndicatorId : number, keyIndicatorVariable: any): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new UpdateKeyIndicatorVariableAction(id, keyIndicatorId,  keyIndicatorVariable));
  }

  deleteKeyIndicatorVariableById(id: number, keyIndicatorId : number): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new DeleteKeyIndicatorVariableByIdAction(id, keyIndicatorId));
  }

  loadTrendingChartsByTrendingPartsId(force : boolean, trendingPartsId : number, params : HttpParams) : Observable<TrendingDefinitionState>{
    return this.store.dispatch(new LoadTrendingChartsByTrendingPartsIdAction(force,trendingPartsId,params));
  }

  loadTrenginPartChartById(force : boolean, trendingPartsId : number, id : number) : Observable<any>{
    return this.store.dispatch(new LoadTrenginPartChartByIdAction(force,trendingPartsId,id));
  }

  saveTrenginPartChartById(trendingPartsId : number, requestBody : any) : Observable<any>{
    return this.store.dispatch(new SaveTrenginPartChartByAction(trendingPartsId,requestBody));
  }

  UpdateTrenginPartChartById(trendingPartsId : number, chartId : number, requestBody : any) : Observable<any>{
    return this.store.dispatch(new UpdateTrenginPartChartByIdAction(trendingPartsId,chartId, requestBody));
  }

  deleteTrenginPartChartById(trendingPartsId : number, charId : number ) : Observable<any> {
    return this.store.dispatch(new DeleteTrenginPartChartByIdAction(trendingPartsId,charId));
  }

  loadTrendingChartSeriesById(force : boolean , trendingPartId : number, chartId : number, seriesId : number) : Observable<any> {
    return this.store.dispatch(new GetTrendingChartSeriesbyChartIdAction(force, trendingPartId,chartId, seriesId));
  }

  saveTrendingChartSeries(trendingPartId: number, chartId: number, seriesBody : any) : Observable<any> {
    return this.store.dispatch( new SaveTrendingChartSeriesAction(trendingPartId, chartId, seriesBody));
  }

  updateTrendingChartSeriesById(trendingPartId: number, chartId: number, seriesId : number, seriesBody : any) : Observable<any> {
    return this.store.dispatch( new UpdateTrendingChartSeriesByChartIdAction(trendingPartId, chartId, seriesId, seriesBody));
  }

  deleteTrendingChartSeriesById( trendingPartId : number, chartId : number, seriesId : number) : Observable<any>{
    return this.store.dispatch(new DeleteTrendingChartSeriesByChartIdAction(trendingPartId, chartId, seriesId))
  }

  addChartDataSetToCharSeries( trendingPartId : number, chartId : number, seriesId : number, dataSetbody : any) : Observable<any>{
    return this.store.dispatch(new AddChartDataSetToTrendingChartSeriesAction(trendingPartId, chartId, seriesId, dataSetbody));
  }

  deleteChartDataSetToCharSeriesById( trendingPartId : number, chartId : number, seriesId : number, dataSetId : number) : Observable<any>{
    return this.store.dispatch(new DeleteChartDataSetToTrendingChartSeriesAction(trendingPartId, chartId, seriesId, dataSetId))
  }

  loadChartParameterListBySeriesId(trendingPartId : number, chartId : number, seriesId : number) : Observable<any>{
    return this.store.dispatch( new GetChartDataSetToTrendingChartSeriesAction(trendingPartId, chartId, seriesId));
  }

}
