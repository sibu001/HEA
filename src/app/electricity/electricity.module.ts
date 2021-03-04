import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectricityRoutingModule } from './electricity-routing.module';
import { ElectricityDailySmartMeterListComponent } from './electricity-daily-smart-meter-list/electricity-daily-smart-meter-list.component';
import { ElectricitySmartMeterListComponent } from './electricity-smart-meter-list/electricity-smart-meter-list.component';
import { ElectricityChargeListComponent } from './electricity-charge-list/electricity-charge-list.component';
import { ElectricityUsageListComponent } from './electricity-usage-list/electricity-usage-list.component';
import { CommonHEAModule } from '../common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ElectricityUsagePopupComponent } from './electricity-usage-popup/electricity-usage-popup.component';
import { SharedModule } from '../general/share.module';
import { UsageHistoryService } from '../store/usage-history-state-management/service/usage-history.service';
import { NgxsModule } from '@ngxs/store';
import { UsageHistoryManagementState } from '../store/usage-history-state-management/state/usage-history.state';

@NgModule({
  imports: [
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    FormsModule,
    ElectricityRoutingModule,
    SharedModule,
    NgxsModule.forRoot([
      UsageHistoryManagementState
    ]),
  ],
  declarations: [
    ElectricityDailySmartMeterListComponent,
    ElectricitySmartMeterListComponent,
    ElectricityChargeListComponent,
    ElectricityUsageListComponent,
    ElectricityUsagePopupComponent
  ],
  entryComponents: [ElectricityUsagePopupComponent],
  providers: [UsageHistoryService]
})
export class ElectricityModule { }
