import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-trending-chart-definition-edit',
  templateUrl: './trending-chart-definition-edit.component.html',
  styleUrls: ['./trending-chart-definition-edit.component.css']
})
export class TrendingChartDefinitionEditComponent implements OnInit, OnDestroy {

  id: any;
  paneForm: FormGroup;
  chartKeys = TableColumnData.TRENDING_CHART_KEYS;
  public chartDataSource: any;
  public totalElement = 0;
  public chartData = {
    content: [],
    totalElements: 0,
  };
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.setForm(undefined);
  }

  setForm(event: any) {
    this.paneForm = this.formBuilder.group({
      labelTemplate: [event !== undefined ? event.labelTemplate : ''],
      orderNumber: [event !== undefined ? event.orderNumber : ''],
      explanationTemplate: [event !== undefined ? event.explanationTemplate : ''],
      showOnHomePage: [event !== undefined ? event.showOnHomePage : '', Validators.required],
      filter: [event !== undefined ? event.filter : ''],
    });
  }
  back() {
    this.location.back();
  }

  save() {

  }
  delete() {

  }

  addCharts() {
    this.router.navigate(['admin/trendingChartDefinition/trendingChartEdit']);
  }

  goToEditCharts() {
    this.router.navigate(['admin/trendingChartDefinition/trendingChartEdit'], { queryParams: { id: this.id } });
  }

  get f() { return this.paneForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
