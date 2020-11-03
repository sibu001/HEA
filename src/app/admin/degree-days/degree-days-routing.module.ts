import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DegreeDaysListComponent } from './degree-days-list/degree-days-list.component';

const routes: Routes = [
  { path: 'degreeDayList', component: DegreeDaysListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerGroupRoutingModule { }
