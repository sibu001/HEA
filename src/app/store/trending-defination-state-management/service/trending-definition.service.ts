import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeleteKeyIndicatorByIdAction, DeleteKeyIndicatorCustomerGroupByIdAction, DeleteKeyIndicatorVariableByIdAction, DeleteTrendingPartsByIdAction, GetKeyIndicatorByIdAction, GetKeyIndicatorCustomerGroupByIdAction, GetKeyIndicatorCustomerGroupListAction, GetKeyIndicatorListAction, GetKeyIndicatorVariableByIdAction, GetKeyIndicatorVariableListAction, GetTrendingPartsByIdAction, GetTrendingPartsListAction, SaveKeyIndicatorAction, SaveKeyIndicatorCustomerGroupAction, SaveKeyIndicatorVariableAction, SaveTrendingPartsAction, UpdateKeyIndicatorAction, UpdateKeyIndicatorCustomerGroupAction, UpdateKeyIndicatorVariableAction, UpdateTrendingPartsAction } from '../state/trending-definition.action';
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

  getTrendingPartsList(): Observable<any> {
    return this.store.select(TrendingDefinitionState.getTrendingPartsList);
  }

  getTrendingPartsById(): Observable<any> {
    return this.store.select(TrendingDefinitionState.getTrendingPartsById);
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

  loadKeyIndicatorCustomerGroupList(force: boolean, filter: any): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new GetKeyIndicatorCustomerGroupListAction(force, filter));
  }

  loadKeyIndicatorCustomerGroupById(id: number): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new GetKeyIndicatorCustomerGroupByIdAction(id));
  }

  saveKeyIndicatorCustomerGroup(keyIndicatorCustomerGroup: any): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new SaveKeyIndicatorCustomerGroupAction(keyIndicatorCustomerGroup));
  }

  updateKeyIndicatorCustomerGroup(id: number, keyIndicatorCustomerGroup: any): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new UpdateKeyIndicatorCustomerGroupAction(id, keyIndicatorCustomerGroup));
  }

  deleteKeyIndicatorCustomerGroupById(id: number): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new DeleteKeyIndicatorCustomerGroupByIdAction(id));
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

  loadKeyIndicatorVariableList(force: boolean, filter: any): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new GetKeyIndicatorVariableListAction(force, filter));
  }

  loadKeyIndicatorVariableById(id: number): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new GetKeyIndicatorVariableByIdAction(id));
  }

  saveKeyIndicatorVariable(keyIndicatorVariable: any): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new SaveKeyIndicatorVariableAction(keyIndicatorVariable));
  }

  updateKeyIndicatorVariable(id: number, keyIndicatorVariable: any): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new UpdateKeyIndicatorVariableAction(id, keyIndicatorVariable));
  }

  deleteKeyIndicatorVariableById(id: number): Observable<TrendingDefinitionState> {
    return this.store.dispatch(new DeleteKeyIndicatorVariableByIdAction(id));
  }
}
