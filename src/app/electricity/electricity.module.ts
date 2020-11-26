import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectricityRoutingModule } from './electricity-routing.module';
import { ElectricityDailySmartMeterListComponent } from './electricity-daily-smart-meter-list/electricity-daily-smart-meter-list.component';
import { ElectricitySmartMeterListComponent } from './electricity-smart-meter-list/electricity-smart-meter-list.component';
import { ElectricityChargeListComponent } from './electricity-charge-list/electricity-charge-list.component';
import { ElectricityUsageListComponent } from './electricity-usage-list/electricity-usage-list.component';
import { CommonHEAModule } from '../common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsageHistoryModule } from '../usageHistory/usageHistory.module';
import { ElectricityUsagePopupComponent } from './electricity-usage-popup/electricity-usage-popup.component';
import { SharedModule } from '../general/share.module';

@NgModule({
  imports: [
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    FormsModule,
    ElectricityRoutingModule,
    SharedModule
  ],
  declarations: [ElectricityDailySmartMeterListComponent, ElectricitySmartMeterListComponent, ElectricityChargeListComponent, ElectricityUsageListComponent, ElectricityUsagePopupComponent]
})
export class ElectricityModule { }
