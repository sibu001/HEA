import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
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

  id: any;
  eventForm: FormGroup;
  eventTypeData: Array<any>;
  isForce = false;
  userId: any;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(
    private readonly fb: FormBuilder,
    private readonly administrativeService: AdministrativeService,
    private readonly activateRoute: ActivatedRoute,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly router: Router,
    private readonly el: ElementRef) {

    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.administrativeService.loadEventHistoryById(this.id);
      this.loadEventHistoryById();
    }
  }
  setForm(event: any) {
    this.eventForm = this.fb.group({
      id: [event !== undefined ? event.id : ''],
      auditId: [event !== undefined ? event.auditId : '', Validators.required],
      customerName: [event !== undefined ? event.customerName : '', Validators.required],
      eventType: [event !== undefined ? event.eventType : ''],
      eventDate: [event !== undefined ? event.eventDate : ''],
      additionalComments: [event !== undefined ? event.additionalComments : '']
    });
  }

  loadCustomerEventType() {
    this.systemUtilityService.loadCustomerEventTypeList(false,'');
    this.subscriptions.add(this.systemUtilityService.getCustomerEventTypeList().pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.eventTypeData = response;
      }));
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
    this.subscriptions.add(this.administrativeService.getEventHistoryById().pipe(skipWhile((item: any) => !item))
      .subscribe((eventHistory: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/eventHistory/eventHistoryEdit'], { queryParams: { 'id': eventHistory.id } });
        }
        this.setForm(eventHistory);
      }));
  }


  back() {
    this.router.navigate(['admin/eventHistory/eventHistoryList'], { queryParams: { 'force': this.isForce } });
  }
  delete() {
    this.subscriptions.add(this.administrativeService.deleteEventHistoryById(this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.router.navigate(['admin/eventHistory/eventHistoryList'], { queryParams: { 'force': true } });
      }));
  }

  save() {
    if (this.eventForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.subscriptions.add(this.administrativeService.updateEventHistory(this.id, this.eventForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadEventHistoryById();
          }));
      } else {
        this.subscriptions.add(this.administrativeService.saveEventHistory(this.eventForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
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
