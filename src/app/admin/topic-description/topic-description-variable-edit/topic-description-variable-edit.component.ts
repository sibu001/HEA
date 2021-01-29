import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-topic-description-variable-edit',
  templateUrl: './topic-description-variable-edit.component.html',
  styleUrls: ['./topic-description-variable-edit.component.css']
})
export class TopicDescriptionVariableEditComponent implements OnInit, OnDestroy {
  id: any;
  variableForm: FormGroup;
  calculationPeriodList: any[] = TableColumnData.CALCULATION_PERIOD;
  calculationTypeList: any[] = [];
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly systemService: SystemService,
    private readonly location: Location,
    private readonly router: Router) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }


  ngOnInit() {
    this.loadCalculationTypeList();
    this.setForm(undefined);
    if (this.id !== undefined) {
    }
  }

  loadCalculationTypeList(): any {
    this.systemService.loadCalculationTypeList();
    this.subscriptions.add(this.systemService.getCalculationTypeList().pipe(skipWhile((item: any) => !item))
      .subscribe((calculationTypeList: any) => {
        this.calculationTypeList = calculationTypeList.data;
      }));
  }

  setForm(event: any): any {
    this.variableForm = this.formBuilder.group({
      field: [event !== undefined ? event.field : '', Validators.required],
      calculationType: [event !== undefined ? event.calculationType : '1'],
      calculationExpression: [event !== undefined ? event.calculationExpression : ''],
      calculationPeriod: [event !== undefined ? event.calculationPeriod : ''],
      comments: [event !== undefined ? event.comments : ''],
    });
  }

  goToDebug() {
    this.router.navigate(['/admin/debug/scriptDebugConsole'], { queryParams: {} });
  }
  back(): any {
    this.location.back();
  }

  save(): any {

  }
  delete(): any {

  }

  copy(): any {

  }

  recalculate() {

  }

  get f() { return this.variableForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
