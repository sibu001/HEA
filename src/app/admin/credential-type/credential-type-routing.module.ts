import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CredentialTypeEditComponent } from './credential-type-edit/credential-type-edit.component';
import { CredentialTypeListComponent } from './credential-type-list/credential-type-list.component';

const routes: Routes = [
  { path: 'credentialTypeList', component: CredentialTypeListComponent },
  { path: 'credentialTypeEdit', component: CredentialTypeEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CredentialTypeRoutingModule { }
