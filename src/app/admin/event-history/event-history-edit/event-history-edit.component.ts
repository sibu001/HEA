import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { AdministrativeService } from 'src/app/store/administrative-state-management/service/administrative.service';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';


@Component({
  selector: 'app-event-history-edit',
  templateUrl: './event-history-edit.component.html',
  styleUrls: ['./event-history-edit.component.css']
})
export class EventHistoryEditComponent implements OnInit, OnDestroy {

  customerEventId: any;
  customerId: any;
  customerList: any = [];
  eventForm: FormGroup;
  eventTypeData: Array<any>;
  isForce = false;
  customerData: any;
  userId: any;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(
    private readonly fb: FormBuilder,
    private readonly administrativeService: AdministrativeService,
    private readonly activateRoute: ActivatedRoute,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly customerService: CustomerService,
    private readonly router: Router,
    private readonly el: ElementRef) {

    this.activateRoute.queryParams.subscribe(params => {
      this.customerEventId = params['customerEventId'];
      this.customerId = params['customerId'];
    });
  }

  ngOnInit() {
    this.loadCustomerEventType();
    this.setForm(undefined);
    if (this.customerEventId !== undefined && this.customerId !== undefined) {
      this.loadEventHistoryById();
    }
  }

  loadCustomerById() {
    this.customerService.loadCustomerById(this.customerId);
    this.subscriptions.add(this.customerService.getCustomerById().pipe(skipWhile((item: any) => !item))
      .subscribe((customer: any) => {
        this.customerData = customer;

      }));
  }
  setForm(event: any) {
    this.eventForm = this.fb.group({
      id: [event !== undefined ? event.id : null],
      customerEventId: [event !== undefined ? event.customerEventId : null],
      customerEventTypeId: [event !== undefined ? event.customerEventTypeId : null],
      auditId: [this.customerData !== undefined ? this.customerData.auditId : '', Validators.required],
      customerName: [this.customerData !== undefined ? this.customerData.user.name : '', Validators.required],
      customerId: [event !== undefined ? event.customerId : ''],
      eventDatetime: [event !== undefined ? new Date(event.eventDatetime) : ''],
      eventCode: [event !== undefined ? event.eventCode : ''],
      description: [event !== undefined ? event.description : ''],
      modifyAllowed: [event !== undefined ? event.modifyAllowed : ''],
      linkedPersonType: [event !== undefined ? event.linkedPersonType : ''],
      linkedPersonName: [event !== undefined ? event.linkedPersonName : ''],
      customerEventType: this.fb.group({
        id: [event !== undefined ? event.customerEventType.id : ''],
        customerEventTypeId: [event !== undefined ? event.customerEventType.customerEventTypeId : ''],
        description: [event !== undefined ? event.customerEventType.description : ''],
        eventCode: [event !== undefined ? event.customerEventType.eventCode : ''],
        eventName: [event !== undefined ? event.customerEventType.eventName : ''],
        onlyOne: [event !== undefined ? event.customerEventType.onlyOne : null],
        shared: [event !== undefined ? event.customerEventType.shared : null],
      })
    });
  }

  loadCustomerEventType() {
    this.systemUtilityService.loadCustomerEventTypeList(true, '');
    this.subscriptions.add(this.systemUtilityService.getCustomerEventTypeList().pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.eventTypeData = response;
      }));
  }

  getCustomerList(url: any) {
    this.subscriptions.add(this.administrativeService.loadCustomerList(url).pipe(skipWhile((item: any) => !item))
      .subscribe((customerList: any) => {
        this.customerList = customerList.administrativeManagement.customerList.list;
      }));
  }
  handleAutoComplete(event: any): any {
    // console.log(event.option.value);
    this.eventForm.controls['auditId'].setValue(event.option.value.auditId);
    this.eventForm.controls['customerName'].setValue(event.option.value.user.name);
  }

  search(event: any) {
    const params = new HttpParams()
      .set('filter.pageSize', '5')
      .set('filter.startRow', '0')
      .set('loadCustomers', 'true')
      .set('filter.customerName', '%' + event);
    this.getCustomerList(params);
  }

  changeDropDownValue(event: any) {
    const i = this.eventTypeData.findIndex((item: any) => item.eventCode === event.target.value);
    if (i !== -1) {
      const customerEventType = this.eventForm.controls.customerEventType as FormGroup;
      customerEventType.controls['eventCode'].setValue(this.eventTypeData[i].eventCode);
      customerEventType.controls['description'].setValue(this.eventTypeData[i].description);
      this.eventForm.controls['customerEventTypeId'].setValue(this.eventTypeData[i].customerEventTypeId);
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
    this.subscriptions.add(this.customerService.loadCustomerById(this.customerId).pipe(skipWhile((item: any) => !item))
      .subscribe((customer: any) => {
        this.customerData = customer.customerManagement.customer;
        this.administrativeService.loadEventHistoryById(this.customerId, this.customerEventId);
        this.subscriptions.add(this.administrativeService.getEventHistoryById().pipe(skipWhile((item: any) => !item))
          .subscribe((eventHistory: any) => {
            if (this.isForce) {
              this.router.navigate(['admin/eventHistory/eventHistoryEdit'], { queryParams: { 'id': eventHistory.data.id } });
            }
            this.setForm(eventHistory.data);
          }));
      }));

  }


  back() {
    this.router.navigate(['admin/eventHistory/eventHistoryList'], { queryParams: { 'force': this.isForce } });
  }
  delete() {
    this.subscriptions.add(this.administrativeService.deleteEventHistoryById(this.customerId, this.customerEventId).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.router.navigate(['admin/eventHistory/eventHistoryList'], { queryParams: { 'force': true } });
      }));
  }

  save() {
    if (this.eventForm.valid) {
      if (this.customerEventId !== null && this.customerEventId !== undefined) {
        this.subscriptions.add(this.administrativeService.updateEventHistory(this.customerId, this.customerEventId, this.eventForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.customerEventId = response.data.id;
            this.customerId = response.data.customerId;
            this.isForce = true;
            this.loadEventHistoryById();
          }));
      } else {
        this.subscriptions.add(this.administrativeService.saveEventHistory(this.customerData.customerId, this.eventForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.customerEventId = response.data.id;
            this.customerId = response.data.customerId;
            this.isForce = true;
            this.loadEventHistoryById();
          }));
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
