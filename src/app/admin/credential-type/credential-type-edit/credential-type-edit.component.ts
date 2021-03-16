import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-credential-type-edit',
  templateUrl: './credential-type-edit.component.html',
  styleUrls: ['./credential-type-edit.component.css']
})
export class CredentialTypeEditComponent implements OnInit, OnDestroy {
  credentialTypeForm: FormGroup;
  id: any;
  isForce = false;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemService: SystemService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly el: ElementRef) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.scrollTop();
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.systemService.loadCredentialTypeById(this.id);
      this.loadCredentialTypeById();
    }
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  loadCredentialTypeById() {
    this.subscriptions.add(this.systemService.getCredentialTypeById().pipe(skipWhile((item: any) => !item))
      .subscribe((credentialType: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/credential-type/credentialTypeEdit'], { queryParams: { 'id': credentialType.id } });
        }
        this.setForm(credentialType);
      }));
  }
  setForm(event: any) {
    this.credentialTypeForm = this.formBuilder.group({
      id: [event !== undefined ? event.id : ''],
      credentialType: [event !== undefined ? event.credentialType : '', Validators.required],
      credentialName: [event !== undefined ? event.credentialName : '', Validators.required],
      dataScrapingScript: [event !== undefined ? event.dataScrapingScript : null],
      electricityScrapingScript: [event !== undefined ? event.electricityScrapingScript : null],
      heatingScrapingScript: [event !== undefined ? event.heatingScrapingScript : null],
      loginScript: [event !== undefined ? event.loginScript : null],
      utilityName: [event !== undefined ? event.utilityName : '', Validators.required],
      utilityScrapingScript: [event !== undefined ? event.utilityScrapingScript : null],
      waterScrapingScript: [event !== undefined ? event.waterScrapingScript : null]
    });
  }
  back() {
    this.router.navigate(['admin/credential-type/credentialTypeList'], { queryParams: { 'force': this.isForce } });
  }
  delete() {
    if (confirm('Are you sure you want to delete?')) {
      this.subscriptions.add(this.systemService.deleteCredentialTypeById(this.id).pipe(skipWhile((item: any) => !item))
        .subscribe((response: any) => {
          this.router.navigate(['admin/credential-type/credentialTypeList'], { queryParams: { 'force': true } });
        }));
    }
  }

  save() {
    if (this.credentialTypeForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.subscriptions.add(this.systemService.updateCredentialType(this.credentialTypeForm.value.credentialType, this.credentialTypeForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.scrollTop();
            this.loadCredentialTypeById();
          }));
      } else {
        this.subscriptions.add(this.systemService.saveCredentialType(this.credentialTypeForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.scrollTop();
            this.isForce = true;
            this.loadCredentialTypeById();
          }));
      }
    } else {
      this.validateForm();
    }
  }
  validateForm() {
    for (const key of Object.keys(this.credentialTypeForm.controls)) {
      if (this.credentialTypeForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }
  get f() { return this.credentialTypeForm.controls; }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
