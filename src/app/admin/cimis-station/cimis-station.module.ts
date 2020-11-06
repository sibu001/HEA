import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CimisStationRoutingModule } from './cimis-station-routing.module';
import { CimisStationListComponent } from './cimis-station-list/cimis-station-list.component';
import { CimisStationEditComponent } from './cimis-station-edit/cimis-station-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonHEAModule } from 'src/app/common/common.module';
import { NgxsModule } from '@ngxs/store';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SystemMeasurementManagementState } from 'src/app/store/system-measurement-management/state/system-measurement.state';
import { SystemUtilityManagementState } from 'src/app/store/system-utility-state-management/state/system-utility.state';
import { SystemMeasurementService } from 'src/app/store/system-measurement-management/service/system-measurement.service';

@NgModule({
  imports: [
    CommonModule,
    CimisStationRoutingModule,
    ReactiveFormsModule,
    CommonHEAModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState,
      SystemUtilityManagementState,
      SystemMeasurementManagementState
    ]),
  ],
  declarations: [CimisStationListComponent, CimisStationEditComponent],
  providers: [SystemService, SystemMeasurementService]
})
export class CimisStationModule { }
