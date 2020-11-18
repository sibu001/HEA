import { Component, OnInit } from '@angular/core';
import { Users } from "src/app/models/user";
import { LoginService } from "src/app/services/login.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { TableColumnData } from '../data/common-data';
declare var $: any;

@Component({
  selector: 'electricitySmartMeter',
  templateUrl: './electricitySmartMeter.component.html',
  styleUrls: ['./gasList.component.css']
})
export class electricitySmartMeterComponent implements OnInit {
  users: Users = new Users();
  errorMessage: string;
  useTypes: string;
  usageHistoryList: any[] = [];
  year: any;
  month: any;
  day: any;
  hour: any;
  auditId: string;
  customerName: string;
  isAdminView = false;
  dataSource: any;
  usageHistoryData = {
    content: [],
    totalElements: 0,
  };
  keys = TableColumnData.SMART_METER_KEYS;
  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.isAdminView = params['isAdminView'];
    });
    if (!this.isAdminView) {
      this.users = this.loginService.getUser();
    } else {
      this.users.outhMeResponse = {};
      this.users.outhMeResponse.userId = '2139';
      // this.getUserById();
    }
    this.perFormGetList("smartMeterElectric");

  }

  // getUserById(): any {
  //   this.users.outhMeResponse = {};
  //   this.users.outhMeResponse.userId = '2139';
  // }
  ngOnInit() {
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
      $("#day").on('keyup click', function () {
        table.column(3).search($(this).val()).draw();
      });

      $("#hour").on('keyup click', function () {
        table.column(4).search($(this).val()).draw();
      });

    }, 6000);
  }


  perFormGetList1(useTypes) {
    this.router.navigate(["/gasList/" + useTypes]);
  }
  perFormGetList(useTypes) {
    document.getElementById("loader").classList.add('loading');
    this.loginService.performGetMultiPartData("users/" + this.users.outhMeResponse.userId + "/" + useTypes).subscribe(
      data => {
        document.getElementById("loader").classList.remove('loading');
        this.users.types = useTypes;
        this.users.electricSmartMeterList = new Array;
        this.usageHistoryList = new Array;
        this.usageHistoryList = (JSON.parse(JSON.stringify(data)).data).splice(0, 1000);
        this.usageHistoryData.content = (JSON.parse(JSON.stringify(data)).data).splice(0, 1000);;
        this.dataSource = [...this.usageHistoryData.content];
      },
      error => {
        document.getElementById("loader").classList.remove('loading');
        let response = JSON.parse(JSON.stringify(error));
        console.log(error);
        this.errorMessage = response.error_description;

      }
    );

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
