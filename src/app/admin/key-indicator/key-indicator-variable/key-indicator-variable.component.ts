import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-key-indicator-variable',
  templateUrl: './key-indicator-variable.component.html',
  styleUrls: ['./key-indicator-variable.component.css']
})
export class KeyIndicatorVariableComponent implements OnInit, OnDestroy {
  id: any;
  contentForm: FormGroup;
  calculationType: any;
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
    this.loadCalculationType();
    this.setForm(undefined);
    if (this.id !== undefined) {
    }
  }

  loadCalculationType() {
    this.systemService.loadCalculationTypeList();
    this.subscriptions.add(this.systemService.getCalculationTypeList().pipe(skipWhile((item: any) => !item))
      .subscribe((calculationType: any) => {
        this.calculationType = calculationType.data;
      }));
  }

  setForm(event: any) {
    this.contentForm = this.formBuilder.group({
      field: [event !== undefined ? event.field : '', Validators.required],
      orderNumber: [event !== undefined ? event.orderNumber : '', Validators.required],
      calculationType: [event !== undefined ? event.calculationType : ''],
      calculationExpression: [event !== undefined ? event.calculationExpression : '']
    });
  }
  back() {
    this.location.back();
  }

  save(): any { }

  delete(): any { }

  get f() { return this.contentForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
