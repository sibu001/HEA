import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { DynamicViewService } from 'src/app/store/dynamic-view-state-management/service/dynamic-view.service';
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
      this.dynamicViewService.loadDynamicViewById(this.id);
      this.loadDynamicViewById();
    }
  }
  setForm(event: any) {
    this.configForm = this.formBuilder.group({
      configurationName: [event !== undefined ? event.configurationName : '', Validators.required],
      baseEntity: [event !== undefined ? event.baseEntity : ''],
      isPaged: [event !== undefined ? event.isPaged : ''],
      shared: [event !== undefined ? event.shared : ''],
      note: [event !== undefined ? event.note : ''],
      totalCalls: [event !== undefined ? event.totalCalls : ''],
      totalProcessedTime: [event !== undefined ? event.totalProcessedTime : ''],
    });
  }

  goToAttributeList(): any {
    this.router.navigate(['/admin/viewConfiguration/viewConfigurationAttributeList'], { queryParams: { id: this.id } });
  }

  loadDynamicViewById() {
    this.subscriptions.add(this.dynamicViewService.getDynamicViewById().pipe(skipWhile((item: any) => !item))
      .subscribe((dynamicView: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/viewConfiguration/viewConfigurationEdit'], { queryParams: { 'id': dynamicView.id } });
        }
        this.setForm(dynamicView);
      }));
  }

  back() {
    this.router.navigate(['admin/viewConfiguration/viewConfigurationList'], { queryParams: { 'force': this.isForce } });
  }
  delete() {
    this.subscriptions.add(this.dynamicViewService.deleteDynamicViewById(this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.router.navigate(['admin/viewConfiguration/viewConfigurationList'], { queryParams: { 'force': true } });
      }));
  }

  save() {
    if (this.configForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.subscriptions.add(this.dynamicViewService.updateDynamicView(this.id, this.configForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadDynamicViewById();
          }));
      } else {
        this.subscriptions.add(this.dynamicViewService.saveDynamicView(this.configForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadDynamicViewById();
          }));
      }
    } else {
      this.validateForm();
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
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
