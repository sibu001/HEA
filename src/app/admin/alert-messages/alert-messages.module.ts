import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertMessagesRoutingModule } from './alert-messages-routing.module';
import { AlertMessagesListComponent } from './alert-messages-list/alert-messages-list.component';
import { AlertMessagesEditComponent } from './alert-messages-edit/alert-messages-edit.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    FormsModule,
    AlertMessagesRoutingModule
  ],
  declarations: [AlertMessagesListComponent, AlertMessagesEditComponent],
  entryComponents: [AlertMessagesEditComponent]

})
export class AlertMessagesModule { }
