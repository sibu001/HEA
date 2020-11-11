import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MailContentPartsComponent } from './mail-content-parts/mail-content-parts.component';
import { MailContextVariablesComponent } from './mail-context-variables/mail-context-variables.component';
import { MailDescriptionEditComponent } from './mail-description-edit/mail-description-edit.component';
import { MailDescriptionListComponent } from './mail-description-list/mail-description-list.component';
import { MailDescriptionPreviewComponent } from './mail-description-preview/mail-description-preview.component';

const routes: Routes = [
  { path: 'mailDescriptionList', component: MailDescriptionListComponent },
  { path: 'mailDescriptionEdit', component: MailDescriptionEditComponent },
  { path: 'mailContentParts', component: MailContentPartsComponent },
  { path: 'mailContextVariables', component: MailContextVariablesComponent },
  { path: 'mailDescriptionPreview', component: MailDescriptionPreviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MailDescriptionRoutingModule { }
