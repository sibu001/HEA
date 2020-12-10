import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-customer-comparison-groups-batch-add',
  templateUrl: './customer-comparison-groups-batch-add.component.html',
  styleUrls: ['./customer-comparison-groups-batch-add.component.css']
})
export class CustomerComparisonGroupsBatchAddComponent implements OnInit, OnDestroy {
  id: any;
  customerComparisonGroupForm: FormGroup;
  public weatherStationIds: Array<any>;
  public comparisonCodeDropdownData: Array<any> = TableColumnData.COMPARISON_CODE_DROPDOWN_DATA;
  public yesNoData: Array<any> = TableColumnData.YES_NO_DATA;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemService: SystemService,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.findWeatherStation(false,'');
    this.setForm(undefined);
    if (this.id !== undefined) {
    }
  }

  findWeatherStation(force: boolean, filter: any): void {
    this.systemUtilityService.loadWeatherStationList(force, filter);
    this.subscriptions.add(this.systemUtilityService.getWeatherStationList().pipe(skipWhile((item: any) => !item))
      .subscribe((weatherStationList: any) => {
        this.weatherStationIds = weatherStationList;
      }));
  }

  findProgramGroup(): void {
  }

  setForm(event: any) {
    this.customerComparisonGroupForm = this.formBuilder.group({
      comparisonCode: [event !== undefined ? event.comparisonCode : 'Cooling'],
      order: [event !== undefined ? event.order : ''],
      groupByWeather: [event !== undefined ? event.groupByWeather : ''],
      weatherStationId: [event !== undefined ? event.weatherStationId : ''],
      groupByHomeSize: [event !== undefined ? event.groupByHomeSize : ''],
      groupByHomeType: [event !== undefined ? event.homeType : ''],
      groupByOccupancy: [event !== undefined ? event.occupancy : ''],
      groupByPoolOrSpa: [event !== undefined ? event.poolOrSpa : ''],
      groupByGas: [event !== undefined ? event.groupByGas : ''],
      naturalGasData: [event !== undefined ? event.naturalGasData : ''],
      groupByElectricity: [event !== undefined ? event.groupByElectricity : ''],
      electricData: [event !== undefined ? event.electricData : ''],
      groupByWater: [event !== undefined ? event.groupByWater : ''],
      waterData: [event !== undefined ? event.waterData : ''],
      groupByElectricWaterHeater: [event !== undefined ? event.groupByElectricWaterHeater : ''],
      groupByEV: [event !== undefined ? event.groupByEV : ''],
      groupByLotSize: [event !== undefined ? event.groupByLotSize : ''],
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
