import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TableBody } from 'primeng/primeng';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-batch-script-edit',
  templateUrl: './batch-script-edit.component.html',
  styleUrls: ['./batch-script-edit.component.css']
})
export class BatchScriptEditComponent implements OnInit, OnDestroy {

  batchScriptForm: FormGroup;
  id: any;
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
  customerDataSource: any;
  customerGroupKey: Array<TABLECOLUMN> = TableColumnData.CUSTOMER_GROUP_KEY;
  customerData = {
    content: [],
    totalElements: 0
  };
  topicData = TableColumnData.TOPIC_DESCRIPTION_DATA;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemService: SystemService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly el: ElementRef) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.systemService.loadCustomerGroupById(Number(this.id));
      this.loadBatchScriptById();
    }
  }
  loadBatchScriptById() {

  }
  setForm(event: any) {
    this.batchScriptForm = this.formBuilder.group({
      batchName: [event !== undefined ? event.batchName : '', Validators.required],
      period: [event !== undefined ? event.period : '', Validators.required],
      periodDay: [event !== undefined ? event.periodDay : '', Validators.required],
      forEachCustomer: [event !== undefined ? event.forEachCustomer : '', Validators.required],
      calculationType: [event !== undefined ? event.calculationType : '', Validators.required],
      batchFilter: [event !== undefined ? event.batchFilter : '', Validators.required],
      topic: [event !== undefined ? event.topic : '', Validators.required],
      calculation: [event !== undefined ? event.calculation : '', Validators.required],
      mailAddress: [event !== undefined ? event.mailAddress : '', Validators.required],
      comments: [event !== undefined ? event.comments : '']
    });
  }
  back() {
    this.router.navigate(['admin/batchScript/batchScriptList']);
  }

  goToDebug() {
    this.router.navigate(['/admin/debug/scriptDebugConsole'], { queryParams: {} });

  }

  runNow() {

  }

  delete() {

  }

  save() {

  }

  changeTheme(event: any): any {
    this.codeMirrorOptions.theme = event.target.value;
  }

  get f() { return this.batchScriptForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }


}
