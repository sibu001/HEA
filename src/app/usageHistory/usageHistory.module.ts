import { NgModule } from '@angular/core';
import { electricityUsageListComponent } from "src/app/usageHistory/electricityUsageList.component";
import { gasListComponent } from "src/app/usageHistory/gasList.component";
import { gasChargeListComponent } from "src/app/usageHistory/gasChargeList.component";
import { electricityChargeListComponent } from "src/app/usageHistory/electricityChargeList.component";
import { electricitySmartMeterComponent } from "src/app/usageHistory/electricitySmartMeter.component";
import { gasSmartMeterComponent } from "src/app/usageHistory/gasSmartMeter.component";
import { UsageHistoryDetailComponent } from './usage-history-detail/usage-history-detail.component';
import { electricDailySmartMeterListComponent } from './electricDailySmartMeterList.component';
import { SharedModule } from '../general/share.module';
import { UsageHistoryRoutingModule } from './usageHistory.routes';
import { CommonHEAModule } from '../common/common.module';
@NgModule({
    declarations: [
        electricityUsageListComponent,
        gasListComponent,
        gasChargeListComponent,
        electricityChargeListComponent,
        electricitySmartMeterComponent,
        gasSmartMeterComponent,
        UsageHistoryDetailComponent,
        electricDailySmartMeterListComponent
    ],
    imports: [
        SharedModule,
        CommonHEAModule,
        UsageHistoryRoutingModule,
    ],
    providers: [],
    exports: [
        UsageHistoryDetailComponent
    ]

})
export class UsageHistoryModule {

}