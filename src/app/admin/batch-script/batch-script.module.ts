import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchScriptRoutingModule } from './batch-script-routing.module';
import { BatchScriptListComponent } from './batch-script-list/batch-script-list.component';
import { BatchScriptEditComponent } from './batch-script-edit/batch-script-edit.component';
import { NgxsModule } from '@ngxs/store';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { CommonHEAModule } from 'src/app/common/common.module';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/primeng';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { SystemUtilityManagementState } from 'src/app/store/system-utility-state-management/state/system-utility.state';
import { SystemMeasurementService } from 'src/app/store/system-measurement-management/service/system-measurement.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    CodemirrorModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState,
      SystemUtilityManagementState
    ]),
    CommonHEAModule,
    BatchScriptRoutingModule
  ],
  declarations: [BatchScriptListComponent, BatchScriptEditComponent],
  providers: [SystemService, SystemMeasurementService]
})
export class BatchScriptModule { }
