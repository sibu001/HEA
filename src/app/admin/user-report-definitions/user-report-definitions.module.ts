import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserReportDefinitionsRoutingModule } from './user-report-definitions-routing.module';
import { UserReportDefinitionsComponent } from './user-report-definitions/user-report-definitions.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserReportDefinitionsEditComponent } from './user-report-definitions-edit/user-report-definitions-edit.component';
import { UserReportContentPartComponent } from './user-report-content-part/user-report-content-part.component';
import { UserReportContextVariableComponent } from './user-report-context-variable/user-report-context-variable.component';
import { UserReportPreviewComponent } from './user-report-preview/user-report-preview.component';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { NgxsModule } from '@ngxs/store';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { MailService } from 'src/app/store/mail-state-management/service/mail.service';
import { MailManagementState } from 'src/app/store/mail-state-management/state/mail.state';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { SystemUtilityManagementState } from 'src/app/store/system-utility-state-management/state/system-utility.state';
import { TopicManagementState } from 'src/app/store/topic-state-management/state/topic.state';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { MatAutocompleteModule, MatInputModule, MatOptionModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    RichTextEditorModule,
    FormsModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatInputModule,
    UserReportDefinitionsRoutingModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState,
      SystemUtilityManagementState,
      MailManagementState,
      TopicManagementState
    ]),
  ],
  declarations: [UserReportDefinitionsComponent, UserReportDefinitionsEditComponent, UserReportContentPartComponent, UserReportContextVariableComponent, UserReportPreviewComponent],
  providers: [SystemService, MailService, CustomerService, TopicService],
})
export class UserReportDefinitionsModule { }
