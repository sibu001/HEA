import { AppConstant } from 'src/app/utility/app.constant';
import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { exhaustMap, filter, skipWhile, switchMap, withLatestFrom } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { AdminFilter } from 'src/app/models/filter-object';
import { MailService } from 'src/app/store/mail-state-management/service/mail.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { AppUtility } from 'src/app/utility/app.utility';
import { MailTransformer } from 'src/app/store/mail-state-management/transformer/transformer';

@Component({
  selector: 'app-mail-description-list',
  templateUrl: './mail-description-list.component.html',
  styleUrls: ['./mail-description-list.component.css']
})
export class MailDescriptionListComponent implements OnInit, OnDestroy {
  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.MAIL_DESC_KEYS;
  public dataSource: any;
  public pageIndex: any;
  public totalElement = 0;
  public mailData = {
    content: [],
    totalElements: 0,
  };
  filter = false;
  cache = false;
  periodData: any[];
  mailForm: FormGroup;
  public force = false;
  public adminFilter: AdminFilter;
  @ViewChild('tableScrollPoint') public tableScrollPoint : ElementRef;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(public fb: FormBuilder,
    private readonly mailService: MailService,
    private readonly systemService: SystemService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute) {
    this.adminFilter = JSON.parse(localStorage.getItem('adminFilter'));
    if (this.adminFilter === undefined || this.adminFilter === null || this.adminFilter.mailDescriptionFilter === undefined) {
      this.adminFilter = new AdminFilter();
    }
    this.activateRoute.queryParams.subscribe(params => {
      this.force = params['force'];
    });
  }

  ngOnInit() {
    this.scrollTop();
    this.loadMailPeriodList();
    this.getMailPeriodList();
    this.getMailDescriptionCount();
    this.getMailDescriptionList();
    this.setUpForm(this.adminFilter.mailDescriptionFilter.formValue);
    this.search(this.adminFilter.mailDescriptionFilter.page, this.force);
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  loadMailPeriodList(): any {
    this.systemService.loadMailPeriodList();
  }

  getMailPeriodList(){
    this.subscriptions.add(this.systemService.getMailPeriod()
    .pipe(filter((item: any) => item))
    .subscribe((mailPeriodList: any) => {
      this.periodData = mailPeriodList.data;
    },
      error => {
        // this.errorMessage = error;
      }));
  }

  addMailDescriptions(): any {
    this.router.navigate(['/admin/mailDescription/mailDescriptionEdit']);
  }

  disableFilter(): any {
    this.filter = !this.filter;
  }

  disableValueCache(): any {
    this.cache = !this.cache;
  }

  setUpForm(event: any) {
    this.mailForm = this.fb.group({
      subject: [event !== undefined && event !== null ? event.subject : ''],
      isActive: [event !== undefined && event !== null ? event.isActive : true],
      mailPeriod: [event !== undefined && event !== null ? event.mailPeriod : '']
    });
  }

  loadMailDescriptionCount(force: boolean, filter: any): void {
    this.adminFilter.mailDescriptionFilter.formValue = this.mailForm.value;
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
    this.mailService.loadMailDescriptionCount(force,filter);
  }

  getMailDescriptionCount() {
    this.subscriptions.add(this.mailService.getMailDescriptionCount()
    .pipe(skipWhile((item: any) => !item))
    .subscribe((mailDescriptionCount: any) => {
      this.mailData.totalElements = mailDescriptionCount.data;
      this.totalElement = mailDescriptionCount.data;
    }));
  }

  loadMailDescriptionList(force : boolean, filter : any) {
    this.mailService.loadMailDescriptionList(force, filter);
  }

  getMailDescriptionList(){

    this.subscriptions.add(this.mailService.getMailDescriptionList()
    .pipe(skipWhile((item: any) => !item),
      withLatestFrom(this.systemService.getMailPeriod().pipe(filter(data => data))))
    .subscribe(([mailDescriptionList,_]) => {
      this.mailData.content = mailDescriptionList.map(data =>{

        return {...data, 
                mailPeriod : AppUtility.changeLookUpValuetoValueName(data.mailPeriod,this.periodData),
                totalProcessedTime : AppUtility.convertMillisecondToTime(data.totalProcessedTime)
              };
      });
      this.dataSource = [...this.mailData.content];
      AppUtility.scrollToTableTop(this.tableScrollPoint);
    }));
  }

  goToEditMailDescription(event: any): void {
    this.router.navigate(['admin/mailDescription/mailDescriptionEdit'], { queryParams: { 'id': event.id } });
  }

  search(event: any, isSearch: boolean): void {
    event ? this.pageIndex = event.pageIndex : this.pageIndex = 0;
    this.adminFilter.mailDescriptionFilter.page = event;

    const params = new HttpParams()
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : AppConstant.pageSize)
      .set('formAction', (event && event.sort.active !== undefined ? 'sort' : ''))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrderAsc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .set('active', (this.mailForm.value.isActive !== null ? this.mailForm.value.isActive : true))
      .set('subjectTemplate', (this.mailForm.value.subject !== null ? this.mailForm.value.subject : ''))
      .set('mailPeriod', (this.mailForm.value.mailPeriod !== null ? this.mailForm.value.mailPeriod : ''));
    
    this.loadMailDescriptionCount(isSearch ,params);
    this.loadMailDescriptionList(isSearch , params);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}

