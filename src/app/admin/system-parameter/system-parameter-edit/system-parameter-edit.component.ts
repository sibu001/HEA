import { Location } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-system-parameter-edit',
  templateUrl: './system-parameter-edit.component.html',
  styleUrls: ['./system-parameter-edit.component.css']
})
export class SystemParameterEditComponent implements OnInit, OnDestroy {

  id: any;
  systemParameterForm: FormGroup;
  private readonly subscriptions: Subscription = new Subscription();
  isForce = false;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly systemUtilityService: SystemUtilityService,
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
      this.systemUtilityService.loadSystemParameterById(this.id);
      this.loadSystemParameterById();
    }
  }

  setForm(event: any) {
    this.systemParameterForm = this.formBuilder.group({
      parameterCode: [event !== undefined ? event.parameterCode : ''],
      description: [event !== undefined ? event.description : ''],
      parameterValue: [event !== undefined ? event.parameterValue : ''],
      formatType: [event !== undefined ? event.formatType : ''],
      needServerRestart: [event !== undefined ? event.needServerRestart : ''],
      readOnly: [event !== undefined ? event.readOnly : ''],
      comments: [event !== undefined ? event.comments : ''],
    });
  }

  loadSystemParameterById() {
    this.subscriptions.add(this.systemUtilityService.getSystemParameterById().pipe(skipWhile((item: any) => !item))
      .subscribe((systemParameter: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/systemParameter/systemParameterEdit'], { queryParams: { 'id': systemParameter.id } });
        }
        this.setForm(systemParameter);
      }));
  }

  back() {
    this.router.navigate(['admin/systemParameter/systemParameterList'], { queryParams: { 'force': this.isForce } });
  }
  delete() {
    this.subscriptions.add(this.systemUtilityService.deleteSystemParameterById(this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.router.navigate(['admin/systemParameter/systemParameterList'], { queryParams: { 'force': true } });
      }));
  }

  save() {
    if (this.systemParameterForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.subscriptions.add(this.systemUtilityService.updateSystemParameter(this.id, this.systemParameterForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadSystemParameterById();
          }));
      } else {
        this.subscriptions.add(this.systemUtilityService.saveSystemParameter(this.systemParameterForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadSystemParameterById();
          }));
      }
    } else {
      this.validateForm();
    }
  }
  validateForm() {
    for (const key of Object.keys(this.systemParameterForm.controls)) {
      if (this.systemParameterForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }

  get f() { return this.systemParameterForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}

