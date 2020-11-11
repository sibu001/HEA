import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import {
  HtmlEditorService,
  ImageService,
  LinkService,
  ToolbarService
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-customer-group-mail-parts-edit',
  templateUrl: './customer-group-mail-parts-edit.component.html',
  styleUrls: ['./customer-group-mail-parts-edit.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class CustomerGroupMailPartsEditComponent implements OnInit, OnDestroy {

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
  id: any;
  partForm: FormGroup;
  customerGroupData: any[] = TableColumnData.CUSTOMER_GROUP_MAIL_PART_KEYS;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location) {
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
    this.partForm = this.formBuilder.group({
      customerGroup: [event !== undefined ? event.customerGroup : ''],
      partType: [event !== undefined ? event.partType : ''],
      disableHtmlEditor: [event !== undefined ? event.disableHtmlEditor : ''],
      content: [event !== undefined ? event.content : ''],
    });
  }
  back() {
    this.location.back();
  }

  save(): any { }

  delete(): any { }

  copy(): any { }

  get f() { return this.partForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
