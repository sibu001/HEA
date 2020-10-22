import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramGroupEditComponent } from './program-group-edit/program-group-edit.component';
import { ProgramGroupListComponent } from './program-group-list/program-group-list.component';

const routes: Routes = [
  { path: 'programGroupList', component: ProgramGroupListComponent },
  { path: 'programGroupEdit', component: ProgramGroupEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramGroupRoutingModule { }
