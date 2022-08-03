import { AppConstant } from 'src/app/utility/app.constant';
import { skipWhile } from 'rxjs/operators';
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

@Component({
  selector: 'app-topic-pane-charts-edit',
  templateUrl: './topic-pane-charts-edit.component.html',
  styleUrls: ['./topic-pane-charts-edit.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]

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
  chartDataSource: any;
  paneData = TableColumnData.PANE_DATA;
  inputData = TableColumnData.INPUT_TYPE_DATA;
  colorData = [];
  fontData = [];
  toolTypeList: any[] = TableColumnData.TOOL_TYPE;
  chartTypeList = [];
  fontStyleList = [];
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
    });

    this.setForm(undefined);
  }


  ngOnInit() {
    this.getAllPossibleColorsForChart();
    this.getAllFontFamilyNames();
    this.getAllPossibleStyle();
    this.getLookUpChartType();

    this.loadAllPossibleColors();
    this.loadAllFontFamilyName();
    this.loadAllPossibleStyle();
    this.loadLookUpChartType();
    this.chartKeys = TableColumnData.CHART_SERIES_FIELD_KEY;
  }
  setForm(event: any): any {
    this.chartForm = this.formBuilder.group({
      chartCode: [event !== undefined ? event.chartCode : '', Validators.required],
      orderNumber: [event !== undefined ? event.orderNumber : ''],
      toolType: [event !== undefined ? event.toolType : 'jfreechart'],
      freeChartIncludeJSTemplate: [event !== undefined ? event.freeChartIncludeJSTemplate : ''],
      freeChartConfigurationJSTemplate: [event !== undefined ? event.freeChartConfigurationJSTemplate : ''],
      freeChartDivTemplate: [event !== undefined ? event.freeChartDivTemplate : ''],
      chartType: [event !== undefined ? event.chartType : ''],
      backgroundColor: [event !== undefined ? event.backgroundColor : ''],
      borderVisible: [event !== undefined ? event.borderVisible : ''],
      borderColor: [event !== undefined ? event.borderColor : ''],
      tooltips: [event !== undefined ? event.tooltips : ''],
      width: [event !== undefined ? event.width : ''],
      height: [event !== undefined ? event.height : ''],
      compression: [event !== undefined ? event.allowRemoving : ''],
      pieStartAngle: [event !== undefined ? event.allowRemoving : ''],
      format: [event !== undefined ? event.format : ''],
      horizontalOrientation: [event !== undefined ? event.horizontalOrientation : ''],
      title: [event !== undefined ? event.title : ''],
      titleFontName: [event !== undefined ? event.titleFontName : ''],
      titleFontStyle: [event !== undefined ? event.titleFontStyle : ''],
      titleFontSize: [event !== undefined ? event.titleFontSize : ''],
      titleColor: [event !== undefined ? event.titleColor : ''],
      showLegend: [event !== undefined ? event.showLegend : ''],
      legendFontName: [event !== undefined ? event.legendFontName : ''],
      legendFontStyle: [event !== undefined ? event.legendFontStyle : ''],
      legendFontSize: [event !== undefined ? event.legendFontSize : ''],
      legendLocation: [event !== undefined ? event.legendLocation : ''],
      legendOutsideGrid: [event !== undefined ? event.legendLocation : ''],
      rangeLabel: [event !== undefined ? event.rangeLabel : ''],
      rangeLabelAngle: [event !== undefined ? event.rangeLabelAngle : ''],
      rangeFontName: [event !== undefined ? event.rangeFontName : ''],
      rangeFontStyle: [event !== undefined ? event.rangeFontStyle : ''],
      rangeFontSize: [event !== undefined ? event.rangeFontSize : ''],
      rangeColor: [event !== undefined ? event.rangeColor : ''],
      rangeGridlineVisible: [event !== undefined ? event.rangeGridlineVisible : ''],
      rangeGridlineColor: [event !== undefined ? event.rangeGridlineColor : ''],
      rangeMax: [event !== undefined ? event.rangeMax : ''],
      rangeMin: [event !== undefined ? event.rangeMin : ''],
      roundToZero: [event !== undefined ? event.rangeMin : ''],
      domainLabel: [event !== undefined ? event.domainLabel : ''],
      domainLabelAngle: [event !== undefined ? event.domainLabelAngle : ''],
      domainFontName: [event !== undefined ? event.domainFontName : ''],
      domainFontStyle: [event !== undefined ? event.domainFontStyle : ''],
      domainFontSize: [event !== undefined ? event.domainFontSize : ''],
      domainColor: [event !== undefined ? event.domainColor : ''],
      domainGridlineVisible: [event !== undefined ? event.domainGridlineVisible : ''],
      domainGridlineColor: [event !== undefined ? event.domainGridlineColor : ''],
      canvasHack: [event !== undefined ? event.canvasHack : ''],
      chartHeader: [event !== undefined ? event.chartHeader : ''],
      chartFooter: [event !== undefined ? event.chartFooter : ''],
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
          console.log(data);
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
          console.log(data);
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
        console.log(data);
        if(data) this.fontData = data;
      }, error =>{
        console.log(error);
      })
    )
  }

  loadLookUpChartType(){
    this.topicService.loadLookUpValuesByType(AppConstant.lookUpCodeForChartType);
  }

  getLookUpChartType(){
    this.topicService.getChartTypeLookUp()
    .pipe(skipWhile((item: any) => !item))
    .subscribe(
      data=>{
        console.log(data);
        if(data) this.chartTypeList = data
      }, error =>{
        console.error(error);
      }
    )
  }


  back(): any {
    this.location.back();
  }

  save(): any {

  }
  delete(): any {

  }

  recalculate() {

  }

  saveRow() {

  }

  goToDebug() {
    this.router.navigate(['/admin/debug/scriptDebugConsole'], { queryParams: {} });
  }

  get f() { return this.chartForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
