import { Component, OnInit } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from "src/app/models/user";
import { LoginService } from "src/app/services/login.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { DatePipe } from '@angular/common';
declare var $: any;

@Component({
  selector: 'electricityChargeList',
  templateUrl: './electricityChargeList.component.html',
  styleUrls: ['./gasList.component.css']
})
export class electricityChargeListComponent implements OnInit {
  users: Users = new Users();
  errorMessage: string;
  useTypes: string;
  usageHistoryList: any[] = [];
  userObj: any;
  userObj2: any;
  year: any;
  month: any;
  startDateView: any;
  endDateView: any;
  startDateOrigView: any;
  endDateOrigView: any;
  billingDateView: any;
  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router) {
    this.users = this.loginService.getUser();
    this.usageHistoryList = new Array;
    this.getGasList();
  }
  ngOnInit() {
    // $(document).ready(function () {
    // $('#example').DataTable();
    // });
    if ((this.year != undefined && this.year != "") || (this.month != undefined && this.month != "")) {
      this.searchData();
    }

  }
  ngAfterViewInit() {
    $(document).ready(function () {
      setTimeout(function () {
        $('#example').DataTable({
          "responsive": true,
          "pagingType": "full",
          "columnDefs": [{
            "targets": 'no-sort', // column or columns numbers
            "orderable": false, // set orderable for selected columns
          }],
          "retrieve": true
        });
      }, 1500);
    });
  }

  getGasList() {
    this.perFormGetList("electricityCharge");
  }

  perFormGetList1(useTypes) {

    this.router.navigate(["/gasList/" + useTypes]);
    // window.location.reload();
  }
  perFormGetList(useTypes) {

    document.getElementById("loader").classList.add('loading');
    this.loginService.performGetMultiPartData("users/" + this.users.outhMeResponse.userId + "/usage/electricity?type=" + useTypes).subscribe(
      data => {
        document.getElementById("loader").classList.remove('loading');
        let response = JSON.parse(JSON.stringify(data));
        this.users.types = useTypes;
        this.users.electricityChargeList = new Array;
        this.users.electricityChargeList = response.data;
        this.loginService.setUser(this.users);
        this.usageHistoryList = new Array;
        this.usageHistoryList = response.data;
        if ((this.year != undefined && this.year != null) || (this.month != undefined && this.month != null)) {
          this.searchData();
        }
        $(document).ready(function () {
          $("#example").dataTable().fnDestroy();
          setTimeout(function () {
            $('#example').DataTable({
              "responsive": true,
              "pagingType": 'full',
              "columnDefs": [{
                "targets": 'no-sort', // column or columns numbers
                "orderable": false, // set orderable for selected columns
              }],
              "retrieve": true
            });
          }, 1500);
        });

      },
      error => {
        document.getElementById("loader").classList.remove('loading');
        let response = JSON.parse(JSON.stringify(error));
        console.log(error);
        this.errorMessage = response.error_description;

      }
    );

  }
  i: number = 0;
  increment(i) {
    this.i = i;
    this.userObj = this.usageHistoryList[i];
    var date;
    if (this.usageHistoryList[i].startDate != null && this.usageHistoryList[i].startDate != undefined) {
      date = new Date(this.usageHistoryList[i].startDate);
      var datePipe = new DatePipe('en-US');
      this.startDateView = datePipe.transform(date, 'yyyy-MM-dd');
      this.userObj.startDate = this.startDateView;

    }
    if (this.usageHistoryList[i].endDate != null && this.usageHistoryList[i].endDate != undefined) {
      date = new Date(this.usageHistoryList[i].endDate);
      var datePipe = new DatePipe('en-US');
      this.endDateView = datePipe.transform(date, 'yyyy-MM-dd');
      this.userObj.endDate = this.endDateView;

    }
    if (this.usageHistoryList[i].startDateOrig != null && this.usageHistoryList[i].startDateOrig != undefined) {
      date = new Date(this.usageHistoryList[i].startDateOrig);
      var datePipe = new DatePipe('en-US');
      this.startDateOrigView = datePipe.transform(date, 'yyyy-MM-dd');
      this.userObj.startDateOrig = this.startDateOrigView;

    }
    if (this.usageHistoryList[i].endDateOrig != null && this.usageHistoryList[i].endDateOrig != undefined) {
      date = new Date(this.usageHistoryList[i].endDateOrig);
      var datePipe = new DatePipe('en-US');
      this.endDateOrigView = datePipe.transform(date, 'yyyy-MM-dd');
      this.userObj.endDateOrig = this.endDateOrigView;

    }
    if (this.usageHistoryList[i].billingDate != null && this.usageHistoryList[i].billingDate != undefined) {
      date = new Date(this.usageHistoryList[i].billingDate);
      var datePipe = new DatePipe('en-US');
      this.billingDateView = datePipe.transform(date, 'yyyy-MM-dd');
      this.userObj.billingDate = this.billingDateView;

    }
    this.userObj2 = $.extend(true, [], this.userObj)
  }

  searchData() {

    document.getElementById("loader").classList.add('loading');
    if ((this.year != undefined && this.year != "") || (this.month != undefined && this.month != "")) {
      this.usageHistoryList = new Array;
      for (let eChargeList of this.users.electricityChargeList) {
        if (eChargeList.year == this.year && eChargeList.month == this.month) {
          this.usageHistoryList.push(eChargeList);
        } else if (eChargeList.year == this.year) {
          this.usageHistoryList.push(eChargeList);
        } else if (eChargeList.month == this.month) {
          this.usageHistoryList.push(eChargeList);
        }
      }
      $("#example").dataTable().fnDestroy();
      $(document).ready(function () {
        $("#example").dataTable().fnDestroy();
        setTimeout(function () {
          $('#example').DataTable({
            "responsive": true,
            "pagingType": "full",
            "columnDefs": [{
              "targets": 'no-sort', // column or columns numbers
              "orderable": false, // set orderable for selected columns
            }],
            "retrieve": true
          });
        }, 1500);
      });
      console.log(this.usageHistoryList);
      document.getElementById("loader").classList.remove('loading');
    } else {
      this.usageHistoryList = this.users.electricityChargeList;
      $("#example").dataTable().fnDestroy();
      $(document).ready(function () {
        $("#example").dataTable().fnDestroy();
        setTimeout(function () {
          $('#example').DataTable({
            "responsive": true,
            "pagingType": "full",
            "columnDefs": [{
              "targets": 'no-sort', // column or columns numbers
              "orderable": false, // set orderable for selected columns
            }],
            "retrieve": true
          });
        }, 1500);
      });
      document.getElementById("loader").classList.remove('loading');
    }
  }
}