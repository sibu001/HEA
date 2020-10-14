import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
const routes: Routes = [
  { path: '', component: CustomerListComponent },
  { path: 'customerList', component: CustomerListComponent },
  { path: 'customerEdit', component: CustomerViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
