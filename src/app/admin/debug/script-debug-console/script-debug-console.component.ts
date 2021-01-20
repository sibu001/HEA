import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { AdministrativeService } from 'src/app/store/administrative-state-management/service/administrative.service';
import { SystemMeasurementService } from 'src/app/store/system-measurement-management/service/system-measurement.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-script-debug-console',
  templateUrl: './script-debug-console.component.html',
  styleUrls: ['./script-debug-console.component.css']
})
export class ScriptDebugConsoleComponent implements OnInit, OnDestroy {

  id: any;
  isTrue: Boolean = true;
  debugForm: FormGroup;
  customerList: any = [];
  customerData: any;
  users: Users = new Users();
  calculationTypeList: any[] = [];
  scriptDebugEventList: any[] = TableColumnData.SCRIPT_DEBUG_EVENT;
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
  topicDescriptionData: Array<any>;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly topicService: TopicService,
    private readonly loginService: LoginService,
    private readonly systemMeasurementService: SystemMeasurementService,
    private readonly activateRoute: ActivatedRoute,
    private readonly systemService: SystemService,
    private readonly administrativeService: AdministrativeService,
    private readonly el: ElementRef,
    private readonly location: Location) {
    this.users = this.loginService.getUser();
    this.customerList = this.users.searchUserList;
    if (this.customerList.length > 0) {
      this.customerData = this.customerList[0];
    }
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.scrollTop();
    this.getPaidServiceId();
    this.loadCalculationTypeList();
    this.loadTopicDescription();
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.loadBatchScriptById();
    }
  }

  getCustomerList(url: any) {
    this.subscriptions.add(this.administrativeService.loadCustomerList(url).pipe(skipWhile((item: any) => !item))
      .subscribe((customerList: any) => {
        this.customerList = customerList.administrativeManagement.customerList.list;
      }));
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  loadCalculationTypeList(): any {
    this.systemService.loadCalculationTypeList();
    this.subscriptions.add(this.systemService.getCalculationTypeList().pipe(skipWhile((item: any) => !item))
      .subscribe((calculationTypeList: any) => {
        this.calculationTypeList = calculationTypeList.data;
      }));
  }
  handleAutoComplete(event: any): any {
    this.users.searchUserList[0] = event.option.value;
    this.loginService.setUser(this.users);
    this.debugForm.controls['auditId'].setValue(event.option.value.auditId);
    this.debugForm.controls['customerName'].setValue(event.option.value.user.name);
    this.debugForm.controls['userId'].setValue(event.option.value.user.id);
  }

  search(event: any) {
    const params = new HttpParams()
      .set('filter.pageSize', '5')
      .set('filter.startRow', '0')
      .set('loadCustomers', 'true')
      .set('filter.customerName', '%' + event);
    this.getCustomerList(params);
  }


  loadTopicDescription() {
    this.topicService.loadTopicDescriptionList(true, '');
    this.subscriptions.add(this.topicService.getTopicDescriptionList().pipe(skipWhile((item: any) => !item))
      .subscribe((topicDescriptionList: any) => {
        this.topicDescriptionData = topicDescriptionList;
      }));
  }

  loadBatchScriptById() {
    this.systemMeasurementService.loadScriptBatchById(Number(this.id));
    this.subscriptions.add(this.systemMeasurementService.getScriptBatchById().pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.setForm(response);
      }));
  }

  setForm(event: any) {
    this.debugForm = this.formBuilder.group({
      auditId: [this.customerData !== undefined ? this.customerData.auditId : '', Validators.required],
      customerName: [this.customerData !== undefined ? this.customerData.user.name : '', Validators.required],
      userId: [this.customerData !== undefined ? this.customerData.user.id : ''],
      surveyDescriptionId: [event !== undefined ? event.surveyDescriptionId : ''],
      scriptType: [event !== undefined ? event.calculationType : ''],
      script: [event !== undefined ? event.calculation : ''],
      batchScriptId: [event !== undefined ? event.batchScriptId : ''],
      paidServiceId: [''],
      billingDate: [''],
      factorId: [''],
      event: ['VALIDATE'],
      result: [event !== undefined ? event.result : ''],
      disableValueCache: [false],
      executionTime: [''],
      resultType: [''],
    });
  }

  changeTheme(event: any): any {
    this.codeMirrorOptions.theme = event.target.value;
  }

  getPaidServiceId() {
    this.subscriptions.add(this.topicService.loadPaidServiceList().pipe(
      skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        console.log(response.topicManagement.paidServiceList);
      }));
  }

  executeDebug() {
    if (this.debugForm.valid) {
      this.subscriptions.add(this.topicService.scriptDebug(this.debugForm.value).pipe(
        skipWhile((item: any) => !item))
        .subscribe((response: any) => {
          console.log(response.topicManagement.scriptDebug);
          this.debugForm.controls['result'].setValue(response.topicManagement.scriptDebug.result);
          this.debugForm.controls['executionTime'].setValue(response.topicManagement.scriptDebug.executionTime);
          this.debugForm.controls['resultType'].setValue(response.topicManagement.scriptDebug.resultType);
        }));

    } else {
      this.validateForm();
    }
  }
  validateForm() {
    for (const key of Object.keys(this.debugForm.controls)) {
      if (this.debugForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }
  back() {
    this.location.back();
  }
  get f() { return this.debugForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
