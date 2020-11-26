import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TableColumnData } from 'src/app/data/common-data';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { ElectricityUsagePopupComponent } from '../electricity-usage-popup/electricity-usage-popup.component';
declare var $: any;

@Component({
  selector: 'app-electricity-usage-list',
  templateUrl: './electricity-usage-list.component.html',
  styleUrls: ['./electricity-usage-list.component.css']
})
export class ElectricityUsageListComponent implements OnInit, AfterViewInit {
  users: Users = new Users();
  errorMessage: string;
  useTypes: string;
  usageHistoryList: any[] = [];
  // year: any;
  // month: any;
  electricityForm: FormGroup = this.fb.group({
    year: this.fb.control(''),
    month: this.fb.control('')
  });
  userObj: any;
  userObj2: any;
  startDateView: any;
  endDateView: any;
  startDateOrigView: any;
  endDateOrigView: any;
  billingDateView: any;
  filterCheck: boolean;
  // auditId: string;
  // customerName: string;

  isAdminView = false;
  dataSource: any;
  usageHistoryData = {
    content: [],
    totalElements: 0,
  };
  i = 0;
  keys = TableColumnData.GAS_KEYS;
  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog
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
    this.getGasList();
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
    if ((this.f.year.value !== undefined && this.f.year.value !== '') || (this.f.month.value !== undefined && this.f.month.value !== '')) {
      this.searchData();
    }
  }
  ngAfterViewInit() {
    $(document).ready(function () {
      setTimeout(function () {
        $('#example').DataTable({
          'responsive': true,
          'pagingType': 'full',
          'columnDefs': [{
            'targets': 'no-sort', // column or columns numbers
            'orderable': false, // set orderable for selected columns
          }],
          'retrieve': true
        });
      }, 1500);
    });
  }

  getGasList() {
    this.perFormGetList('electricity');
  }
  perFormGetList1(useTypes) {
    this.router.navigate(['/gasList/' + useTypes]);
  }
  perFormGetList(useTypes) {

    document.getElementById('loader').classList.add('loading');
    this.loginService.performGetMultiPartData('users/' + this.users.outhMeResponse.userId + '/usage/electricity?type=' + useTypes).subscribe(
      data => {
        document.getElementById('loader').classList.remove('loading');
        const response = JSON.parse(JSON.stringify(data));
        this.users.types = useTypes;
        this.users.electricityList = new Array;
        this.users.electricityList = response.data;
        this.loginService.setUser(this.users);
        this.usageHistoryList = new Array;
        this.usageHistoryList = response.data;
        this.usageHistoryData.content = response.data;
        this.dataSource = [...this.usageHistoryData.content];
        if ((this.f.year.value !== undefined && this.f.year.value !== null) || (this.f.month.value !== undefined && this.f.month.value !== null)) {
          this.searchData();
        }
        $(document).ready(function () {
          $('#example').dataTable().fnDestroy();
          setTimeout(function () {
            $('#example').DataTable({
              'responsive': true,
              'pagingType': 'full',
              'columnDefs': [{
                'targets': 'no-sort', // column or columns numbers
                'orderable': false, // set orderable for selected columns
              }],
              'retrieve': true
            });
          }, 1500);
        });
      },
      error => {
        document.getElementById('loader').classList.remove('loading');
        const response = JSON.parse(JSON.stringify(error));
        console.log(error);
        this.errorMessage = response.error_description;

      }
    );

  }

  increment(i) {
    this.i = i;
    this.userObj = this.usageHistoryList[i];
    let date;
    if (this.usageHistoryList[i].startDate !== null && this.usageHistoryList[i].startDate !== undefined) {
      date = new Date(this.usageHistoryList[i].startDate);
      const datePipe = new DatePipe('en-US');
      this.startDateView = datePipe.transform(date, 'yyyy-MM-dd');
      this.userObj.startTime = datePipe.transform(date, 'HH:mm:ss');
      this.userObj.startDateView = this.startDateView;

    }
    if (this.usageHistoryList[i].endDate !== null && this.usageHistoryList[i].endDate !== undefined) {
      date = new Date(this.usageHistoryList[i].endDate);
      const datePipe = new DatePipe('en-US');
      this.endDateView = datePipe.transform(date, 'yyyy-MM-dd');
      this.userObj.endTime = datePipe.transform(date, 'HH:mm:ss');
      this.userObj.endDateView = this.endDateView;

    }
    if (this.usageHistoryList[i].startDateOrig !== null && this.usageHistoryList[i].startDateOrig !== undefined) {
      date = new Date(this.usageHistoryList[i].startDateOrig);
      const datePipe = new DatePipe('en-US');
      this.startDateOrigView = datePipe.transform(date, 'yyyy-MM-dd');
      this.userObj.startTimeOrig = datePipe.transform(date, 'HH:mm:ss');
      this.userObj.startDateOrigView = this.startDateOrigView;

    }
    if (this.usageHistoryList[i].endDateOrig !== null && this.usageHistoryList[i].endDateOrig !== undefined) {
      date = new Date(this.usageHistoryList[i].endDateOrig);
      const datePipe = new DatePipe('en-US');
      this.endDateOrigView = datePipe.transform(date, 'yyyy-MM-dd');
      this.userObj.endTimeOrig = datePipe.transform(date, 'HH:mm:ss');
      this.userObj.endDateOrigView = this.endDateOrigView;

    }
    if (this.usageHistoryList[i].billingDate !== null && this.usageHistoryList[i].billingDate !== undefined) {
      date = new Date(this.usageHistoryList[i].billingDate);
      const datePipe = new DatePipe('en-US');
      this.billingDateView = datePipe.transform(date, 'yyyy-MM-dd');
      this.userObj.billingTime = datePipe.transform(date, 'HH:mm:ss');
      this.userObj.billingDateView = this.billingDateView;

    }
    this.userObj.forceStore = true;
    this.userObj2 = $.extend(true, [], this.userObj);
  }
  searchData() {
    document.getElementById('loader').classList.add('loading');
    if ((this.f.year.value !== undefined && this.f.year.value !== '') || (this.f.month.value !== undefined && this.f.month.value !== '')) {
      this.usageHistoryList = new Array;
      for (const elList of this.users.electricityList) {
        this.filterCheck = true;
        if ((this.f.year.value !== undefined && this.f.year.value !== '') && (this.f.month.value !== undefined && this.f.month.value !== '')) {
          this.filterCheck = false;
          if (elList.year === this.f.year.value && elList.month === this.f.month.value) {
            this.filterCheck = true;
          }
        } else if (this.f.year.value !== undefined && this.f.year.value !== '') {
          this.filterCheck = false;
          if (elList.year === this.f.year.value) {
            this.filterCheck = true;
          }
        } else if (this.f.month.value !== undefined && this.f.month.value !== '') {
          this.filterCheck = false;
          if (elList.month === this.f.month.value) {
            this.filterCheck = true;
          }
        } if (this.filterCheck) {
          this.usageHistoryList.push(elList);
        }
      }
      this.usageHistoryData.content = this.usageHistoryList;
      this.dataSource = [...this.usageHistoryData.content];
      $('#example').dataTable().fnDestroy();
      $(document).ready(function () {
        $('#example').dataTable().fnDestroy();
        setTimeout(function () {
          $('#example').DataTable({
            'responsive': true,
            'pagingType': 'full',
            'columnDefs': [{
              'targets': 'no-sort', // column or columns numbers
              'orderable': false, // set orderable for selected columns
            }],
            'retrieve': true
          });
        }, 1500);
      });
      console.log(this.usageHistoryList);
      document.getElementById('loader').classList.remove('loading');
    } else {
      this.usageHistoryList = this.users.electricityList;
      this.usageHistoryData.content = this.usageHistoryList;
      this.dataSource = [...this.usageHistoryData.content];
      $('#example').dataTable().fnDestroy();
      $(document).ready(function () {
        $('#example').dataTable().fnDestroy();
        setTimeout(function () {
          $('#example').DataTable({
            'responsive': true,
            'pagingType': 'full',
            'columnDefs': [{
              'targets': 'no-sort', // column or columns numbers
              'orderable': false, // set orderable for selected columns
            }],
            'retrieve': true
          });
        }, 1500);
      });
      document.getElementById('loader').classList.remove('loading');
    }
  }

  get f() { return this.electricityForm.controls; }

  showPopUp(): any {
    const dialogRef = this.dialog.open(ElectricityUsagePopupComponent, {
      width: '70vw',
      height: '70vh',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }
}
