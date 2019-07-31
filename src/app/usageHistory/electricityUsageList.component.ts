import { Component, OnInit } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from "src/app/models/user";
import { LoginService } from "src/app/services/login.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
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
  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router) {
    this.users = this.loginService.getUser();
    // $(document).ready(function () {
    //   //  $('#example').DataTable().ajax.reload();
    //   $('#example').DataTable().draw();
    // });
          this.usageHistoryList = new Array;
          this.usageHistoryList = this.users.gesChargeList;
          this.perFormGetList("electricity");
     
  }
  ngOnInit() {
    // $(document).ready(function () {
    //   $('#example').DataTable();
    // });

  
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
        this.users.gesChargeList = new Array;
        this.users.gesChargeList = response.data;
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
