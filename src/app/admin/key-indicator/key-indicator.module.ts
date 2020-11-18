import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeyIndicatorRoutingModule } from './key-indicator-routing.module';
import { KeyIndicatorListComponent } from './key-indicator-list/key-indicator-list.component';
import { KeyIndicatorEditComponent } from './key-indicator-edit/key-indicator-edit.component';
import { KeyIndicatorVariableComponent } from './key-indicator-variable/key-indicator-variable.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    FormsModule,
    KeyIndicatorRoutingModule
  ],
  declarations: [KeyIndicatorListComponent, KeyIndicatorEditComponent, KeyIndicatorVariableComponent]
})
export class KeyIndicatorModule { }
