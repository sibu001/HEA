import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertMessagesListComponent } from './alert-messages-list/alert-messages-list.component';

const routes: Routes = [{ path: 'alertMessagesList', component: AlertMessagesListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertMessagesRoutingModule { }
