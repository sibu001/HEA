import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemParameterEditComponent } from './system-parameter-edit/system-parameter-edit.component';
import { SystemParameterListComponent } from './system-parameter-list/system-parameter-list.component';

const routes: Routes = [
  { path: 'systemParameterList', component: SystemParameterListComponent },
  { path: 'systemParameterEdit', component: SystemParameterEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemParameterRoutingModule { }
