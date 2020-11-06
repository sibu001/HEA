import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerGroupRoutingModule } from './degree-days-routing.module';
import { DegreeDaysListComponent } from './degree-days-list/degree-days-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonHEAModule } from 'src/app/common/common.module';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { NgxsModule } from '@ngxs/store';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { CalendarModule } from 'primeng/primeng';
import { SystemMeasurementManagementState } from 'src/app/store/system-measurement-management/state/system-measurement.state';
import { SystemUtilityManagementState } from 'src/app/store/system-utility-state-management/state/system-utility.state';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonHEAModule,
    CustomerGroupRoutingModule,
    CalendarModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState,
      SystemUtilityManagementState,
      SystemMeasurementManagementState
    ]),
  ],
  declarations: [DegreeDaysListComponent],
  providers: [SystemService, SystemUtilityService]
})
export class DegreeDaysModule { }
