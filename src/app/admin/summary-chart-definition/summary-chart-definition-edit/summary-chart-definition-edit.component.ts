import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { HtmlEditorService, ImageService, LinkService, ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';

import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { filter, skipWhile, take } from 'rxjs/operators';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
import { TrendingDefinitionService } from 'src/app/store/trending-defination-state-management/service/trending-definition.service';
import { SummaryChartDefinationService } from 'src/app/store/summary-chart-defination-management/service/summary-chart-defination.service';

@Component({
  selector: 'app-summary-chart-definition-edit',
  templateUrl: './summary-chart-definition-edit.component.html',
  styleUrls: ['./summary-chart-definition-edit.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class SummaryChartDefinitionEditComponent implements OnInit, OnDestroy {

  id: any;
  isBlockField: false;
  chartForm: FormGroup;
  chartKeys: TABLECOLUMN[];
  chartData = {
    content: [],
    totalElements: 0
  };
  chartTypeList = [];
  forceReload : boolean = false;
  forceReloadPreviousPage = false;
  chartDataSource: any;
  chartFooter : any;
  chartHeader : any;
  paneData = TableColumnData.PANE_DATA;
  inputData = TableColumnData.INPUT_TYPE_DATA;
  colorData = [];
  fontData = [];
  toolTypeList: any = TableColumnData.TOOL_TYPE;
  chartTypList: any = [];
  fontStyleList: any = [];
  topicDescriptionList : any = [];
  locationList: any = TableColumnData.LOCATION;
  resourceUseList: any = TableColumnData.RESOURCE_USE;
  unitTypeList: any = TableColumnData.UNIT_TYPE;
  useTypeList = [];
  summaryChartData : any = { chart : { } };
  htmHeaderTemplate;
  htmFooterTemplate;
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
    private readonly summaryChartDefinationService : SummaryChartDefinationService,
    private readonly router: Router) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.forceReload = AppUtility.forceParamToBoolean(params['force']);
    });
  }


  ngOnInit() {
    this.chartKeys = TableColumnData.CHART_SERIES_FIELD_KEY;
    this.setForm(undefined);

    this.getAllPossibleColorsForChart();
    this.getAllFontFamilyNames();
    this.getAllPossibleStyle();
    this.getLookUpChartType();

    this.loadAllPossibleColors();
    this.loadAllFontFamilyName();
    this.loadAllPossibleStyle();
    this.loadLookUpChartType();
    this.getUserTypeLookup();
    this.loadTopicDescription();

    if(this.id){
      this.loadSummaryChartDefinationById();
      this.getSummaryChartDefinationById();
    }

    AppUtility.scrollTop();
  }

  setForm(event: any): any {
    this.chartForm = this.formBuilder.group({
      chartCode: [event ? event.chartCode : '', Validators.required],
      orderNumber: [event ? event.orderNumber : '',Validators.required],
      surveyDescriptionId : [event ? event.surveyDescriptionId : ''],
      toolType: [event ? event.toolType : 'jfreechart'],
      freeChartIncludeJSTemplate: [event ? event.freeChartIncludeJSTemplate : ''],
      freeChartConfigurationJSTemplate: [event ? event.freeChartConfigurationJSTemplate : ''],
      freeChartDivTemplate: [event ? event.freeChartDivTemplate : ''],
      chartType: [event && event.chartType ? event.chartType : 'pie'],
      backgroundColor: [event && event.backgroundColor ? event.backgroundColor : 'default'],
      borderVisible: [event ? event.borderVisible : ''],
      borderColor: [event && event.borderColor ? event.borderColor : 'default'],
      tooltips: [event ? event.tooltips : ''],
      width: [event ? event.width : ''],
      height: [event ? event.height : ''],
      compression: [event ? event.compression : ''],
      pieStartAngle: [event ? event.pieStartAngle : ''],
      pieLabelFormat: [event ? event.pieLabelFormat : ''],
      horizontalOrientation: [event ? event.horizontalOrientation : ''],
      title: [event ? event.title : ''],
      titleFontName: [event && event.titleFontName ? event.titleFontName : ''],
      titleFontStyle: [event ? event.titleFontStyle : '0'],
      titleFontSize: [event ? event.titleFontSize : ''],
      titleColor: [event && event.titleColor ? event.titleColor : 'default'],
      legend: [event ? event.legend : ''],
      legendFontName: [event && event.legendFontName ? event.legendFontName : ''],
      legendFontStyle: [event && event.legendFontStyle ? event.legendFontStyle : '0'],
      legendFontSize: [event ? event.legendFontSize : ''],
      legendLocation: [event ? event.legendLocation : ''],
      legendOutsideGrid: [event ? event.legendLocation : ''],
      rangeLabel: [event ? event.rangeLabel : ''],
      rangeAngle: [event ? event.rangeAngle : ''],
      rangeFontName: [event && event.rangeFontName ? event.rangeFontName : ''],
      rangeFontStyle: [event && event.rangeFontStyle? event.rangeFontStyle : '0'],
      rangeFontSize: [event ? event.rangeFontSize : ''],
      rangeColor: [event && event.rangeColor ? event.rangeColor : 'default'],
      rangeGridlineVisible: [event ? event.rangeGridlineVisible : ''],
      rangeGridlineColor: [event && event.rangeGridlineColor ? event.rangeGridlineColor : 'default'],
      rangeMax: [event ? event.rangeMax : ''],
      rangeMin: [event ? event.rangeMin : ''],
      rangeIntegral: [event ? event.rangeIntegral : ''],
      domainLabel: [event ? event.domainLabel : ''],
      domainLabelAngle: [event ? event.domainLabelAngle : ''],
      domainFontName: [event && event.domainFontName ? event.domainFontName : ''],
      domainFontStyle: [event && event.domainFontStyle ? event.domainFontStyle : '0'],
      domainFontSize: [event ? event.domainFontSize : ''],
      domainColor: [event && event.domainColor ? event.domainColor : 'default'],
      domainGridlineVisible: [event ? event.domainGridlineVisible : ''],
      domainGridlineColor: [event && event.domainGridlineColor ? event.domainGridlineColor : 'default'],
      canvasHack: [event ? event.canvasHack : ''],
      htmHeaderTemplate: [event ? event.htmHeaderTemplate : ''],
      htmFooterTemplate: [event ? event.htmFooterTemplate : ''],
      resourceUse: [event ? event.resourceUse : ''],
      unitType: [event ? event.unitType : ''],
      useType: [event ? event.useType : '']
    });
  }

  loadTopicDescription() {
    this.topicService.loadAllPossibleTopicDescriptionList(false);
    this.subscriptions.add(this.topicService.getAllPossibletopicDescriptionList().pipe(skipWhile((item: any) => !item))
      .subscribe((topicDescriptionList: any) => {
        this.topicDescriptionList = topicDescriptionList;
      }));
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


  loadSummaryChartDefinationById(){
    this.summaryChartDefinationService.loadSummaryChartDefinationById(this.forceReload,this.id);
  }

  getSummaryChartDefinationById(){
    this.subscriptions.add(
      this.summaryChartDefinationService.getSummaryChartDefination()
      .pipe(filter((data : any) => data && data.id == this.id))
      .subscribe((chart : any ) =>{

          this.summaryChartData = {...chart};
          const chartTemp = {...chart}
          chartTemp.chart.orderNumber = chart.orderNumber;

          chartTemp.chart.divStyle = chartTemp.divStyle;
          chartTemp.chart.resourceUse = chartTemp.resourceUse;
          chartTemp.chart.useType = chartTemp.useType;
          chartTemp.chart.unitType = chartTemp.unitType;
          chartTemp.chart.surveyDescriptionId = chartTemp.surveyDescriptionId;

          this.setForm(chart.chart);
          AppUtility.scrollTop();
      })
    )
  }

  getUserTypeLookup(){
    this.topicService.loadLookUpValuesByType(AppConstant.lookupCodeForUserType);
    this.subscriptions.add(
      this.topicService.getUseTypeLookUp()
      .pipe(filter((data : any ) => data))
      .subscribe((useType : any) =>{
        this.useTypeList = [...useType];
      })
    )
  }

  back(): any {
    this.router.navigate(['/admin/summaryChartDefinition/summaryChartDefinitionList'],
      { queryParams : { force : this.forceReloadPreviousPage }});
  }

  save(): any {

    if(!AppUtility.validateAndHighlightReactiveFrom(this.chartForm)){
      return;
    }

    AppUtility.removeErrorFieldMessagesFromForm();

    const requestBody : any = {
      ...this.summaryChartData, 

      chart : { ...this.summaryChartData.chart,
                ...this.chartForm.value,
                orderNumber : undefined,
                divStyle : undefined,
                resourceUse : undefined,
                unitType : undefined,
                useType : undefined,
                surveyDescriptionId : undefined,
      },
      orderNumber : this.chartForm.value.orderNumber,
      divStyle : this.chartForm.value.divStyle,
      resourceUse : this.chartForm.value.resourceUse,
      unitType : this.chartForm.value.unitType,
      useType : this.chartForm.value.useType,
      surveyDescriptionId : this.chartForm.value.surveyDescriptionId

    };

    if(this.id){
      
      this.subscriptions.add(
        this.summaryChartDefinationService.updateSummaryChartDefination(this.id,requestBody)
        .pipe(take(1))
        .subscribe((state : any) => {
          this.forceReloadPreviousPage = true;
        }
        ,AppUtility.errorFieldHighlighterCallBack)
      )
      return;
    }

    this.subscriptions.add(
      this.summaryChartDefinationService.saveSummaryChartDefination(requestBody)
      .pipe(take(1))
      .subscribe((state : any) =>{
        this.id = state.summaryChartManagementState.summaryChartDefination.id;
        AppUtility.appendIdToURLAfterSave(this.router,this.activateRoute,this.id);
        this.getSummaryChartDefinationById();
        this.forceReloadPreviousPage = true;
      },AppUtility.errorFieldHighlighterCallBack)
    );

  }


  delete(): any {

    if(!AppUtility.deleteConfirmatonBox()) return;

    this.subscriptions.add(
      this.summaryChartDefinationService.deleteSummaryChartDefination(this.id)
      .pipe(take(1))
      .subscribe((state : any) => {
        this.forceReloadPreviousPage = true;
        this.back();
      })
    )
  }

  goToEditChartSeries(event : any): any {
    this.router.navigate(['/admin/summaryChartDefinition/summaryChartDefinitionSeries'], 
      { queryParams: { summaryChartId : this.id , id : event.id} });

  }

  addChartSeries(): any {
    this.router.navigate(['/admin/summaryChartDefinition/summaryChartDefinitionSeries'],
    { queryParams: { summaryChartId : this.id } });

  }

  goToDebug() {
    this.router.navigate(['/admin/debug/scriptDebugConsole'], { queryParams: {} });
  }

  preview(){

  }

  copyChart(){

  }

  get f() { return this.chartForm.controls; }
  get form() { return this.chartForm.value; }

  highlightErrorField(formControlName : string) : boolean {
    return AppUtility.showErrorMessageOnErrorField(this.f,formControlName);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}