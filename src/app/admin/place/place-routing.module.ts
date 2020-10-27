import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaceEditComponent } from './place-edit/place-edit.component';
import { PlaceListComponent } from './place-list/place-list.component';

const routes: Routes = [
  { path: 'placeList', component: PlaceListComponent },
  { path: 'placeEdit', component: PlaceEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaceRoutingModule { }
