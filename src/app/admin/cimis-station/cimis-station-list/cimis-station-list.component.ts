import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-cimis-station-list',
  templateUrl: './cimis-station-list.component.html',
  styleUrls: ['./cimis-station-list.component.css']
})
export class CimisStationListComponent implements OnInit, OnDestroy {

  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public force = false;
  public stationData = {
    content: [],
    totalElements: 0,
  };
  stationForm = this.fb.group({
    stationNumber: [''],
    stationName: [''],
    isActive: ['']
  });
  private readonly subscriptions: Subscription = new Subscription();
  constructor(public fb: FormBuilder,
    private readonly systemService: SystemService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute) {
    this.activateRoute.queryParams.subscribe(params => {
      this.force = params['force'];
    });
  }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.CIMIS_STATION_KEY;
    this.findCimisStation(this.force, '');
  }

  findCimisStation(force: boolean, filter: any) {

  }

  search(event: any): void {
  }


  goToEditCimisStation(event: any) {
    this.router.navigate(['admin/cimisStation/cimisStationEdit'], { queryParams: { 'id': event.id } });
  }

  addCimisStation() {
    this.router.navigate(['admin/cimisStation/cimisStationEdit']);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }


}
