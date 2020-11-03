import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CimisMeasurementsListComponent } from './cimis-measurements-list/cimis-measurements-list.component';

const routes: Routes = [{ path: 'cimisMeasurementsList', component: CimisMeasurementsListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CimisMeasurementsRoutingModule { }
