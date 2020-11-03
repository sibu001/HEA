import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-degree-days-list',
  templateUrl: './degree-days-list.component.html',
  styleUrls: ['./degree-days-list.component.css']
})
export class DegreeDaysListComponent implements OnInit, OnDestroy {
  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public degreeDayData = {
    content: [],
    totalElements: 0,
  };
  degreeDayForm = this.fb.group({
    degreeDayFile: [''],
    stationId: [''],
    fromDate: [''],
    type: [''],
    toDate: [''],
    baseTemp: ['']
  });

  public stationIds: Array<any> = TableColumnData.PLACE_STATION_ID;
  public baseTemp: Array<any> = TableColumnData.BASE_TEMPERATURE;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(public fb: FormBuilder,
    private readonly systemService: SystemService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.DEGREE_DAY_KEY;
    this.findDegreeDay();
  }

  findDegreeDay() {

  }

  search(event: any): void {

  }

  upload(): any {

  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
