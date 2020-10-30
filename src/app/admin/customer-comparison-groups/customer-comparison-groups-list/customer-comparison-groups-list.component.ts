import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-customer-comparison-groups-list',
  templateUrl: './customer-comparison-groups-list.component.html',
  styleUrls: ['./customer-comparison-groups-list.component.css']
})
export class CustomerComparisonGroupsListComponent implements OnInit, OnDestroy {

  public keys: Array<TABLECOLUMN> = TableColumnData.CUSTOMER_COMPARISON_GROUP_COLUMN_DATA;
  public dataSource: any;
  public weatherStationIds: Array<any> = TableColumnData.PLACE_STATION_ID;
  public houseSizeData: Array<any> = TableColumnData.HOUSE_SIZE_DATA;
  public comparisonCodeDropdownData: Array<any> = TableColumnData.COMPARISON_CODE_DROPDOWN_DATA;
  public customerComparisonGroupData = {
    content: [],
    totalElements: 0,
  };
  public force = false;
  customerComparisonGroupForm = this.fb.group({
    comparisonCode: [''],
    groupName: [''],
    weatherStationId: [''],
    homeSize: ['']
  });
  private readonly subscriptions: Subscription = new Subscription();
  constructor(public fb: FormBuilder,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute) {
    this.activateRoute.queryParams.subscribe(params => {
      this.force = params['force'];
    });
  }

  ngOnInit() {
    this.findCustomerComparisonGroup(this.force, '');
  }

  findCustomerComparisonGroup(force: boolean, filter: string): void {
    this.systemUtilityService.loadCustomerComparisonGroupList(force, filter);
    this.subscriptions.add(this.systemUtilityService.getCustomerComparisonGroupList().pipe(skipWhile((item: any) => !item))
      .subscribe((customerComparisonGroupList: any) => {
        this.customerComparisonGroupData.content = customerComparisonGroupList;
        this.dataSource = [...this.customerComparisonGroupData.content];
      }));

  }

  search(event: any): void {
    const filter = '?filter.startRow=0&formAction='
      + (event !== undefined && event.active !== undefined ? 'sort' : '') + '&sortField='
      + (event !== undefined && event.sort.active !== undefined ? event.sort.active : '') + '&sortOrder='
      + (event !== undefined && event.sort.direction !== undefined ? event.sort.direction : 'ASC')
      + '&comparisonGroupId=&filter.comparisonCode='
      + this.customerComparisonGroupForm.value.comparisonCode + '&filter.groupName='
      + this.customerComparisonGroupForm.value.groupName + '&filter.weatherStationId='
      + this.customerComparisonGroupForm.value.weatherStationId + '&filter.homeSize='
      + this.customerComparisonGroupForm.value.homeSize;
    this.findCustomerComparisonGroup(true, filter);
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
