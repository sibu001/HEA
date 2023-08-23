import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SummaryChartDefinationService } from 'src/app/store/summary-chart-defination-management/service/summary-chart-defination.service';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { TrendingDefinitionService } from 'src/app/store/trending-defination-state-management/service/trending-definition.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
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
  keys: TABLECOLUMN[] = TableColumnData.SUMMARY_DATA_SET_KEYS;
  seriesQueryTypeList: any[];
  public force : boolean = false;
  public reloadPreviousList : boolean = false;
  summaryChartId :number;
  public chartSeriesParameterList : Array<any> = [];
  public chartSeriesParameterListBackUp : Array<any> = [];
  topicDescriptionId : Number ;
  paneChartId : number;
  chartSeriesData : any;
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
    private readonly router: Router,
    private readonly summaryChartDefinationService : SummaryChartDefinationService
    ) {
    this.activateRoute.queryParams.subscribe(params => {
      this.force = AppUtility.forceParamToBoolean(params['force']);
      this.id = params['id'];
      this.summaryChartId = params['summaryChartId'];
    });
  }


  ngOnInit() {
    this.setForm(undefined);

    this.getChartSeriesLookupValues();
    this.loadChartSeriesLookupValues();

    this.loadChartSeriesColor();
    this.getChartSeriesColor();
    this.getChartParameterListBySeriesId();

    if(this.id){ 
      this.getChartSeriesById();
      this.loadChartSeriesById();
      this.loadChartParameterListBySeriesId();
    }

    AppUtility.scrollTop();
  }

  loadChartSeriesById(){
    this.summaryChartDefinationService.loadSummaryChartDefinationSeriesById(this.force,this.summaryChartId,this.id);
  }

  getChartSeriesById(){
    this.subscriptions.add(
      this.summaryChartDefinationService.getSummaryChartDefinationSeries()
      .pipe(filter((data : any) => data && data.id == this.id))
      .subscribe(
        (response : any) => {
          this.chartSeriesData = {...response};
          // this.chartSeriesParameterList = this.chartSeriesData.chartParameters.map(data => {return {...data}});
          this.setForm({...response});
          AppUtility.scrollTop();
        }
      ));
  }


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
    this.router.navigate(['/admin/summaryChartDefinition/summaryChartDefinitionEdit'],
      { queryParams: { id : this.summaryChartId, force : this.reloadPreviousList} } );
  }

  save(): any {
    
  if(this.id){
    const requestBody = {...this.chartSeriesData, ...this.chartForm.value};
    this.subscriptions.add(
      this.summaryChartDefinationService
      .updateSummaryChartDefinationSeries(this.summaryChartId,this.id, requestBody)
      .subscribe( (state : any) =>{
        this.reloadPreviousList = true;
      })
    )
    return;
  }

  const requestBody = {...this.chartForm.value};
  this.subscriptions.add(
    this.summaryChartDefinationService.saveSummaryChartDefinationSeries(this.summaryChartId, requestBody)
    .pipe(take(1))
    .subscribe((state : any) =>{
      this.id = state.summaryChartManagementState.summaryChartDefinationSeries.id;
      AppUtility.appendIdToURLAfterSave(this.router,this.activateRoute,this.id);
      this.getChartSeriesById();
      this.loadChartParameterListBySeriesId();
      this.reloadPreviousList = true;
    })
  )

  }

  delete(): any {

    if(!AppUtility.deleteConfirmatonBox()) return;

    this.subscriptions.add(
      this.summaryChartDefinationService.deleteSummaryChartDefinatioSeries(this.summaryChartId,this.id)
      .pipe(take(1))
      .subscribe((data : any) =>{
        this.reloadPreviousList = true;
        this.back();
      })
    )
  }

  loadChartSeriesLookupValues(){
      this.topicService.loadLookUpValuesByType(AppConstant.lookupCodeForChartSeriesQueryType)
  }

  getChartSeriesLookupValues(){
    this.subscriptions.add(
      this.topicService.getChartSeriesQueryTypeLookUp()
      .pipe(filter(data => data))
      .subscribe(
        (response) =>{
          this.seriesQueryTypeList = response;
        })
    )
  } 

  loadChartSeriesColor(){
    this.topicService.loadAllPossibleColorsForCharts();
  }

  getChartSeriesColor(){
    this.subscriptions.add(
      this.topicService.getAllPossibleColorsForChart()
      .pipe(filter((data : any) => data))
      .subscribe((data : any) =>{
        this.colorData = [...data];
      })
    );
  }
  
  toggleSaveButtonEvent(): any {
    this.toggleSaveButton = !this.toggleSaveButton;
  }


  loadChartParameterListBySeriesId(){
    this.summaryChartDefinationService.loadChartSeriesParamterList(this.force,this.summaryChartId,this.id);
  }

  getChartParameterListBySeriesId(){
    this.subscriptions.add(
      this.summaryChartDefinationService.getChartSeriesParameterList()
      .pipe(filter(data => data))
      .subscribe((paramList : any) =>{
        this.chartSeriesParameterListBackUp = paramList.map(param => {return {...param }});
        this.chartSeriesParameterList = paramList.map(param => {return {...param }});
      })
    );
  }


  saveChartDataSet(event : any){
    
    const requestBody = { 

      summaryChartId : this.summaryChartId,
      field : event.field,
      value : event.value,
      chartParameter : {
        chartSeriesId : this.id,
        queryParameter : event.field,
        }
      
     };
    
     this.subscriptions.add(
      this.summaryChartDefinationService.SaveChartSeriesParamter(this.summaryChartId,this.id,requestBody)
      .subscribe((data : any ) =>{
        this.reloadPreviousList = true;
      },(error : any) =>{
        // restoring chart Parameter in case of faliure.
        this.chartSeriesParameterList = this.chartSeriesParameterListBackUp.map(param => {return {...param}});
      })
     )
  }

  deletePaneChartParameters(event : any){
      this.subscriptions.add(
        this.summaryChartDefinationService.deleteChartSeriesParamter(this.summaryChartId,this.id,event.id)
        .subscribe((data) =>{
          this.reloadPreviousList = true;
        })
      )
    }

  get f() { return this.chartForm.controls; }


  ngOnDestroy(): void {
      SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
