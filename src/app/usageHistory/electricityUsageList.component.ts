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
  selector: 'gasList',
  templateUrl: './electricityUsageList.component.html',
  styleUrls: ['./gasList.component.css']
})
export class electricityUsageListComponent implements OnInit {
  users: Users = new Users();
  errorMessage: string;
  useTypes: string;
  usageHistoryList: any[] = [];
  year: any;
  month: any;
  userObj: any;
  userObj2: any;
  startDateView: any;
  endDateView: any;
  startDateOrigView: any;
  endDateOrigView: any;
  billingDateView: any;
  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router) {
    this.users = this.loginService.getUser();
    // $(document).ready(function () {
    //   //  $('#example').DataTable().ajax.reload();
    //   $('#example').DataTable().draw();
    // });
    //this.usageHistoryList = new Array;
    //this.usageHistoryList = this.users.gesChargeList;
    this.getGasList()
  }
  ngOnInit() {
    // $(document).ready(function () {
    //   $('#example').DataTable();
    // });


  }
  getGasList() {
    this.perFormGetList("electricity");
  }
  ngAfterViewInit() {
    setTimeout(function () {
      $('#example').DataTable({
        "pagingType": "full",
        "columnDefs": [{
          "targets": 'no-sort', // column or columns numbers
          "orderable": false,  // set orderable for selected columns
        }],
      });
      var table = $('#example').DataTable();   //pay attention to capital D, which is mandatory to retrieve "api" datatables' object, as @Lionel said

      $("#year").on('keyup click', function () {
        table.columns([1]).search($(this).val()).draw();
      });

      $("#month").on('keyup click', function () {
        table.column(2).search($(this).val()).draw();
      });

    }, 1000);
  }


  perFormGetList1(useTypes) {
    // $('#example').on('draw.dt', function () {
    // });
    // $('#example').DataTable().clear();
    // $(document).ready(function () {
    //   $('#example').DataTable().destroy();
    // });

    this.router.navigate(["/gasList/" + useTypes]);
    //  window.location.reload();
  }
  perFormGetList(useTypes) {
    // var table = $('#example').DataTable();
    // $('#example').on('click', function () {
    //   table.clear().draw();
    // });

    // $(document).ready(function () {
    //     //  $('#example').DataTable().ajax.reload();
    //     $('#example').DataTable().draw();
    //       });
    document.getElementById("loader").classList.add('loading');
    this.loginService.performGetMultiPartData("users/" + this.users.outhMeResponse.userId + "/usage/" + useTypes).subscribe(
      data => {
        document.getElementById("loader").classList.remove('loading');
        let response = JSON.parse(JSON.stringify(data));
        this.users.types = useTypes;
        this.users.electricityChargeList = new Array;
        this.users.electricityChargeList = response.data;
        this.loginService.setUser(this.users);
        this.usageHistoryList = new Array;
        this.usageHistoryList = response.data;
        // $(document).ready(function () {
        //    // $('#example').DataTable().ajax.reload();
        //   $('#example').DataTable().draw();
        // });
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

    //   document.getElementById("loader").classList.add('loading');
    //   this.usageHistoryList = new Array;

    //   console.log(this.users.usesList);
    //   for (let useList of this.users.usesList) {
    //     if (this.month != undefined && this.month != null && this.year != undefined && this.year != null) {
    //       if (useList.year == this.year && useList.month == this.month) {
    //         this.usageHistoryList.push(useList);
    //       }
    //     } else if (this.year != undefined && this.year != null) {
    //       if (useList.year == this.year) {
    //         this.usageHistoryList.push(useList);
    //       }
    //     } else if (this.month != undefined && this.month != null) {
    //       if (useList.month == this.month) {
    //         this.usageHistoryList.push(useList);
    //       }
    //     } else {
    //       this.usageHistoryList.push(useList);
    //     }
    //   }
    //   $(document).ready(function () {

    //     $('#example').on('draw.dt', function () {

    //     });
    //   });
    //   console.log(this.usageHistoryList);
    //   document.getElementById("loader").classList.remove('loading');
  }
}