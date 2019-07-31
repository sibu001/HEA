import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { Users } from "src/app/models/user";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services/login.service";
declare var $: any;
import { AfterViewInit } from "@angular/core";
@Component({
  selector: 'mailArchiveList',
  templateUrl: './mailArchiveList.component.html',
  styleUrls: ['./mailArchiveList.component.css']
})
export class MailArchiveListComponent implements OnInit, AfterViewInit {
  errorMessage: any;
  startDate: Date;
  endDate: Date;
  subject: string;
  users: Users = new Users();
  customerMailList: any[] = [];
  constructor(private location: Location, private router: Router, private loginService: LoginService) {
    this.users = this.loginService.getUser();
    this.customerMailList = this.users.customerMailList;
    //this.getMailList();
  }

  ngOnInit() {

  }
  ngAfterViewInit() {
    // Basic example
    $(document).ready(function () {
      $('#dtBasicExample').DataTable({
        "pagingType": "full",// "simple" option for 'Previous' and 'Next' buttons only
        "columnDefs": [{
        "targets": [0,4,5,6],
        "orderable": false
      }]
      });
      $('.dataTables_length').addClass('bs-select');
     
  });

  }
  back() {
    this.location.back();
  }
  getMailList() {
    document.getElementById("loader").classList.add('loading');
    this.loginService.performGetMultiPartData("customers/" + this.users.outhMeResponse.customerId + "/mails").subscribe(
      data => {
        // let response = JSON.parse(JSON.parse(JSON.stringify(data))._body);
        let response1 = JSON.stringify(data);
        let response = JSON.parse(response1);
        this.customerMailList = response.data;
        console.log(response.data);
        document.getElementById("loader").classList.remove('loading');
      },
      error => {
        let response = JSON.parse(JSON.parse(JSON.stringify(error))._body);
        this.errorMessage = response.error_description;
        document.getElementById("loader").classList.remove('loading');
      }
    );
  }
  mailView(number) {
    this.users.mailContaint = this.users.customerMailList[number].content;
    this.users.mailDetail = this.users.customerMailList[number];
    this.loginService.setUser(this.users);
    this.router.navigate(["/MailArchiveView"]);
  }
  showSearchList() {
    document.getElementById("loader").classList.add('loading');
    if (this.startDate != undefined && this.startDate != null && this.endDate != undefined && this.endDate != null || (this.subject != undefined && this.subject != null)) {
      var startMilliseconds = new Date(this.startDate).getTime();
      var endMilliseconds = new Date(this.endDate).getTime();
      this.customerMailList = new Array;
      for (let mailList of this.users.customerMailList) {
        if (mailList.dateSent >= startMilliseconds && mailList.dateSent <= endMilliseconds) {
          this.customerMailList.push(mailList);
        }
      }
      console.log(this.customerMailList);
    }
    document.getElementById("loader").classList.remove('loading');
  }
}