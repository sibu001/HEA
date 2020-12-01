import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { TableColumnData } from 'src/app/data/common-data';
import { DynamicViewService } from 'src/app/store/dynamic-view-state-management/service/dynamic-view.service';
import { HttpParams } from '@angular/common/http';
import { MailService } from 'src/app/store/mail-state-management/service/mail.service';

@Component({
  selector: 'app-customer-group-edit',
  templateUrl: './customer-group-edit.component.html',
  styleUrls: ['./customer-group-edit.component.css']
})
export class CustomerGroupEditComponent implements OnInit, OnDestroy {
  customerGroupForm: FormGroup;
  id: any;
  themeList: Array<any>;
  scrapingUtilityList: Array<any>;
  scrapingPeriodList: Array<any>;
  jsPageList: Array<any>;
  mailDescriptionList: Array<any>;
  placeKey: Array<TABLECOLUMN> = TableColumnData.PLACE_KEY;
  isForce = false;
  placeData = {
    content: [
      {
        placeCode: 'test',
        placeName: 'test'
      }
    ],
    totalElements: 0
  };
  public placeDataSource: any = [
    {
      placeCode: 'test',
      placeName: 'test'
    }
  ];
  programGroupKey: Array<TABLECOLUMN> = TableColumnData.PROGRAM_GROUP_KEY;
  programSelectionList: Array<any> = [];
  programGroupData = {
    content: [],
    totalElements: 0
  };
  public programGroupDataSource: any;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemService: SystemService,
    private readonly activateRoute: ActivatedRoute,
    private readonly dynamicViewService: DynamicViewService,
    private readonly router: Router,
    private readonly mailService: MailService) {
    this.findProgramGroup();
    this.loadThemeList();
    this.loadScrapingUtilityList();
    this.loadScrapingPeriodList();
    this.loadJSPageList();
    this.loadMailDescriptionList();
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.systemService.loadCustomerGroupById(Number(this.id));
      this.loadCustomerGroupById();
    }
  }
  loadCustomerGroupById() {
    this.subscriptions.add(this.systemService.getCustomerGroupById().pipe(skipWhile((item: any) => !item))
      .subscribe((programGroup: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/customer-group/customerGroupEdit'], { queryParams: { 'id': programGroup.id } });
        }
        this.setForm(programGroup);
      }));
  }
  findProgramGroup(): void {
    this.systemService.loadProgramGroupsList(false, '');
    this.subscriptions.add(this.systemService.getProgramGroupList().pipe(skipWhile((item: any) => !item))
      .subscribe((programGroupList: any) => {
        this.programGroupData.content = programGroupList;
        this.programGroupDataSource = [...this.programGroupData.content];
      }));
    this.programSelectionList.push('HiHC');
    this.programSelectionList.push('MedHC');
    this.programSelectionList.push('HiVar');
    this.programSelectionList.push('HiPlug');
  }

  loadThemeList(): any {
    this.systemService.loadThemesList(false);
    this.subscriptions.add(this.systemService.getThemeList().pipe(skipWhile((item: any) => !item))
      .subscribe((themeList: any) => {
        this.themeList = themeList.data;
        console.log(themeList.data);
      }));
  }

  loadScrapingUtilityList(): any {
    this.systemService.loadScrapingUtilityList(false, 'SCRAPING_UTILITY');
    this.subscriptions.add(this.systemService.getScrapingUtilityList().pipe(skipWhile((item: any) => !item))
      .subscribe((scrapingUtilityList: any) => {
        this.scrapingUtilityList = scrapingUtilityList.data;
      }));
  }

  loadScrapingPeriodList(): any {
    this.systemService.loadScrapingPeriodList(false, 'SCRAPING_PERIOD');
    this.subscriptions.add(this.systemService.getScrapingPeriodList().pipe(skipWhile((item: any) => !item))
      .subscribe((scrapingPeriodList: any) => {
        this.scrapingPeriodList = scrapingPeriodList.data;
      }));
  }

  loadJSPageList(): any {
    const params = new HttpParams()
      .set('needAuthorization', 'false')
      .set('openInNewWindow', 'false');
    this.dynamicViewService.loadJavaScriptPageList(false, params);
    this.subscriptions.add(this.dynamicViewService.getJavaScriptPageList().pipe(skipWhile((item: any) => !item))
      .subscribe((jsPageList: any) => {
        this.jsPageList = jsPageList;
      }));
  }

  loadMailDescriptionList(): any {
    const params = new HttpParams()
      .set('active', 'true');
    this.mailService.loadMailDescriptionList(false, params);
    this.subscriptions.add(this.mailService.getMailDescriptionList().pipe(skipWhile((item: any) => !item))
      .subscribe((mailDescriptionList: any) => {
        this.mailDescriptionList = mailDescriptionList.data;
      }));
  }

  setForm(event: any) {
    this.customerGroupForm = this.formBuilder.group({
      id: [event !== undefined ? event.id : ''],
      customerGroupId: [event !== undefined ? event.customerGroupId : ''],
      groupCode: [event !== undefined ? event.groupCode : '', Validators.required],
      groupName: [event !== undefined ? event.groupName : '', Validators.required],
      contextPath: [event !== undefined ? event.contextPath : ''],
      theme: [event !== undefined ? event.theme : 'AC'],
      registrationUrl: [event !== undefined ? event.registrationUrl : '', Validators.required],
      baseDirectory: [event !== undefined ? event.baseDirectory : '', Validators.required],
      auditIdPattern: [event !== undefined ? event.auditIdPattern : '', Validators.required],
      scrapingUtility: [event !== undefined ? event.scrapingUtility : 'pge'],
      scrapingPeriod: [event !== undefined ? event.scrapingPeriod : 'D'],
      showEventHistory: [event !== undefined ? event.showEventHistory : ''],
      mailDescriptionId: [event !== undefined ? event.mailDescriptionId : ''],
      repeatedMailDescriptionId: [event !== undefined ? event.repeatedMailDescriptionId : ''],
      spamTestMailDescriptionId: [event !== undefined ? event.spamTestMailDescriptionId : ''],
      forgotPwdMailDescriptionId: [event !== undefined ? event.forgotPwdMailDescriptionId : ''],
      newRecommendationMailDescriptionId: [event !== undefined ? event.newRecommendationMailDescriptionId : ''],
      mailChangedMailDescriptionId: [event !== undefined ? event.mailChangedMailDescriptionId : ''],
      registrationErrorMailDescriptionId: [event !== undefined ? event.registrationErrorMailDescriptionId : ''],
      customerRegistrationViewId: [event !== undefined ? event.customerRegistrationViewId : ''],
      customerRegistrationSuccessViewId: [event !== undefined ? event.customerRegistrationSuccessViewId : ''],
      immediateLogin: [event !== undefined ? event.immediateLogin : ''],
      allowBilling: [event !== undefined ? event.allowBilling : ''],
      archived: [event !== undefined ? event.archived : ''],
      dataCheckAlg: [event !== undefined ? event.dataCheckAlg : ''],
    });
  }

  back() {
    this.router.navigate(['admin/customer-group/customerGroupList'], { queryParams: { 'force': this.isForce } });
  }

  delete() {
    if (confirm('Are you sure you want to delete?')) {
      this.subscriptions.add(this.systemService.deleteCustomerGroupById(this.id).pipe(skipWhile((item: any) => !item))
        .subscribe((response: any) => {
          this.router.navigate(['admin/customer-group/customerGroupList'], { queryParams: { 'force': true } });
        }));
    }
  }

  save() {
    if (this.customerGroupForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.subscriptions.add(this.systemService.updateCustomerGroup(this.id, this.customerGroupForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadCustomerGroupById();
          }));
      } else {
        this.subscriptions.add(this.systemService.saveCustomerGroup(this.customerGroupForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadCustomerGroupById();
          }));
      }
    } else {
      this.validateAllFormFields(this.customerGroupForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  get f() { return this.customerGroupForm.controls; }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
