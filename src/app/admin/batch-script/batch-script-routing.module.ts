import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatchScriptEditComponent } from './batch-script-edit/batch-script-edit.component';
import { BatchScriptListComponent } from './batch-script-list/batch-script-list.component';

const routes: Routes = [
  { path: 'batchScriptList', component: BatchScriptListComponent },
  { path: 'batchScriptEdit', component: BatchScriptEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchScriptRoutingModule { }
