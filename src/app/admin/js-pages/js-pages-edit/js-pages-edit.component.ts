import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { StackTraceComponent } from '../../mail-description/stack-trace/stack-trace.component';

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
  public customerGroupKeys = TableColumnData.CUSTOMER_GROUP_KEY;
  public customerGroupDataSource: any;
  public totalElement = 0;
  public customerGroupData = {
    content: [],
    totalElements: 0,
  };
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router) {
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
    this.jsPagesForm = this.formBuilder.group({
      code: [event !== undefined ? event.code : '', Validators.required],
      name: [event !== undefined ? event.name : '', Validators.required],
      template: [event !== undefined ? event.template : ''],
      showInMenu: [event !== undefined ? event.showInMenu : ''],
      openInNewWindow: [event !== undefined ? event.openInNewWindow : ''],
      needAuthorization: [event !== undefined ? event.needAuthorization : ''],
      selectCustomerGroup: [event !== undefined ? event.selectCustomerGroup : ''],
      selectGroupMode: [event !== undefined ? event.selectGroupMode : ''],
      selectCoach: [event !== undefined ? event.selectCoach : ''],
      selectCoachMode: [event !== undefined ? event.selectCoachMode : ''],
      selectCity: [event !== undefined ? event.selectCity : ''],
      selectCityMode: [event !== undefined ? event.selectCityMode : ''],
      specifyPage: [event !== undefined ? event.specifyPage : ''],
      specifyPageMode: [event !== undefined ? event.specifyPageMode : ''],
      specifySelectMode: [event !== undefined ? event.specifySelectMode : ''],
      htmlTemplate: [event !== undefined ? event.htmlTemplate : ''],
    });
  }
  back() {
    this.location.back();
  }

  save(): any { }

  delete(): any { }

  Preview() {
    this.router.navigate(['/admin/jsPages/jsPagesPreview'], { queryParams: { id: this.id } });
  }

  get f() { return this.jsPagesForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
