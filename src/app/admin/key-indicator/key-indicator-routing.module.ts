import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KeyIndicatorEditComponent } from './key-indicator-edit/key-indicator-edit.component';
import { KeyIndicatorListComponent } from './key-indicator-list/key-indicator-list.component';
import { KeyIndicatorVariableComponent } from './key-indicator-variable/key-indicator-variable.component';

const routes: Routes = [
  { path: 'keyIndicatorList', component: KeyIndicatorListComponent },
  { path: 'keyIndicatorEdit', component: KeyIndicatorEditComponent },
  { path: 'keyIndicatorVariable', component: KeyIndicatorVariableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KeyIndicatorRoutingModule { }
