import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, skipWhile, take } from 'rxjs/operators';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { DynamicViewService } from 'src/app/store/dynamic-view-state-management/service/dynamic-view.service';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-view-configuration-edit',
  templateUrl: './view-configuration-edit.component.html',
  styleUrls: ['./view-configuration-edit.component.css']
})
export class ViewConfigurationEditComponent implements OnInit, OnDestroy {
  id: any;
  configForm: FormGroup;
  isForce = false;
  user : Users = new Users();
  public dynamicViewData = { createdBy : undefined , totalProcessedTime : undefined , totalCalls : undefined };
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly dynamicViewService: DynamicViewService,
    private readonly router: Router,
    private readonly el: ElementRef,
    private readonly loginService: LoginService) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.user = this.loginService.getUser();
    AppUtility.scrollTop();
  }

  ngOnInit() {
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.dynamicViewService.loadDynamicViewById(this.id);
      this.getDynamicViewById();
    }
  }

  setForm(event: any) {
    this.configForm = this.formBuilder.group({
      configurationName: [event !== undefined ? event.configurationName : '', Validators.required],
      baseEntity: [event !== undefined ? event.baseEntity : 'customer'],
      paged: [event !== undefined ? event.paged : ''],
      shared: [event !== undefined ? event.shared : ''],
      note: [event !== undefined ? event.note : ''],
      totalCalls: [event !== undefined ? event.totalCalls : ''],
      totalProcessedTime: [event !== undefined ? event.totalProcessedTime : ''],
    });

  }

  get totalCalls(){
    return this.configForm.value.totalCalls;
  }

  get totalProcessedTime(){ 
    return this.configForm.value.totalProcessedTime
  }

  get owner(){
    return this.dynamicViewData.createdBy ? this.dynamicViewData.createdBy : this.user.outhMeResponse.user.name;
  }

  goToAttributeList(): any {
    this.router.navigate(['/admin/viewConfiguration/viewConfigurationAttributeList'], { queryParams: { viewConfigurationId: this.id } });
  }

  getDynamicViewById() {
    this.subscriptions.add(this.dynamicViewService.getDynamicViewById()
    .pipe(filter((item: any) => item && this.id == item.id))
      .subscribe((dynamicView: any) => {
        this.setForm({...dynamicView});
        this.dynamicViewData = {...dynamicView};
        AppUtility.scrollTop();
      }));
  }

  back() {
    this.router.navigate(['admin/viewConfiguration/viewConfigurationList'], { queryParams: { 'force': this.isForce } });
  }

  delete() {
    this.subscriptions.add(this.dynamicViewService.deleteDynamicViewById(this.id).pipe(filter((item: any) => item),take(1))
      .subscribe((response: any) => {
        this.isForce = true;
        this.back();
      }));
  }

  save() {
    AppUtility.removeErrorFieldMessagesFromForm();
    if (AppUtility.validateAndHighlightReactiveFrom(this.configForm)) {

      if (this.id) {

        const requestBody = {...this.dynamicViewData, ...this.configForm.value};
        this.subscriptions.add(this.dynamicViewService.updateDynamicView(this.id, requestBody).pipe(
          filter((item: any) => item),take(1))
          .subscribe((response: any) => {
            this.isForce = true;
          },AppUtility.errorFieldHighlighterCallBack));

      } else {

        const requestBody = {...this.configForm.value};
        requestBody.user  = this.user.outhMeResponse.user;
        requestBody.userId = requestBody.user.id;
        
        this.subscriptions.add(this.dynamicViewService.saveDynamicView(requestBody).pipe(
          filter((item: any) => item),take(1))
          .subscribe((response: any) => {

            this.isForce = true;
            this.id = response.dynamicViewManagement.dynamicView.id;
            AppUtility.appendIdToURLAfterSave(this.router,this.activateRoute,this.id);
            this.getDynamicViewById();

          },AppUtility.errorFieldHighlighterCallBack));

      }
    } 
  }

  validateForm() {
    for (const key of Object.keys(this.configForm.controls)) {
      if (this.configForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }

  get f() { return this.configForm.controls; }

  highlightErrorField(formControlName : string) : boolean{
    return this.f[formControlName].invalid && (this.f[formControlName].dirty || this.f[formControlName].touched);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
