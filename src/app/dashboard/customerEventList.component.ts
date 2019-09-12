import { Component, OnInit } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from "src/app/services/login.service";
import { Users } from "src/app/models/user";
import { Router } from "@angular/router";
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
  startDate: Date;
  endDate: Date;
  eventCode: string;
  eventType: string;
  users: Users = new Users();
  constructor(private loginService: LoginService, private router: Router) {
    this.users = this.loginService.getUser();
    this.perFormGetList();
  }

  ngOnInit() {

  }
  ngAfterViewInit() {
    var self = this;
    setTimeout(function () {
      $('#example').DataTable({
        "responsive": true,
        "pagingType": "full",
        "columnDefs": [{
          "targets": [0], // column or columns numbers
          "orderable": false,  // set orderable for selected columns
        }],
      });


    }, 1000);
  }

  perFormGetList() {
    document.getElementById("loader").classList.add('loading');
    this.loginService.performGetMultiPartData("customers/" + this.users.outhMeResponse.customerId + "/customerEvents").subscribe(
      data => {
        document.getElementById("loader").classList.remove('loading');
        let response = JSON.parse(JSON.stringify(data));
        this.usesEventList = new Array;
        this.usesEventList = response.data;
        console.log(response.data);
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
    this.loginService.setUser(this.users);
    this.router.navigate(["/customerEventView"]);
  }

  addEvent() {
    this.users.customerEventDetail = this.usesEventList[0];
    this.users.addEvent = true;
    this.loginService.setUser(this.users);
    this.router.navigate(["/customerEventView"]);
  }
  searchFilter() {
    this.usesEventNewList =new Array;
    this.usesEventNewList== this.usesEventList;
    document.getElementById("loader").classList.add('loading');
    if (this.startDate != undefined && this.startDate != null && this.endDate != undefined && this.endDate != null || (this.eventCode != undefined && this.eventCode != null) || (this.eventType != undefined && this.eventType != null)) {
      var startMilliseconds = new Date(this.startDate).getTime();
      var endMilliseconds = new Date(this.endDate).getTime();
      this.usesEventList = new Array;
      let self=this;
     $("#example").dataTable().fnDestroy();
      for (let eventList of this.usesEventNewList) {
        if (eventList.eventDatetime >= startMilliseconds && eventList.eventDatetime <= endMilliseconds) {
          this.usesEventList.push(eventList);
        }
      }
       setTimeout(function () {
        $('#example').DataTable().draw();
        $('#example').DataTable({
          "responsive": true,
          "pagingType": "full",
          "columnDefs": [{
            "targets": [0], // column or columns numbers
            "orderable": false,  // set orderable for selected columns
          }],
          "retrieve": true
        });
      //  self.usesEventList = self.usesEventNewList;
      }, 100);
      console.log(this.usesEventList);
    } else {
      var self = this;
      $("#example").dataTable().fnDestroy();
      this.usesEventList = new Array;
      setTimeout(function () {
        $('#example').DataTable().draw();
        $('#example').DataTable({
          "responsive": true,
          "pagingType": "full",
          "columnDefs": [{
            "targets": [0], // column or columns numbers
            "orderable": false,  // set orderable for selected columns
          }],
          "retrieve": true
        });
        self.usesEventList = self.usesEventNewList;
      }, 100);
    }
    document.getElementById("loader").classList.remove('loading');
  }
}