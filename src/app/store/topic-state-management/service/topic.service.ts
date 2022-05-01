import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import {
  GetTopicDescriptionListAction,
  GetTopicDescriptionByIdAction,
  SaveTopicDescriptionAction,
  UpdateTopicDescriptionAction,
  DeleteTopicDescriptionByIdAction,
  GetContextMethodListAction,
  ScriptDebugAction,
  GetPaidServiceListAction,
  // LoadTopicDescriptionPaneByIdAction
} from '../state/topic.action';
import { TopicManagementState } from '../state/topic.state';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private readonly store: Store) { }

  getTopicDescriptionList(): Observable<any> {
    return this.store.select(TopicManagementState.getTopicDescriptionList);
  }

  getTopicDescriptionById(): Observable<any> {
    return this.store.select(TopicManagementState.getTopicDescriptionById);
  }

  getContextMethodList(): Observable<any> {
    return this.store.select(TopicManagementState.getContextMethodList);
  }

  getScriptDebug(): Observable<any> {
    return this.store.select(TopicManagementState.getScriptDebug);
  }

  getPaidServiceList(): Observable<any> {
    return this.store.select(TopicManagementState.getPaidServiceList);
  }

  loadTopicDescriptionList(force: boolean, filter: any): Observable<TopicManagementState> {
    return this.store.dispatch(new GetTopicDescriptionListAction(force, filter));
  }

  loadTopicDescriptionById(id: number): Observable<TopicManagementState> {
    return this.store.dispatch(new GetTopicDescriptionByIdAction(id));
  }

  // loadTopicDescriptionPaneById(id : number): Observable<TopicManagementState> {
  //   return this.store.dispatch(new LoadTopicDescriptionPaneByIdAction(id))
  // }

  saveTopicDescription(customer: any): Observable<TopicManagementState> {
    return this.store.dispatch(new SaveTopicDescriptionAction(customer));
  }

  updateTopicDescription(id: number, customer: any): Observable<TopicManagementState> {
    return this.store.dispatch(new UpdateTopicDescriptionAction(id, customer));
  }

  deleteTopicDescriptionById(id: number): Observable<TopicManagementState> {
    return this.store.dispatch(new DeleteTopicDescriptionByIdAction(id));
  }

  loadContextMethodList(): Observable<TopicManagementState> {
    return this.store.dispatch(new GetContextMethodListAction());
  }

  scriptDebug(scriptDebug: any): Observable<TopicManagementState> {
    return this.store.dispatch(new ScriptDebugAction(scriptDebug));
  }

  loadPaidServiceList(): Observable<TopicManagementState> {
    return this.store.dispatch(new GetPaidServiceListAction());
  }
}
