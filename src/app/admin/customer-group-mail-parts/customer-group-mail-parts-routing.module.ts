import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerGroupMailPartsListComponent } from './customer-group-mail-parts-list/customer-group-mail-parts-list.component';
import { CustomerGroupMailPartsEditComponent } from './customer-group-mail-parts-edit/customer-group-mail-parts-edit.component';

const routes: Routes = [
  { path: 'customerGroupMailPartsList', component: CustomerGroupMailPartsListComponent },
  { path: 'customerGroupMailPartsEdit', component: CustomerGroupMailPartsEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerGroupMailPartsRoutingModule { }
