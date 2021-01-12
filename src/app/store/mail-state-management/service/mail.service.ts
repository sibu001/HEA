import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  AssignCustomerGroupToMailDescriptionAction,
  DeleteContextVariableByIdAction,
  DeleteCustomerGroupMailPartByIdAction,
  DeleteMailContentPartByIdAction,
  DeleteMailDescriptionByIdAction,
  DeleteMailDescriptionCustomerGroupAction,
  GetContextVariableByIdAction,
  GetContextVariableListAction,
  GetCustomerGroupListByMailDescriptionIdAction,
  GetCustomerGroupMailPartByIdAction,
  GetCustomerGroupMailPartCountAction,
  GetCustomerGroupMailPartListAction,
  GetMailContentPartByIdAction,
  GetMailContentPartListAction,
  GetMailDescriptionByIdAction,
  GetMailDescriptionListAction,
  SaveContextVariableAction,
  SaveCustomerGroupMailPartAction,
  SaveMailContentPartAction,
  SaveMailDescriptionAction,
  UpdateContextVariableAction,
  UpdateCustomerGroupMailPartAction,
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

  getMailDescriptionDataSourceList(): Observable<any> {
    return this.store.select(MailManagementState.getMailDescriptionDataSourceList);
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

  getCustomerGroupMailPartList(): Observable<any> {
    return this.store.select(MailManagementState.getCustomerGroupMailPartList);
  }

  getCustomerGroupMailPartById(): Observable<any> {
    return this.store.select(MailManagementState.getCustomerGroupMailPartById);
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

  loadCustomerGroupListByMailDescriptionId(force: boolean, mailDescriptionId: any): Observable<MailManagementState> {
    return this.store.dispatch(new GetCustomerGroupListByMailDescriptionIdAction(force, mailDescriptionId));
  }

  assignCustomerGroupToMailDescription(mailDescriptionId: any, groupCode: any): Observable<MailManagementState> {
    return this.store.dispatch(new AssignCustomerGroupToMailDescriptionAction(mailDescriptionId, groupCode));
  }

  deleteCustomerGroupByMailDescriptionId(mailDescriptionId: any, groupCode: any): Observable<MailManagementState> {
    return this.store.dispatch(new DeleteMailDescriptionCustomerGroupAction(mailDescriptionId, groupCode));
  }

  loadCustomerGroupMailPartList(force: boolean, filter: any): Observable<MailManagementState> {
    return this.store.dispatch(new GetCustomerGroupMailPartListAction(force, filter));
  }

  loadCustomerGroupMailPartCount(filter: any): Observable<MailManagementState> {
    return this.store.dispatch(new GetCustomerGroupMailPartCountAction(filter));
  }

  loadCustomerGroupMailPartById(id: number): Observable<MailManagementState> {
    return this.store.dispatch(new GetCustomerGroupMailPartByIdAction(id));
  }

  saveCustomerGroupMailPart(customer: any): Observable<MailManagementState> {
    return this.store.dispatch(new SaveCustomerGroupMailPartAction(customer));
  }

  updateCustomerGroupMailPart(id: number, customer: any): Observable<MailManagementState> {
    return this.store.dispatch(new UpdateCustomerGroupMailPartAction(id, customer));
  }

  deleteCustomerGroupMailPartById(id: number): Observable<MailManagementState> {
    return this.store.dispatch(new DeleteCustomerGroupMailPartByIdAction(id));
  }
}
