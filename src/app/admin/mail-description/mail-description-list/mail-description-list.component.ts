import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { AdminFilter } from 'src/app/models/filter-object';
import { MailService } from 'src/app/store/mail-state-management/service/mail.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-mail-description-list',
  templateUrl: './mail-description-list.component.html',
  styleUrls: ['./mail-description-list.component.css']
})
export class MailDescriptionListComponent implements OnInit, OnDestroy {
  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.MAIL_DESC_KEYS;
  public dataSource: any;
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
  private readonly subscriptions: Subscription = new Subscription();
  constructor(public fb: FormBuilder,
    private readonly mailService: MailService,
    private readonly systemService:SystemService,
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
    this.loadScrapingPeriodList();
    this.setUpForm(this.adminFilter.mailDescriptionFilter.formValue);
    this.search(this.adminFilter.mailDescriptionFilter.page, false);
  }

  loadScrapingPeriodList(): any {
    this.systemService.loadScrapingPeriodList();
    this.subscriptions.add(this.systemService.getScrapingPeriodList().pipe(skipWhile((item: any) => !item))
      .subscribe((scrapingPeriodList: any) => {
        this.periodData = scrapingPeriodList.data;
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
      isActive: [event !== undefined && event !== null ? event.isActive : ''],
      mailPeriod: [event !== undefined && event !== null ? event.mailPeriod : '']
    });
  }

  findMailDescription(force: boolean, filter: any): void {
    this.adminFilter.mailDescriptionFilter.formValue = this.mailForm.value;
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
    this.mailService.loadMailDescriptionList(force, filter);
    this.subscriptions.add(this.mailService.getMailDescriptionDataSourceList().pipe(skipWhile((item: any) => !item))
      .subscribe((mailDescriptionList: any) => {
        this.mailData.content = mailDescriptionList.data;
        // this.mailData.totalElements = mailDescriptionList.data.length;
        this.dataSource = [...this.mailData.content];
      }));
  }

  goToEditMailDescription(event: any): void {
    this.router.navigate(['admin/mailDescription/mailDescriptionEdit'], { queryParams: { 'id': event.id } });
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.mailDescriptionFilter.page = event;
    // .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
    const params = new HttpParams()
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('formAction', (event && event.sort.active !== undefined ? 'sort' : ''))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrderAsc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .set('mailDescriptionCode', '')
      .set('active', (this.mailForm.value.isActive !== null ? this.mailForm.value.isActive : true))
      .set('subjectTemplate', (this.mailForm.value.subject !== null ? this.mailForm.value.subject : ''))
      .set('mailPeriod', (this.mailForm.value.mailPeriod !== null ? this.mailForm.value.mailPeriod : ''));
    this.findMailDescription(true, params);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}

