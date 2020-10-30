import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-weather-station-edit',
  templateUrl: './weather-station-edit.component.html',
  styleUrls: ['./weather-station-edit.component.css']
})
export class WeatherStationEditComponent implements OnInit, OnDestroy {

  id: any;
  stationForm: FormGroup;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemService: SystemService,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.setForm(undefined);
    if (this.id !== undefined) {
    }
  }

  setForm(event: any) {
    this.stationForm = this.formBuilder.group({
      stationId: [event !== undefined ? event.stationId : ''],
      stationIsdId: [event !== undefined ? event.stationIsdId : ''],
      stationName: [event !== undefined ? event.stationName : ''],
    });
  }
  back() {
    this.location.back();
  }

  save() {

  }
  delete() {

  }


  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
