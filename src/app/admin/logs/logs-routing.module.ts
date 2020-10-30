import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogsListComponent } from './logs-list/logs-list.component';

const routes: Routes = [
  { path: 'logsList', component: LogsListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule { }
