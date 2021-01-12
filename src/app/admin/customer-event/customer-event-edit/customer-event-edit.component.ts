import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';

@Component({
  selector: 'app-customer-event-edit',
  templateUrl: './customer-event-edit.component.html',
  styleUrls: ['./customer-event-edit.component.css']
})
export class CustomerEventEditComponent implements OnInit, OnDestroy {
  id: any;
  eventForm: FormGroup;
  isForce = false;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly el: ElementRef) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.scrollTop();
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.systemUtilityService.loadCustomerEventTypeById(this.id);
      this.loadCredentialTypeById();
    }
  }
  scrollTop() {
    window.scroll(0, 0);
  }

  loadCredentialTypeById() {
    this.subscriptions.add(this.systemUtilityService.getCustomerEventTypeById().pipe(skipWhile((item: any) => !item))
      .subscribe((customerEventType: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/customerEvent/customerEventTypeEdit'], { queryParams: { 'id': customerEventType.id } });
        }
        this.setForm(customerEventType);
      }));
  }

  setForm(event: any) {
    this.eventForm = this.formBuilder.group({
      id: [event !== undefined ? event.id : null],
      customerEventTypeId: [event !== undefined ? event.customerEventTypeId : null],
      eventCode: [event !== undefined ? event.eventCode : '', Validators.required],
      eventName: [event !== undefined ? event.eventName : '', Validators.required],
      description: [event !== undefined ? event.description : ''],
      shared: [event !== undefined ? event.shared : false],
      onlyOne: [event !== undefined ? event.onlyOne : false],
    });
  }

  back() {
    this.router.navigate(['admin/customerEvent/customerEventTypeList'], { queryParams: { 'force': this.isForce } });
  }
  delete() {
    if (confirm('Are you sure you want to delete?')) {
      this.subscriptions.add(this.systemUtilityService.deleteCustomerEventTypeById(this.id).pipe(skipWhile((item: any) => !item))
        .subscribe((response: any) => {
          this.router.navigate(['admin/customerEvent/customerEventTypeList'], { queryParams: { 'force': true } });
        }));
    }
  }

  save() {
    if (this.eventForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.subscriptions.add(this.systemUtilityService.updateCustomerEventType(this.id, this.eventForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.scrollTop();
            this.loadCredentialTypeById();
          }));
      } else {
        this.subscriptions.add(this.systemUtilityService.saveCustomerEventType(this.eventForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.scrollTop();
            this.loadCredentialTypeById();
          }));
      }
    } else {
      this.validateAllFormFields(this.eventForm);
    }
  }
  // validateForm() {
  //   for (const key of Object.keys(this.eventForm.controls)) {
  //     if (this.eventForm.controls[key].invalid) {
  //       const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
  //       invalidControl.focus();
  //       break;
  //     }
  //   }
  // }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  get f() { return this.eventForm.controls; }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
