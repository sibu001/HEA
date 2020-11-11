import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { AdministrativeService } from 'src/app/store/administrative-state-management/service/administrative.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { ProspectsEditComponent } from '../prospects-edit/prospects-edit.component';

@Component({
  selector: 'app-prospects-list',
  templateUrl: './prospects-list.component.html',
  styleUrls: ['./prospects-list.component.css']
})
export class ProspectsListComponent implements OnInit, OnDestroy {

  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.PROSPECTS_KEY;
  public dataSource: any;
  public totalElement = 0;
  public prospectsData = {
    content: [],
    totalElements: 0,
  };
  private readonly subscriptions: Subscription = new Subscription();
  public force = false;
  prospectsForm: FormGroup;
  constructor(public fb: FormBuilder,
    public dialog: MatDialog,
    private readonly administrativeService: AdministrativeService,
    private readonly activateRoute: ActivatedRoute) {
    this.activateRoute.queryParams.subscribe(params => {
      this.force = params['force'];
    });
  }

  ngOnInit() {
    this.setUpForm(undefined);
    this.search('', false);
  }

  addProspects(event: any) {
    const dialogRef = this.dialog.open(ProspectsEditComponent, {
      width: '70vw',
      height: '70vh',
      data: event,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.search(undefined, true);
      }
    });
  }

  setUpForm(event: any) {
    this.prospectsForm = this.fb.group({
      source: [event !== undefined && event !== null ? event.source : ''],
      email: [event !== undefined && event !== null ? event.email : ''],
      name: [event !== undefined && event !== null ? event.name : ''],
      field6: [event !== undefined && event !== null ? event.field6 : ''],
      coachUserId: [event !== undefined && event !== null ? event.coachUserId : ''],
      subscriptionId: [event !== undefined && event !== null ? event.subscriptionId : ''],
    });
  }

  findProspects(force: boolean, filter: any): void {
    this.administrativeService.loadProspectsList(force, filter);
    this.subscriptions.add(this.administrativeService.getProspectsList().pipe(skipWhile((item: any) => !item))
      .subscribe((prospectsList: any) => {
        this.prospectsData.content = prospectsList.list;
        this.prospectsData.totalElements = prospectsList.totalSize;
        this.dataSource = [...this.prospectsData.content];
      }));
  }

  search(event: any, isSearch: boolean): void {
    let sortOrder = true;
    if (event && event.sort.direction !== undefined) {
      if (event.sort.direction === 'desc') {
        sortOrder = false;
      }
    }
    const params = new HttpParams()
      .set('filter.disableTotalSize', 'true')
      .set('filter.pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      .set('filter.startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('sortOrders[0].propertyName', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('source', sortOrder + '')
      .set('sortOrders[0].asc', sortOrder + '')
      .set('sortOrders[0].asc', sortOrder + '')
      .set('sortOrders[0].asc', sortOrder + '')
      .set('sortOrders[0].asc', sortOrder + '')
      .set('sortOrders[0].asc', sortOrder + '')
      .set('sortOrders[0].asc', sortOrder + '');
    this.findProspects(true, params);
  }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
