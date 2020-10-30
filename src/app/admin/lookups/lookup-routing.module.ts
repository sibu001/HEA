import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LookupEditComponent } from './lookup-edit/lookup-edit.component';
import { LookupListComponent } from './lookup-list/lookup-list.component';

const routes: Routes = [
  { path: 'lookupList', component: LookupListComponent },
  { path: 'lookupEdit', component: LookupEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LookupRoutingModule { }
