import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-customer-comparison-groups-add',
  templateUrl: './customer-comparison-groups-add.component.html',
  styleUrls: ['./customer-comparison-groups-add.component.css']
})
export class CustomerComparisonGroupsAddComponent implements OnInit, OnDestroy {
  id: any;
  customerComparisonGroupForm: FormGroup;
  isForce = false;
  customerComparisonGroupDescriptionList: any;
  customerComparisonGroupCustomerList: any;
  public weatherStationIds: Array<any>;
  public houseSizeData: Array<any>;
  public comparisonCodeDropdownData: Array<any>;
  public houseTypeData: Array<any>;
  public occupancyData: Array<any>;
  public yesNoData: Array<any> = TableColumnData.YES_NO_DATA;
  public lotSizeData: Array<any>;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly activateRoute: ActivatedRoute,
    private readonly systemService: SystemService,
    private readonly router: Router,
    private readonly el: ElementRef) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }
  ngOnInit() {
    this.scrollTop();
    this.loadHomeSize();
    this.loadLotSize();
    this.loadHomeOccupancy();
    this.loadHomeType();
    this.loadComparisonCode();
    this.findWeatherStation(true, '');
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.systemUtilityService.loadCustomerComparisonGroupById(this.id);
      this.loadCustomerComparisonGroupById();
    }
  }

  loadCustomerComparisonGroupById() {
    this.subscriptions.add(this.systemUtilityService.getCustomerComparisonGroupById().pipe(skipWhile((item: any) => !item))
      .subscribe((customerComparisonGroup: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/customerComparisonGroup/comparisonGroupAdd'], { queryParams: { 'id': customerComparisonGroup.id } });
        }
        this.loadCustomerComparisonGroupDescription(customerComparisonGroup.id);
        this.loadCustomerComparisonGroupCustomer(customerComparisonGroup.id);
        this.setForm(customerComparisonGroup);
      }));
  }
  loadComparisonCode() {
    this.systemService.loadComparisonCodeList();
    this.subscriptions.add(this.systemService.getComparisonCodeList().pipe(skipWhile((item: any) => !item))
      .subscribe((comparisonCode: any) => {
        this.comparisonCodeDropdownData = comparisonCode.data;
      }));
  }

  loadHomeSize() {
    this.systemService.loadHomeSizeList();
    this.subscriptions.add(this.systemService.getHomeSizeList().pipe(skipWhile((item: any) => !item))
      .subscribe((homeSize: any) => {
        this.houseSizeData = homeSize.data;
      }));
  }

  loadHomeType() {
    this.systemService.loadHomeTypeList();
    this.subscriptions.add(this.systemService.getHomeTypeList().pipe(skipWhile((item: any) => !item))
      .subscribe((homeType: any) => {
        this.houseTypeData = homeType.data;
      }));
  }

  loadHomeOccupancy() {
    this.systemService.loadHomeOccupancyList();
    this.subscriptions.add(this.systemService.getHomeOccupancyList().pipe(skipWhile((item: any) => !item))
      .subscribe((occupancyList: any) => {
        this.occupancyData = occupancyList.data;
      }));
  }

  loadLotSize() {
    this.systemService.loadLotSizeList();
    this.subscriptions.add(this.systemService.getLotSizeList().pipe(skipWhile((item: any) => !item))
      .subscribe((lotSizeList: any) => {
        this.lotSizeData = lotSizeList.data;
      }));
  }

  loadCustomerComparisonGroupDescription(id: any) {
    this.systemUtilityService.loadCustomerComparisonGroupDescription(id);
    this.subscriptions.add(this.systemUtilityService.getCustomerComparisonGroupDescription().pipe(skipWhile((item: any) => !item))
      .subscribe((customerComparisonGroupDescription: any) => {
        this.customerComparisonGroupDescriptionList = customerComparisonGroupDescription.data;
      }));
  }

  loadCustomerComparisonGroupCustomer(id: any) {
    this.systemUtilityService.loadCustomerComparisonGroupCustomer(id);
    this.subscriptions.add(this.systemUtilityService.getCustomerComparisonGroupCustomer().pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.customerComparisonGroupCustomerList = response.data;
      }));
  }

  findWeatherStation(force: boolean, filter: any): void {
    this.systemUtilityService.loadWeatherStationList(force, filter);
    this.subscriptions.add(this.systemUtilityService.getWeatherStationList().pipe(skipWhile((item: any) => !item))
      .subscribe((weatherStationList: any) => {
        this.weatherStationIds = weatherStationList;
      }));
  }


  setForm(event: any) {
    this.customerComparisonGroupForm = this.formBuilder.group({
      comparisonCode: [event !== undefined ? event.comparisonCode : 'Cooling'],
      groupName: [event !== undefined ? event.groupName : '', Validators.required],
      orderNumber: [event !== undefined ? event.orderNumber : 0],
      weatherStationId: [event !== undefined ? event.weatherStationId : ''],
      homeSize: [event !== undefined ? event.homeSize : ''],
      homeType: [event !== undefined ? event.homeType : ''],
      occupancy: [event !== undefined ? event.occupancy : ''],
      poolOrSpa: [event !== undefined ? event.poolOrSpa : ''],
      gas: [event !== undefined ? event.gas : ''],
      electricity: [event !== undefined ? event.electricity : ''],
      water: [event !== undefined ? event.water : ''],
      elecWaterHeating: [event !== undefined ? event.elecWaterHeating : ''],
      ev: [event !== undefined ? event.ev : ''],
      lotSize: [event !== undefined ? event.lotSize : ''],
      note: [event !== undefined ? event.note : ''],
      numOfCustomers: [event !== undefined ? event.numOfCustomers : '']
    });
  }
  back() {
    this.router.navigate(['admin/customerComparisonGroup/comparisonGroupList'], { queryParams: { 'force': this.isForce } });
  }
  delete() {
    if (confirm('Are you sure you want to delete?')) {
      this.subscriptions.add(this.systemUtilityService.deleteCustomerComparisonGroupById(this.id).pipe(skipWhile((item: any) => !item))
        .subscribe((response: any) => {
          this.router.navigate(['admin/customerComparisonGroup/comparisonGroupList'], { queryParams: { 'force': true } });
        }));
    }
  }
  scrollTop() {
    window.scroll(0, 0);
  }
  save() {
    if (this.customerComparisonGroupForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.subscriptions.add(this.systemUtilityService.updateCustomerComparisonGroup(this.id, this.customerComparisonGroupForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.scrollTop();
            this.loadCustomerComparisonGroupById();
          }));
      } else {
        this.subscriptions.add(this.systemUtilityService.saveCustomerComparisonGroup(this.customerComparisonGroupForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.scrollTop();
            this.loadCustomerComparisonGroupById();
          }));
      }
    } else {
      this.validateForm();
    }
  }
  validateForm() {
    for (const key of Object.keys(this.customerComparisonGroupForm.controls)) {
      if (this.customerComparisonGroupForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }
  get f() { return this.customerComparisonGroupForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
