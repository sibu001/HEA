import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicListRoutingModule } from './topic-list-routing.module';
import { TopicListComponent } from './topic-list/topic-list.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministrativeService } from 'src/app/store/administrative-state-management/service/administrative.service';
import { AdministrativeManagementState } from 'src/app/store/administrative-state-management/state/administrative.state';
import { NgxsModule } from '@ngxs/store';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { SystemUtilityManagementState } from 'src/app/store/system-utility-state-management/state/system-utility.state';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { UtilityService } from 'src/app/services/utility.service';

@NgModule({
  imports: [
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    FormsModule,
    TopicListRoutingModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState,
      SystemUtilityManagementState,
      AdministrativeManagementState
    ]),
  ],
  declarations: [TopicListComponent],
  providers: [AdministrativeService, SystemService , SystemUtilityService, UtilityService]
})
export class TopicListModule { }
