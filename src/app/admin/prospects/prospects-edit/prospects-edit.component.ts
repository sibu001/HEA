import { Component, ElementRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { AdministrativeService } from 'src/app/store/administrative-state-management/service/administrative.service';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-prospects-edit',
  templateUrl: './prospects-edit.component.html',
  styleUrls: ['./prospects-edit.component.css']
})
export class ProspectsEditComponent implements OnInit, OnDestroy {

  id: any;
  prospectsForm: FormGroup;
  private readonly subscriptions: Subscription = new Subscription();
  isForce = false;
  userId: any;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly administrativeService: AdministrativeService,
    private readonly el: ElementRef,
    public dialogRef: MatDialogRef<ProspectsEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    this.setForm(undefined);
    if (this.data.id !== undefined) {
      this.administrativeService.loadProspectsById(this.id);
      this.loadProspectsById();
    }
  }

  setForm(event: any) {
    this.prospectsForm = this.formBuilder.group({
      registrationId: [event !== undefined ? event.registrationId : ''],
      source: [event !== undefined ? event.source : ''],
      name: [event !== undefined ? event.name : ''],
      field6: [event !== undefined ? event.field6 : ''],
      zip: [event !== undefined ? event.zip : ''],
      email: [event !== undefined ? event.email : ''],
      remoteInfo: [event !== undefined ? event.remoteInfo : ''],
      createdDate: [event !== undefined ? event.createdDate : ''],
      field7: [event !== undefined ? event.field7 : ''],
      subscriptionId: [event !== undefined ? event.subscriptionId : ''],
      customer: [event !== undefined ? event.customer : ''],
      optOutMail: [event !== undefined ? event.optOutMail : false],
    });
  }

  goToDebug() {
    // this.router.navigate(['/admin/debug/scriptDebugConsole'], { queryParams: {} });

  }
  recalculate() {

  }

  loadProspectsById() {
    this.subscriptions.add(this.administrativeService.getProspectsById().pipe(skipWhile((item: any) => !item))
      .subscribe((prospects: any) => {
        this.setForm(prospects);
      }));
  }
  onNoClick(){
    this.dialogRef.close(false);
  }

  delete() {
    this.subscriptions.add(this.administrativeService.deleteProspectsById(this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.dialogRef.close(true);
      }));
  }

  save() {
    if (this.prospectsForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.subscriptions.add(this.administrativeService.updateProspects(this.id, this.prospectsForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.loadProspectsById();
          }));
      } else {
        this.subscriptions.add(this.administrativeService.saveProspects(this.prospectsForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.loadProspectsById();
          }));
      }
    } else {
      this.validateForm();
    }
  }
  validateForm() {
    for (const key of Object.keys(this.prospectsForm.controls)) {
      if (this.prospectsForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }

  get f() { return this.prospectsForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
