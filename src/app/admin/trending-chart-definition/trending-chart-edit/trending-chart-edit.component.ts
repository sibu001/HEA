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

@Component({
  selector: 'app-trending-chart-edit',
  templateUrl: './trending-chart-edit.component.html',
  styleUrls: ['./trending-chart-edit.component.css'],
})
export class TrendingChartEditComponent implements OnInit, OnDestroy {

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
  trendingPartId : number;
  topicDescriptionList : any = [];
  locationList: any = TableColumnData.LOCATION;
  resourceUseList: any = TableColumnData.RESOURCE_USE;
  unitTypeList: any = TableColumnData.UNIT_TYPE;
  useTypeList = [];
  trendingPartChartData : any = { chart : { } };
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
    private readonly trendingDefinationService : TrendingDefinitionService,
    private readonly router: Router) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.trendingPartId = params['trendingPartId']
      this.forceReload = AppUtility.forceParamToBoolean('force');
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
      this.loadTrendingPartChartById();
      this.getTrendingPartChartById();
    }

    AppUtility.scrollTop();
  }

  setForm(event: any): any {
    this.chartForm = this.formBuilder.group({
      chartCode: [event !== undefined ? event.chartCode : '', Validators.required],
      orderNumber: [event !== undefined ? event.orderNumber : '',Validators.required],
      surveyDescriptionId : [event !== undefined ? event.surveyDescriptionId : ''],
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
      divStyle: [event !== undefined ? event.divStyle : ''],
      resourceUse: [event !== undefined ? event.resourceUse : ''],
      unitType: [event !== undefined ? event.unitType : ''],
      useType: [event !== undefined ? event.useType : '']
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


  loadTrendingPartChartById(){
    this.trendingDefinationService.loadTrenginPartChartById(this.forceReload,this.trendingPartId,this.id);
  }

  getTrendingPartChartById(){
    this.subscriptions.add(
      this.trendingDefinationService.getTrendingPartChartById()
      .pipe(filter((data : any) => data && data.id == this.id))
      .subscribe((chart : any ) =>{
          this.trendingPartChartData = {...chart};
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
    this.router.navigate(['/admin/trendingChartDefinition/trendingChartDefinitionEdit'],
      { queryParams : { id : this.trendingPartId, force : this.forceReload }});
  }

  save(): any {

    if(!AppUtility.validateAndHighlightReactiveFrom(this.chartForm)){
      return;
    }

    AppUtility.removeErrorFieldMessagesFromForm();

    const requestBody : any = {
      ...this.trendingPartChartData, 

      chart : { ...this.trendingPartChartData.chart,
                ...this.chartForm.value
              }, 

      trendingPartId : this.trendingPartId, 
      orderNumber : this.chartForm.value.orderNumber,
      divStyle : this.chartForm.value.divStyle,
      resourceUse : this.chartForm.value.resourceUse,
      unitType : this.chartForm.value.unitType,
      useType : this.chartForm.value.useType,
      surveyDescriptionId : this.chartForm.value.surveyDescriptionId

    };

    if(this.id){
      
      this.subscriptions.add(
        this.trendingDefinationService.UpdateTrenginPartChartById(this.trendingPartId,this.id,requestBody)
        .pipe(take(1))
        .subscribe((state : any) => {
          this.forceReload = true;
        }
        ,AppUtility.errorFieldHighlighterCallBack)
      )
      return;
    }

    this.subscriptions.add(
      this.trendingDefinationService.saveTrenginPartChartById(this.trendingPartId,requestBody)
      .pipe(take(1))
      .subscribe((state : any) =>{
        this.forceReload = true;
        this.id = state.trendingDefinationManagement.trendingPartChart.id;
        AppUtility.appendIdToURLAfterSave(this.router,this.activateRoute,this.id);
        this.getTrendingPartChartById();
      },AppUtility.errorFieldHighlighterCallBack)
    );

  }


  delete(): any {
    this.subscriptions.add(
      this.trendingDefinationService.deleteTrenginPartChartById(this.trendingPartId,this.id)
      .pipe(take(1))
      .subscribe((state : any) => {
        this.forceReload = true;
        this.back();
      })
    )
  }


  goToEditChartSeries(): any {
    this.router.navigate(['/admin/trendingChartDefinition/trendingChartDefinitionSeries'], { queryParams: {} });

  }

  addChartSeries(): any {
    this.router.navigate(['/admin/trendingChartDefinition/trendingChartDefinitionSeries']);

  }

  goToDebug() {
    this.router.navigate(['/admin/debug/scriptDebugConsole'], { queryParams: {} });
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
