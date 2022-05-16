import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaterUsageHistoryRoutingModule } from './water-usage-history-routing.module';
import { WaterComponent } from './water/water.component';
import { WaterChargeComponent } from './water-charge/water-charge.component';
import { WaterSmartMeterComponent } from './water-smart-meter/water-smart-meter.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsageHistoryService } from 'src/app/store/usage-history-state-management/service/usage-history.service';
import { UsageHistoryManagementState } from 'src/app/store/usage-history-state-management/state/usage-history.state';
import { NgxsModule } from '@ngxs/store';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { SystemUtilityManagementState } from 'src/app/store/system-utility-state-management/state/system-utility.state';
import { MatAutocompleteModule, MatInputModule, MatOptionModule } from '@angular/material';
import { UtilityService } from 'src/app/services/utility.service';

@NgModule({
  imports: [
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatInputModule,
    WaterUsageHistoryRoutingModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState,
      SystemUtilityManagementState,
      UsageHistoryManagementState
    ]),
  ],
  declarations: [WaterComponent, WaterChargeComponent, WaterSmartMeterComponent],
  providers: [UsageHistoryService,UtilityService]
})
export class WaterUsageHistoryModule { }
