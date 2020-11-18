import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WaterChargeComponent } from './water-charge/water-charge.component';
import { WaterSmartMeterComponent } from './water-smart-meter/water-smart-meter.component';
import { WaterComponent } from './water/water.component';

const routes: Routes = [
  { path: 'waterList', component: WaterComponent },
  { path: 'waterChargeList', component: WaterChargeComponent },
  { path: 'waterSmartMeterList', component: WaterSmartMeterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaterUsageHistoryRoutingModule { }
