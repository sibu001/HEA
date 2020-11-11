import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { Subscription } from 'rxjs';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-user-report-content-part',
  templateUrl: './user-report-content-part.component.html',
  styleUrls: ['./user-report-content-part.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class UserReportContentPartComponent implements OnInit, OnDestroy {

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
  contentForm: FormGroup;
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
    this.contentForm = this.formBuilder.group({
      label: [event !== undefined ? event.label : ''],
      order: [event !== undefined ? event.order : ''],
      contentFilter: [event !== undefined ? event.contentFilter : ''],
      disableHtmlEditor: [event !== undefined ? event.disableHtmlEditor : ''],
      content: [event !== undefined ? event.content : ''],
      imageUrl: [event !== undefined ? event.imageUrl : ''],
      imageFile: [event !== undefined ? event.imageFile : ''],
      embeddedImage: [event !== undefined ? event.embeddedImage : ''],
    });
  }
  back() {
    this.location.back();
  }

  save(): any { }

  delete(): any { }

  get f() { return this.contentForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
