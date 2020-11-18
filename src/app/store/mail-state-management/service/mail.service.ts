import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  DeleteContextVariableByIdAction,
  DeleteMailContentPartByIdAction,
  DeleteMailDescriptionByIdAction,
  GetContextVariableByIdAction,
  GetContextVariableListAction,
  GetMailContentPartByIdAction,
  GetMailContentPartListAction,
  GetMailDescriptionByIdAction,
  GetMailDescriptionListAction,
  SaveContextVariableAction,
  SaveMailContentPartAction,
  SaveMailDescriptionAction,
  UpdateContextVariableAction,
  UpdateMailContentPartAction,
  UpdateMailDescriptionAction
} from '../state/mail.action';
import { MailManagementState } from '../state/mail.state';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private readonly store: Store) { }


  getMailDescriptionList(): Observable<any> {
    return this.store.select(MailManagementState.getMailDescriptionList);
  }

  getMailDescriptionById(): Observable<any> {
    return this.store.select(MailManagementState.getMailDescriptionById);
  }

  getContextVariableList(): Observable<any> {
    return this.store.select(MailManagementState.getContextVariableList);
  }

  getContextVariableById(): Observable<any> {
    return this.store.select(MailManagementState.getContextVariableById);
  }

  getMailContentPartList(): Observable<any> {
    return this.store.select(MailManagementState.getMailContentPartList);
  }

  getMailContentPartById(): Observable<any> {
    return this.store.select(MailManagementState.getMailContentPartById);
  }

  loadMailDescriptionList(force: boolean, filter: any): Observable<MailManagementState> {
    return this.store.dispatch(new GetMailDescriptionListAction(force, filter));
  }

  loadMailDescriptionById(id: number): Observable<MailManagementState> {
    return this.store.dispatch(new GetMailDescriptionByIdAction(id));
  }

  saveMailDescription(mailDescription: any): Observable<MailManagementState> {
    return this.store.dispatch(new SaveMailDescriptionAction(mailDescription));
  }

  updateMailDescription(id: number, mailDescription: any): Observable<MailManagementState> {
    return this.store.dispatch(new UpdateMailDescriptionAction(id, mailDescription));
  }

  deleteMailDescriptionById(id: number): Observable<MailManagementState> {
    return this.store.dispatch(new DeleteMailDescriptionByIdAction(id));
  }

  loadContextVariableList(): Observable<MailManagementState> {
    return this.store.dispatch(new GetContextVariableListAction());
  }

  loadContextVariableById(id: number): Observable<MailManagementState> {
    return this.store.dispatch(new GetContextVariableByIdAction(id));
  }

  saveContextVariable(contextVariable: any): Observable<MailManagementState> {
    return this.store.dispatch(new SaveContextVariableAction(contextVariable));
  }

  updateContextVariable(id: number, contextVariable: any): Observable<MailManagementState> {
    return this.store.dispatch(new UpdateContextVariableAction(id, contextVariable));
  }

  deleteContextVariableById(id: number): Observable<MailManagementState> {
    return this.store.dispatch(new DeleteContextVariableByIdAction(id));
  }

  loadMailContentPartList(): Observable<MailManagementState> {
    return this.store.dispatch(new GetMailContentPartListAction());
  }

  loadMailContentPartById(id: number): Observable<MailManagementState> {
    return this.store.dispatch(new GetMailContentPartByIdAction(id));
  }

  saveMailContentPart(mailContentPart: any): Observable<MailManagementState> {
    return this.store.dispatch(new SaveMailContentPartAction(mailContentPart));
  }

  updateMailContentPart(id: number, mailContentPart: any): Observable<MailManagementState> {
    return this.store.dispatch(new UpdateMailContentPartAction(id, mailContentPart));
  }

  deleteMailContentPartById(id: number): Observable<MailManagementState> {
    return this.store.dispatch(new DeleteMailContentPartByIdAction(id));
  }

}
