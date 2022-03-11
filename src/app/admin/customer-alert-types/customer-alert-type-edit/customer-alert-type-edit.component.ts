import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-customer-alert-type-edit',
  templateUrl: './customer-alert-type-edit.component.html',
  styleUrls: ['./customer-alert-type-edit.component.css']
})
export class CustomerAlertTypeEditComponent implements OnInit, OnDestroy {
  customerAlertTypeForm: FormGroup;
  id: any;
  isForce = false;
  private readonly subscriptions: Subscription = new Subscription();
  eventType: any;
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemService: SystemService,
    private readonly activateRoute: ActivatedRoute,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly router: Router,
    private readonly el: ElementRef) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.scrollTop();
    this.loadCustomerEventTypeList();
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.systemService.loadCustomerAlertTypeById(Number(this.id));
      this.loadCustomerAlertTypeById();
    }
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  loadCustomerAlertTypeById() {
    this.subscriptions.add(this.systemService.getCustomerAlertTypeById().pipe(skipWhile((item: any) => !item))
      .subscribe((customerAlertType: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/customer-alert/customerAlertTypeEdit'], { queryParams: { 'id': customerAlertType.id } });
        }
        this.setForm(customerAlertType);
      }));
  }

  loadCustomerEventTypeList() {
    this.systemUtilityService.loadCustomerEventTypeList(true, '');
    this.subscriptions.add(this.systemUtilityService.getCustomerEventTypeList().pipe(skipWhile((item: any) => !item))
      .subscribe((credentialTypeList: any) => {
        this.eventType = credentialTypeList;
      }));
  }

  setForm(event: any) {
    this.customerAlertTypeForm = this.formBuilder.group({
      id: [event !== undefined ? event.id : ''],
      alertCode: [event !== undefined ? event.alertCode : '', Validators.required],
      alertName: [event !== undefined ? event.alertName : '', Validators.required],
      customerEventTypeIdDown: [event !== undefined ? event.customerEventTypeIdDown : ''],
      customerEventTypeIdLevel: [event !== undefined ? event.customerEventTypeIdLevel : ''],
      customerEventTypeIdUp: [event !== undefined ? event.customerEventTypeIdUp : ''],
      note: [event !== undefined ? event.note : ''],
      customerAlertTypeId: [event !== undefined ? event.customerAlertTypeId : '']
    });
  }
  back() {
    this.router.navigate(['admin/customer-alert/customerAlertTypeList'], { queryParams: { 'force': this.isForce } });
  }
  delete() {
    if (confirm('Are you sure you want to delete?')) {
      this.subscriptions.add(this.systemService.deleteCustomerAlertTypeById(this.id).pipe(skipWhile((item: any) => !item))
        .subscribe((response: any) => {
          this.router.navigate(['admin/customer-alert/customerAlertTypeList'], { queryParams: { 'force': true } });
        }));
    }
  }

  save() {
    if (this.customerAlertTypeForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.subscriptions.add(this.systemService.updateCustomerAlertType(this.id, this.customerAlertTypeForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.scrollTop();
            this.loadCustomerAlertTypeById();
          }));
      } else {
        this.subscriptions.add(this.systemService.saveCustomerAlertType(this.customerAlertTypeForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.scrollTop();
            this.loadCustomerAlertTypeById();
          }));
      }
    } else {
      this.validateForm();
    }
    this.back(); 
  }
  validateForm() {
    for (const key of Object.keys(this.customerAlertTypeForm.controls)) {
      if (this.customerAlertTypeForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }
  get f() { return this.customerAlertTypeForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
