import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ec2InstancesRoutingModule } from './ec2-instances-routing.module';
import { Ec2InstancesListComponent } from './ec2-instances-list/ec2-instances-list.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    Ec2InstancesRoutingModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState,
      SystemUtilityManagementState,
      SystemMeasurementManagementState
    ]),
  ],
  declarations: [Ec2InstancesListComponent],
  providers: [SystemMeasurementService]
})
export class Ec2InstancesModule { }
