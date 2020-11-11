import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProspectsListComponent } from './prospects-list/prospects-list.component';

const routes: Routes = [
  { path: 'prospectsList', component: ProspectsListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProspectsRoutingModule { }
