import { Component, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { Users } from 'src/app/models/user';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { HttpParams } from '@angular/common/http';
import { TABLECOLUMN } from '../interface/table-column.interface';
import { TableColumnData } from '../data/common-data';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppConstant } from '../utility/app.constant';
@Component({
  selector: 'mailArchiveList',
  templateUrl: './mailArchiveList.component.html',
  styleUrls: ['./mailArchiveList.component.css']
})
export class MailArchiveListComponent implements OnInit {
  errorMessage: any;
  users: Users = new Users();
  pageSize = AppConstant.pageSize;
  mailArchiveForm: FormGroup;
  public keys: Array<TABLECOLUMN> = TableColumnData.MAIL_ARCHIVE_KEY;
  dataSource: any;
  usageHistoryData = {
    content: [],
    totalElements: 0,
  };

  constructor(private location: Location,
    private router: Router,
    public fb: FormBuilder,
    private readonly datePipe: DatePipe,
    private loginService: LoginService
  ) {
    this.users = this.loginService.getUser();
  }
  ngOnInit() {
    this.setUpForm(undefined);
    this.search(undefined, false);
  }

  back() {
    this.location.back();
  }

  getMailList(params: any) {
    document.getElementById('loader').classList.add('loading');
    this.loginService.performGetWithParams('customers/' + this.users.outhMeResponse.customerId + '/mails', params).subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        this.usageHistoryData.content = this.transformMailArchiveList(response);
        this.dataSource = [...this.usageHistoryData.content];
        document.getElementById('loader').classList.remove('loading');
      },
      error => {
        const response = JSON.parse(JSON.parse(JSON.stringify(error))._body);
        this.errorMessage = response.error_description;
        document.getElementById('loader').classList.remove('loading');
      }
    );
  }

  transformMailArchiveList(response): any {
    const dataSourceList: any = [];
    response.data.forEach(element => {
      let dataSourceObject: any = {};
      dataSourceObject = element;
      if (element.inBouncedList) {
        dataSourceObject.inBouncedList = '*';
      } else {
        dataSourceObject.inBouncedList = '';
      }
      if (element.wasOpened) {
        dataSourceObject.wasOpened = '*';
      } else {
        dataSourceObject.wasOpened = '';
      }
      dataSourceObject.dateSent = element.dateSent ? this.datePipe.transform(new Date(element.dateSent), 'MM/dd/yyyy', 'PST') : '';
      dataSourceObject.permanentLink = 'Permanent link';
      dataSourceList.push(dataSourceObject);
    });
    return dataSourceList;
  }
  setUpForm(event: any) {
    this.mailArchiveForm = this.fb.group({
      periodStart: [event !== undefined && event !== null ? new Date(event.periodStart) : ''],
      subject: [event !== undefined && event !== null ? event.subject : ''],
      periodEnd: [event !== undefined && event !== null ? new Date(event.periodEnd) : '']
    });
  }

  search(event: any, isSearch: boolean) {
    // .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
    // .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
    //   (event.pageIndex * event.pageSize) + '' : '0'))
    const params = new HttpParams()
      .set('startRow', '0')
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrderAsc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .set('periodStart', (this.mailArchiveForm.value.periodStart ? this.datePipe.transform(this.mailArchiveForm.value.periodStart, 'MM/dd/yyyy') : ''))
      .set('periodEnd', (this.mailArchiveForm.value.periodEnd ? this.datePipe.transform(this.mailArchiveForm.value.periodEnd, 'MM/dd/yyyy') : ''))
      .set('subject', (this.mailArchiveForm.value.subject !== null ? this.mailArchiveForm.value.subject : ''))
    this.getMailList(params);
  }
  goToEditMailArchive(event: any) {
    console.log(event);
    this.users.mailContent = event.content;
    this.users.mailDetail = event;
    this.loginService.setUser(this.users);
    this.router.navigate(['/MailArchiveView']);
  }
}
