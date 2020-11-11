import { NgModule } from '@angular/core';

import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { TrendingPartsViewComponent } from 'src/app/dashboard/trendingPartsView.component';
import { TrendingProfileViewComponent } from 'src/app/dashboard/trendingProfileView.component';
import { MailArchiveListComponent } from 'src/app/dashboard/mailArchiveList.component';
import { mailArchiveViewComponent } from 'src/app/dashboard/mailArchiveView.component';

import { customerEventListComponent } from 'src/app/dashboard/customerEventList.component';

import { customerEventViewComponent } from 'src/app/dashboard/customerEventView.component';
import { AccountDetailComponent } from 'src/app/dashboard/accountDetail.component';
import { SharedModule } from '../general/share.module';
import { DashboardRoutingModule } from './dashboard.routes';
import { SurveyModule } from '../survey/survey.module';
import { CommonHEAModule } from '../common/common.module';
@NgModule({
    declarations: [
        DashboardComponent,
        TrendingPartsViewComponent,
        TrendingProfileViewComponent,
        MailArchiveListComponent,
        mailArchiveViewComponent,
        customerEventListComponent,
        customerEventViewComponent,
        AccountDetailComponent
    ],
    imports: [
        SharedModule,
        DashboardRoutingModule,
        SurveyModule,
        CommonHEAModule
    ],
    providers: [],
    exports: [

    ]

})
export class DashboardModule {
}
