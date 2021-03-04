import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { ElementRef } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  public comparisonCodeDropdownData: Array<any>;
  public yesNoData: Array<any> = TableColumnData.YES_NO_DATA;
  public errorMessage: any;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemService: SystemService,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly location: Location,
    private readonly el: ElementRef) {
  }

  ngOnInit() {
    this.loadComparisonCode();
    this.findWeatherStation(false, '');
    this.setForm(undefined);
    this.scrollTop();
  }

  loadComparisonCode() {
    this.systemService.loadComparisonCodeList();
    this.subscriptions.add(this.systemService.getComparisonCodeList().pipe(skipWhile((item: any) => !item))
      .subscribe((comparisonCode: any) => {
        this.comparisonCodeDropdownData = comparisonCode.data;
      },
        error => {
          this.errorMessage = error;
        }));
  }

  findWeatherStation(force: boolean, filter: any): void {
    this.systemUtilityService.loadWeatherStationList(force, filter);
    this.subscriptions.add(this.systemUtilityService.getWeatherStationList().pipe(skipWhile((item: any) => !item))
      .subscribe((weatherStationList: any) => {
        this.weatherStationIds = weatherStationList;
      },
        error => {
          this.errorMessage = error;
        }));
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  findProgramGroup(): void {
  }

  setForm(event: any) {
    this.customerComparisonGroupForm = this.formBuilder.group({
      comparisonCode: [event !== undefined ? event.comparisonCode : 'Cooling'],
      fallbackOrder: [event !== undefined ? event.fallbackOrder : ''],
      hasWeatherStation: [event !== undefined ? event.hasWeatherStation : ''],
      weatherStation: [event !== undefined ? event.weatherStation : ''],
      hasHomeSize: [event !== undefined ? event.hasHomeSize : ''],
      hasHomeType: [event !== undefined ? event.homeType : ''],
      hasOccupancy: [event !== undefined ? event.hasOccupancy : ''],
      hasPoolOrSpa: [event !== undefined ? event.hasPoolOrSpa : ''],
      hasGas: [event !== undefined ? event.hasGas : ''],
      gas: [event !== undefined ? event.gas : ''],
      hasElectricity: [event !== undefined ? event.hasElectricity : ''],
      electricity: [event !== undefined ? event.electricity : ''],
      hasWater: [event !== undefined ? event.hasWater : ''],
      water: [event !== undefined ? event.water : ''],
      hasElecHeating: [event !== undefined ? event.hasElecHeating : ''],
      hasEV: [event !== undefined ? event.hasEV : ''],
      hasLotSize: [event !== undefined ? event.hasLotSize : ''],
    });
  }
  back() {
    this.location.back();
  }
  save() {
    if (this.customerComparisonGroupForm.valid) {
      this.subscriptions.add(this.systemUtilityService.saveCustomerComparisonGroupInBatch(this.setHttpParameter()).pipe(
        skipWhile((item: any) => !item))
        .subscribe((response: any) => {
          this.location.back();
        },
          error => {
            this.errorMessage = error;
          }));
    } else {
      this.validateForm();
    }
  }
  delete() {

  }

  setHttpParameter(): HttpParams {
    const params = new HttpParams()
      .set('comparisonCode', this.customerComparisonGroupForm.value.comparisonCode)
      .set('fallbackOrder', this.customerComparisonGroupForm.value.fallbackOrder)
      .set('hasWeatherStation', this.customerComparisonGroupForm.value.hasWeatherStation)
      .set('weatherStation', this.customerComparisonGroupForm.value.weatherStation)
      .set('hasHomeSize', this.customerComparisonGroupForm.value.hasHomeSize)
      .set('hasHomeType', this.customerComparisonGroupForm.value.hasHomeType)
      .set('hasOccupancy', this.customerComparisonGroupForm.value.hasOccupancy)
      .set('hasPoolOrSpa', this.customerComparisonGroupForm.value.hasPoolOrSpa)
      .set('hasGas', this.customerComparisonGroupForm.value.hasGas)
      .set('gas', this.customerComparisonGroupForm.value.gas)
      .set('hasElectricity', this.customerComparisonGroupForm.value.hasElectricity)
      .set('electricity', this.customerComparisonGroupForm.value.electricity)
      .set('hasWater', this.customerComparisonGroupForm.value.hasWater)
      .set('water', this.customerComparisonGroupForm.value.water)
      .set('hasElecHeating', this.customerComparisonGroupForm.value.hasElecHeating)
      .set('hasEV', this.customerComparisonGroupForm.value.hasEV)
      .set('hasLotSize', this.customerComparisonGroupForm.value.hasLotSize);
    return params;
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
