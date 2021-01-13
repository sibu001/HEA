import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScriptDebugConsoleComponent } from './script-debug-console/script-debug-console.component';
import { DebugRoutingModule } from './debug-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonHEAModule } from 'src/app/common/common.module';
import { NgxsModule } from '@ngxs/store';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { SystemMeasurementService } from 'src/app/store/system-measurement-management/service/system-measurement.service';
import { TopicManagementState } from 'src/app/store/topic-state-management/state/topic.state';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { SystemMeasurementManagementState } from 'src/app/store/system-measurement-management/state/system-measurement.state';
import { AutoCompleteModule } from 'primeng/primeng';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { AdministrativeService } from 'src/app/store/administrative-state-management/service/administrative.service';
import { AdministrativeManagementState } from 'src/app/store/administrative-state-management/state/administrative.state';
import { LoginService } from 'src/app/services/login.service';

@NgModule({
  imports: [
    CommonModule,
    DebugRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonHEAModule,
    MatAutocompleteModule,
    AutoCompleteModule,
    MatInputModule,
    CodemirrorModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState,
      TopicManagementState,
      SystemMeasurementManagementState,
      AdministrativeManagementState
    ]),
  ],
  declarations: [ScriptDebugConsoleComponent],
  providers: [SystemService, SystemMeasurementService, TopicService, AdministrativeService, LoginService]
})
export class DebugModule { }
