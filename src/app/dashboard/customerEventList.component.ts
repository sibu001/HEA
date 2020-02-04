import { Component, OnInit } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from "src/app/services/login.service";
import { Users } from "src/app/models/user";
import { Router } from "@angular/router";
import { Filter } from '../models/filter';
declare var $: any;
declare var moment: any;
@Component({
  selector: 'customerEventList',
  templateUrl: './customerEventList.component.html',
  styleUrls: ['./customerEventList.component.css']
})
export class customerEventListComponent implements OnInit {
  errorMessage: any;
  value: Date;
  usesEventList: any[] = [];
  usesEventNewList: any[] = [];
  eventCode: string;
  eventName: string;
  startcheck: boolean;
  endcheck: boolean;
  startendcheck: boolean;
  eventCodecheck: boolean;
  eventNamecheck: boolean;
  filter: Filter = new Filter();
  users: Users = new Users();
  startDate: Date = this.filter.startDate;
  endDate: Date = this.filter.endDate;
  constructor(private loginService: LoginService, private router: Router) {
    this.users = this.loginService.getUser();
    this.filter = JSON.parse(localStorage.getItem('filter'));
    if (this.filter == null || this.filter == undefined) {
      this.filter = new Filter();
    }
    this.perFormGetList();
    if (!this.filter.back) {
      this.filter.startDate = null;
      this.filter.endDate = null;
      this.filter.eventCode = "";
      this.filter.eventName = "";
      localStorage.setItem('filter', JSON.stringify(this.filter));
    } else {
      this.startDate = this.filter.startDate;
      this.endDate = this.filter.endDate;
      this.eventCode = this.filter.eventCode;
      this.eventName = this.filter.eventName;
    }
  }

  ngOnInit() {
    if (this.filter.back || ((this.startDate != undefined && this.startDate != null) || (this.endDate != undefined && this.endDate != null) || (this.filter.eventCode != "" && this.filter.eventCode != null) || (this.filter.eventName != "" && this.filter.eventName != null))) {
      this.searchFilter();
    } else {
      this.filter = new Filter();
      localStorage.removeItem('filter');
    }
  }
  ngAfterViewInit() {
    var self = this;
    $(document).ready(function () {
      $("#example").dataTable().fnDestroy();
      setTimeout(function () {
        $('#example').DataTable({
          "responsive": true,
          "pagingType": "full",
          "columnDefs": [{
            "targets": [0], // column or columns numbers
            "orderable": false, // set orderable for selected columns
          }],
          "retrieve": true
        });
        $('.dataTables_length').addClass('bs-select');
      }, 1000);
    });
  }

  perFormGetList() {
    document.getElementById("loader").classList.add('loading');
    this.loginService.performGetMultiPartData("customers/" + this.users.outhMeResponse.customerId + "/customerEvents").subscribe(
      data => {
        document.getElementById("loader").classList.remove('loading');
        let response = JSON.parse(JSON.stringify(data));
        this.usesEventList = new Array;
        this.usesEventList = response.data;
        this.users.userEventList = this.usesEventList;
        this.searchFilter();
      },
      error => {
        document.getElementById("loader").classList.remove('loading');
        // let response = JSON.parse(JSON.stringify(error));
        console.log(error);
        // this.errorMessage = response.error_description;

      }
    );
  }
  customerEventView(customerEventDetail) {
    this.users.customerEventDetail = customerEventDetail;
    this.users.addEvent = false;
    this.loginService.setUser(this.users);
    this.router.navigate(["/customerEventView"]);
  }

  addEvent() {
    this.users.addEvent = true;
    this.loginService.setUser(this.users);
    this.router.navigate(["/customerEventView"]);
  }


  searchFilter() {
    this.usesEventNewList = new Array;
    this.usesEventNewList = this.users.userEventList;
    if ((this.startDate != undefined && this.startDate != null) || (this.endDate != undefined && this.endDate != null) || (this.filter.eventCode != "" && this.filter.eventCode != undefined) || (this.filter.eventName != "" && this.filter.eventName != undefined)) {
      document.getElementById("loader").classList.add('loading');
      this.usesEventList = [];
      var startMilliseconds = new Date(this.startDate).getTime();
      var endMilliseconds = new Date(this.endDate).getTime();
      for (let eventList of this.usesEventNewList) {
        this.startendcheck = true;
        this.startcheck = true;
        this.endcheck = true;
        this.eventCodecheck = true;
        this.eventNamecheck = true;
        if (this.startDate != undefined && this.endDate != undefined) {
          this.startendcheck = false;
          if (eventList.eventDatetime >= startMilliseconds && eventList.eventDatetime <= endMilliseconds) {
            this.startendcheck = true;
          }
        }
        else if (this.startDate != undefined) {
          this.startcheck = false;
          if (eventList.eventDatetime >= startMilliseconds)
            this.startcheck = true;
        }
        else if (this.endDate != undefined) {
          this.endcheck = false;
          if (eventList.eventDatetime <= endMilliseconds) {
            this.endcheck = true;
          }
        }

        if (this.filter.eventCode != "" && this.filter.eventCode != undefined) {
          this.eventCodecheck = false;
          if (eventList.customerEventType.eventCode == this.filter.eventCode) {
            this.eventCodecheck = true;
          }
        }
        if (this.filter.eventName != "" && this.filter.eventName != undefined) {
          this.eventNamecheck = false;
          if (eventList.customerEventType.eventName == this.filter.eventName) {
            this.eventNamecheck = true;
          }
        }

        if ((this.startendcheck == true && this.startcheck == true && this.endcheck == true) && (this.eventCodecheck == true) && (this.eventNamecheck == true)) {
          this.usesEventList.push(eventList);
        }
      }
      this.startDate ? this.startDate = new Date(this.startDate) : false;
      this.endDate ? this.endDate = new Date(this.endDate) : false;
      this.filter.startDate = this.startDate;
      this.filter.endDate = this.endDate;
      localStorage.setItem('filter', JSON.stringify(this.filter));
      if (!this.filter.back) {
        $("#example").dataTable().fnDestroy();
        $(document).ready(function () {
          setTimeout(function () {
            $('#example').DataTable({
              "responsive": true,
              "pagingType": "full",
              "columnDefs": [{
                "targets": [0], // column or columns numbers
                "orderable": false, // set orderable for selected columns
              }],
              "retrieve": true
            });
          }, 1000);
        });
      } else {
        this.filter.back = false;
        localStorage.setItem('filter', JSON.stringify(this.filter));
      }
      document.getElementById("loader").classList.remove('loading');
    }
    else {
      localStorage.setItem('filter', JSON.stringify(this.filter));
      this.usesEventList = this.users.userEventList;
      $("#example").dataTable().fnDestroy();
      $(document).ready(function () {
        setTimeout(function () {
          $('#example').DataTable({
            "responsive": true,
            "pagingType": "full",
            "columnDefs": [{
              "targets": [0], // column or columns numbers
              "orderable": false, // set orderable for selected columns
            }],
            "retrieve": true
          });
        }, 1000);
      });
      document.getElementById("loader").classList.remove('loading');
    }
  }
}
