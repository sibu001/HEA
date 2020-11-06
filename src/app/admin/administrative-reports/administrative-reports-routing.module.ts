import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrativeReportsCallComponent } from './administrative-reports-call/administrative-reports-call.component';
import { AdministrativeReportsEditComponent } from './administrative-reports-edit/administrative-reports-edit.component';
import { AdministrativeReportsListComponent } from './administrative-reports-list/administrative-reports-list.component';

const routes: Routes = [
  { path: 'administrativeReportList', component: AdministrativeReportsListComponent },
  { path: 'administrativeReportEdit', component: AdministrativeReportsEditComponent },
  { path: 'administrativeReportCall', component: AdministrativeReportsCallComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrativeReportsRoutingModule { }
