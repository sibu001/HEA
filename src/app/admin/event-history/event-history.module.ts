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
import { SystemService } from 'src/app/store/system-state-management/service/system.service';

@NgModule({
  imports: [
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    CalendarModule,
    FormsModule,
    EventHistoryRoutingModule,
  ],
  declarations: [EventHistoryListComponent, EventHistoryEditComponent],
})
export class EventHistoryModule { }
