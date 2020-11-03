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

@NgModule({
  imports: [
    CommonModule,
    DebugRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonHEAModule,
    CodemirrorModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState
    ]),
  ],
  declarations: [ScriptDebugConsoleComponent],
  providers: [SystemService]
})
export class DebugModule { }
