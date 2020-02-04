import { Component, OnInit, Renderer, ElementRef, ViewChild } from '@angular/core';
import { LoginService } from "src/app/services/login.service";
import { Users } from "src/app/models/user";
import { Router } from "@angular/router";
import { Location } from '@angular/common';
import { Filter } from '../models/filter';

@Component({
  selector: 'customerEventView',
  templateUrl: './customerEventView.component.html',
  styleUrls: ['../survey/topichistory.component.css']
})
export class customerEventViewComponent implements OnInit {
  @ViewChild('inp1') inp1: ElementRef;
  errorMessage: any;
  value: Date;
  customerEventList: any[] = [];
  creatDate: Date;
  endDate: Date;
  customerEventDetails: any;
  users: Users = new Users();
  filter: Filter = new Filter();
  modifyAllow: boolean = true;
  constructor(private loginService: LoginService, private renderer: Renderer, private router: Router, private location: Location) {
    this.users = this.loginService.getUser();
    this.perFormGetEventType();
    if (!this.users.addEvent) {
      this.customerEventDetails = this.users.customerEventDetail;
    } else {
      this.customerEventDetails = {};
      this.customerEventDetails.customerEventType = {};
      this.customerEventDetails.customerEventTypeId = 1;
      this.creatDate = new Date();
    }
  }

  ngOnInit() {
    this.filter = JSON.parse(localStorage.getItem('filter'));
    this.renderer.invokeElementMethod(this.inp1.nativeElement, 'focus');
  }

  perFormGetEventType() {
    document.getElementById("loader").classList.add('loading');
    this.loginService.performGetMultiPartData("customerEventTypes").subscribe(
      data => {
        document.getElementById("loader").classList.remove('loading');
        let response = JSON.parse(JSON.stringify(data));
        this.customerEventList = response.data;
        this.users.customerEventList = this.customerEventList;
        if (!this.users.addEvent) {
          this.modifyAllow = this.customerEventDetails.modifyAllowed;
          this.creatDate = new Date(parseInt(this.customerEventDetails.eventDatetime));
        } else {
          this.customerEventDetails.modifyAllowed = true;
          this.customerEventDetails.customerEventType = this.customerEventList[0];

        }
      },
      error => {
        document.getElementById("loader").classList.remove('loading');
        console.log(error);

      }
    );
  }

  deleteEvent(customerEventId) {
    document.getElementById("loader").classList.add('loading');
    this.loginService.performDelete("customers/" + this.users.outhMeResponse.customerId + "/customerEvents/" + customerEventId).subscribe(
      data => {
        document.getElementById("loader").classList.remove('loading');
        let response = JSON.parse(JSON.stringify(data));
        this.router.navigate(["/customerEventList"]);
      },
      error => {
        document.getElementById("loader").classList.remove('loading');
        console.log(error);
      }
    );

  }

  saveEvent(customerEventDetails) {
    var id = Number(customerEventDetails.customerEventType.customerEventTypeId);

    customerEventDetails.user = this.users.outhMeResponse.user;
    customerEventDetails.eventDatetime = this.creatDate.getTime();
    var data = { customerEventDetails };
    console.log(data);

    document.getElementById("loader").classList.add('loading');
    this.loginService.performPut(customerEventDetails, "customers/" + this.users.outhMeResponse.customerId + "/customerEvents/" + customerEventDetails.customerEventId).subscribe(
      data => {
        document.getElementById("loader").classList.remove('loading');
        let response = JSON.parse(JSON.stringify(data));
        this.customerEventDetails=response.data;
      },
      error => {
        document.getElementById("loader").classList.remove('loading');
        console.log(error);

      }
    );
  }
  addEvent(customerEventDetails) {
    var id = Number(customerEventDetails.customerEventType.customerEventTypeId);
    // customerEventDetails.user = this.users.outhMeResponse.user;
    customerEventDetails.eventDatetime = this.creatDate.getTime();
    var data = { customerEventDetails };;
    document.getElementById("loader").classList.add('loading');
    this.loginService.performPostMultiPartDataPost(customerEventDetails, "customers/" + this.users.outhMeResponse.customerId + "/customerEvents").subscribe(
      data => {
        document.getElementById("loader").classList.remove('loading');
        let response = JSON.parse(JSON.stringify(data));
        this.users.addEvent=false;
        this.customerEventDetails = response.data;
        this.creatDate = new Date(parseInt(this.customerEventDetails.eventDatetime));
      },
      error => {
        document.getElementById("loader").classList.remove('loading');
        console.log(error);

      }
    );
  }
  back() {
    if (this.filter == null) {
      this.filter = new Filter;
    }
    this.filter.back = true;
    localStorage.setItem('filter', JSON.stringify(this.filter));
    this.location.back();
  }
  changeValue(customerEventTypeId) {
    this.customerEventDetails.customerEventType = this.customerEventList[customerEventTypeId - 1];
  }
}