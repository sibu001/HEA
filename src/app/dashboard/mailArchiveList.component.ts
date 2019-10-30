import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { Users } from "src/app/models/user";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services/login.service";
declare var $: any;
import { AfterViewInit } from "@angular/core";
import { Filter } from '../models/filter';
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
  newMailList: any[] = [];
  startcheck: boolean;
  endcheck: boolean;
  startendcheck: boolean;
  subjectcheck: boolean;
  filter: Filter = new Filter();
  constructor(private location: Location, private router: Router, private loginService: LoginService) {
    // this.customerMailList = this.users.customerMailList;
    this.users = this.loginService.getUser();
    this.filter = JSON.parse(localStorage.getItem('filter'));
    if (this.filter == null || this.filter == undefined) {
      this.filter = new Filter();
    }
    if (!this.filter.back) {
      this.getMailList();
    }
  }
  ngOnInit() {
    if (this.filter.back || ((this.filter.startDate != undefined && this.filter.startDate != null) || (this.filter.endDate != undefined && this.filter.endDate != null) || (this.filter.subject != "" && this.filter.subject != null))) {
      this.showSearchList();
    } else {
      this.filter = new Filter();
      localStorage.removeItem('filter');
    }
  }
  ngAfterViewInit() {
    $(document).ready(function () {
      $("#example").dataTable().fnDestroy();
      setTimeout(function () {
        $('#example').DataTable({
          "responsive": true,
          "pagingType": "full",
          "columnDefs": [{
            "targets": [0, 4, 5, 6], // column or columns numbers
            "orderable": false, // set orderable for selected columns
          }],
          "retrieve": true
        });
        $('.dataTables_length').addClass('bs-select');
      }, 1500);
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
        // let response1 = JSON.stringify(data);
        // response = JSON.parse(response1);
        let response = JSON.parse(JSON.stringify(data));
        this.customerMailList = new Array;
        this.customerMailList = response.data;
        this.users.customerMailList = this.customerMailList;
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
    if ((this.filter.startDate != undefined && this.filter.startDate != null) || (this.filter.endDate != undefined && this.filter.endDate != null) || (this.filter.subject != "" && this.filter.subject != undefined)) {
      var startMilliseconds = new Date(this.filter.startDate).getTime();
      var endMilliseconds = new Date(this.filter.endDate).getTime();
      this.customerMailList = new Array;
      this.newMailList = this.users.customerMailList;
      var self = this;
      for (let mailList of this.newMailList) {
        this.startendcheck = true;
        this.startcheck = true;
        this.endcheck = true;
        this.subjectcheck = true;
        if (this.filter.startDate != undefined && this.filter.endDate != undefined) {
          this.startendcheck = false;
          if (mailList.dateSent >= startMilliseconds && mailList.dateSent <= endMilliseconds) {
            this.startendcheck = true;
          }
        }
        else if (this.filter.startDate != undefined) {
          this.startcheck = false;
          if (mailList.dateSent >= startMilliseconds)
            this.startcheck = true;
        }
        else if (this.filter.endDate != undefined) {
          this.endcheck = false;
          if (mailList.dateSent <= endMilliseconds) {
            this.endcheck = true;
          }
        }
        if (this.filter.subject != "" && this.filter.subject != undefined) {
          this.subjectcheck = false;
          if (mailList.subject == this.filter.subject) {
            this.subjectcheck = true;
          }
        }
        if (this.startendcheck == true && this.startcheck == true && this.endcheck == true && this.subjectcheck == true) {
          this.customerMailList.push(mailList);
        }
      }
      localStorage.setItem('filter', JSON.stringify(this.filter));
      $("#example").dataTable().fnDestroy();
      if (!this.filter.back) {
        $(document).ready(function () {
          setTimeout(function () {
            $('#example').DataTable({
              "responsive": true,
              "pagingType": "full",
              "columnDefs": [{
                "targets": [0, 4, 5, 6], // column or columns numbers
                "orderable": false, // set orderable for selected columns
              }],
              "retrieve": true
            });
          }, 1500);
        });
      } else {
        this.filter.back = false;
        localStorage.setItem('filter', JSON.stringify(this.filter));
      }
      document.getElementById("loader").classList.remove('loading');
    }
    else {
      localStorage.setItem('filter', JSON.stringify(this.filter));
      // this.ngAfterViewInit();
      this.customerMailList = this.users.customerMailList;
      $("#example").dataTable().fnDestroy();
      $(document).ready(function () {
        setTimeout(function () {
          $('#example').DataTable({
            "responsive": true,
            "pagingType": "full",
            "columnDefs": [{
              "targets": [0, 4, 5, 6], // column or columns numbers
              "orderable": false, // set orderable for selected columns
            }],
            "retrieve": true
          });
        }, 500);
      });
      document.getElementById("loader").classList.remove('loading');
    }

    document.getElementById("loader").classList.remove('loading');
  }
}