import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffEditComponent } from './staff-edit/staff-edit.component';
import { StaffListComponent } from './staff-list/staff-list.component';

const routes: Routes = [
  { path: 'staffList', component: StaffListComponent },
  { path: 'staffEdit', component: StaffEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
