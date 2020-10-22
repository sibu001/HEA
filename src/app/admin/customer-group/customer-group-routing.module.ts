import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerGroupEditComponent } from './customer-group-edit/customer-group-edit.component';
import { CustomerGroupListComponent } from './customer-group-list/customer-group-list.component';

const routes: Routes = [
  { path: 'customerGroupList', component: CustomerGroupListComponent },
  { path: 'customerGroupEdit', component: CustomerGroupEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerGroupRoutingModule { }
