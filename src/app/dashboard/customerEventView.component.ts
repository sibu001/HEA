import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { AdministrativeService } from 'src/app/store/administrative-state-management/service/administrative.service';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { AppConstant } from '../utility/app.constant';

@Component({
  selector: 'customerEventView',
  templateUrl: './customerEventView.component.html',
  styleUrls: ['./customerEventView.component.css']
})
export class customerEventViewComponent implements OnInit, OnDestroy {
  users: Users = new Users();
  customerEventId: any;
  customerId: any;
  customerList: any = [];
  eventForm: FormGroup;
  eventTypeData: Array<any>;
  isForce = false;
  customerData: any;
  userId: any;
  addRequest : boolean = false;
  linkedPersonType: any;
  eventData : any = { modifyAllowed : true };
  dateFormat : string = AppConstant.DATE_SELECTION_FORMAT;
  private readonly subscriptions: Subscription = new Subscription();
  date: Date;
  constructor(
    private readonly fb: FormBuilder,
    private readonly loginService: LoginService,
    private readonly administrativeService: AdministrativeService,
    private readonly activateRoute: ActivatedRoute,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly customerService: CustomerService,
    private readonly router: Router,
    private readonly el: ElementRef) {
    this.date = new Date();
    this.users = this.loginService.getUser();
    this.customerList = this.users.searchUserList;
    if (this.customerList.length > 0) {
      this.customerData = this.customerList[0];
    }
    this.activateRoute.queryParams.subscribe(params => {
      this.customerEventId = params['customerEventId'];
      this.customerId = params['customerId'];
      this.addRequest = params['addRequest'];
    });
    this.setForm(undefined);
  }

  setTodayDate(){
    setTimeout(()=> { this.eventForm.patchValue({eventDatetime : this.date}); }, 200);
  }

  ngOnInit() {
    
    this.getEventHistoryById();
    if (this.customerEventId !== undefined && this.customerId !== undefined) {
      this.loadEventHistoryById();
    }else{
      this.setTodayDate();
    }
    this.loadCustomerEventType();
    this.scrollTop();
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  setForm(event: any) {
    let linkedPerson = 'Staff';
    this.linkedPersonType = event && event.linkedPersonType ? event.linkedPersonType : null;
    if (event && event.linkedPersonType === 1) {
      linkedPerson = 'Customer';
    } else if (event && event.linkedPersonType === 2) {
      linkedPerson = 'Staff';
    } else if (event && event.linkedPersonType === 3) {
      linkedPerson = 'Partner';
    }
    this.eventForm = this.fb.group({
      id: [event !== undefined ? event.id : null],
      customerEventId: [event !== undefined ? event.customerEventId : null],
      customerEventTypeId: [event !== undefined ? event.customerEventTypeId : null],
      customerId: [event !== undefined ? event.customerId : ''],
      eventDatetime: [event !== undefined ? new Date(event.eventDatetime) : this.date],
      description: [event !== undefined ? event.description : ''],
      linkedUserId: [event !== undefined ? event.linkedUserId : ''],
      customerEventType: this.fb.group({
        customerEventTypeId: [event && event.customerEventType ? event.customerEventType.customerEventTypeId : ''],
        description: [event && event.customerEventType ? event.customerEventType.description : ''],
        eventCode: [event && event.customerEventType ? event.customerEventType.eventCode : ''],
        eventName: [event && event.customerEventType ? event.customerEventType.eventName : ''],
        onlyOne: [event && event.customerEventType ? event.customerEventType.onlyOne : null],
        shared: [event && event.customerEventType ? event.customerEventType.shared : null],
        id: [event && event.customerEventType ? event.customerEventType.id : ''],
      }),
      createdBy: [event !== undefined ? event.createdBy : ''],
    });
  }

  loadCustomerEventType() {
    this.systemUtilityService.loadCustomerEventTypeList(true, '',true);
    this.subscriptions.add(this.systemUtilityService.getAllCustomerEventTypeList().pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.eventTypeData = response;
          if (!this.customerEventId) {
            const customerEventType: any = this.eventForm.controls.customerEventType;
            customerEventType.controls['eventCode'].setValue(this.eventTypeData[0].eventCode);
            customerEventType.controls['description'].setValue(this.eventTypeData[0].description);
            this.eventForm.controls['customerEventTypeId'].setValue(this.eventTypeData[0].customerEventTypeId);
          }
      }));
  }

  changeDropDownValue(event: any) {
    const i = this.eventTypeData.findIndex((item: any) => item.eventCode === event.target.value);
    if (i !== -1) {
      const customerEventType: any = this.eventForm.controls.customerEventType;
      customerEventType.controls['eventCode'].setValue(this.eventTypeData[i].eventCode);
      customerEventType.controls['description'].setValue(this.eventTypeData[i].description);
      this.eventForm.controls['customerEventTypeId'].setValue(this.eventTypeData[i].customerEventTypeId);
      this.eventData.customerEventType = this.eventTypeData[i];
    }
  }
  validateForm() {
    for (const key of Object.keys(this.eventForm.controls)) {
      if (this.eventForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }

  loadEventHistoryById() {
    this.administrativeService.loadEventHistoryById(this.customerId, this.customerEventId);
  }

  getEventHistoryById(){
    this.subscriptions.add(this.administrativeService.getEventHistoryById()
    .pipe(skipWhile((item: any) => !item))
    .subscribe((eventHistory: any) => {
      if(!this.addRequest)
        this.eventData = eventHistory;
      
      if (this.isForce) {
        this.customerId = eventHistory.customerId;
        this.customerEventId = eventHistory.customerEventId;
        this.router.navigate(['customerEventView'], { queryParams: { customerEventId: this.customerEventId, customerId: this.customerId } });
      }
      this.setForm(this.eventData);
    }));
  }

  back() {
    this.router.navigate(['customerEventList'], { queryParams: { 'force': this.isForce } });
  }
  delete() {
    this.subscriptions.add(
      this.administrativeService.deleteEventHistoryById(this.customerId, this.customerEventId)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.router.navigate(['customerEventList'], { queryParams: { 'force': true } });
      }));
  }

  save() {
    if (this.eventForm.valid) {
      this.eventForm.value.linkedPersonType = this.linkedPersonType;
      this.eventForm.value.eventDatetime = this.eventForm.value.eventDatetime ? new Date(this.eventForm.value.eventDatetime).getTime() : '';
      this.isForce = true;
      this.addRequest = false;
      if (this.customerEventId !== null && this.customerEventId !== undefined) {
        let payload = {...this.eventForm.value};
        Object.assign(this.eventData, payload);
        this.administrativeService.updateEventHistory(this.customerId, this.customerEventId, this.eventData);
      } else {
        this.eventForm.value.modifyAllowed = true;
        this.administrativeService.saveEventHistory(this.customerId, this.eventForm.value);
      }
    } else {
      this.validateForm();
    }
  }

  get f() { return this.eventForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
