import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsRoutingModule } from './logs-routing.module';
import { LogsListComponent } from './logs-list/logs-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonHEAModule } from 'src/app/common/common.module';
import { NgxsModule } from '@ngxs/store';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';

@NgModule({
  imports: [
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState
    ]),
    LogsRoutingModule
  ],
  declarations: [LogsListComponent]
  , providers: [SystemService]
})
export class LogsModule { }
