import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewConfigurationRoutingModule } from './view-configuration-routing.module';
import { ViewConfigurationListComponent } from './view-configuration-list/view-configuration-list.component';
import { ViewConfigurationEditComponent } from './view-configuration-edit/view-configuration-edit.component';
import { ViewConfigurationAttributesComponent } from './view-configuration-attributes/view-configuration-attributes.component';
import { ViewConfigurationAttributesEditComponent } from './view-configuration-attributes-edit/view-configuration-attributes-edit.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    ViewConfigurationRoutingModule
  ],
  declarations: [ViewConfigurationListComponent, ViewConfigurationEditComponent, ViewConfigurationAttributesComponent, ViewConfigurationAttributesEditComponent]
})
export class ViewConfigurationModule { }
