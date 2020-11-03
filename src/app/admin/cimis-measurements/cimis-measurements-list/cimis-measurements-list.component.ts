import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-cimis-measurements-list',
  templateUrl: './cimis-measurements-list.component.html',
  styleUrls: ['./cimis-measurements-list.component.css']
})
export class CimisMeasurementsListComponent implements OnInit, OnDestroy {

  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public measurementsData = {
    content: [],
    totalElements: 0,
  };
  cimisStation: Array<any> = TableColumnData.CIMIS_STATION_DATA;
  measurementsForm = this.fb.group({
    cimisStation: [''],
    fromDate: [''],
    toDate: ['']
  });
  private readonly subscriptions: Subscription = new Subscription();
  constructor(public fb: FormBuilder,
    private readonly systemService: SystemService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.CIMIS_MEASUREMENTS_KEY;
    this.findCimisStation();
  }

  findCimisStation() {

  }

  search(event: any): void {
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }



}
