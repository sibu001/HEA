import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserReportDefinitionsComponent } from './user-report-definitions/user-report-definitions.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserReportDefinitionsEditComponent } from './user-report-definitions-edit/user-report-definitions-edit.component';
import { UserReportContentPartComponent } from './user-report-content-part/user-report-content-part.component';
import { UserReportContextVariableComponent } from './user-report-context-variable/user-report-context-variable.component';
import { UserReportPreviewComponent } from './user-report-preview/user-report-preview.component';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { UserReportDefinitionsRoutingModule } from './user-report-definitions-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    RichTextEditorModule,
    FormsModule,
    UserReportDefinitionsRoutingModule
  ],
  declarations: [
    UserReportDefinitionsComponent,
    UserReportDefinitionsEditComponent,
    UserReportContentPartComponent,
    UserReportContextVariableComponent,
    UserReportPreviewComponent]
})
export class UserReportDefinitionsModule { }
