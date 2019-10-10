import { Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component'
import { TrendingPartsViewComponent } from 'src/app/dashboard/trendingPartsView.component';
import { TrendingProfileViewComponent } from 'src/app/dashboard/trendingProfileView.component';
import { MailArchiveListComponent } from 'src/app/dashboard/mailArchiveList.component';
import { mailArchiveViewComponent } from 'src/app/dashboard/mailArchiveView.component';
import { customerEventListComponent } from 'src/app/dashboard/customerEventList.component';
import { gasListComponent } from "src/app/usageHistory/gasList.component";
import { electricityUsageListComponent } from "src/app/usageHistory/electricityUsageList.component";
import { electricityChargeListComponent } from "src/app/usageHistory/electricityChargeList.component";
import { gasChargeListComponent } from "src/app/usageHistory/gasChargeList.component";
import { gasSmartMeterComponent } from "src/app/usageHistory/gasSmartMeter.component";
import { electricitySmartMeterComponent } from "src/app/usageHistory/electricitySmartMeter.component";
import { electricDailySmartMeterListComponent } from './electricDailySmartMeterList.component';

export const UsageHistoryRoutes: Routes = [
    { path: 'gasList', component: gasListComponent },
    { path: 'electricityList', component: electricityUsageListComponent },
    { path: 'electricityChargeList', component: electricityChargeListComponent },
    { path: 'electricitySmartMeterList', component: electricitySmartMeterComponent },
    { path: 'gasChargeList', component: gasChargeListComponent },
    { path: 'gasSmartMeter', component: gasSmartMeterComponent },
    { path: 'electricDailySmartMeterList', component: electricDailySmartMeterListComponent }
];