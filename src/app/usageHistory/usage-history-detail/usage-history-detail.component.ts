import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/models/user';

@Component({
  selector: 'app-usage-history-detail',
  templateUrl: './usage-history-detail.component.html',
  styleUrls: ['./usage-history-detail.component.css']
})
export class UsageHistoryDetailComponent implements OnInit {
  @Input() usageModelObj: any;
  @Output() onModelSave = new EventEmitter();
  usageModelObj2: any;
  users: Users = new Users();
  usageHistoryId: number;
  useTypes: String;
  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
  }

  save() {
    this.usageModelObj2 = Object.assign({}, this.usageModelObj);
    this.useTypes = this.usageModelObj2.type;
    this.usageHistoryId = this.usageModelObj2.id;
    if ((this.useTypes == "smartMeterElectric") || (this.useTypes == "smartMeterElectricDaily ") || (this.useTypes == "smartMeterGas")) {
      document.getElementById("loader").classList.add('loading');
      this.loginService.performPut(this.usageModelObj2, "users/" + this.usageModelObj2.userId + "/" + this.useTypes + "/" + this.usageHistoryId).subscribe(
        data => {
          document.getElementById("loader").classList.remove('loading');
          let response = JSON.parse(JSON.stringify(data));
          this.onModelSave.emit();
          // console.log(response);
          // this.customerEventList = response.data;
        },
        error => {
          document.getElementById("loader").classList.remove('loading');
          console.log(error);
        }
      );
    } else {
      if (this.useTypes == "gasCharge") {
        this.useTypes = "gas";
      } else if (this.useTypes == "electricityCharge") {
        this.useTypes = "electricity";
      }
      document.getElementById("loader").classList.add('loading');
      this.loginService.performPut(this.usageModelObj2, "users/" + this.usageModelObj2.userId + "/usage/" + this.useTypes + "/" + this.usageHistoryId).subscribe(
        data => {
          document.getElementById("loader").classList.remove('loading');
          let response = JSON.parse(JSON.stringify(data));
          this.onModelSave.emit();
          // console.log(response);
          // this.customerEventList = response.data;
        },
        error => {
          document.getElementById("loader").classList.remove('loading');
          console.log(error);
        }
      );
    }
  }
}
