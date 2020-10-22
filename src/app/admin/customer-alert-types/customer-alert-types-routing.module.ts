import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerAlertTypeEditComponent } from './customer-alert-type-edit/customer-alert-type-edit.component';
import { CustomerAlertTypeListComponent } from './customer-alert-type-list/customer-alert-type-list.component';

const routes: Routes = [
  { path: 'customerAlertTypeList', component: CustomerAlertTypeListComponent },
  { path: 'customerAlertTypeEdit', component: CustomerAlertTypeEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerAlertTypesRoutingModule { }
