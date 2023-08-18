import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { TrendingDefinitionService } from 'src/app/store/trending-defination-state-management/service/trending-definition.service';
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
  keys: TABLECOLUMN[] = TableColumnData.TRENDING_DATA_SET_KEYS;
  seriesQueryTypeList: any[];
  public force : boolean = false;
  public reloadPreviousList : boolean = false;
  trendingPartId :number;
  public chartSeriesParameterList : Array<any> = [];
  public chartSeriesParameterListBackUp : Array<any> = [];
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
    private readonly router: Router,
    private readonly trendingDefinationService : TrendingDefinitionService) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.trendingPartId = params['trendingPartId'];
      this.chartId = params['chartId'];
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
    this.trendingDefinationService.loadTrendingChartSeriesById(true,this.trendingPartId,this.chartId,this.id);
  }

  getChartSeriesById(){
    this.subscriptions.add(
      this.trendingDefinationService.getTrendingChartSeriesById()
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
    this.router.navigate(['/admin/trendingChartDefinition/trendingChartEdit'],
      { queryParams: { trendingPartId : this.trendingPartId, id : this.chartId , force : this.reloadPreviousList} } );
  }

  save(): any {
    
  if(this.id){
    const requestBody = {...this.chartSeriesData, ...this.chartForm.value};
    this.subscriptions.add(
      this.trendingDefinationService
      .updateTrendingChartSeriesById(this.trendingPartId,this.chartId,this.id, requestBody)
      .subscribe( (state : any) =>{
        this.reloadPreviousList = true;
      })
    )
    return;
  }

  const requestBody = {...this.chartForm.value};
  this.subscriptions.add(
    this.trendingDefinationService.saveTrendingChartSeries(this.trendingPartId,this.chartId, requestBody)
    .pipe(take(1))
    .subscribe((state : any) =>{
      this.id = state.trendingDefinationManagement.trendingChartSeries.id;
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
      this.trendingDefinationService.deleteTrendingChartSeriesById(this.trendingPartId,this.chartId,this.id)
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
    this.trendingDefinationService.loadChartParameterListBySeriesId(this.trendingPartId,this.chartId,this.id);
  }

  getChartParameterListBySeriesId(){
    this.subscriptions.add(
      this.trendingDefinationService.getChartParameterListBySeriesId()
      .pipe(filter(data => data))
      .subscribe((paramList : any) =>{
        this.chartSeriesParameterListBackUp = paramList.map(param => {return {...param}});
        this.chartSeriesParameterList = paramList.map(param => {return {...param}});
      })
    );
  }


  saveChartDataSet(event : any){
    
    const requestBody = { 

      trendingChartId : this.chartId,
      calculation : event.calculation,
      calculationType : this.chartForm.value.seriesQueryType,
      chartParameter : {
        chartSeriesId : this.id,
        queryParameter : event.field,
        }
      
     };
    
     this.subscriptions.add(
      this.trendingDefinationService.addChartDataSetToCharSeries(this.trendingPartId,this.chartId,this.id,requestBody)
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
        this.trendingDefinationService.deleteChartDataSetToCharSeriesById(this.trendingPartId,this.chartId,this.id,event.id)
        .subscribe((data) =>{
          this.reloadPreviousList = true;
          // this.loadChartSeriesById();
        })
      )
    }

  get f() { return this.chartForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
