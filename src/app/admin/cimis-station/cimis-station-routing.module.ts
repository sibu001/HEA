import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CimisStationEditComponent } from './cimis-station-edit/cimis-station-edit.component';
import { CimisStationListComponent } from './cimis-station-list/cimis-station-list.component';

const routes: Routes = [
  { path: 'cimisStationList', component: CimisStationListComponent },
  { path: 'cimisStationEdit', component: CimisStationEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CimisStationRoutingModule { }
