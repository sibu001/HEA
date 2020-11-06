import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemJobsListComponent } from './system-jobs-list/system-jobs-list.component';

const routes: Routes = [{ path: 'systemJobsList', component: SystemJobsListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemJobsRoutingModule { }
