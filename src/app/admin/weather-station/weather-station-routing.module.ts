import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherStationEditComponent } from './weather-station-edit/weather-station-edit.component';
import { WeatherStationListComponent } from './weather-station-list/weather-station-list.component';

const routes: Routes = [
  { path: 'weatherStationList', component: WeatherStationListComponent },
  { path: 'weatherStationEdit', component: WeatherStationEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherStationRoutingModule { }
