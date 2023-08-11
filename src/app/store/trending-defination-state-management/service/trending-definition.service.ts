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
  UpdateTrendingPartsAction
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

  loadTrendingPartsById(id: number): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new GetTrendingPartsByIdAction(id));
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
}
