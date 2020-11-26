import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GasListComponent } from './gas-list/gas-list.component';
import { GasSmartMeterComponent } from './gas-smart-meter/gas-smart-meter.component';
import { GasChargeComponent } from './gas-charge/gas-charge.component';
const routes: Routes = [
  { path: 'gasList', component: GasListComponent },
  { path: 'gasSmartMeterList', component: GasSmartMeterComponent },
  { path: 'gasChargeList', component: GasChargeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GasRoutingModule { }
