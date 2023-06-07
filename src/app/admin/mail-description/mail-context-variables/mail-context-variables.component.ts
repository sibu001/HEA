import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, skipWhile, take } from 'rxjs/operators';
import { MailService } from 'src/app/store/mail-state-management/service/mail.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { AppUtility } from 'src/app/utility/app.utility';
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
  contextVariable : any = {};
  private readonly subscriptions: Subscription = new Subscription();
  isForce = false;
  mailDescriptionId: number | string;
  errorMessage: any;
  constructor(
    private readonly fb: FormBuilder,
    private readonly mailService: MailService,
    private readonly activateRoute: ActivatedRoute,
    private readonly systemService: SystemService,
    private readonly router: Router,
    private readonly el: ElementRef) {
    this.activateRoute.queryParams.subscribe(params => {
      this.mailDescriptionId = params['mailDescriptionId'];
      this.id = params['id'];
    });
  }

  ngOnInit() {
    AppUtility.scrollTop();
    this.loadCalculationType();
    this.setForm(undefined);
    if (this.mailDescriptionId && this.id) {
      this.mailService.loadContextVariableById(this.mailDescriptionId, this.id);
      this.getContextVariableById();
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
      },
      error => {
        this.errorMessage = error;
      }));
  }

  setForm(event: any) {
    this.contentForm = this.fb.group({
      field: [event !== undefined ? event.field : '', Validators.required],
      orderNumber: [event !== undefined ? event.orderNumber : '',Validators.required],
      calculationType: [event !== undefined ? event.calculationType : 'javascript'],
      calculation: [event !== undefined ? event.calculation : '']
    });
  }

  getContextVariableById() {
    this.subscriptions.add(this.mailService.getContextVariableById()
    .pipe(filter((item: any) => item && this.id == item.id))
      .subscribe((contextVariable: any) => {
        this.contextVariable = contextVariable;
        this.setForm(contextVariable);
        AppUtility.scrollTop();
      },
      error => {
        this.errorMessage = error;
      }));
  }

  back() {
    this.router.navigate(['admin/mailDescription/mailDescriptionEdit'], { queryParams: { 'id': this.mailDescriptionId } });
  }

  delete() {
    if(!AppUtility.deleteConfirmatonBox()) return;
    this.subscriptions.add(this.mailService.deleteContextVariableById(this.mailDescriptionId, this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.back();
      },
      error => {
        this.errorMessage = error;
      }));
  }

  save() {

    
    if (AppUtility.validateAndHighlightReactiveFrom(this.contentForm)) {
      if (this.id) {

        const requestBody : any = { ...this.contextVariable, ...this.contentForm.value };
        this.subscriptions.add(this.mailService.updateContextVariable(this.mailDescriptionId, this.id, requestBody)
        .pipe( filter((item: any) => item),take(1))
          .subscribe((response: any) => {
          },AppUtility.errorFieldHighlighterCallBack));

      } else {

        this.subscriptions.add(this.mailService.saveContextVariable(this.mailDescriptionId, this.contentForm.value)
          .pipe( filter((item: any) => item),take(1))
          .subscribe((response: any) => {
            this.id = response.mailManagement.contextVariable.id;
            AppUtility.appendIdToURLAfterSave(this.router,this.activateRoute,this.id);
            this.getContextVariableById();
          },AppUtility.errorFieldHighlighterCallBack));

      }
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

  highlightErrorField(formControlName : string) : boolean{
    return this.f[formControlName].invalid && (this.f[formControlName].dirty || this.f[formControlName].touched);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
