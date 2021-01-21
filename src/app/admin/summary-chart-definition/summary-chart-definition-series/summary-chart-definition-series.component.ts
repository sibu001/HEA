import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-summary-chart-definition-series',
  templateUrl: './summary-chart-definition-series.component.html',
  styleUrls: ['./summary-chart-definition-series.component.css']
})
export class SummaryChartDefinitionSeriesComponent implements OnInit, OnDestroy {

  id: any;
  chartForm: FormGroup;
  private readonly subscriptions: Subscription = new Subscription();
  colorData = TableColumnData.COLOR_DATA;
  keys: TABLECOLUMN[] = TableColumnData.DATA_SET_KEYS;
  seriesQueryList = TableColumnData.SERIES_QUERY_TYPE;
  data = {
    content: [],
    totalElements: 0
  };
  dataSource: any;
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
    if (this.id !== undefined) {
    }
  }

  setForm(event: any): any {
    this.chartForm = this.formBuilder.group({
      seriesCode: [event !== undefined ? event.chartCode : '', Validators.required],
      seriesName: [event !== undefined ? event.orderNumber : ''],
      orderNumber: [event !== undefined ? event.toolType : 'jfreechart'],
      seriesQueryType: [event !== undefined ? event.freeChartIncludeJSTemplate : ''],
      seriesQuery: [event !== undefined ? event.freeChartConfigurationJSTemplate : ''],
      seriesColor: [event !== undefined ? event.freeChartDivTemplate : ''],
      seriesStrokeWidth: [event !== undefined ? event.chartType : ''],
    });
  }

  saveRow(): any { }

  back(): any {
    this.location.back();
  }

  save(): any {

  }
  delete(): any {

  }

  get f() { return this.chartForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
