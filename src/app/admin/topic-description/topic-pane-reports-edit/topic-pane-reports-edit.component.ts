import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-topic-pane-reports-edit',
  templateUrl: './topic-pane-reports-edit.component.html',
  styleUrls: ['./topic-pane-reports-edit.component.css']
})
export class TopicPaneReportsEditComponent implements OnInit, OnDestroy {
  id: any;
  reportForm: FormGroup;
  parameterKeys = TableColumnData.REPORT_PARAMETER_KEY;
  public parameterDataSource: any;
  public totalElement = 0;
  public parameterData = {
    content: [],
    totalElements: 0,
  };
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }
  ngOnInit() {
    this.setForm(undefined);
    if (this.id !== undefined) {
    }
  }

  setForm(event: any) {
    this.reportForm = this.formBuilder.group({
      reportCode: [event !== undefined ? event.reportCode : '', Validators.required],
      report: [event !== undefined ? event.report : ''],
    });
  }
  back() {
    this.location.back();
  }

  save(): any {

  }

  addParameter(): any {

  }

  delete(): any {

  }

  get f(): { [key: string]: AbstractControl; } { return this.reportForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
