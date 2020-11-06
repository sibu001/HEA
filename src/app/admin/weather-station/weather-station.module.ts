import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherStationRoutingModule } from './weather-station-routing.module';
import { WeatherStationListComponent } from './weather-station-list/weather-station-list.component';
import { WeatherStationEditComponent } from './weather-station-edit/weather-station-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonHEAModule } from 'src/app/common/common.module';
import { NgxsModule, Store } from '@ngxs/store';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SystemUtilityManagementState } from 'src/app/store/system-utility-state-management/state/system-utility.state';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';

@NgModule({
  imports: [
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState,
      SystemUtilityManagementState
    ]),
    WeatherStationRoutingModule
  ],
  declarations: [WeatherStationListComponent, WeatherStationEditComponent]
  , providers: [SystemService, SystemUtilityService]
})
export class WeatherStationModule { }
