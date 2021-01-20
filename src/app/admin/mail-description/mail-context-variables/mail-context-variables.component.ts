import { Location } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { MailService } from 'src/app/store/mail-state-management/service/mail.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-mail-context-variables',
  templateUrl: './mail-context-variables.component.html',
  styleUrls: ['./mail-context-variables.component.css']
})
export class MailContextVariablesComponent implements OnInit, OnDestroy {
  id: any;
  contentForm: FormGroup;
  calculationType: any;
  private readonly subscriptions: Subscription = new Subscription();
  isForce = false;
  constructor(
    private readonly fb: FormBuilder,
    private readonly mailService: MailService,
    private readonly activateRoute: ActivatedRoute,
    private readonly systemService:SystemService,
    private readonly router: Router,
    private readonly el: ElementRef) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.loadCalculationType();
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.mailService.loadContextVariableById(this.id);
      this.loadContextVariableById();
    }
  }

  loadCalculationType() {
    this.systemService.loadCalculationTypeList();
    this.subscriptions.add(this.systemService.getCalculationTypeList().pipe(skipWhile((item: any) => !item))
      .subscribe((calculationType: any) => {
        this.calculationType = calculationType.data;
      }));
  }

  setForm(event: any) {
    this.contentForm = this.fb.group({
      field: [event !== undefined ? event.field : ''],
      orderNumber: [event !== undefined ? event.orderNumber : ''],
      calculationType: [event !== undefined ? event.calculationType : ''],
      calculationExpression: [event !== undefined ? event.calculationExpression : '']
    });
  }

  loadContextVariableById() {
    this.subscriptions.add(this.mailService.getContextVariableById().pipe(skipWhile((item: any) => !item))
      .subscribe((contextVariable: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/mailDescription/mailContextVariables'], { queryParams: { 'id': contextVariable.id } });
        }
        this.setForm(contextVariable);
      }));
  }

  back() {
    this.router.navigate(['admin/contextVariable/contextVariableList'], { queryParams: { 'force': this.isForce } });
  }
  delete() {
    this.subscriptions.add(this.mailService.deleteContextVariableById(this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.router.navigate(['admin/mailDescription/mailDescriptionEdit'], { queryParams: { 'force': true } });
      }));
  }

  save() {
    if (this.contentForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.subscriptions.add(this.mailService.updateContextVariable(this.id, this.contentForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadContextVariableById();
          }));
      } else {
        this.subscriptions.add(this.mailService.saveContextVariable(this.contentForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadContextVariableById();
          }));
      }
    } else {
      this.validateForm();
    }
  }
  validateForm() {
    for (const key of Object.keys(this.contentForm.controls)) {
      if (this.contentForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }

  get f() { return this.contentForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
