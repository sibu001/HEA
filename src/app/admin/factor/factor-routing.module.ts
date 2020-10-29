import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FactorEditComponent } from './factor-edit/factor-edit.component';
import { FactorListComponent } from './factor-list/factor-list.component';

const routes: Routes = [
  { path: 'factorList', component: FactorListComponent },
  { path: 'factorEdit', component: FactorEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactorRoutingModule { }
