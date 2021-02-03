import { Location } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
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
  variableId: any;
  constructor(
    private readonly fb: FormBuilder,
    private readonly mailService: MailService,
    private readonly activateRoute: ActivatedRoute,
    private readonly systemService: SystemService,
    private readonly router: Router,
    private readonly el: ElementRef) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.variableId = params['variableId'];
    });
  }

  ngOnInit() {
    this.scrollTop();
    this.loadCalculationType();
    this.setForm(undefined);
    if (this.id && this.variableId) {
      this.mailService.loadContextVariableById(this.id, this.variableId);
      this.loadContextVariableById();
    }
  }

  scrollTop() {
    window.scroll(0, 0);
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
      calculationType: [event !== undefined ? event.calculationType : 'javascript'],
      calculation: [event !== undefined ? event.calculation : '']
    });
  }

  loadContextVariableById() {
    this.subscriptions.add(this.mailService.getContextVariableById().pipe(skipWhile((item: any) => !item))
      .subscribe((contextVariable: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/mailDescription/mailContextVariables'], { queryParams: { 'id': this.id, 'variableId': contextVariable.data.id } });
        }
        this.setForm(contextVariable.data);
      }));
  }

  back() {
    this.router.navigate(['admin/mailDescription/mailDescriptionEdit'], { queryParams: { 'id': this.id } });
  }

  delete() {
    this.subscriptions.add(this.mailService.deleteContextVariableById(this.id, this.variableId).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.router.navigate(['admin/mailDescription/mailDescriptionEdit'], { queryParams: { 'id': this.id } });
      }));
  }

  save() {
    if (this.contentForm.valid) {
      if (this.id && this.variableId) {
        this.subscriptions.add(this.mailService.updateContextVariable(this.id, this.variableId, this.contentForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.scrollTop();
            this.loadContextVariableById();
          }));
      } else {
        this.subscriptions.add(this.mailService.saveContextVariable(this.id, this.contentForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.scrollTop();
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
