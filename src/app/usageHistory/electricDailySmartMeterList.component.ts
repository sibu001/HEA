import { Component, OnInit } from '@angular/core';
import { Users } from '../models/user';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-electricDailySmartMeterList',
  templateUrl: './electricDailySmartMeterList.component.html',
  styleUrls: ['./gasList.component.css']
})
export class electricDailySmartMeterListComponent implements OnInit {
  users: Users = new Users();
  errorMessage: string;
  useTypes: string;
  usageHistoryList: any[] = [];
  year: any;
  month: any;
  day: any;
  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router) {
    this.users = this.loginService.getUser();
    this.usageHistoryList = new Array;
    // this.usageHistoryList = this.users.gesChargeList;
    this.perFormGetList("smartMeterElectricDaily");

  }
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
    }, 1000);
  }

  perFormGetList(useTypes) {
    document.getElementById("loader").classList.add('loading');
    this.loginService.performGetMultiPartData("users/" + this.users.outhMeResponse.userId + "/" + useTypes).subscribe(
      data => {
        document.getElementById("loader").classList.remove('loading');
        let response = JSON.parse(JSON.stringify(data));
        this.users.types = useTypes;
        this.users.electricDailySmartMeterList = new Array;
        this.users.electricDailySmartMeterList = response.data;
        this.loginService.setUser(this.users);
        this.usageHistoryList = new Array;
        this.usageHistoryList = response.data;
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
  }
}
