import { Routes, RouterModule } from '@angular/router';
import { gasListComponent } from 'src/app/usageHistory/gasList.component';
import { electricityUsageListComponent } from 'src/app/usageHistory/electricityUsageList.component';
import { electricityChargeListComponent } from 'src/app/usageHistory/electricityChargeList.component';
import { gasChargeListComponent } from 'src/app/usageHistory/gasChargeList.component';
import { gasSmartMeterComponent } from 'src/app/usageHistory/gasSmartMeter.component';
import { electricitySmartMeterComponent } from 'src/app/usageHistory/electricitySmartMeter.component';
import { electricDailySmartMeterListComponent } from './electricDailySmartMeterList.component';
import { NgModule } from '@angular/core';

export const UsageHistoryRoutes: Routes = [
    { path: 'gasList', component: gasListComponent },
    { path: 'electricityList', component: electricityUsageListComponent },
    { path: 'electricityChargeList', component: electricityChargeListComponent },
    { path: 'electricitySmartMeterList', component: electricitySmartMeterComponent },
    { path: 'gasChargeList', component: gasChargeListComponent },
    { path: 'gasSmartMeter', component: gasSmartMeterComponent },
    { path: 'electricDailySmartMeterList', component: electricDailySmartMeterListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(UsageHistoryRoutes)],
    exports: [RouterModule]
  })
  export class UsageHistoryRoutingModule { }
