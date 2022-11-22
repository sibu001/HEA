import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-trending-chart-definition-series',
  templateUrl: './trending-chart-definition-series.component.html',
  styleUrls: ['./trending-chart-definition-series.component.css']
})
export class TrendingChartDefinitionSeriesComponent implements OnInit, OnDestroy {
  id: any;
  chartForm: FormGroup;
  private readonly subscriptions: Subscription = new Subscription();
  colorData = TableColumnData.COLOR_DATA;
  keys: TABLECOLUMN[] = TableColumnData.DATA_SET_KEYS;
  seriesQueryTypeList: any[] = TableColumnData.SERIES_QUERY_TYPE;
  paneId :number;
  chartSeriesData : any;
  chartId: number;
  data = {
    content: [],
    totalElements: 0
  };
  dataSource: any;
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly topicService: TopicService,
    private readonly router: Router) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.paneId = params['paneId'];
      this.chartId = params['chartId'];
    });
  }


  ngOnInit() {
    this.setForm(undefined);
    if(this.paneId && this.chartId){
      this.getChartSerisesById();
      this.loadChartSerisesById();
    }
  }

  loadChartSerisesById() {
    this.topicService.loadChartSerisesById(this.paneId,this.chartId,this.id)
  }

  getChartSerisesById() {
    this.topicService.getChartSeriesById()
    .pipe(filter(data => this.paneId && this.chartId && data !== undefined))
    .subscribe(
      response => {
        this.chartSeriesData = response;
        this.setForm(response);
      }
    );
  }

  // setForm(event: any): any {
  //   this.chartForm = this.formBuilder.group({
  //     seriesCode: [event !== undefined ? event.Code : '', Validators.required],
  //     seriesName: [event !== undefined ? event.orderNumber : ''],
  //     orderNumber: [event !== undefined ? event.toolType : 'jfreechart'],
  //     seriesQueryType: [event !== undefined ? event.freeChartIncludeJSTemplate : ''],
  //     seriesQuery: [event !== undefined ? event.freeChartConfigurationJSTemplate : ''],
  //     seriesColor: [event !== undefined ? event.freeChartDivTemplate : ''],
  //     seriesStrokeWidth: [event !== undefined ? event.chartType : ''],
  //   });
  // }

  setForm(event: any): any {
    this.chartForm = this.formBuilder.group({
      seriesCode: [event !== undefined ? event.seriesCode : '', Validators.required],
      seriesName: [event !== undefined ? event.seriesName : ''],
      orderNumber: [event !== undefined ? event.orderNumber : 'jfreechart'],
      seriesQueryType: [event !== undefined ? event.seriesQueryType : ''],
      seriesQuery: [event !== undefined ? event.seriesQuery : ''],
      seriesColor: [event !== undefined ? ( event.seriesColor ? event.seriesColor : 'default') : 'default'],
      seriesStrokeWidth: [event !== undefined ? event.seriesStrokeWidth : ''],
    });
  }

  saveRow(): any { }

  back(): any {
    this.location.back();
  }

  save(): any {

    if(this.id){
      const body = Object.assign(this.chartSeriesData,this.chartForm.value);
      this.topicService.saveExistingChartSeries(this.paneId,this.chartId,this.id,body);
    }else{
      this.topicService.saveNewChartSeries(this.paneId,this.chartId,this.chartForm.value);
    }
  }

  delete(): any {
    this.topicService.deleteChartSeries(this.paneId,this.chartId,this.id);
    this.setForm(undefined);
    this.back();
  }

  addChartDataSeries(){
  }

  get f() { return this.chartForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
