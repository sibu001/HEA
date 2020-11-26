import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-gas-usage-popup',
  templateUrl: './gas-usage-popup.component.html',
  styleUrls: ['./gas-usage-popup.component.css']
})
export class GasUsagePopupComponent implements OnInit {
  @Input() usageModelObj: any;
  @Output() onModelSave = new EventEmitter<any>();
  usageModelObj2: any;
  users: Users = new Users();
  usageHistoryId: number;
  useTypes: String;
  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<GasUsagePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  save() {
    this.usageModelObj2 = Object.assign({}, this.usageModelObj);
    this.useTypes = this.usageModelObj2.type;
    this.usageHistoryId = this.usageModelObj2.id;
    if ((this.useTypes === 'smartMeterElectric') || (this.useTypes === 'smartMeterElectricDaily ') || (this.useTypes === 'smartMeterGas')) {
      document.getElementById('loader').classList.add('loading');
      this.loginService.performPut(this.usageModelObj2, 'users/' + this.usageModelObj2.userId + '/' + this.useTypes + '/' + this.usageHistoryId).subscribe(
        data => {
          document.getElementById('loader').classList.remove('loading');
          const response = JSON.parse(JSON.stringify(data));
          this.onModelSave.emit();
        },
        error => {
          document.getElementById('loader').classList.remove('loading');
          console.log(error);
        }
      );
    } else {
      if (this.useTypes === 'gasCharge') {
        this.useTypes = 'gas';
      } else if (this.useTypes === 'electricityCharge') {
        this.useTypes = 'electricity';
      }
      let date;
      if (this.usageModelObj2.startDateView !== null && this.usageModelObj2.startDateView !== undefined) {
        date = this.usageModelObj2.startDateView;
        if (this.usageModelObj2.startTime !== null && this.usageModelObj2.startTime !== undefined) {
          date = date + ' ' + this.usageModelObj2.startTime;
        }
        this.usageModelObj2.startDate = new Date(date);
      }

      if (this.usageModelObj2.endDateView !== null && this.usageModelObj2.endDateView !== undefined) {
        date = this.usageModelObj2.endDateView;
        if (this.usageModelObj2.endTime !== null && this.usageModelObj2.endTime !== undefined) {
          date = date + ' ' + this.usageModelObj2.endTime;
        }
        this.usageModelObj2.endDate = new Date(date);
      }

      if (this.usageModelObj2.startDateOrigView !== null && this.usageModelObj2.startDateOrigView !== undefined) {
        date = this.usageModelObj2.startDateOrigView;
        if (this.usageModelObj2.startTimeOrig !== null && this.usageModelObj2.startTimeOrig !== undefined) {
          date = date + ' ' + this.usageModelObj2.startTimeOrig;
        }
        this.usageModelObj2.startDateOrig = new Date(date);
      }

      if (this.usageModelObj2.endDateOrigView !== null && this.usageModelObj2.endDateOrigView !== undefined) {
        date = this.usageModelObj2.endDateOrigView;
        if (this.usageModelObj2.endTimeOrig !== null && this.usageModelObj2.endTimeOrig !== undefined) {
          date = date + ' ' + this.usageModelObj2.endTimeOrig;
        }
        this.usageModelObj2.endDateOrig = new Date(date);
      }

      if (this.usageModelObj2.billingDateView !== null && this.usageModelObj2.billingDateView !== undefined) {
        date = this.usageModelObj2.billingDateView;
        if (this.usageModelObj2.billingTime !== null && this.usageModelObj2.billingTime !== undefined) {
          date = date + ' ' + this.usageModelObj2.billingTime;
        }
        this.usageModelObj2.billingDate = new Date(date);
      }
      document.getElementById('loader').classList.add('loading');
      this.loginService.performPut(this.usageModelObj2, 'users/' + this.usageModelObj2.userId + '/usage/' + this.useTypes + '/' + this.usageHistoryId).subscribe(
        data => {
          document.getElementById('loader').classList.remove('loading');
          const response = JSON.parse(JSON.stringify(data));
          this.onModelSave.emit();
        },
        error => {
          document.getElementById('loader').classList.remove('loading');
          console.log(error);
        }
      );
    }
  }
}
