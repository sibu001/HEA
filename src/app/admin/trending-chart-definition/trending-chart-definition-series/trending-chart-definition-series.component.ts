import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
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
  seriesQueryTypeList: any[];
  paneId :number;
  topicDescriptionId : Number ;
  paneChartId : number;
  chartSeriesData : any;
  chartId: number;
  toggleSaveButton: boolean = true;
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
      this.topicDescriptionId = params['topicDescriptionId'];
      this.paneChartId = params['paneChartId'];
    });
  }


  ngOnInit() {
    this.setForm(undefined);

    this.getChartSeriesLookupValues();
    this.loadChartSeriesLookupValues();

    if(this.id){
      this.getChartSerisesById();
      this.loadChartSerisesById();
    }
  }

  loadChartSerisesById() {
    this.topicService.loadChartSerisesById(this.paneId,this.chartId,this.id)
  }

  getChartSerisesById() {
    this.topicService.getChartSeriesById()
    .pipe(filter(data => data !== undefined))
    .subscribe(
      (response : any) => {
        this.router.navigate([], { 
          relativeTo: this.activateRoute,
          queryParams: {id : response.id , addRequest : null},
          queryParamsHandling : 'merge'
        })
        this.chartSeriesData = response;
        this.setForm(response);
        AppUtility.scrollTop();
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
      orderNumber: [event !== undefined ? event.orderNumber : ''],
      seriesQueryType: [event !== undefined ? event.seriesQueryType : 'sql'],
      seriesQuery: [event !== undefined ? event.seriesQuery : ''],
      seriesColor: [event !== undefined ? ( event.seriesColor ? event.seriesColor : 'default') : 'default'],
      seriesStrokeWidth: [event !== undefined ? event.seriesStrokeWidth : ''],
    });
  }
  
  back(): any {
    try{
      this.router.navigate(['/admin/topicDescription/topicPaneChartEdit'], { queryParams: {id : this.paneChartId, paneId : this.paneId, topicDescriptionId : this.topicDescriptionId}});
    }catch(e){
    this.location.back();
    }
  }

  save(): any {

    if(this.id){
      const body = Object.assign(this.chartSeriesData,this.chartForm.value);
      this.topicService.saveExistingChartSeries(this.paneId,this.chartId,this.id,body);
    }else{
      const body = Object.assign({},this.chartForm.value);
      body.chartId = this.chartId;
      body.field = body.seriesCode;
      this.topicService.saveNewChartSeries(this.paneId,this.chartId,body)
      .subscribe(res => { this.getChartSerisesById()});
    }
  }

  delete(): any {
    this.topicService.deleteChartSeries(this.paneId,this.chartId,this.id)
    .subscribe( (response) => {
        this.setForm(undefined);
        this.back(); } );
  }

  addChartDataSeries(){
  }

  loadChartSeriesLookupValues(){
    this.topicService.loadLookUpValuesByType(AppConstant.lookupCodeForChartSeriesQueryType);
  }

  getChartSeriesLookupValues(){
    this.topicService.getChartSeriesQueryColorLookUp()
    .pipe(filter(data => data))
    .subscribe(
      (response) =>{
        this.seriesQueryTypeList = response;
      }
    )
  } 
  
  toggleSaveButtonEvent(): any {
    this.toggleSaveButton = !this.toggleSaveButton;
  }

  savePaneChartParameters(event : any ){
    // this.topicService.saveNewOrExistingPaneChartParamenter(this.paneId,this.chartId,this.id,event);
  }

  deletePaneChartParameters(event : any){
    // this.topicService.deletePaneChartParameter(this.paneId,this.chartId,this.id,event.id);
  }

  get f() { return this.chartForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
