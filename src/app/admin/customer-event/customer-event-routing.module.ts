import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerEventEditComponent } from './customer-event-edit/customer-event-edit.component';
import { CustomerEventListComponent } from './customer-event-list/customer-event-list.component';

const routes: Routes = [
  { path: 'customerEventTypeList', component: CustomerEventListComponent },
  { path: 'customerEventTypeEdit', component: CustomerEventEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerEventRoutingModule { }
