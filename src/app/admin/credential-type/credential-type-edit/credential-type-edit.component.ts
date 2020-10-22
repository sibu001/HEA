import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { Location } from '@angular/common';

@Component({
  selector: 'app-credential-type-edit',
  templateUrl: './credential-type-edit.component.html',
  styleUrls: ['./credential-type-edit.component.css']
})
export class CredentialTypeEditComponent implements OnInit, OnDestroy {
  credentialTypeForm: FormGroup;
  id: any;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemService: SystemService,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.systemService.loadCredentialTypeById(this.id);
      this.subscriptions.add(this.systemService.getCredentialTypeById().pipe(skipWhile((item: any) => !item))
        .subscribe((credentialType: any) => {
          this.setForm(credentialType);
        }));
    }
  }
  setForm(event: any) {
    this.credentialTypeForm = this.formBuilder.group({
      id: [event !== undefined ? event.id : ''],
      credentialType: [event !== undefined ? event.credentialType : '', Validators.required],
      credentialName: [event !== undefined ? event.credentialName : '', Validators.required],
      dataScrapingScript: [event !== undefined ? event.dataScrapingScript : ''],
      electricityScrapingScript: [event !== undefined ? event.electricityScrapingScript : ''],
      heatingScrapingScript: [event !== undefined ? event.heatingScrapingScript : ''],
      loginScript: [event !== undefined ? event.loginScript : ''],
      utilityName: [event !== undefined ? event.utilityName : ''],
      utilityScrapingScript: [event !== undefined ? event.utilityScrapingScript : ''],
      waterScrapingScript: [event !== undefined ? event.waterScrapingScript : '']
    });
  }
  back() {
    this.location.back();
   }
  save() {

  }
  delete() {

  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
