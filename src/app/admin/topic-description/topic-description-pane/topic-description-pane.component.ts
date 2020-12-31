import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HtmlEditorService, ImageService, LinkService, ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-topic-description-pane',
  templateUrl: './topic-description-pane.component.html',
  styleUrls: ['./topic-description-pane.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class TopicDescriptionPaneComponent implements OnInit, OnDestroy {

  id: any;
  paneForm: FormGroup;
  dataBlockKeys = TableColumnData.PANE_DATA_BLOCK_KEY;
  dataFieldKeys = TableColumnData.PANE_DATA_FIELD_KEY;
  chartKeys = TableColumnData.PANE_CHART_KEYS;
  reportKeys = TableColumnData.PANE_REPORT_KEYS;
  public dataBlockDataSource: any;
  public dataFieldDataSource: any;
  public chartDataSource: any;
  public reportsDataSource: any;

  public totalElement = 0;
  public dataBlockData = {
    content: [],
    totalElements: 0,
  };
  public dataFieldData = {
    content: [],
    totalElements: 0,
  };
  public chartData = {
    content: [],
    totalElements: 0,
  };
  public reportData = {
    content: [],
    totalElements: 0,
  };
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
  topicData = TableColumnData.TOPIC_DESCRIPTION_SELECT_DATA;
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly topicService: TopicService,
    private readonly location: Location,
    private readonly router: Router) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }


  ngOnInit() {
    this.setForm(undefined);
    if (this.id !== undefined) {
    }
  }


  setForm(event: any) {
    this.paneForm = this.formBuilder.group({
      isSection: [event !== undefined ? event.isSection : ''],
      hideSection: [event !== undefined ? event.hideSection : ''],
      paneCode: [event !== undefined ? event.paneCode : '', Validators.required],
      mainSectionLabel: [event !== undefined ? event.mainSectionLabel : ''],
      label: [event !== undefined ? event.label : ''],
      nextPane: [event !== undefined ? event.nextPane : ''],
      orderNumber: [event !== undefined ? event.orderNumber : ''],
      filter: [event !== undefined ? event.filter : ''],
      pageHeader: [event !== undefined ? event.pageHeader : ''],
      pageText: [event !== undefined ? event.pageText : ''],
      pageFooter: [event !== undefined ? event.pageFooter : ''],
      factoid: [event !== undefined ? event.factoid : ''],
      pendingMessages: [event !== undefined ? event.pendingMessages : ''],
      topMenu: [event !== undefined ? event.topMenu : ''],
      rightMenuTopPart: [event !== undefined ? event.rightMenuTopPart : ''],
      rightMenuBottomPart: [event !== undefined ? event.rightMenuBottomPart : ''],
      paneHelp: [event !== undefined ? event.paneHelp : ''],
      showPrev: [event !== undefined ? event.showPrev : ''],
      showNext: [event !== undefined ? event.showNext : ''],
      comments: [event !== undefined ? event.comments : ''],
    });
  }
  back() {
    this.location.back();
  }

  save() {

  }
  delete() {

  }

  copy() {

  }

  addDataBlock() {
    this.router.navigate(['admin/topicDescription/topicPaneDataBlockEdit']);
  }

  addDataField() {
    this.router.navigate(['admin/topicDescription/topicPaneDataFieldEdit']);
  }

  addCharts() {
    this.router.navigate(['admin/topicDescription/topicPaneChartEdit']);
  }

  addReports() {
    this.router.navigate(['admin/topicDescription/topicPaneReportEdit']);
  }

  goToEditDataBlock() {
    this.router.navigate(['admin/topicDescription/topicPaneDataBlockEdit'], { queryParams: {} });
  }

  goToEditDataField() {
    this.router.navigate(['admin/topicDescription/topicPaneDataFieldEdit'], { queryParams: {} });
  }

  goToEditCharts() {
    this.router.navigate(['admin/topicDescription/topicPaneChartEdit'], { queryParams: {} });
  }

  goToEditReports() {
    this.router.navigate(['admin/topicDescription/topicPaneReportEdit'], { queryParams: {} });
  }

  get f() { return this.paneForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
