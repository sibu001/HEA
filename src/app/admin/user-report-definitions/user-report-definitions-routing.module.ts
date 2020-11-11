import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserReportContentPartComponent } from './user-report-content-part/user-report-content-part.component';
import { UserReportContextVariableComponent } from './user-report-context-variable/user-report-context-variable.component';
import { UserReportDefinitionsEditComponent } from './user-report-definitions-edit/user-report-definitions-edit.component';
import { UserReportDefinitionsComponent } from './user-report-definitions/user-report-definitions.component';
import { UserReportPreviewComponent } from './user-report-preview/user-report-preview.component';

const routes: Routes = [
  { path: 'userReportDefinitionsList', component: UserReportDefinitionsComponent },
  { path: 'userReportDefinitionsEdit', component: UserReportDefinitionsEditComponent },
  { path: 'userReportContentParts', component: UserReportContentPartComponent },
  { path: 'userReportContextVariable', component: UserReportContextVariableComponent },
  { path: 'userReportPreview', component: UserReportPreviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserReportDefinitionsRoutingModule { }
