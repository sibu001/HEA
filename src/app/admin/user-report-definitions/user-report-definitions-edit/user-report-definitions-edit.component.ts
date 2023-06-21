import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, skipWhile, take } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-user-report-definitions-edit',
  templateUrl: './user-report-definitions-edit.component.html',
  styleUrls: ['./user-report-definitions-edit.component.css']
})
export class UserReportDefinitionsEditComponent implements OnInit, OnDestroy {


  id: any;
  topicForm: FormGroup;
  public userReportKeys = TableColumnData.CUSTOMER_GROUP_KEY;
  contentPartsKeys = TableColumnData.CONTENT_PART_KEYS;
  variableKeys = TableColumnData.VARIABLE_KEYS;
  reportType = TableColumnData.USER_REPORT_DATA;
  public userReportType : Array<any> = [];
  public userReportData : any = {};
  public force : boolean = false;
  contentTypeList: any[] = [];
  public customerGroupSource: any;
  public contentPartsDataSource: any;
  public variableDataSource: any;
  public totalElement = 0;
  public customerGroup = {
    content: [],
    totalElements: 0,
    selectedContent: [],
  };
  public contentPartsData = {
    content: [],
    totalElements: 0,
  };
  public variableData = {
    content: [],
    totalElements: 0,
  };
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly systemService: SystemService,
    private readonly location: Location,
    private readonly router: Router,
    private readonly topicService: TopicService) {

    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      if(this.id){
        this.systemService.loadUserReportById(this.id);
        this.loadWhenObjectExists();
      }
    });

  }

  ngOnInit() {
    this.setForm(undefined);
    this.getUserReportById();
    this.loadUserReportType();
    this.loadContentTypeList();
    AppUtility.scrollTop();
  }

  loadWhenObjectExists(){
    this.loadCustomerGroup();
    this.loadUserReportCustomerGroups();
    this.combineLatestResponseOfCustomerGroup();
  }

  setForm(event: any) {
    this.topicForm = this.formBuilder.group({
      orderNumber: [event !== undefined ? event.orderNumber : ''],
      displayName: [event !== undefined ? event.displayName : ''],
      userReportType: [event !== undefined ? event.userReportType : 'profile'],
      labelTemplate: [event !== undefined ? event.labelTemplate : '', Validators.required],
      contentType: [event !== undefined ? event.contentType : 'H'],
      filter: [event !== undefined ? event.filter : '']
    });
  }

  loadContentTypeList(): any {
    this.systemService.loadContentTypeList();
    this.subscriptions.add(this.systemService.getContentType()
      .pipe(filter((item: any) => item),take(1))
      .subscribe((contentTypeList: any) => {
        this.contentTypeList = [...contentTypeList.data];
      }));
  }

  loadUserReportType() : void {
    this.topicService.loadLookUpValuesByType(AppConstant.lookUpUserReportType);
    this.subscriptions.add(
      this.topicService.getUserReportTypeLookUp()
      .pipe(filter((data: any) => data instanceof Array))
      .subscribe(response =>{
          this.userReportType = [...response];
      }));
  }

  loadCustomerGroup() {
    this.systemService.loadCustomerGroupList(false, new HttpParams());
  }

  loadUserReportCustomerGroups() : void {
    this.systemService.loadUserReportsCustomerGroups(this.id);
  }

  combineLatestResponseOfCustomerGroup() : void {
    const customerGroup$ : Observable<any> = this.systemService.getCustomerGroupList()
      .filter(data => data instanceof Array);

    const userReportCustomerGroups$ : Observable<any> = this.systemService.getUserReportCustomerGroups()
      .filter(data => data instanceof Array);


    this.subscriptions.add(
      combineLatest(customerGroup$,userReportCustomerGroups$)
      .subscribe(([customerGroup, userReportCustomerGroups]) =>{
          this.customerGroup.content = [...customerGroup];
          const selected =  userReportCustomerGroups.map(group => group.customerGroupId);
          this.customerGroup.selectedContent = selected;
      })
    )

  }

  back() {
    this.router.navigate(['/admin/userReportDefinitions/userReportDefinitionsList'], { queryParams: { force : this.force }})
  }

  getUserReportById() : void {
    this.subscriptions.add(
      this.systemService.getUserReport()
      .pipe(filter(data => data && data.id == this.id))
      .subscribe(response => {
        this.userReportData = {...response};
        this.setForm({...response});
        AppUtility.scrollTop();
      }));
  }

  save(): void { 

    AppUtility.removeErrorFieldMessagesFromForm();
    if(!AppUtility.validateAndHighlightReactiveFrom(this.topicForm)) return;

    if(this.id){

      const requestBody = {...this.userReportData, ...this.topicForm.value };
      this.subscriptions.add(
        this.systemService.updateUserReportById(requestBody,this.id)
        .pipe(take(1))
        .subscribe( response =>{
              this.force = true;
        },AppUtility.errorFieldHighlighterCallBack));

      return;
    }

    const requestBody = {...this.topicForm.value};
    this.subscriptions.add(
      this.systemService.saveNewUserReport(requestBody)
      .pipe(take(1))
      .subscribe((response : any) =>{

        this.force = true;
        this.id = response.systemManagement.userReport.id;
        AppUtility.appendIdToURLAfterSave(this.router,this.activateRoute,this.id);
        this.getUserReportById();
        this.loadWhenObjectExists();

      }, AppUtility.errorFieldHighlighterCallBack));

  }

  delete(): void { 

    this.subscriptions.add(
      this.systemService.deleteUserReportById(this.id)
      .pipe(take(1))
      .subscribe((response)=>{ 
        this.force = true;
        this.back();
      },AppUtility.errorFieldHighlighterCallBack));

  }

  copy(): void { }

  get f() { return this.topicForm.controls }

  highlightErrorField(formControlName : string) : boolean{
    return AppUtility.showErrorMessageOnErrorField(this.f,formControlName);
  }


  addContentParts(): any {
    this.router.navigate(['/admin/userReportDefinitions/userReportContentParts']);
  }

  addVariable(): any {
    this.router.navigate(['/admin/userReportDefinitions/userReportContextVariable']);
  }

  goToEditContentParts(): any {
    this.router.navigate(['/admin/userReportDefinitions/userReportContentParts'], { queryParams: { id: this.id } });
  }

  goToEditVariable(): any {
    this.router.navigate(['/admin/userReportDefinitions/userReportContextVariable'], { queryParams: { id: this.id } });
  }

  Preview() {
    this.router.navigate(['/admin/userReportDefinitions/userReportPreview'], { queryParams: { id: this.id } });
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
