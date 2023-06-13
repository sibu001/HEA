import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  DeleteAttributeByIdAction,
  DeleteDynamicViewByIdAction,
  DeleteJavaScriptCustomerGroupByIdAction,
  DeleteJavaScriptPageByIdAction,
  GetAttributeByIdAction,
  GetAttributeListAction,
  GetDynamicViewByIdAction,
  GetDynamicViewListAction,
  GetDynamicViewListCountAction,
  GetJavaScriptCustomerGroupByIdAction,
  GetJavaScriptCustomerGroupListAction,
  GetJavaScriptPageByIdAction,
  GetJavaScriptPageCountAction,
  GetJavaScriptPageListAction,
  SaveAttributeAction,
  SaveDynamicViewAction,
  SaveJavaScriptCustomerGroupAction,
  SaveJavaScriptPageAction,
  UpdateAttributeAction,
  UpdateDynamicViewAction,
  UpdateJavaScriptCustomerGroupAction,
  UpdateJavaScriptPageAction
} from '../state/dynamic-view.action';
import { DynamicViewManagementState } from '../state/dynamic-view.state';

@Injectable({
  providedIn: 'root'
})
export class DynamicViewService {

  constructor(private readonly store: Store) { }

  getJavaScriptPageList(): Observable<any> {
    return this.store.select(DynamicViewManagementState.getJavaScriptPageList);
  }

  getJavaScriptPageCount(): Observable<any> {
    return this.store.select(DynamicViewManagementState.getJavaScriptPageCount);
  }

  getJavaScriptPageById(): Observable<any> {
    return this.store.select(DynamicViewManagementState.getJavaScriptPageById);
  }

  getJavaScriptCustomerGroupList() : Observable<any>{
    return this.store.select(DynamicViewManagementState.getJavaScriptCustomerGroupList);
  }

  getDynamicViewList(): Observable<any> {
    return this.store.select(DynamicViewManagementState.getDynamicViewList);
  }

  getDynamicViewById(): Observable<any> {
    return this.store.select(DynamicViewManagementState.getDynamicViewById);
  }

  getAttributeList(): Observable<any> {
    return this.store.select(DynamicViewManagementState.getAttributeList);
  }

  getAttributeById(): Observable<any> {
    return this.store.select(DynamicViewManagementState.getAttributeById);
  }

  getDynamicViewCount() : Observable<number> {
    return this.store.select(DynamicViewManagementState.getDynamicViewCount);
  }

  loadJavaScriptPageList(force: boolean, filter: any): Observable<DynamicViewManagementState> {
    return this.store.dispatch(new GetJavaScriptPageListAction(force, filter));
  }

  loadJavaScriptPageCount(force: boolean, filter: HttpParams): Observable<DynamicViewManagementState> {
    return this.store.dispatch(new GetJavaScriptPageCountAction(force, filter));
  }

  loadJavaScriptPageById(id: number): Observable<DynamicViewManagementState> {
    return this.store.dispatch(new GetJavaScriptPageByIdAction(id));
  }

  saveJavaScriptPage(JavaScriptPage: any): Observable<DynamicViewManagementState> {
    return this.store.dispatch(new SaveJavaScriptPageAction(JavaScriptPage));
  }

  updateJavaScriptPage(id: number, JavaScriptPage: any): Observable<DynamicViewManagementState> {
    return this.store.dispatch(new UpdateJavaScriptPageAction(id, JavaScriptPage));
  }

  deleteJavaScriptPageById(id: number): Observable<DynamicViewManagementState> {
    return this.store.dispatch(new DeleteJavaScriptPageByIdAction(id));
  }

  loadDynamicViewList(force: boolean, filter: any): Observable<DynamicViewManagementState> {
    return this.store.dispatch(new GetDynamicViewListAction(force, filter));
  }

  loadDynamicViewCount(force: boolean, filter: any): Observable<DynamicViewManagementState> {
    return this.store.dispatch(new GetDynamicViewListCountAction(force, filter));
  }

  loadDynamicViewById(id: number): Observable<DynamicViewManagementState> {
    return this.store.dispatch(new GetDynamicViewByIdAction(id));
  }

  saveDynamicView(dynamicView: any): Observable<DynamicViewManagementState> {
    return this.store.dispatch(new SaveDynamicViewAction(dynamicView));
  }

  updateDynamicView(id: number, dynamicView: any): Observable<DynamicViewManagementState> {
    return this.store.dispatch(new UpdateDynamicViewAction(id, dynamicView));
  }

  deleteDynamicViewById(id: number): Observable<DynamicViewManagementState> {
    return this.store.dispatch(new DeleteDynamicViewByIdAction(id));
  }

  loadAttributeList(force: boolean, filter: any): Observable<DynamicViewManagementState> {
    return this.store.dispatch(new GetAttributeListAction(force, filter));
  }

  loadAttributeById(id: number): Observable<DynamicViewManagementState> {
    return this.store.dispatch(new GetAttributeByIdAction(id));
  }

  saveAttribute(attribute: any): Observable<DynamicViewManagementState> {
    return this.store.dispatch(new SaveAttributeAction(attribute));
  }

  updateAttribute(id: number, attribute: any): Observable<DynamicViewManagementState> {
    return this.store.dispatch(new UpdateAttributeAction(id, attribute));
  }

  deleteAttributeById(id: number): Observable<DynamicViewManagementState> {
    return this.store.dispatch(new DeleteAttributeByIdAction(id));
  }

  loadJavaScriptCustomerGroupList(force: boolean, id: number): Observable<DynamicViewManagementState> {
    return this.store.dispatch(new GetJavaScriptCustomerGroupListAction(force, id));
  }

  loadJavaScriptCustomerGroupById(id: number): Observable<DynamicViewManagementState> {
    return this.store.dispatch(new GetJavaScriptCustomerGroupByIdAction(id));
  }

  saveJavaScriptCustomerGroup(jsPageId : number, id: number): Observable<DynamicViewManagementState> {
    return this.store.dispatch(new SaveJavaScriptCustomerGroupAction(jsPageId,id));
  }

  updateJavaScriptCustomerGroup(id: number, javaScriptCustomerGroup: any): Observable<DynamicViewManagementState> {
    return this.store.dispatch(new UpdateJavaScriptCustomerGroupAction(id, javaScriptCustomerGroup));
  }

  deleteJavaScriptCustomerGroupById(jsPageId : number, id: number): Observable<DynamicViewManagementState> {
    return this.store.dispatch(new DeleteJavaScriptCustomerGroupByIdAction(jsPageId,id));
  }
}
