import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-customer-comparison-groups-batch-remove',
  templateUrl: './customer-comparison-groups-batch-remove.component.html',
  styleUrls: ['./customer-comparison-groups-batch-remove.component.css']
})
export class CustomerComparisonGroupsBatchRemoveComponent implements OnInit {

  id: any;
  customerComparisonGroupForm: FormGroup;
  public weatherStationIds: Array<any> = TableColumnData.PLACE_STATION_ID;
  public comparisonCodeDropdownData: Array<any> = TableColumnData.COMPARISON_CODE_DROPDOWN_DATA;
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
      order: [event !== undefined ? event.order : ''],
      weatherStationId: [event !== undefined ? event.weatherStationId : ''],
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
