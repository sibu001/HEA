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
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';

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
  placeCheckBox: any = [];
  placeList: any = [];
  selectedPlace: any = [];
  placeData = {
    content: [],
    totalElements: 0
  };
  public placeDataSource: any = [];
  placeSelectionListData: any = [];
  programGroupKey: Array<TABLECOLUMN> = TableColumnData.PROGRAM_GROUP_KEY;
  programSelectionList: Array<any> = [];
  programGroupCheckBox: any = [];
  programGroupList: any = [];
  selectedProgramGroup: any = [];
  programGroupData = {
    content: [],
    totalElements: 0
  };
  public programGroupDataSource: any;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemService: SystemService,
    private readonly activateRoute: ActivatedRoute,
    private readonly el: ElementRef,
    private readonly dynamicViewService: DynamicViewService,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly router: Router,
    private readonly mailService: MailService) {
    this.loadThemeList();
    this.loadBatchPeriod();
    this.loadScrapingPeriodList();
    this.loadJSPageList();
    this.loadMailDescriptionList();
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.scrollTop();
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.systemService.loadCustomerGroupById(Number(this.id));
      this.loadCustomerGroupById();
      this.findPlaceListByCustomerGroupId();
      this.findProgramGroupListByCustomerGroupId();
    }
    if (!this.id) {
      this.findProgramGroup();
      this.findPlace(false, '');
    }
  }

  scrollTop() {
    window.scroll(0, 0);
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
  }

  findProgramGroupListByCustomerGroupId(): void {
    this.programSelectionList = [];
    this.subscriptions.add(this.systemService.loadProgramGroupListByCustomerGroupId(this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((programData: any) => {
        this.programGroupList = programData.systemManagement.programGroupListByCustomerGroupId;
        programData.systemManagement.programGroupListByCustomerGroupId.forEach(element => {
          this.programSelectionList.push(element.programCode);
        });
        this.findProgramGroup();
      }));
  }

  findPlace(force: boolean, filter: string): any {
    this.systemUtilityService.loadPlaceList(force, filter);
    this.subscriptions.add(this.systemUtilityService.getPlaceList().pipe(skipWhile((item: any) => !item))
      .subscribe((placeList: any) => {
        this.placeData.content = placeList;
        this.placeDataSource = [...this.placeData.content];
      }));
  }

  findPlaceListByCustomerGroupId(): void {
    this.placeSelectionListData = [];
    this.subscriptions.add(this.systemService.loadPlaceListByCustomerGroupId(this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((placeData: any) => {
        this.placeList = placeData.systemManagement.placeListByCustomerGroupId;
        placeData.systemManagement.placeListByCustomerGroupId.forEach(element => {
          this.placeSelectionListData.push(element.place);
        });
        this.findPlace(false, '');
      }));
  }

  loadThemeList(): any {
    this.systemService.loadThemesList(false);
    this.subscriptions.add(this.systemService.getThemeList().pipe(skipWhile((item: any) => !item))
      .subscribe((themeList: any) => {
        this.themeList = themeList.data;
      }));
  }

  loadBatchPeriod(): any {
    this.systemService.loadScrapingUtilityList();
    this.subscriptions.add(this.systemService.getScrapingUtilityList().pipe(skipWhile((item: any) => !item))
      .subscribe((scrapingUtilityList: any) => {
        this.scrapingUtilityList = scrapingUtilityList.data;
      }));
  }

  loadScrapingPeriodList(): any {
    this.systemService.loadScrapingPeriodList();
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
    this.mailService.loadMailDescriptionList(false, params,true);
    this.subscriptions.add(this.mailService.getAllMailDescriptionList().pipe(skipWhile((item: any) => !item))
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
        this.checkPlace();
        this.checkProgramGroup();
        this.subscriptions.add(this.systemService.updateCustomerGroup(this.id, this.customerGroupForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.scrollTop();
            this.loadCustomerGroupById();
          }));
      } else {
        this.subscriptions.add(this.systemService.saveCustomerGroup(this.customerGroupForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.id = response.systemManagement.customerGroup.customerGroupId;
            this.scrollTop();
            this.checkPlace();
            this.checkProgramGroup();
            this.loadCustomerGroupById();
          }));
      }
    } else {
      this.validateAllFormFields(this.customerGroupForm);
      this.validateForm();
    }
  }

  placeCheckBoxChangeEvent(event: any) {
    this.selectedPlace = [...event];
    this.placeCheckBox = event;
  }

  checkPlace() {
    let changeValue = false;
    this.placeCheckBox.forEach(element => {
      const i = this.placeList.findIndex((item: any) => item.place === element.place);
      changeValue = true;
      if (i !== -1) {
        this.placeList.splice(i, 1);
        const j = this.selectedPlace.findIndex((item2: any) => item2.place === element.place);
        if (j !== -1) {
          this.selectedPlace.splice(j, 1);
        }
      }
    });
    this.deletePlaceOfCustomerGroup(this.placeList);
    this.assignPlaceToCustomerGroup(this.selectedPlace);
    setTimeout(() => {
      if (changeValue) {
        this.findPlaceListByCustomerGroupId();
      }
    }, 3000);
  }

  assignPlaceToCustomerGroup(placeList: any) {
    placeList.forEach(element => {
      this.systemService.assignPlaceToCustomerGroup(this.id, element.place);
    });
  }

  deletePlaceOfCustomerGroup(deleteList: any) {
    deleteList.forEach(element => {
      this.systemService.deletePlaceOfCustomerGroup(this.id, element.place);
    });
  }

  programGroupCheckBoxChangeEvent(event: any) {
    this.selectedProgramGroup = [...event];
    this.programGroupCheckBox = event;
  }

  checkProgramGroup() {
    let changeValue = false;
    this.programGroupCheckBox.forEach(element => {
      const i = this.programGroupList.findIndex((item: any) => item.programGroupId === element.programGroupId);
      changeValue = true;
      if (i !== -1) {
        this.programGroupList.splice(i, 1);
        const j = this.selectedProgramGroup.findIndex((item2: any) => item2.programGroupId === element.programGroupId);
        if (j !== -1) {
          this.selectedProgramGroup.splice(j, 1);
        }
      }

    });
    this.deleteProgramGroupOfCustomerGroup(this.programGroupList);
    this.assignProgramGroupToCustomerGroup(this.selectedProgramGroup);
    setTimeout(() => {
      if (changeValue) {
        this.findProgramGroupListByCustomerGroupId();
      }
    }, 3000);
  }

  assignProgramGroupToCustomerGroup(programGroupList: any) {
    programGroupList.forEach(element => {
      this.systemService.assignProgramGroupToCustomerGroup(this.id, element.programGroupId);
    });
  }

  deleteProgramGroupOfCustomerGroup(deleteList: any) {
    deleteList.forEach(element => {
      this.systemService.deleteProgramGroupOfCustomerGroup(this.id, element.programGroupId);
    });
  }
  validateForm() {
    for (const key of Object.keys(this.customerGroupForm.controls)) {
      if (this.customerGroupForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
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
