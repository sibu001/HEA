import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { AdministrativeService } from 'src/app/store/administrative-state-management/service/administrative.service';
import { MailService } from 'src/app/store/mail-state-management/service/mail.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-mail-description-preview',
  templateUrl: './mail-description-preview.component.html',
  styleUrls: ['./mail-description-preview.component.css']
})
export class MailDescriptionPreviewComponent implements OnInit, OnDestroy {
  id: any;
  contentForm: FormGroup;
  mailType: any;
  customerList: any = [];
  users: Users = new Users();
  debugForm: FormGroup;
  errorMessage: any;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly mailService: MailService,
    private readonly administrativeService: AdministrativeService,
    private readonly loginService: LoginService,
    private readonly location: Location) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.users = this.loginService.getUser();
    this.customerList = this.users.searchUserList;
  }


  ngOnInit() {
    this.loadMailType();
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.mailService.loadMailDescriptionById(this.id);
      this.loadMailDescriptionById();
    }
  }

  scrollTop() {
    window.scroll(0, 0);
  }


  loadMailDescriptionById() {
    this.subscriptions.add(this.mailService.getMailDescriptionById().pipe(skipWhile((item: any) => !item))
      .subscribe((mailDescription: any) => {
        this.scrollTop();
        this.setForm(mailDescription.data);
      }));
  }

  loadMailType() {
    this.mailService.loadMailDescriptionList(true, '');
    this.subscriptions.add(this.mailService.getMailDescriptionList().pipe(skipWhile((item: any) => !item))
      .subscribe((mailDescriptionList: any) => {
        this.mailType = mailDescriptionList.data;
      }));
  }

  setForm(event: any) {
    this.contentForm = this.formBuilder.group({
      auditId: [event !== undefined && event.auditId ? event.auditId : ''],
      customerName: [event !== undefined && event.customerName ? event.customerName : ''],
      userId: [''],
      mailDescriptionId: [event !== undefined ? event.mailDescriptionId : ''],
      showHtml: [event !== undefined ? event.showHtml : ''],
      address: [event !== undefined ? event.address : ''],
    });
  }
  back() {
    this.location.back();
  }

  search(event: any) {
    const params = new HttpParams()
      .set('filter.pageSize', '5')
      .set('filter.startRow', '0')
      .set('loadCustomers', 'true')
      .set('filter.customerName', '%' + event);
    this.getCustomerList(params);
  }

  getCustomerList(url: any) {
    this.subscriptions.add(this.administrativeService.loadCustomerList(url).pipe(skipWhile((item: any) => !item))
      .subscribe((customerList: any) => {
        this.customerList = customerList.administrativeManagement.customerList.list;
      }));
  }


  handleAutoComplete(event: any): any {
    this.users.searchUserList[0] = event.option.value;
    this.loginService.setUser(this.users);
    this.contentForm.controls['auditId'].setValue(event.option.value.auditId);
    this.contentForm.controls['customerName'].setValue(event.option.value.user.name);
    this.contentForm.controls['userId'].setValue(event.option.value.user.id);
  }

  save(): any { }

  delete(): any { }

  sendMailToAddress(): any { }

  get f() { return this.contentForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
