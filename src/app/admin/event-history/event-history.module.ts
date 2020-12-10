import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventHistoryRoutingModule } from './event-history-routing.module';
import { EventHistoryListComponent } from './event-history-list/event-history-list.component';
import { EventHistoryEditComponent } from './event-history-edit/event-history-edit.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/primeng';
import { NgxsModule } from '@ngxs/store';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { SystemUtilityManagementState } from 'src/app/store/system-utility-state-management/state/system-utility.state';
import { AdministrativeService } from 'src/app/store/administrative-state-management/service/administrative.service';
import { AdministrativeManagementState } from 'src/app/store/administrative-state-management/state/administrative.state';

@NgModule({
  imports: [
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    CalendarModule,
    FormsModule,
    EventHistoryRoutingModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState,
      SystemUtilityManagementState,
      AdministrativeManagementState
    ]),
  ],
  declarations: [EventHistoryListComponent, EventHistoryEditComponent],
  providers: [CustomerService, SystemUtilityService, AdministrativeService]
})
export class EventHistoryModule { }
