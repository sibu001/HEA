import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemMeasurementService } from 'src/app/store/system-measurement-management/service/system-measurement.service';
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
  periodData: any[] = TableColumnData.PERIOD_DATA;
  isForce = false;
  topicData = TableColumnData.TOPIC_DESCRIPTION_DATA;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemMeasurementService: SystemMeasurementService,
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
      this.systemMeasurementService.loadScriptBatchById(Number(this.id));
      this.loadBatchScriptById();
    }
  }


  loadBatchScriptById() {
    this.subscriptions.add(this.systemMeasurementService.getScriptBatchById().pipe(skipWhile((item: any) => !item))
      .subscribe((factor: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/factor/factorEdit'], { queryParams: { 'id': factor.id } });
        }
        this.setForm(factor);
      }));
  }
  setForm(event: any) {
    this.batchScriptForm = this.formBuilder.group({
      batchName: [event !== undefined ? event.batchName : ''],
      period: [event !== undefined ? event.period : '', Validators.required],
      periodDay: [event !== undefined ? event.periodDay : '', Validators.required],
      forEachCustomer: [event !== undefined ? event.forEachCustomer : ''],
      calculationType: [event !== undefined ? event.calculationType : ''],
      batchFilter: [event !== undefined ? event.batchFilter : ''],
      topic: [event !== undefined ? event.topic : ''],
      calculation: [event !== undefined ? event.calculation : ''],
      mailAddress: [event !== undefined ? event.mailAddress : ''],
      comments: [event !== undefined ? event.comments : '']
    });
  }
  back() {
    this.router.navigate(['admin/batchScript/batchScriptList'], { queryParams: { 'force': this.isForce } });
  }

  goToDebug() {
    this.router.navigate(['/admin/debug/scriptDebugConsole'], { queryParams: {} });

  }

  runNow() {

  }

  delete() {
    this.subscriptions.add(this.systemMeasurementService.deleteScriptBatchById(this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.router.navigate(['admin/batchScript/batchScriptList'], { queryParams: { 'force': true } });
      }));
  }

  save() {
    if (this.batchScriptForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.subscriptions.add(this.systemMeasurementService.updateScriptBatch(this.id, this.batchScriptForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadBatchScriptById();
          }));
      } else {
        this.subscriptions.add(this.systemMeasurementService.saveScriptBatch(this.batchScriptForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadBatchScriptById();
          }));
      }
    } else {
      this.validateForm();
    }
  }
  validateForm() {
    for (const key of Object.keys(this.batchScriptForm.controls)) {
      if (this.batchScriptForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }


  changeTheme(event: any): any {
    this.codeMirrorOptions.theme = event.target.value;
  }

  get f() { return this.batchScriptForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}

