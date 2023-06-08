import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import {
  HtmlEditorService,
  ImageService,
  LinkService,
  ToolbarService
} from '@syncfusion/ej2-angular-richtexteditor';
import { filter, skipWhile, take } from 'rxjs/operators';
import { MailService } from 'src/app/store/mail-state-management/service/mail.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { AppUtility } from 'src/app/utility/app.utility';

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
  isForce = false;
  customerGroupMailPartData : any = {};
  customerGroupData: any = [];
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly mailService: MailService,
    private readonly systemService: SystemService,
    private readonly el: ElementRef,
    private readonly router: Router) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.findCustomerGroup(false, '');
  }


  ngOnInit() {
    this.setForm(undefined);
    if (this.id) {
      this.getCustomerGroupMailPartById();
      this.loadCustomerGroupMailPartById();
    }

    AppUtility.scrollTop();
  }

  changeDropDownValue(event: any) {
    const customerGroup = this.customerGroupData.find((item: any) => item.customerGroupId == event.target.value);
    this.customerGroupMailPartData.customerGroup = customerGroup;
  }

  setForm(event: any) {
    this.partForm = this.formBuilder.group({
      disableHtmlEditor: [event !== undefined ? event.disableHtmlEditor : null],
      customerGroupId: [event !== undefined ? event.customerGroupId : '9'],
      partType: [event !== undefined ? event.partType : 'header'],
      contentTemplate: [event !== undefined ? event.contentTemplate : ''],
    });
  }

  findCustomerGroup(force: boolean, filter: any) {
    this.systemService.loadCustomerGroupList(force, filter);
    this.subscriptions.add(this.systemService.getCustomerGroupList()
    // .pipe(filter((item: any) => item && item.length),take(1))
      .subscribe((customerGroupList: any) => {
        this.customerGroupData = customerGroupList;
      }));
  }


  loadCustomerGroupMailPartById() {
    this.mailService.loadCustomerGroupMailPartById(Number(this.id));
  }

  getCustomerGroupMailPartById(){
    this.subscriptions.add(this.mailService.getCustomerGroupMailPartById()
    .pipe(filter((item: any) => item && item.id == this.id))
    .subscribe((report: any) => {
      this.setForm(report);
      this.customerGroupMailPartData = report;
      AppUtility.scrollTop();
    }));
  }

  save(): any {
    if (this.partForm.valid) {
      if (this.id) {

        const requestBody : any = {... this.customerGroupMailPartData, ...this.partForm.value};
        this.subscriptions.add(this.mailService.updateCustomerGroupMailPart(this.id, requestBody).pipe(
          filter((item: any) => item),take(1))
          .subscribe((response: any) => {
            this.isForce = true;
          },AppUtility.errorFieldHighlighterCallBack));

      } else {

        this.subscriptions.add(this.mailService.saveCustomerGroupMailPart(this.partForm.value).pipe(
          filter((item: any) => item),take(1))
          .subscribe((response: any) => {
            this.isForce = true;
            this.id = response.mailManagement.customerGroupMailPart.id;
            AppUtility.appendIdToURLAfterSave(this.router,this.activateRoute,this.id);
            this.getCustomerGroupMailPartById();
          },AppUtility.errorFieldHighlighterCallBack));

      }
    } else {
      this.validateForm();
    }
  }

  validateForm() {
    for (const key of Object.keys(this.partForm.controls)) {
      if (this.partForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }
  delete(): any {
    this.subscriptions.add(this.mailService.deleteCustomerGroupMailPartById(this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.back();
      }));
  }

  back() {
    this.router.navigate(['admin/customerGroupMailParts/customerGroupMailPartsList'],{ queryParams: { 'force': this.isForce }});
  }

  get f() { return this.partForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
