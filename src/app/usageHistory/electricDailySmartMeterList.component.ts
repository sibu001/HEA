import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Users } from '../models/user';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TableColumnData } from '../data/common-data';
declare var $: any;

@Component({
  selector: 'app-electricDailySmartMeterList',
  templateUrl: './electricDailySmartMeterList.component.html',
  styleUrls: ['./gasList.component.css']
})
export class electricDailySmartMeterListComponent implements OnInit, AfterViewInit {
  users: Users = new Users();
  errorMessage: string;
  useTypes: string;
  usageHistoryList: any[] = [];
  year: any;
  month: any;
  day: any;
  auditId: string;
  customerName: string;
  isAdminView = false;
  dataSource: any;
  usageHistoryData = {
    content: [],
    totalElements: 0,
  };
  keys = TableColumnData.SMART_METER_DAILY_KEYS;
  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.isAdminView = params['isAdminView'];
    });
    if (!this.isAdminView) {
      this.users = this.loginService.getUser();
    } else {
      this.users.outhMeResponse = {};
      this.users.outhMeResponse.userId = '2139';
    }
    this.usageHistoryList = new Array;
    this.perFormGetList('smartMeterElectricDaily');

  }

  ngOnInit() { }
  ngAfterViewInit() {
    setTimeout(function () {
      $('#example').DataTable({
        'pagingType': 'full',
        'columnDefs': [{
          'targets': 'no-sort', // column or columns numbers
          'orderable': false,  // set orderable for selected columns
        }],
      });
      const table = $('#example').DataTable();   // pay attention to capital D, which is mandatory to retrieve 'api' datatables' object, as @Lionel said

      $('#year').on('keyup click', function () {
        table.columns([1]).search($(this).val()).draw();
      });

      $('#month').on('keyup click', function () {
        table.column(2).search($(this).val()).draw();
      });

      $('#day').on('keyup click', function () {
        table.column(3).search($(this).val()).draw();
      });
    }, 1000);
  }

  perFormGetList(useTypes) {
    document.getElementById('loader').classList.add('loading');
    this.loginService.performGetMultiPartData('users/' + this.users.outhMeResponse.userId + '/' + useTypes).subscribe(
      data => {
        document.getElementById('loader').classList.remove('loading');
        const response = JSON.parse(JSON.stringify(data));
        this.users.types = useTypes;
        this.users.electricDailySmartMeterList = new Array;
        this.users.electricDailySmartMeterList = response.data;
        this.loginService.setUser(this.users);
        this.usageHistoryList = new Array;
        this.usageHistoryList = response.data;
        this.usageHistoryData.content = response.data;
        this.dataSource = [...this.usageHistoryData.content];
      },
      error => {
        document.getElementById('loader').classList.remove('loading');
        const response = JSON.parse(JSON.stringify(error));
        console.log(error);
        this.errorMessage = response.error_description;
      });
  }
  searchData() {
  }
}
