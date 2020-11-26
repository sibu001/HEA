import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElectricityChargeListComponent } from './electricity-charge-list/electricity-charge-list.component';
import { ElectricityDailySmartMeterListComponent } from './electricity-daily-smart-meter-list/electricity-daily-smart-meter-list.component';
import { ElectricitySmartMeterListComponent } from './electricity-smart-meter-list/electricity-smart-meter-list.component';
import { ElectricityUsageListComponent } from './electricity-usage-list/electricity-usage-list.component';

const routes: Routes = [
  { path: 'electricityUsageList', component: ElectricityUsageListComponent },
  { path: 'electricitySmartMeterList', component: ElectricitySmartMeterListComponent },
  { path: 'electricityDailySmartMeterList', component: ElectricityDailySmartMeterListComponent },
  { path: 'electricityChargeList', component: ElectricityChargeListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElectricityRoutingModule { }
