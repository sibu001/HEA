import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-customer-comparison-groups-add',
  templateUrl: './customer-comparison-groups-add.component.html',
  styleUrls: ['./customer-comparison-groups-add.component.css']
})
export class CustomerComparisonGroupsAddComponent implements OnInit {
  id: any;
  customerComparisonGroupForm: FormGroup;
  public weatherStationIds: Array<any> = TableColumnData.PLACE_STATION_ID;
  public houseSizeData: Array<any> = TableColumnData.HOUSE_SIZE_DATA;
  public comparisonCodeDropdownData: Array<any> = TableColumnData.COMPARISON_CODE_DROPDOWN_DATA;
  public houseTypeData: Array<any> = TableColumnData.HOUSE_TYPE_DATA;
  public occupancyData: Array<any> = TableColumnData.OCCUPANCY_DATA;
  public yesNoData: Array<any> = TableColumnData.YES_NO_DATA;
  public lotSizeData: Array<any> = TableColumnData.LOT_SIZE_DATA;
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

  findProgramGroup(): void {
  }

  setForm(event: any) {
    this.customerComparisonGroupForm = this.formBuilder.group({
      comparisonCode: [event !== undefined ? event.comparisonCode : ''],
      groupName: [event !== undefined ? event.groupName : ''],
      order: [event !== undefined ? event.order : ''],
      weatherStationId: [event !== undefined ? event.weatherStationId : ''],
      homeSize: [event !== undefined ? event.homeSize : ''],
      homeType: [event !== undefined ? event.homeType : ''],
      occupancy: [event !== undefined ? event.occupancy : ''],
      poolOrSpa: [event !== undefined ? event.poolOrSpa : ''],
      naturalGasData: [event !== undefined ? event.natualGasData : ''],
      electricData: [event !== undefined ? event.electricData : ''],
      waterData: [event !== undefined ? event.waterData : ''],
      electricWaterHeater: [event !== undefined ? event.electricWaterHeater : ''],
      EV: [event !== undefined ? event.EV : ''],
      lotSize: [event !== undefined ? event.lotSize : ''],
      note: [event !== undefined ? event.note : ''],
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
