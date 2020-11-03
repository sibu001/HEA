import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProspectsRoutingModule } from './prospects-routing.module';
import { ProspectsListComponent } from './prospects-list/prospects-list.component';
import { ProspectseditComponent } from './prospectsedit/prospectsedit.component';

@NgModule({
  imports: [
    CommonModule,
    ProspectsRoutingModule
  ],
  declarations: [ProspectsListComponent, ProspectseditComponent]
})
export class ProspectsModule { }
