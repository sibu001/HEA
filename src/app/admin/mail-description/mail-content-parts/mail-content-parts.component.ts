import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import {
  HtmlEditorService,
  ImageService,
  LinkService,
  ToolbarService
} from '@syncfusion/ej2-angular-richtexteditor';
import { MailService } from 'src/app/store/mail-state-management/service/mail.service';
import { skipWhile } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-mail-content-parts',
  templateUrl: './mail-content-parts.component.html',
  styleUrls: ['./mail-content-parts.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class MailContentPartsComponent implements OnInit, OnDestroy {

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
  public fileObject: any;
  contentId: any;
  contentForm: FormGroup;
  private readonly subscriptions: Subscription = new Subscription();
  isForce = false;
  constructor(
    private readonly fb: FormBuilder,
    private readonly mailService: MailService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly el: ElementRef) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.contentId = params['contentId'];
    });
  }

  ngOnInit() {
    this.scrollTop();
    this.setForm(undefined);
    if (this.id && this.contentId) {
      this.mailService.loadMailContentPartById(this.id, this.contentId);
      this.loadMailContentPartById();
    }
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  setForm(event: any) {
    this.contentForm = this.fb.group({
      label: [event !== undefined ? event.label : ''],
      contentOrder: [event !== undefined ? event.contentOrder : ''],
      contentFilterRule: [event !== undefined ? event.contentFilterRule : ''],
      disableHtmlEditor: [event !== undefined ? event.disableHtmlEditor : ''],
      contentTemplate: [event !== undefined ? event.contentTemplate : '', Validators.required],
      imageUrl: [event !== undefined ? event.imageUrl : ''],
      imageFile: [event !== undefined ? event.imageFile : ''],
      embeddedImage: [event !== undefined ? event.embeddedImage : ''],
    });
  }

  loadMailContentPartById() {
    this.subscriptions.add(this.mailService.getMailContentPartById().pipe(skipWhile((item: any) => !item))
      .subscribe((mailContentPart: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/mailDescription/mailContentParts'], { queryParams: { 'id': this.id, 'contentId': mailContentPart.data.id } });
        }
        this.setForm(mailContentPart.data);
      }));
  }

  back() {
    this.router.navigate(['admin/mailDescription/mailDescriptionEdit'], { queryParams: { 'id': this.id } });
  }

  delete() {
    this.subscriptions.add(this.mailService.deleteMailContentPartById(this.id, this.contentId).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.router.navigate(['admin/mailDescription/mailDescriptionEdit'], { queryParams: { 'id': this.id } });
      }));
  }

  save() {
    if (this.contentForm.valid) {
      if (this.id && this.contentId) {
        this.subscriptions.add(this.mailService.updateMailContentPart(this.id, this.contentId, this.contentForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.scrollTop();
            this.loadMailContentPartById();
          }));
      } else {
        this.subscriptions.add(this.mailService.saveMailContentPart(this.id, this.contentForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.scrollTop();
            this.loadMailContentPartById();
          }));
      }
    } else {
      this.validateForm();
    }
  }

  handleFileInput(file: any) {
    this.fileObject = file[0];
  }

  generate() {
    const params = new HttpParams()
      .set('imageUrl', this.contentForm.value.imageUrl);

    this.subscriptions.add(this.mailService.generateEmbedImage(this.id, this.contentId, this.fileObject, params).pipe(
      skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        if (response.mailManagement.mailEmbedImage.data) {
          this.contentForm.controls['embeddedImage'].setValue(response.mailManagement.mailEmbedImage.data);
        }
      }));
  }
  validateForm() {
    for (const key of Object.keys(this.contentForm.controls)) {
      if (this.contentForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }

  get f() { return this.contentForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
