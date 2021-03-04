import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MailDescriptionRoutingModule } from './mail-description-routing.module';
import { CommonHEAModule } from 'src/app/common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MailDescriptionListComponent } from './mail-description-list/mail-description-list.component';
import { MailDescriptionEditComponent } from './mail-description-edit/mail-description-edit.component';
import { MailContentPartsComponent } from './mail-content-parts/mail-content-parts.component';
import { MailContextVariablesComponent } from './mail-context-variables/mail-context-variables.component';
import { MailDescriptionPreviewComponent } from './mail-description-preview/mail-description-preview.component';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { NgxsModule } from '@ngxs/store';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { SystemUtilityManagementState } from 'src/app/store/system-utility-state-management/state/system-utility.state';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { StackTraceComponent } from './stack-trace/stack-trace.component';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { MailManagementState } from 'src/app/store/mail-state-management/state/mail.state';
import { MailService } from 'src/app/store/mail-state-management/service/mail.service';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { TopicManagementState } from 'src/app/store/topic-state-management/state/topic.state';
import { AutoCompleteModule } from 'primeng/primeng';
import { MatAutocompleteModule } from '@angular/material';
import { AdministrativeService } from 'src/app/store/administrative-state-management/service/administrative.service';
import { AdministrativeManagementState } from 'src/app/store/administrative-state-management/state/administrative.state';

@NgModule({
  imports: [
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    AutoCompleteModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState,
      SystemUtilityManagementState,
      MailManagementState,
      TopicManagementState,
      AdministrativeManagementState
    ]),
    MailDescriptionRoutingModule,
    RichTextEditorModule,
  ],
  declarations: [
    MailDescriptionListComponent,
    MailDescriptionEditComponent,
    MailContentPartsComponent,
    MailContextVariablesComponent,
    MailDescriptionPreviewComponent,
    StackTraceComponent
  ],
  providers: [SystemService, MailService, CustomerService, TopicService, AdministrativeService],
  entryComponents: [StackTraceComponent]
})
export class MailDescriptionModule { }
