import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonHEAModule } from 'src/app/common/common.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { NgxsModule } from '@ngxs/store';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';
import { environment } from 'src/environments/environment';
import { UtilityCredentialsComponent } from './utility-credentials/utility-credentials.component';
import { CustomerAlertComponent } from './customer-alert/customer-alert.component';
import { CustomerEventTypeComponent } from './customer-event-type/customer-event-type.component';
import { StaffNoteComponent } from './staff-note/staff-note.component';
import { LoginService } from 'src/app/services/login.service';
import { CalendarModule } from 'primeng/primeng';
import { AddFileComponent } from './add-file/add-file.component';
import { SystemUtilityManagementState } from 'src/app/store/system-utility-state-management/state/system-utility.state';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { PipeModule } from 'src/app/pipes/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    CommonHEAModule,
    MatDialogModule,
    DragDropModule,
    CalendarModule,
    PipeModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapAPIKey,
      libraries: ['places']
    }),
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState,
      SystemUtilityManagementState
    ]),
  ],
  declarations: [
    CustomerListComponent,
    CustomerViewComponent,
    UtilityCredentialsComponent,
    CustomerAlertComponent,
    CustomerEventTypeComponent,
    StaffNoteComponent,
    AddFileComponent
  ],
  providers: [SystemService, DatePipe, LoginService, SystemUtilityService,
    CustomerService,
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ],
  entryComponents: [
    UtilityCredentialsComponent,
    CustomerAlertComponent,
    CustomerEventTypeComponent,
    StaffNoteComponent,
    AddFileComponent
  ]
})
export class CustomerModule { }
