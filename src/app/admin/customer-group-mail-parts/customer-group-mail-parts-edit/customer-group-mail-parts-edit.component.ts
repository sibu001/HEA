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
import { skipWhile } from 'rxjs/operators';
import { MailService } from 'src/app/store/mail-state-management/service/mail.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';

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
    if (this.id !== undefined) {
      this.loadCustomerGroupMailPartById();
    }
  }

  changeDropDownValue(event: any) {
    const i = this.customerGroupData.findIndex((item: any) => item.groupCode === event.target.value);
    if (i !== -1) {
      const customerGroup: any = this.partForm.controls.customerGroup;
      customerGroup.controls['groupCode'].setValue(this.customerGroupData[i].groupCode);
      customerGroup.controls['groupName'].setValue(this.customerGroupData[i].groupName);
      customerGroup.controls['theme'].setValue(this.customerGroupData[i].theme);
      customerGroup.controls['customerGroupId'].setValue(this.customerGroupData[i].customerGroupId);
      this.partForm.controls['customerGroupId'].setValue(this.customerGroupData[i].customerGroupId);
    }
  }

  setForm(event: any) {
    this.partForm = this.formBuilder.group({
      id: [event !== undefined ? event.id : null],
      disableHtmlEditor: [event !== undefined ? event.disableHtmlEditor : null],
      customerGroupMailPartId: [event !== undefined ? event.customerGroupMailPartId : null],
      customerGroupId: [event !== undefined ? event.customerGroupId : null],
      partType: [event !== undefined ? event.partType : ''],
      contentTemplate: [event !== undefined ? event.contentTemplate : ''],
      customerGroup: this.formBuilder.group({
        allowBilling: [event !== undefined ? event.customerGroup.allowBilling : null],
        archived: [event !== undefined ? event.customerGroup.archived : null],
        auditIdPattern: [event !== undefined ? event.customerGroup.auditIdPattern : ''],
        baseDirectory: [event !== undefined ? event.customerGroup.baseDirectory : ''],
        contextPath: [event !== undefined ? event.customerGroup.contextPath : ''],
        customerGroupId: [event !== undefined ? event.customerGroup.customerGroupId : null],
        customerRegistrationSuccessViewId: [event !== undefined ? event.customerGroup.customerRegistrationSuccessViewId : null],
        customerRegistrationViewId: [event !== undefined ? event.customerGroup.customerRegistrationViewId : null],
        dataCheckAlg: [event !== undefined ? event.customerGroup.dataCheckAlg : ''],
        forgotPwdMailDescriptionId: [event !== undefined ? event.customerGroup.forgotPwdMailDescriptionId : null],
        groupCode: [event !== undefined ? event.customerGroup.groupCode : ''],
        groupName: [event !== undefined ? event.customerGroup.groupName : ''],
        immediateLogin: [event !== undefined ? event.customerGroup.immediateLogin : ''],
        mailChangedMailDescriptionId: [event !== undefined ? event.customerGroup.mailChangedMailDescriptionId : null],
        mailDescriptionId: [event !== undefined ? event.customerGroup.mailDescriptionId : null],
        newRecommendationMailDescriptionId: [event !== undefined ? event.customerGroup.newRecommendationMailDescriptionId : null],
        registrationErrorMailDescriptionId: [event !== undefined ? event.customerGroup.registrationErrorMailDescriptionId : null],
        registrationUrl: [event !== undefined ? event.customerGroup.registrationUrl : ''],
        repeatedMailDescriptionId: [event !== undefined ? event.customerGroup.repeatedMailDescriptionId : null],
        scrapingPeriod: [event !== undefined ? event.customerGroup.scrapingPeriod : ''],
        showEventHistory: [event !== undefined ? event.customerGroup.showEventHistory : null],
        spamTestMailDescriptionId: [event !== undefined ? event.customerGroup.spamTestMailDescriptionId : null],
        theme: [event !== undefined ? event.customerGroup.theme : ''],
      })
    });
  }

  findCustomerGroup(force: boolean, filter: any) {
    this.systemService.loadCustomerGroupList(force, filter);
    this.subscriptions.add(this.systemService.getCustomerGroupList().pipe(skipWhile((item: any) => !item))
      .subscribe((customerGroupList: any) => {
        this.customerGroupData = customerGroupList;
      }));
  }


  loadCustomerGroupMailPartById() {
    this.mailService.loadCustomerGroupMailPartById(Number(this.id));
    this.subscriptions.add(this.mailService.getCustomerGroupMailPartById().pipe(skipWhile((item: any) => !item))
      .subscribe((report: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/customerGroupMailParts/customerGroupMailPartsEdit'], { queryParams: { 'id': report.id } });
        }
        this.setForm(report);
      }));
  }

  save(): any {
    if (this.partForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.subscriptions.add(this.mailService.updateCustomerGroupMailPart(this.id, this.partForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadCustomerGroupMailPartById();
          }));
      } else {
        this.subscriptions.add(this.mailService.saveCustomerGroupMailPart(this.partForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            // this.id = response.customerGroupMailPartId;
            this.isForce = true;
            // this.loadCustomerGroupMailPartById();
          }));
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
        this.router.navigate(['admin/customerGroupMailParts/customerGroupMailPartsList'], { queryParams: { 'force': true } });
      }));
  }

  back() {
    this.router.navigate(['admin/customerGroupMailParts/customerGroupMailPartsList']);
  }

  get f() { return this.partForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
