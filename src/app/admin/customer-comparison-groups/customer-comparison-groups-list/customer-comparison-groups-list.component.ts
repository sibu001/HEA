import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-customer-comparison-groups-list',
  templateUrl: './customer-comparison-groups-list.component.html',
  styleUrls: ['./customer-comparison-groups-list.component.css']
})
export class CustomerComparisonGroupsListComponent implements OnInit {

  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public weatherStationIds: Array<any> = TableColumnData.PLACE_STATION_ID;
  public houseSizeData: Array<any> = TableColumnData.HOUSE_SIZE_DATA;
  public comparisonCodeDropdownData: Array<any> = TableColumnData.COMPARISON_CODE_DROPDOWN_DATA;
  public customerComparisonGroupData = {
    content: [],
    totalElements: 0,
  };
  customerComparisonGroupForm = this.fb.group({
    comparisonCode: [''],
    groupName: [''],
    weatherStationId: [''],
    homeSize: ['']
  });
  private readonly subscriptions: Subscription = new Subscription();
  constructor(public fb: FormBuilder,
    private readonly systemService: SystemService,
    private readonly router: Router) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.CUSTOMER_COMPARISON_GROUP_COLUMN_DATA;
    this.findCustomerComparisonGroup();
  }

  findCustomerComparisonGroup() {

  }

  gotoEditCustomerComparisonGroup(event: any) {
    this.router.navigate(['admin/customerComparisonGroup/comparisonGroupAdd'], { queryParams: { 'id': event.id } });
  }

  addCustomerComparisonGroup() {
    this.router.navigate(['admin/customerComparisonGroup/comparisonGroupAdd']);
  }

  goToBatchAdd() {
    this.router.navigate(['admin/customerComparisonGroup/comparisonGroupBatchAdd']);
  }

  goToBatchRemove() {
    this.router.navigate(['admin/customerComparisonGroup/comparisonGroupBatchRemove']);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
