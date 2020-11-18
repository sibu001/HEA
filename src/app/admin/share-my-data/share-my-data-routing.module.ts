import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShareMyDataListComponent } from './share-my-data-list/share-my-data-list.component';

const routes: Routes = [
  { path: '', component: ShareMyDataListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShareMyDataRoutingModule { }
