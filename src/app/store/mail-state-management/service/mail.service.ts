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
  GenerateEmbedImageAction,
  GetContextVariableByIdAction,
  GetContextVariableListAction,
  GetCustomerGroupListByMailDescriptionIdAction,
  GetCustomerGroupMailPartByIdAction,
  GetCustomerGroupMailPartCountAction,
  GetCustomerGroupMailPartListAction,
  GetMailConfigurationListAction,
  GetMailContentPartByIdAction,
  GetMailContentPartListAction,
  GetMailDescriptionByIdAction,
  GetMailDescriptionCountAction,
  GetMailDescriptionListAction,
  MailDescriptionProcessAction,
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

  getMailDescriptionById(): Observable<any> {
    return this.store.select(MailManagementState.getMailDescriptionById);
  }

  getContextVariableList(): Observable<any> {
    return this.store.select(MailManagementState.getContextVariableList);
  }

  getMailConfigurationList(): Observable<any> {
    return this.store.select(MailManagementState.getMailConfigurationList);
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

  loadMailDescriptionCount(filter: any): Observable<MailManagementState> {
    return this.store.dispatch(new GetMailDescriptionCountAction(filter));
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

  loadMailConfigurationList(): Observable<MailManagementState> {
    return this.store.dispatch(new GetMailConfigurationListAction());
  }

  loadContextVariableList(mailDescriptionId: any): Observable<MailManagementState> {
    return this.store.dispatch(new GetContextVariableListAction(mailDescriptionId));
  }

  loadContextVariableById(mailDescriptionId: any, mailVariableId: number): Observable<MailManagementState> {
    return this.store.dispatch(new GetContextVariableByIdAction(mailDescriptionId, mailVariableId));
  }

  saveContextVariable(mailDescriptionId: any, contextVariable: any): Observable<MailManagementState> {
    return this.store.dispatch(new SaveContextVariableAction(mailDescriptionId, contextVariable));
  }

  updateContextVariable(mailDescriptionId: any, mailVariableId: number, contextVariable: any): Observable<MailManagementState> {
    return this.store.dispatch(new UpdateContextVariableAction(mailDescriptionId, mailVariableId, contextVariable));
  }

  deleteContextVariableById(mailDescriptionId: any, mailVariableId: number): Observable<MailManagementState> {
    return this.store.dispatch(new DeleteContextVariableByIdAction(mailDescriptionId, mailVariableId));
  }

  loadMailContentPartList(mailDescriptionId: any): Observable<MailManagementState> {
    return this.store.dispatch(new GetMailContentPartListAction(mailDescriptionId));
  }

  loadMailContentPartById(mailDescriptionId: any, mailContentId: number): Observable<MailManagementState> {
    return this.store.dispatch(new GetMailContentPartByIdAction(mailDescriptionId, mailContentId));
  }

  saveMailContentPart(mailDescriptionId: any, mailContentObj: any): Observable<MailManagementState> {
    return this.store.dispatch(new SaveMailContentPartAction(mailDescriptionId, mailContentObj));
  }

  updateMailContentPart(mailDescriptionId: any, mailContentId: number, mailContentObj: any): Observable<MailManagementState> {
    return this.store.dispatch(new UpdateMailContentPartAction(mailDescriptionId, mailContentId, mailContentObj));
  }

  deleteMailContentPartById(mailDescriptionId: any, mailContentId: number): Observable<MailManagementState> {
    return this.store.dispatch(new DeleteMailContentPartByIdAction(mailDescriptionId, mailContentId));
  }

  generateEmbedImage(mailDescriptionId: any, mailContentId: number, fileObj: any, params: any): Observable<MailManagementState> {
    return this.store.dispatch(new GenerateEmbedImageAction(mailDescriptionId, mailContentId, fileObj, params));
  }

  mailDescriptionProcess(mailDescriptionId: any): Observable<MailManagementState> {
    return this.store.dispatch(new MailDescriptionProcessAction(mailDescriptionId));
  }

  loadCustomerGroupListByMailDescriptionId(mailDescriptionId: any): Observable<MailManagementState> {
    return this.store.dispatch(new GetCustomerGroupListByMailDescriptionIdAction(mailDescriptionId));
  }

  assignCustomerGroupToMailDescription(mailDescriptionId: any, groupCode: any, params: any): Observable<MailManagementState> {
    return this.store.dispatch(new AssignCustomerGroupToMailDescriptionAction(mailDescriptionId, groupCode, params));
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
