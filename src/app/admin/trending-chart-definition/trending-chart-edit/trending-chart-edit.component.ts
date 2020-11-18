import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { HtmlEditorService, ImageService, LinkService, ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';

import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-trending-chart-edit',
  templateUrl: './trending-chart-edit.component.html',
  styleUrls: ['./trending-chart-edit.component.css'],
  providers: [HtmlEditorService, ImageService, LinkService, ToolbarService]
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
  chartDataSource: any;
  paneData = TableColumnData.PANE_DATA;
  inputData = TableColumnData.INPUT_TYPE_DATA;
  colorData = TableColumnData.COLOR_DATA;
  fontData = TableColumnData.FONT_STYLE_DATA;
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
    private readonly router: Router) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }


  ngOnInit() {
    this.chartKeys = TableColumnData.CHART_SERIES_FIELD_KEY;
    this.setForm(undefined);
    if (this.id !== undefined) {
    }
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
      divCssStyle: [event !== undefined ? event.divCssStyle : ''],
      resourceUse: [event !== undefined ? event.resourceUse : ''],
      unitType: [event !== undefined ? event.unitType : ''],
      useType: [event !== undefined ? event.useType : '']
    });
  }

  back(): any {
    this.location.back();
  }

  save(): any {

  }
  delete(): any {

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

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
