import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaterUsageHistoryRoutingModule } from './water-usage-history-routing.module';
import { WaterComponent } from './water/water.component';
import { WaterChargeComponent } from './water-charge/water-charge.component';
import { WaterSmartMeterComponent } from './water-smart-meter/water-smart-meter.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    FormsModule,
    WaterUsageHistoryRoutingModule
  ],
  declarations: [WaterComponent, WaterChargeComponent, WaterSmartMeterComponent]
})
export class WaterUsageHistoryModule { }
