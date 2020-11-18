import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-user-report-context-variable',
  templateUrl: './user-report-context-variable.component.html',
  styleUrls: ['./user-report-context-variable.component.css']
})
export class UserReportContextVariableComponent implements OnInit {

  id: any;
  contentForm: FormGroup;
  calculationType = TableColumnData.CALCULATION_TYPE;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }


  ngOnInit() {
    this.setForm(undefined);
    if (this.id !== undefined) {
    }
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
