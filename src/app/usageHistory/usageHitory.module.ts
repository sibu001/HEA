import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {ButtonModule, CalendarModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {PasswordModule} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import {SidebarModule} from 'primeng/primeng';
import {DataTableModule} from "angular-6-datatable";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { electricityUsageListComponent } from "src/app/usageHistory/electricityUsageList.component";
import { gasListComponent } from "src/app/usageHistory/gasList.component";
import { gasChargeListComponent } from "src/app/usageHistory/gasChargeList.component";
import { electricityChargeListComponent } from "src/app/usageHistory/electricityChargeList.component";
import { electricitySmartMeterComponent } from "src/app/usageHistory/electricitySmartMeter.component";
import { gasSmartMeterComponent } from "src/app/usageHistory/gasSmartMeter.component";
@NgModule({
    declarations: [
       electricityUsageListComponent,
       gasListComponent,
       gasChargeListComponent,
       electricityChargeListComponent,
       electricitySmartMeterComponent,
       gasSmartMeterComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        BrowserModule,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        PanelModule,
        ButtonModule,
        SidebarModule,
        CalendarModule,
        DataTableModule,
        BrowserAnimationsModule
    ],
    providers: [],
    exports: [

    ]

})
export class UsageHistoryModule {

}