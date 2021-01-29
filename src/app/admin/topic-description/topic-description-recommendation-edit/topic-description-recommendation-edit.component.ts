import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { HtmlEditorService, ImageService, LinkService, ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';

@Component({
  selector: 'app-topic-description-recommendation-edit',
  templateUrl: './topic-description-recommendation-edit.component.html',
  styleUrls: ['./topic-description-recommendation-edit.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class TopicDescriptionRecommendationEditComponent implements OnInit, OnDestroy {

  id: any;
  recommendationForm: FormGroup;
  recommendationKeys: TABLECOLUMN[];
  recommendationLeakTypeList: any = TableColumnData.RECOMMENDATION_LEAK_TYPE;
  actionTypeList: any = TableColumnData.ACTION_TYPE;
  priceCalculationType: any = TableColumnData.PRICE_CALCULATION_TYPE;
  imageList: any = TableColumnData.IMAGE_LIST;
  iconList: any = TableColumnData.ICON_LIST;
  dataSource: any;
  recommendationData = {
    content: [],
    totalElements: 0
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
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemService: SystemService,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }


  ngOnInit() {
    this.recommendationKeys = TableColumnData.RECOMMENDATION_EDIT_KEY;
    this.setForm(undefined);
    if (this.id !== undefined) {
    }
  }

  setForm(event: any): any {
    this.recommendationForm = this.formBuilder.group({
      code: [event !== undefined ? event.code : '', Validators.required],
      type: [event !== undefined ? event.type : '1'],
      label: [event !== undefined ? event.label : ''],
      suggestion: [event !== undefined ? event.suggestion : ''],
      unit: [event !== undefined ? event.unit : ''],
      recommendationFilter: [event !== undefined ? event.recommendationFilter : ''],
      valueCalculation: [event !== undefined ? event.valueCalculation : ''],
      conservationCategory: [event !== undefined ? event.conservationCategory : ''],
      actionType: [event !== undefined ? event.actionType : ''],
      sendReminderMail: [event !== undefined ? event.sendReminderMail : ''],
      priceValueAlgType: [event !== undefined ? event.priceValueAlgType : 'P'],
      priceCalculation: [event !== undefined ? event.priceCalculation : ''],
      image: [event !== undefined ? event.image : ''],
      icon: [event !== undefined ? event.icon : ''],
      htmlTemplate: [event !== undefined ? event.htmlTemplate : ''],
      comments: [event !== undefined ? event.comments : ''],
    });
  }
  back(): any {
    this.location.back();
  }

  save(): any {

  }
  delete(): any {

  }

  copy(): any {

  }

  onCheckboxChangeEvent(event: any): any {
    console.log(event);
  }

  get f() { return this.recommendationForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }


}
