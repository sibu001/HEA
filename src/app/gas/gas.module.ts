import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GasRoutingModule } from './gas-routing.module';
import { GasListComponent } from './gas-list/gas-list.component';
import { GasChargeComponent } from './gas-charge/gas-charge.component';
import { GasSmartMeterComponent } from './gas-smart-meter/gas-smart-meter.component';
import { GasUsagePopupComponent } from './gas-usage-popup/gas-usage-popup.component';
import { SharedModule } from '../general/share.module';
import { CommonHEAModule } from '../common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { UsageHistoryManagementState } from '../store/usage-history-state-management/state/usage-history.state';
import { UsageHistoryService } from '../store/usage-history-state-management/service/usage-history.service';

@NgModule({
  imports: [
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    FormsModule,
    GasRoutingModule,
    SharedModule,
    NgxsModule.forRoot([
      UsageHistoryManagementState
    ]),
  ],
  declarations: [
    GasListComponent,
    GasChargeComponent,
    GasSmartMeterComponent,
    GasUsagePopupComponent
  ],
  providers: [UsageHistoryService]
})
export class GasModule { }
