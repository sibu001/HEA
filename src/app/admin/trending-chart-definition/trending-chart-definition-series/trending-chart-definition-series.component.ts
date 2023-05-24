import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
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
  public force : boolean = false;
  paneId :number;
  public paneChartParameterList : Array<any> = [];
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

    //  used by topic-pane-chart-edit component also
    if(this.id){ 
      this.getChartSerisesById();
      this.loadChartSerisesById();
      this.getPaneChartParameters();
      this.getAllDataFields();
    }
    AppUtility.scrollTop();
  }

  loadChartSerisesById() {
    this.topicService.loadChartSerisesById(this.paneId,this.paneChartId,this.id)
  }

  getChartSerisesById() {
    this.topicService.getChartSeriesById()
    .pipe(filter((data : any) => data && data.id == this.id))
    .subscribe(
      (response : any) => {
        this.chartSeriesData = {...response};
        this.setForm(response);
        AppUtility.scrollTop();
      }
    );
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
    try{
      this.router.navigate(['/admin/topicDescription/topicPaneChartEdit'], { queryParams: {id : this.paneChartId, paneId : this.paneId, topicDescriptionId : this.topicDescriptionId , force : this.force}});
    }catch(e){
    this.location.back();
    }
  }

  save(): any {

    if(this.id){
      const body = Object.assign(this.chartSeriesData,this.chartForm.value);
      this.subscriptions.add(
        this.topicService.saveExistingChartSeries(this.paneId,this.paneChartId,this.id,body)
        .pipe(take(1))
        .subscribe((response) =>{
          this.force = true;
        }));
    }else{
      const body = Object.assign({},this.chartForm.value);
      body.chartId = this.chartId;
      body.field = body.seriesCode;
      this.subscriptions.add(
        this.topicService.saveNewChartSeries(this.paneId,this.paneChartId,body)
        .pipe(take(1))
        .subscribe(response => {
            this.force = true;
            this.id = response.topicManagement.paneChartSeriesDefination.id;
            this.chartId = response.topicManagement.paneChartSeriesDefination.chartId;
            AppUtility.appendIdToURLAfterSave(this.router,this.activateRoute,this.id);
            this.getChartSerisesById();
            this.getPaneChartParameters();
            this.getAllDataFields();
        }));
    }
  }

  delete(): any {
    if(AppUtility.deleteConfirmatonBox())
    this.subscriptions.add(
      this.topicService.deleteChartSeries(this.paneId,this.chartId,this.id)
      .pipe(take(1))
      .subscribe( (response) => { this.force = true; this.back(); } ));
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

  getPaneChartParameters(){
    this.topicService.loadPaneChartParametersList(this.paneId,this.paneChartId,this.id);
    this.subscriptions.add(
      this.topicService.getPaneChartParametersList()
      .pipe(filter(data => data && data[0] && data[0].chartParameter.chartSeriesId == this.id))
      .subscribe(
        (response) =>{
          const paneChartParameterList = response.map(data =>{
            data.dataFieldLabel = data.dataField ? data.dataField.label : '';
            return {...data, queryParameter : data.chartParameter.queryParameter};
          })
          this.paneChartParameterList = [...paneChartParameterList];
        })  
    )
  }

  saveChartDataSet(event : any){

    // constructing Object to save
    const paneChartParams = { 
      paneChartId : this.paneChartId,
      dataFieldId : event.dataFieldLabel,
      chartParameter : {
        chartSeriesId : this.id,
        queryParameter : event.queryParameter
      }
     };

    this.topicService.saveNewOrExistingPaneChartParamenter(this.paneId,this.paneChartId,this.id,paneChartParams);
  }

// adding all possible options in chart data set table for data field
  getAllDataFields(){
    this.topicService.loadDataFieldByPaneId(this.paneId,true);
    this.subscriptions.add(
      this.topicService.getDataFieldByPaneId()
      .pipe(filter(data => data))
      .subscribe((response) =>{


          if(response.length == 0){
            this.keys[1].addRowType = 'text';
          }else{
            //  adding options to the select field 
            this.keys[1].option = response.map((data) =>{
              const formattedData : any = {};
              formattedData.id = data.id;
              formattedData.key = data.id;
              formattedData.value = data.label + ' (' + data.field + ')';
              return formattedData;
            });
          }
          this.keys = [...this.keys];
      }));
  }


  deletePaneChartParameters(event : any){
    this.topicService.deletePaneChartParameter(this.paneId,this.paneChartId,this.id,event.id);
  }

  savePaneChartParameters(event : any ){
    //  no use
    console.log(event);
  }

  get f() { return this.chartForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
