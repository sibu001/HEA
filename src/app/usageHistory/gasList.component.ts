import { Component, OnInit} from '@angular/core';
import { Users } from "src/app/models/user";
import { LoginService } from "src/app/services/login.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { DatePipe } from '@angular/common';
declare var $: any;

@Component({
  selector: 'gasList',
  templateUrl: './gasList.component.html',
  styleUrls: ['./gasList.component.css']
})
export class gasListComponent implements OnInit {
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
  filtercheck:boolean;
  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router) {
    this.users = this.loginService.getUser();
    this.usageHistoryList = new Array;
    this.getGasList()


  }
  ngOnInit() {
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
            "targets": [0, 3, 4, 5], // column or columns numbers
            "orderable": false, // set orderable for selected columns
          }],
          "retrieve": true
        });
      }, 1500);
    });
  }

  getGasList() {
    this.perFormGetList("gas");

  }

  perFormGetList(useTypes) {
    document.getElementById("loader").classList.add('loading');
    this.loginService.performGetMultiPartData("users/" + this.users.outhMeResponse.userId + "/usage/gas?type=" + useTypes).subscribe(
      data => {

        let response = JSON.parse(JSON.stringify(data));
        this.users.types = useTypes;
        this.users.gasList = new Array;
        this.users.gasList = response.data;
        this.loginService.setUser(this.users);
        this.usageHistoryList = new Array;
        this.usageHistoryList = response.data;
        document.getElementById("loader").classList.remove('loading');
        if ((this.year != undefined && this.year != "") || (this.month != undefined && this.month != "")) {
          this.searchData();
        }
        //else {
        $(document).ready(function () {
          $("#example").dataTable().fnDestroy();
          setTimeout(function () {
            $('#example').DataTable({
              "responsive": true,
              "pagingType": "full",
              "columnDefs": [{
                "targets": [0, 3, 4, 5], // column or columns numbers
                "orderable": false, // set orderable for selected columns
              }],
              "retrieve": true
            });
          }, 1500);
        });
        // }

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
      this.userObj.startTime = datePipe.transform(date, 'HH:mm:ss');
      this.userObj.startDateView = this.startDateView;

    }
    if (this.usageHistoryList[i].endDate != null && this.usageHistoryList[i].endDate != undefined) {
      date = new Date(this.usageHistoryList[i].endDate);
      var datePipe = new DatePipe('en-US');
      this.endDateView = datePipe.transform(date, 'yyyy-MM-dd');
      this.userObj.endTime = datePipe.transform(date, 'HH:mm:ss');
      this.userObj.endDateView = this.endDateView;

    }
    if (this.usageHistoryList[i].startDateOrig != null && this.usageHistoryList[i].startDateOrig != undefined) {
      date = new Date(this.usageHistoryList[i].startDateOrig);
      var datePipe = new DatePipe('en-US');
      this.startDateOrigView = datePipe.transform(date, 'yyyy-MM-dd');
      this.userObj.startTimeOrig = datePipe.transform(date, 'HH:mm:ss');
      this.userObj.startDateOrigView = this.startDateOrigView;

    }
    if (this.usageHistoryList[i].endDateOrig != null && this.usageHistoryList[i].endDateOrig != undefined) {
      date = new Date(this.usageHistoryList[i].endDateOrig);
      var datePipe = new DatePipe('en-US');
      this.endDateOrigView = datePipe.transform(date, 'yyyy-MM-dd');
      this.userObj.endTimeOrig = datePipe.transform(date, 'HH:mm:ss');
      this.userObj.endDateOrigView = this.endDateOrigView;

    }
    if (this.usageHistoryList[i].billingDate != null && this.usageHistoryList[i].billingDate != undefined) {
      date = new Date(this.usageHistoryList[i].billingDate);
      var datePipe = new DatePipe('en-US');
      this.billingDateView = datePipe.transform(date, 'yyyy-MM-dd');
      this.userObj.billingTime = datePipe.transform(date, 'HH:mm:ss');
      this.userObj.billingDateView = this.billingDateView;

    }
    this.userObj.forceStore = true;
    this.userObj2 = $.extend(true, [], this.userObj)
  }

  searchData() {
    document.getElementById("loader").classList.add('loading');
    if ((this.year != undefined && this.year != "") || (this.month != undefined && this.month != "")) {
      this.usageHistoryList = new Array;
      for (let gesList of this.users.gasList) {
        this.filtercheck = true;
        if ((this.year != undefined && this.year != "") && (this.month != undefined && this.month != "")) {
          this.filtercheck = false;
          if (gesList.year == this.year && gesList.month == this.month) {
            this.filtercheck = true;
          }
        } else if (this.year != undefined && this.year != "") {
          this.filtercheck = false;
          if (gesList.year == this.year) {
            this.filtercheck = true;
          }
        } else if (this.month != undefined && this.month != "") {
          this.filtercheck = false;
          if (gesList.month == this.month) {
            this.filtercheck = true;
          }
        } if (this.filtercheck) {
          this.usageHistoryList.push(gesList);
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
              "targets": [0, 3, 4, 5], // column or columns numbers
              "orderable": false, // set orderable for selected columns
            }],
            "retrieve": true
          });
        }, 1500);
      });

      document.getElementById("loader").classList.remove('loading');
    } else {
      this.usageHistoryList = this.users.gasList;
      $("#example").dataTable().fnDestroy();
      $(document).ready(function () {
        $("#example").dataTable().fnDestroy();
        setTimeout(function () {
          $('#example').DataTable({
            "responsive": true,
            "pagingType": "full",
            "columnDefs": [{
              "targets": [0, 3, 4, 5], // column or columns numbers
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