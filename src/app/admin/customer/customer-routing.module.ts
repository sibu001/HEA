import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerGroupListComponent } from './customer-group-list/customer-group-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { ProgramGroupListComponent } from './program-group-list/program-group-list.component';
const routes: Routes = [
  { path: '', component: CustomerListComponent },
  { path: 'customerList', component: CustomerListComponent },
  { path: 'customerEdit', component: CustomerViewComponent },
  { path: 'customerGroupList', component: CustomerGroupListComponent },
  { path: 'programGroupList', component: ProgramGroupListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
