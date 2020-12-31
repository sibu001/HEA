import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemJobsRoutingModule } from './system-jobs-routing.module';
import { SystemJobsListComponent } from './system-jobs-list/system-jobs-list.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SystemThreadInfoComponent } from './system-thread-info/system-thread-info.component';
import { SystemMeasurementService } from 'src/app/store/system-measurement-management/service/system-measurement.service';
import { NgxsModule } from '@ngxs/store';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { SystemUtilityManagementState } from 'src/app/store/system-utility-state-management/state/system-utility.state';
import { SystemMeasurementManagementState } from 'src/app/store/system-measurement-management/state/system-measurement.state';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonHEAModule,
    SystemJobsRoutingModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState,
      SystemUtilityManagementState,
      SystemMeasurementManagementState
    ]),
  ],
  declarations: [SystemJobsListComponent, SystemThreadInfoComponent],
  entryComponents: [SystemThreadInfoComponent],
  providers: [SystemMeasurementService]
})
export class SystemJobsModule { }
