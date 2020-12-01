import { Location } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { DynamicViewService } from 'src/app/store/dynamic-view-state-management/service/dynamic-view.service';
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
    private readonly dynamicViewService: DynamicViewService,
    private readonly router: Router,
    private readonly el: ElementRef) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.dynamicViewService.loadJavaScriptPageById(this.id);
      this.loadJavaScriptPageById();
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

  Preview() {
    this.router.navigate(['/admin/jsPages/jsPagesPreview'], { queryParams: { id: this.id } });
  }


  loadJavaScriptPageById() {
    this.subscriptions.add(this.dynamicViewService.getJavaScriptPageById().pipe(skipWhile((item: any) => !item))
      .subscribe((jsPages: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/jsPages/jsPagesEdit'], { queryParams: { 'id': jsPages.id } });
        }
        this.setForm(jsPages);
      }));
  }

  back() {
    this.router.navigate(['admin/jsPages/jsPagesList'], { queryParams: { 'force': this.isForce } });
  }
  delete() {
    this.subscriptions.add(this.dynamicViewService.deleteJavaScriptPageById(this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.router.navigate(['admin/jsPages/jsPagesList'], { queryParams: { 'force': true } });
      }));
  }

  save() {
    if (this.jsPagesForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.subscriptions.add(this.dynamicViewService.updateJavaScriptPage(this.id, this.jsPagesForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadJavaScriptPageById();
          }));
      } else {
        this.subscriptions.add(this.dynamicViewService.saveJavaScriptPage(this.jsPagesForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadJavaScriptPageById();
          }));
      }
    } else {
      this.validateForm();
    }
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
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}

