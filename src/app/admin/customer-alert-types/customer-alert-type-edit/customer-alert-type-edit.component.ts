import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
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
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemService: SystemService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly el: ElementRef) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.systemService.loadCustomerAlertTypeById(Number(this.id));
      this.loadCustomerAlertTypeById();
    }
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
    this.subscriptions.add(this.systemService.deleteCustomerAlertTypeById(this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.router.navigate(['admin/customer-alert/customerAlertTypeList'], { queryParams: { 'force': true } });
      }));
  }

  save() {
    if (this.customerAlertTypeForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.subscriptions.add(this.systemService.updateCustomerAlertType(this.id, this.customerAlertTypeForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadCustomerAlertTypeById();
          }));
      } else {
        this.subscriptions.add(this.systemService.saveCustomerAlertType(this.customerAlertTypeForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadCustomerAlertTypeById();
          }));
      }
    } else {
      this.validateForm();
    }
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
