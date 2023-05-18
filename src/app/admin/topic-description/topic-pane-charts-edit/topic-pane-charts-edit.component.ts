import { TopicHistoryComponent } from 'src/app/survey/topichistory.component';
import { AppConstant } from 'src/app/utility/app.constant';
import { filter, skipWhile, take } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { HtmlEditorService, ImageService, LinkService, ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { AppUtility } from 'src/app/utility/app.utility';

@Component({
  selector: 'app-topic-pane-charts-edit',
  templateUrl: './topic-pane-charts-edit.component.html',
  styleUrls: ['./topic-pane-charts-edit.component.css'],
})
export class TopicPaneChartsEditComponent implements OnInit, OnDestroy {

  id: any;
  isBlockField: false;
  chartForm: FormGroup;
  chartKeys: TABLECOLUMN[];
  chartData = {
    content: [],
    totalElements: 0
  };
  topicDescriptionId : any;
  paneId : any;
  htmHeaderTemplate : any;
  htmFooterTemplate : any;
  paneData = TableColumnData.PANE_DATA;
  inputData = TableColumnData.INPUT_TYPE_DATA;
  colorData = [];
  fontData = [];
  toolTypeList: any[] = TableColumnData.TOOL_TYPE;
  chartTypeList = [];
  fontStyleList = [];
  paneChartData : any = {};
  locationList: any[] = TableColumnData.LOCATION;
  private readonly subscriptions: Subscription = new Subscription();
  public tools: object = {
    items: ['Undo', 'Redo', '|',
      'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
      'SubScript', 'SuperScript', '|',
      'LowerCase', 'UpperCase', '|',
      'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
      'Indent', 'Outdent', '|', 'CreateLink',
      'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen',
      {
        tooltipText: 'Select Style',
        undo: true,
        template: `
        <select class="e-tbar-btn e-btn" tabindex="-1" id="custom_tbar" style="width:100px">
        <option value='nmt'>nmt</option>
        </select>`
      }]
  };
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly topicService : TopicService,
    private readonly router: Router) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.topicDescriptionId = params['topicDescriptionId'];
      this.paneId = params['paneId'];
    });

    this.setForm(undefined);
  }


  ngOnInit() {

    if(this.id){
      this.getPaneChartById();
      this.loadPaneChartById();
    }

    this.getAllPossibleColorsForChart();
    this.getAllFontFamilyNames();
    this.getAllPossibleStyle();
    this.getLookUpChartType();

    this.loadAllPossibleColors();
    this.loadAllFontFamilyName();
    this.loadAllPossibleStyle();
    this.loadLookUpChartType();
    this.chartKeys = TableColumnData.CHART_SERIES_FIELD_KEY;

    this.scrolltop();
  }
  
  scrolltop(){
    window.scrollTo(0,0);
  }

  setForm(event: any): any {
    this.chartForm = this.formBuilder.group({
      chartCode: [event !== undefined ? event.chartCode : '', Validators.required],
      orderNumber: [event !== undefined ? event.orderNumber : ''],
      toolType: [event !== undefined ? event.toolType : 'jfreechart'],
      freeChartIncludeJSTemplate: [event !== undefined ? event.freeChartIncludeJSTemplate : ''],
      freeChartConfigurationJSTemplate: [event !== undefined ? event.freeChartConfigurationJSTemplate : ''],
      freeChartDivTemplate: [event !== undefined ? event.freeChartDivTemplate : ''],
      chartType: [event !== undefined ? event.chartType : 'pie'],
      backgroundColor: [event !== undefined ? event.backgroundColor : 'default'],
      borderVisible: [event !== undefined ? event.borderVisible : ''],
      borderColor: [event !== undefined ? event.borderColor : 'default'],
      tooltips: [event !== undefined ? event.tooltips : ''],
      width: [event !== undefined ? event.width : ''],
      height: [event !== undefined ? event.height : ''],
      compression: [event !== undefined ? event.compression : ''],
      pieStartAngle: [event !== undefined ? event.pieStartAngle : ''],
      pieLabelFormat: [event !== undefined ? event.pieLabelFormat : ''],
      horizontalOrientation: [event !== undefined ? event.horizontalOrientation : ''],
      title: [event !== undefined ? event.title : ''],
      titleFontName: [event !== undefined && event.titleFontName ? event.titleFontName : ''],
      titleFontStyle: [event !== undefined ? event.titleFontStyle : '0'],
      titleFontSize: [event !== undefined ? event.titleFontSize : ''],
      titleColor: [event !== undefined ? event.titleColor : 'default'],
      legend: [event !== undefined ? event.legend : ''],
      legendFontName: [event !== undefined && event.legendFontName ? event.legendFontName : ''],
      legendFontStyle: [event !== undefined ? event.legendFontStyle : '0'],
      legendFontSize: [event !== undefined ? event.legendFontSize : ''],
      legendLocation: [event !== undefined ? event.legendLocation : ''],
      legendOutsideGrid: [event !== undefined ? event.legendLocation : ''],
      rangeLabel: [event !== undefined ? event.rangeLabel : ''],
      rangeAngle: [event !== undefined ? event.rangeAngle : ''],
      rangeFontName: [event !== undefined && event.rangeFontName ? event.rangeFontName : ''],
      rangeFontStyle: [event !== undefined ? event.rangeFontStyle : '0'],
      rangeFontSize: [event !== undefined ? event.rangeFontSize : ''],
      rangeColor: [event !== undefined ? event.rangeColor : 'default'],
      rangeGridlineVisible: [event !== undefined ? event.rangeGridlineVisible : ''],
      rangeGridlineColor: [event !== undefined ? event.rangeGridlineColor : 'default'],
      rangeMax: [event !== undefined ? event.rangeMax : ''],
      rangeMin: [event !== undefined ? event.rangeMin : ''],
      rangeIntegral: [event !== undefined ? event.rangeIntegral : ''],
      domainLabel: [event !== undefined ? event.domainLabel : ''],
      domainLabelAngle: [event !== undefined ? event.domainLabelAngle : ''],
      domainFontName: [event !== undefined && event.domainFontName ? event.domainFontName : ''],
      domainFontStyle: [event !== undefined ? event.domainFontStyle : '0'],
      domainFontSize: [event !== undefined ? event.domainFontSize : ''],
      domainColor: [event !== undefined ? event.domainColor : 'default'],
      domainGridlineVisible: [event !== undefined ? event.domainGridlineVisible : ''],
      domainGridlineColor: [event !== undefined ? event.domainGridlineColor : 'default'],
      canvasHack: [event !== undefined ? event.canvasHack : ''],
      htmHeaderTemplate: [event !== undefined ? event.htmHeaderTemplate : ''],
      htmFooterTemplate: [event !== undefined ? event.htmFooterTemplate : ''],
      helpText: [event !== undefined ? event.helpText : '']
    });
  }


  loadAllPossibleColors(){
    this.topicService.loadAllPossibleColorsForCharts();
  }

  getAllPossibleColorsForChart(){
    this.subscriptions.add(
      this.topicService.getAllPossibleColorsForChart()
      .pipe(skipWhile((item: any) => item == undefined))
      .subscribe(
        data =>{
          if(data) this.colorData = data;
        }, error =>{
          console.error(error);
        }
      )
    )
  }

  loadAllPossibleStyle(){
    this.topicService.loadAllPossibleStyleForCharts();
  }

  getAllPossibleStyle(){
     this.subscriptions.add(
      this.topicService.getAllPossibleStyleForChart()
      .pipe(skipWhile((item: any) => item == undefined))
      .subscribe(
        data =>{
          if(data) this.fontStyleList = data;
        },error =>{
          console.error(error);
        }
      )
     )
  }

  loadAllFontFamilyName(){
    this.topicService.loadAllPossibleFontFamilyNames();
  }

  getAllFontFamilyNames(){
    this.subscriptions.add(
      this.topicService.getAllPossibleFontFamilyNames()
      .pipe(skipWhile((item: any) => item == undefined))
      .subscribe(data =>{
        if(data) this.fontData = data;
      }, error =>{
        console.error(error);
      })
    )
  }

  loadLookUpChartType(){
    this.topicService.loadLookUpValuesByType(AppConstant.lookUpCodeForChartType);
  }

  getLookUpChartType(){
    this.topicService.getChartTypeLookUp()
    .pipe(filter((item: any) => item))
    .subscribe(
      data=>{
        this.chartTypeList = data
      }, error =>{
        console.error(error);
      }
    )
  }

  loadPaneChartById(){
    this.topicService.loadPaneChartById(this.paneId,this.id);
  }

  getPaneChartById(){
    this.topicService.getPaneChartById()
    .pipe(filter((data : any) => data && data.id == this.id))
    .subscribe(
      (response : any) =>{
          // this.router.navigate([], { 
          //   relativeTo: this.activateRoute,
          //   queryParams: {id : response.id , addRequest : null},
          //   queryParamsHandling : 'merge'
          // });
        this.paneChartData = response;
        response.chart.orderNumber = response.orderNumber;
        this.setForm(response.chart);
        AppUtility.scrollTop();
      }
    )
  }

  back(): any {
    this.router.navigate(['/admin/topicDescription/topicDescriptionPaneEdit'],{queryParams : { id : this.paneId, topicDescriptionId : this.topicDescriptionId }})
  }

  save(): any {
    
    if(!AppUtility.validateAndHighlightReactiveFrom(this.chartForm))
      return;

    if(!this.paneChartData.chart) this.paneChartData.chart = {};
    const requestBody : any = {
      ...this.paneChartData, 
      chart : { ...this.paneChartData.chart ,...this.chartForm.value}, 
      orderNumber : this.chartForm.value.orderNumber
    };

    if(this.id){
      this.topicService.SaveExistingPaneChart(this.paneId,this.id,requestBody);
      return;
    }

    this.subscriptions.add(
      this.topicService.saveNewPaneChart(this.paneId,requestBody)
      .pipe(take(1))
      .subscribe(
        (response : any)=>{
            this.id = response.topicManagement.paneChart.id;
            this.router.navigate([], { 
              relativeTo: this.activateRoute,
              queryParams: {id : this.id},
              queryParamsHandling : 'merge'
            });
            this.getPaneChartById();
        })
    )
  }

  delete(): any {
    if(AppUtility.deleteConfirmatonBox()){
      this.topicService.deletePaneChart(this.paneId,this.id)
      .pipe(take(1))
      .subscribe( (res) => { this.back() },(err) => { console.error(err)});
    }
  }

  goToEditChartSeries(event : any): any {
    this.router.navigate(['/admin/trendingChartDefinition/trendingChartDefinitionSeries'], { queryParams: { topicDescriptionId : this.topicDescriptionId, paneId : this.paneId , paneChartId : this.id, chartId : event.ChartId , id : event.id} });
  }

  addCharSeries(){
    this.router.navigate(['/admin/trendingChartDefinition/trendingChartDefinitionSeries'], { queryParams: { topicDescriptionId : this.topicDescriptionId , paneId : this.paneId , paneChartId : this.id } });
  }

  saveRow() {

  }

  goToDebug() {
    this.router.navigate(['/admin/debug/scriptDebugConsole'], { queryParams: {} });
  }

  highlightErrorField(formControlName : string) : boolean {
    return AppUtility.showErrorMessageOnErrorField(this.f,formControlName);
  }

  get f() { return this.chartForm.controls; }

  get form() { return this.chartForm.value; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
