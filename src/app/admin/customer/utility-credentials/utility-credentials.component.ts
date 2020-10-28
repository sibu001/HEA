import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';

@Component({
  selector: 'app-utility-credentials',
  templateUrl: './utility-credentials.component.html',
  styleUrls: ['./utility-credentials.component.css']
})
export class UtilityCredentialsComponent implements OnInit {
  utilityCredentialForm: FormGroup;
  credentialTypeList: Array<any>;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly systemService: SystemService,
    public dialogRef: MatDialogRef<UtilityCredentialsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.findCredentialType(false, '');
    this.setForm(this.data);
  }

  findCredentialType(force: boolean, filter: string): void {
    this.systemService.loadCredentialTypeList(force, filter);
    this.subscriptions.add(this.systemService.getCredentialTypeList().pipe(skipWhile((item: any) => !item))
      .subscribe((credentialTypeList: any) => {
        this.credentialTypeList = credentialTypeList;
      }));
  }

  setForm(event: any) {
    this.utilityCredentialForm = this.formBuilder.group({
      id: [event !== undefined ? event.id : ''],
      credentialTypeCode: [event !== undefined ? event.credentialTypeCode : ''],
      login: [event !== undefined ? event.login : ''],
      password: [event !== undefined ? event.password : ''],
      active: [event !== undefined ? event.active : ''],
      account: [event !== undefined ? event.account : ''],
      electricityServiceId: [event !== undefined ? event.electricityServiceId : ''],
      electricityMeterId: [event !== undefined ? event.electricityMeterId : ''],
      electricitySignDate: [event !== undefined ? event.electricitySignDate : ''],
      heatingServiceId: [event !== undefined ? event.heatingServiceId : ''],
      heatingMeterId: [event !== undefined ? event.heatingMeterId : ''],
      heatingSignDate: [event !== undefined ? event.heatingSignDate : ''],
      waterServiceId: [event !== undefined ? event.waterServiceId : ''],
      waterMeterId: [event !== undefined ? event.waterMeterId : ''],
      waterSignDate: [event !== undefined ? event.waterSignDate : ''],
      subscriptionId: [event !== undefined ? event.subscriptionId : ''],
      feedId: [event !== undefined ? event.feedId : ''],
      houseNumber: [event !== undefined ? event.houseNumber : ''],
      postalCode: [event !== undefined ? event.postalCode : ''],
      billDateDay: [event !== undefined ? event.billDateDay : ''],
      dataInUse: [event !== undefined ? event.dataInUse : ''],
      utilityInUse: [event !== undefined ? event.utilityInUse : ''],
      electricityInUse: [event !== undefined ? event.electricityInUse : ''],
      heatingInUse: [event !== undefined ? event.heatingInUse : ''],
      waterInUse: [event !== undefined ? event.waterInUse : ''],
    });

  }

  onNoClick() {
    this.dialogRef.close();
  }
}
