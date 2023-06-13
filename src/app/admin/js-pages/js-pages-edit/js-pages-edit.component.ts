import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, skipWhile, take } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { DynamicViewService } from 'src/app/store/dynamic-view-state-management/service/dynamic-view.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-js-pages-edit',
  templateUrl: './js-pages-edit.component.html',
  styleUrls: ['./js-pages-edit.component.css']
})
export class JsPagesEditComponent implements OnInit, OnDestroy {

  id: any;
  jsPagesForm: FormGroup;
  codeMirrorOptions: any = {
    theme: 'idea',
    mode: 'application/ld+json',
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true,
  };
  isForce = false;
  public jsPageData : any = {};
  public customerGroupKeys = TableColumnData.CUSTOMER_GROUP_KEY;
  public jsPageTemplate = TableColumnData.JS_PAGE_TEMPLATE;
  public jsPageGroup = TableColumnData.JS_PAGE_GROUP;
  public customerGroupDataSource: any;
  public selectedCustomerGroupList : Array<any> = [];
  public newlySelectedCustomerGroupList  : Array<any> = [];
  public totalElement = 0;
  public customerGroupData = {
    content: [],
    totalElements: 0,
  };
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly dynamicViewService: DynamicViewService,
    private readonly systemService: SystemService,
    private readonly router: Router,
    private readonly el: ElementRef) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.findCustomerGroup(false, '');
    });
  }

  ngOnInit() {
    this.setForm(undefined);
    if (this.id) {
      this.dynamicViewService.loadJavaScriptPageById(this.id);
      this.getJavaScriptPageById();

      this.loadJsPageCustomerGroup();
      this.combineLatestCustomerGroupAndJsPageGroup();

    }
    AppUtility.scrollTop();
  }

  findCustomerGroup(force: boolean, filter: any) {
    this.systemService.loadCustomerGroupList(force, filter);
  }

  loadJsPageCustomerGroup(){
    this.dynamicViewService.loadJavaScriptCustomerGroupList(false,this.id);
  }

  combineLatestCustomerGroupAndJsPageGroup(){
    const customerGroupList$ : Observable<any> = this.systemService.getCustomerGroupList().pipe(filter((item: any) => item));
    const jsPageGroupList$ : Observable<any> = this.dynamicViewService.getJavaScriptCustomerGroupList()
    .pipe(filter(data => data instanceof Array && (data.length == 0 || data[0].jsPageId == this.id)));

    this.subscriptions.add(
      combineLatest([customerGroupList$, jsPageGroupList$])
      .subscribe(([customerGroupList, jsPageGroupList]) =>{

        this.customerGroupData.content = customerGroupList;
        this.customerGroupDataSource = [...this.customerGroupData.content];

        const selectedCustomerGroupList = jsPageGroupList.map(data => data.customerGroup.customerGroupId);
        this.selectedCustomerGroupList = [...selectedCustomerGroupList];

      })
    )
  }

  setForm(event: any) {
    this.jsPagesForm = this.formBuilder.group({
      code: [event !== undefined ? event.code : '', Validators.required],
      name: [event !== undefined ? event.name : '', Validators.required],
      template: [event !== undefined ? event.template : 'jsPageWithoutTemplate'],
      showInMenu: [event !== undefined ? event.showInMenu : ''],
      openInNewWindow: [event !== undefined ? event.openInNewWindow : ''],
      needAuthorization: [event !== undefined ? event.needAuthorization : ''],
      selectGroup: [event !== undefined ? event.selectGroup : ''],
      selectGroupMode: [event !== undefined ? event.selectGroupMode : 'A'],
      selectCoach: [event !== undefined ? event.selectCoach : ''],
      selectCoachMode: [event !== undefined ? event.selectCoachMode : 'A'],
      selectCity: [event !== undefined ? event.selectCity : ''],
      selectCityMode: [event !== undefined ? event.selectCityMode : 'A'],
      selectPage: [event !== undefined ? event.selectPage : ''],
      selectPageMode: [event !== undefined ? event.selectPageMode : 'A'],
      selectAllMode: [event !== undefined ? event.selectAllMode : 'A'],
      pageBody: [event !== undefined ? event.pageBody : ''],
    });
  }

  Preview() {
    this.router.navigate(['/admin/jsPages/jsPagesPreview'], { queryParams: { id: this.id } });
  }


  getJavaScriptPageById() {
    this.subscriptions.add(this.dynamicViewService.getJavaScriptPageById().pipe(skipWhile((item: any) => !item))
      .subscribe((jsPages: any) => {
        this.jsPageData = {...jsPages};
        this.setForm({...jsPages});
        AppUtility.scrollTop();
      }));
  }

  back() {
    this.router.navigate(['admin/jsPages/jsPagesList'], { queryParams: { 'force': this.isForce } });
  }

  delete() {
    if (AppUtility.deleteConfirmatonBox()) {
      this.subscriptions.add(this.dynamicViewService.deleteJavaScriptPageById(this.id).pipe(skipWhile((item: any) => !item))
        .subscribe((response: any) => {
          this.isForce = true;
          this.back();
        }));
    }
  }

  save() {
    
    AppUtility.removeErrorFieldMessagesFromForm();
    if (AppUtility.validateAndHighlightReactiveFrom(this.jsPagesForm)) {

      if (this.id) {

        const reqestBody : any = {...this.jsPageData, ...this.jsPagesForm.value};
        this.subscriptions.add(this.dynamicViewService.updateJavaScriptPage(this.id, reqestBody).pipe(
          filter((item: any) => item),take(1))
          .subscribe((response: any) => {
            this.isForce = true;
            this.saveOrDeleteCustomerGroups();
          }, AppUtility.errorFieldHighlighterCallBack));

      } else {

        this.subscriptions.add(this.dynamicViewService.saveJavaScriptPage(this.jsPagesForm.value).pipe(
          filter((item: any) => item),take(1))
          .subscribe((response: any) => {
            this.isForce = true;
            this.id = response.dynamicViewManagement.JavaScriptPage.id;
            AppUtility.appendIdToURLAfterSave(this.router,this.activateRoute,this.id);

            this.getJavaScriptPageById();
            this.loadJsPageCustomerGroup();
            this.combineLatestCustomerGroupAndJsPageGroup();

          },AppUtility.errorFieldHighlighterCallBack));

      }
    } 

  }

  saveOrDeleteCustomerGroups(){
    const {newlySelected, newlyRemoved } = AppUtility.getNewlySelectedAndRemovedList
      (this.newlySelectedCustomerGroupList,this.selectedCustomerGroupList,'customerGroupId');

    this.saveCustomerGroupList(newlySelected);
    this.deleteCustomerGroupList(newlyRemoved);

    this.newlySelectedCustomerGroupList = [];

  }

  saveCustomerGroupList(customerGroupList : Array<any>) : void{
    customerGroupList.forEach(customerGroupId =>{
      this.dynamicViewService.saveJavaScriptCustomerGroup(this.id,customerGroupId);
    });
  }

  deleteCustomerGroupList(customerGroupList : Array<any>) : void{
    customerGroupList.forEach(customerGroupId =>{
      this.dynamicViewService.deleteJavaScriptCustomerGroupById(this.id,customerGroupId);
    });
  }

  validateForm() {
    for (const key of Object.keys(this.jsPagesForm.controls)) {
      if (this.jsPagesForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }

  get f() { return this.jsPagesForm.controls; }

  highlightErrorField(formControlName : string) : boolean {
    return AppUtility.showErrorMessageOnErrorField(this.f,formControlName);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}

