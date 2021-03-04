import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent} from 'src/app/dashboard/dashboard.component';
import {TrendingPartsViewComponent} from 'src/app/dashboard/trendingPartsView.component';
import {TrendingProfileViewComponent} from 'src/app/dashboard/trendingProfileView.component';
import {MailArchiveListComponent} from 'src/app/dashboard/mailArchiveList.component';
import {mailArchiveViewComponent} from 'src/app/dashboard/mailArchiveView.component';
import {customerEventListComponent} from 'src/app/dashboard/customerEventList.component';
import { AccountDetailComponent } from 'src/app/dashboard/accountDetail.component';
import { customerEventViewComponent } from 'src/app/dashboard/customerEventView.component';
import { NgModule } from '@angular/core';

export const DashboardRoutes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'trendingPartsView', component: TrendingPartsViewComponent },
    { path: 'trendingProfileView', component: TrendingProfileViewComponent },
    { path: 'MailArchiveList', component: MailArchiveListComponent },
    { path: 'MailArchiveView', component: mailArchiveViewComponent },
    { path: 'customerEventList', component: customerEventListComponent },
    { path: 'accountDetail', component: AccountDetailComponent },
    { path: 'customerEventView', component: customerEventViewComponent },
];

@NgModule({
    imports: [RouterModule.forChild(DashboardRoutes)],
    exports: [RouterModule]
  })
  export class DashboardRoutingModule { }
