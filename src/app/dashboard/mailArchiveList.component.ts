import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { Users } from 'src/app/models/user';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { HttpParams } from '@angular/common/http';
import { TABLECOLUMN } from '../interface/table-column.interface';
import { TableColumnData } from '../data/common-data';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppConstant } from '../utility/app.constant';
import { filter } from 'rxjs/operators';
import { AdminFilter } from '../models/filter-object';
import { AppUtility } from '../utility/app.utility';
@Component({
  selector: 'mailArchiveList',
  templateUrl: './mailArchiveList.component.html',
  styleUrls: ['./mailArchiveList.component.css']
})
export class MailArchiveListComponent implements OnInit {
  errorMessage: any;
  users: Users = new Users();
  pageSize = AppConstant.pageSize;
  dateFormat : string = AppConstant.DATE_SELECTION_FORMAT;
  pageIndex = 0;
  mailArchiveForm: FormGroup;
  @ViewChild('tableScrollPoint') tableScrollPoint : ElementRef;
  public keys: Array<TABLECOLUMN> = TableColumnData.MAIL_ARCHIVE_KEY;
  dataSource: any;
  disableNextButton = false;
  usageHistoryData = {
    content: [],
    totalElements: Number.MAX_SAFE_INTEGER,
  };
  adminFilter : AdminFilter;

  constructor(private location: Location,
    private router: Router,
    public fb: FormBuilder,
    private readonly datePipe: DatePipe,
    private loginService: LoginService
  ) {
    this.users = this.loginService.getUser();
    this.adminFilter = JSON.parse(localStorage.getItem('adminFilter'));
    
  }
  ngOnInit() {
    if(this.users.role == "ADMIN"){
      this.setUpForm(this.adminFilter.mailArchiveList);
    }else{
      this.setUpForm(undefined);
    }
    this.search(undefined, false);
  }

  back() {
    this.location.back();
  }

  getMailList(params: any) {
    document.getElementById('loader').classList.add('loading');
    this.loginService.performGetWithParams('customers/' + this.users.outhMeResponse.customerId + '/mails', params)
    .pipe(filter((data : any) => data))
    .subscribe(
      data => {
        const emailList = this.transformMailArchiveList(data);
        if(emailList.length == this.pageSize) {
          this.disableNextButton = false;
          this.usageHistoryData.content = emailList;
        }else if (emailList.length < this.pageSize && emailList.length != 0){
          this.disableNextButton = true;
          this.usageHistoryData.content = emailList;
        }else if (emailList.length == 0){
          this.disableNextButton = true;
          if(this.pageIndex){
            this.pageIndex = this.pageIndex - 1;
          }else{
            this.usageHistoryData.content = emailList;
          }
        }

        AppUtility.scrollToTableTop(this.tableScrollPoint);
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
      periodStart: [event && event.periodStart  ? new Date(event.periodStart) : ''],
      subject: [event && event.subject ? event.subject : ''],
      periodEnd: [event && event.periodEnd ? new Date(event.periodEnd) : '']
    });
  }

  search(event: any, isSearch: boolean) {
    const params = new HttpParams()
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrderAsc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .set('periodStart', (this.mailArchiveForm.value.periodStart ? this.datePipe.transform(this.mailArchiveForm.value.periodStart, 'MM/dd/yyyy') : ''))
      .set('periodEnd', (this.mailArchiveForm.value.periodEnd ? this.datePipe.transform(this.mailArchiveForm.value.periodEnd, 'MM/dd/yyyy') : ''))
      .set('subject', (this.mailArchiveForm.value.subject !== null ? this.mailArchiveForm.value.subject : ''))
      .set('pageSize', this.pageSize)
      .set('useLikeSearch','true')
      .set('systemMessage','false');
      
      if(event)
        this.pageIndex = event.pageIndex;
      else
        this.pageIndex = 0;
       
      if(this.users.role == "ADMIN"){
        this.adminFilter.mailArchiveList = {
          periodStart : this.mailArchiveForm.value.periodStart,
          periodEnd : this.mailArchiveForm.value.periodEnd,
          subject : this.mailArchiveForm.value.subject
        }
        localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
      }
    this.getMailList(params);
  }
  goToEditMailArchive(event: any) {
    this.users.mailContent = event.content;
    this.users.mailDetail = event;
    this.loginService.setUser(this.users);
    this.router.navigate(['/MailArchiveView']);
  }
}
