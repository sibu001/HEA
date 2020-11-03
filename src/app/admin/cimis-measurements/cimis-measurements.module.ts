import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CimisMeasurementsRoutingModule } from './cimis-measurements-routing.module';
import { CimisMeasurementsListComponent } from './cimis-measurements-list/cimis-measurements-list.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { CalendarModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState
    ]),
    CommonHEAModule,
    CimisMeasurementsRoutingModule
  ],
  declarations: [CimisMeasurementsListComponent],
  providers: [SystemService]
})
export class CimisMeasurementsModule { }
