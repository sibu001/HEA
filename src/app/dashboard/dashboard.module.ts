import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {ButtonModule, CalendarModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {PasswordModule} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import {SidebarModule} from 'primeng/primeng';
import { DashboardComponent} from 'src/app/dashboard/dashboard.component';
import {TrendingPartsViewComponent} from 'src/app/dashboard/trendingPartsView.component';
import {TrendingProfileViewComponent} from 'src/app/dashboard/trendingProfileView.component';
import {MailArchiveListComponent} from 'src/app/dashboard/mailArchiveList.component';
import {mailArchiveViewComponent} from 'src/app/dashboard/mailArchiveView.component';
import {DataTableModule} from "angular-6-datatable";
import { SurveyModule } from '../survey/survey.module';
import {customerEventListComponent} from 'src/app/dashboard/customerEventList.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { customerEventViewComponent } from "src/app/dashboard/customerEventView.component";
import { AccountDetailComponent } from "src/app/dashboard/accountDetail.component";
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
        SurveyModule,
        BrowserAnimationsModule
    ],
    providers: [],
    exports: [

    ]

})
export class DashboardModule {

}