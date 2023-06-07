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
import { filter, skipWhile, take } from 'rxjs/operators';
import { AppUtility } from 'src/app/utility/app.utility';
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
  mailDescriptionId: number;
  mailContentPart : any = {};
  contentForm: FormGroup;
  private readonly subscriptions: Subscription = new Subscription();
  isForce = false;
  errorMessage: any;
  contentTemplate : any;
  constructor(
    private readonly fb: FormBuilder,
    private readonly mailService: MailService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly el: ElementRef) {
    this.activateRoute.queryParams.subscribe(params => {
      this.mailDescriptionId = params['mailDescriptionId'];
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.scrollTop();
    this.setForm(undefined);
    if (this.mailDescriptionId && this.id) {
      this.mailService.loadMailContentPartById(this.mailDescriptionId, this.id);
      this.getMailContentPartById();
    }
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  setForm(event: any) {
    this.contentForm = this.fb.group({
      label: [event !== undefined ? event.label : '', Validators.required],
      contentOrder: [event !== undefined ? event.contentOrder : ''],
      contentFilterRule: [event !== undefined ? event.contentFilterRule : ''],
      disableHtmlEditor: [event !== undefined ? event.disableHtmlEditor : ''],
      contentTemplate: [event !== undefined ? event.contentTemplate : '', Validators.required],
      imageUrl: [event !== undefined ? event.imageUrl : ''],
      imageFile: [event !== undefined ? event.imageFile : ''],
      embeddedImage: [event !== undefined ? event.embeddedImage : ''],
    });
  }

  getMailContentPartById() {
    this.subscriptions.add(this.mailService.getMailContentPartById()
    .pipe(filter((item: any) => item && this.id == item.id))
      .subscribe((mailContentPart: any) => {
        this.setForm(mailContentPart);
        this.mailContentPart = {...mailContentPart};
        AppUtility.scrollTop();
      },
      error => {
        this.errorMessage = error;
      }));
  }

  back() {
    this.router.navigate(['admin/mailDescription/mailDescriptionEdit'], { queryParams: { 'id': this.mailDescriptionId } });
  }

  delete() {
    if(!AppUtility.deleteConfirmatonBox()) return;
    this.subscriptions.add(this.mailService.deleteMailContentPartById(this.mailDescriptionId, this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.back();
        // this.router.navigate(['admin/mailDescription/mailDescriptionEdit'], { queryParams: { 'id': this.mailDescriptionId } });
      }));
  }

  save() {

    AppUtility.removeErrorFieldMessagesFromForm();
    if (AppUtility.validateAndHighlightReactiveFrom(this.contentForm)) {

      if (this.id) {

        const requestBody = { ...this.mailContentPart, ...this.contentForm.value };
        this.subscriptions.add(this.mailService.updateMailContentPart(this.mailDescriptionId, this.id, requestBody).pipe(
          filter((item: any) => item),take(1))
          .subscribe((response: any) => {
          },AppUtility.errorFieldHighlighterCallBack));

      } else {

        this.subscriptions.add(this.mailService.saveMailContentPart(this.mailDescriptionId, this.contentForm.value).pipe(
          filter((item: any) => item),take(1))
          .subscribe((response: any) => {
            this.id = response.mailManagement.mailContentPart.id;
            AppUtility.appendIdToURLAfterSave(this.router,this.activateRoute,this.id);   
            this.getMailContentPartById();       
          },AppUtility.errorFieldHighlighterCallBack));

      }

    }
  }

  handleFileInput(file: any) {
    this.fileObject = file[0];
  }

  generate() {
    const formData = new FormData();
      if(!this.fileObject)
        formData.append('imageUrl',this.contentForm.controls['imageUrl'].value)
      else
        formData.append('imageBody', this.fileObject);

    this.subscriptions.add(this.mailService.generateEmbedImage(this.mailDescriptionId, this.id, formData, null).pipe(
      skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        if (response.mailManagement.mailEmbedImage.data) {
          this.contentForm.controls['embeddedImage'].setValue(response.mailManagement.mailEmbedImage.data);
        }
      },
      error => {
        this.errorMessage = error;
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

  highlightErrorField(formControlName : string) : boolean{
    return this.f[formControlName].invalid && (this.f[formControlName].dirty || this.f[formControlName].touched);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
