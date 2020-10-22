import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer-alert-type-edit',
  templateUrl: './customer-alert-type-edit.component.html',
  styleUrls: ['./customer-alert-type-edit.component.css']
})
export class CustomerAlertTypeEditComponent implements OnInit, OnDestroy {
  customerAlertTypeForm: FormGroup;
  id: any;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemService: SystemService,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.systemService.loadCustomerAlertTypeById(Number(this.id));
      this.subscriptions.add(this.systemService.getCustomerAlertTypeById().pipe(skipWhile((item: any) => !item))
        .subscribe((customerAlertType: any) => {
          this.setForm(customerAlertType);
        }));
    }
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
    this.location.back();
  }
  save() {

  }
  delete() {

  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
