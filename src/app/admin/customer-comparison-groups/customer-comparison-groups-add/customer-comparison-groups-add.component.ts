import { Component, ElementRef, OnInit } from '@angular/core';
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
export class CustomerComparisonGroupsAddComponent implements OnInit {
  id: any;
  customerComparisonGroupForm: FormGroup;
  isForce = false;
  public weatherStationIds: Array<any> = TableColumnData.PLACE_STATION_ID;
  public houseSizeData: Array<any> = TableColumnData.HOUSE_SIZE_DATA;
  public comparisonCodeDropdownData: Array<any> = TableColumnData.COMPARISON_CODE_DROPDOWN_DATA;
  public houseTypeData: Array<any> = TableColumnData.HOUSE_TYPE_DATA;
  public occupancyData: Array<any> = TableColumnData.OCCUPANCY_DATA;
  public yesNoData: Array<any> = TableColumnData.YES_NO_DATA;
  public lotSizeData: Array<any> = TableColumnData.LOT_SIZE_DATA;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly el: ElementRef) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }
  ngOnInit() {
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.systemUtilityService.loadCustomerComparisonGroupById(this.id);
      this.loadCustomerComparisonGroupById();
    }
  }

  loadCustomerComparisonGroupById() {
    this.subscriptions.add(this.systemUtilityService.getCustomerComparisonGroupById().pipe(skipWhile((item: any) => !item))
      .subscribe((credentialType: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/customerComparisonGroup/comparisonGroupEdit'], { queryParams: { 'id': credentialType.id } });
        }
        this.setForm(credentialType);
      }));
  }
  setForm(event: any) {
    this.customerComparisonGroupForm = this.formBuilder.group({
      comparisonCode: [event !== undefined ? event.comparisonCode : 'Cooling'],
      groupName: [event !== undefined ? event.groupName : '', Validators.required],
      order: [event !== undefined ? event.order : 0],
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
    this.router.navigate(['admin/customerComparisonGroup/comparisonGroupList'], { queryParams: { 'force': this.isForce } });
  }
  delete() {
    this.subscriptions.add(this.systemUtilityService.deleteCustomerComparisonGroupById(this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.router.navigate(['admin/customerComparisonGroup/comparisonGroupList'], { queryParams: { 'force': true } });
      }));
  }

  save() {
    if (this.customerComparisonGroupForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.subscriptions.add(this.systemUtilityService.updateCustomerComparisonGroup(this.id, this.customerComparisonGroupForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadCustomerComparisonGroupById();
          }));
      } else {
        this.subscriptions.add(this.systemUtilityService.saveCustomerComparisonGroup(this.customerComparisonGroupForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
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
