import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TableColumnData } from 'src/app/data/common-data';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
declare var $: any;

@Component({
  selector: 'app-electricity-daily-smart-meter-list',
  templateUrl: './electricity-daily-smart-meter-list.component.html',
  styleUrls: ['./electricity-daily-smart-meter-list.component.css']
})
export class ElectricityDailySmartMeterListComponent implements OnInit, AfterViewInit {
  users: Users = new Users();
  errorMessage: string;
  useTypes: string;
  usageHistoryList: any[] = [];
  // year: any;
  // month: any;
  // day: any;
  // auditId: string;
  // customerName: string;
  electricityForm: FormGroup = this.fb.group({
    year: this.fb.control(''),
    month: this.fb.control(''),
    day: this.fb.control(''),
  });
  isAdminView = false;
  dataSource: any;
  usageHistoryData = {
    content: [],
    totalElements: 0,
  };
  keys = TableColumnData.SMART_METER_DAILY_KEYS;
  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.route.queryParams.subscribe(params => {
      this.isAdminView = params['isAdminView'];
    });
    this.users = this.loginService.getUser();
    if (this.isAdminView) {

      this.users.outhMeResponse = {};
      this.users.outhMeResponse.userId = '2139';
      // this.getUserById();
    }
    this.usageHistoryList = new Array;
    // this.usageHistoryList = this.users.gesChargeList;
    this.perFormGetList('smartMeterElectricDaily');

  }

  // getUserById(): any {
  //   this.users.outhMeResponse = {};
  //   this.users.outhMeResponse.userId = '2139';
  // }
  ngOnInit() {
    if (this.isAdminView) {
      this.electricityForm.addControl('auditId', this.fb.control(''));
      this.electricityForm.addControl('customerName', this.fb.control(''));
    }
  }
  ngAfterViewInit() {
    setTimeout(function () {
      $('#example').DataTable({
        'pagingType': 'full',
        'columnDefs': [{
          'targets': 'no-sort', // column or columns numbers
          'orderable': false,  // set orderable for selected columns
        }],
      });
      const table = $('#example').DataTable();
      // pay attention to capital D, which is mandatory to retrieve "api" data-tables' object, as @Lionel said

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

      }
    );

  }
  searchData() {
  }
}
