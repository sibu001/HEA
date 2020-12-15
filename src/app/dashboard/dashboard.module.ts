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
import { PipeModule } from '../pipes/pipe/pipe.module';
import { SystemService } from '../store/system-state-management/service/system.service';
import { NgxsModule } from '@ngxs/store';
import { SystemManagementState } from '../store/system-state-management/state/system.state';
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
        CommonHEAModule,
        PipeModule,
        NgxsModule.forRoot([
            SystemManagementState,
          ]),
    ],
    providers: [SystemService],
    exports: [

    ]

})
export class DashboardModule {
}
