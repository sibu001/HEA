import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrativeReportsRoutingModule } from './administrative-reports-routing.module';
import { AdministrativeReportsListComponent } from './administrative-reports-list/administrative-reports-list.component';
import { AdministrativeReportsEditComponent } from './administrative-reports-edit/administrative-reports-edit.component';
import { AdministrativeReportsCallComponent } from './administrative-reports-call/administrative-reports-call.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonHEAModule } from 'src/app/common/common.module';

@NgModule({
  imports: [
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    FormsModule,
    AdministrativeReportsRoutingModule
  ],
  declarations: [AdministrativeReportsListComponent, AdministrativeReportsEditComponent, AdministrativeReportsCallComponent]
})
export class AdministrativeReportsModule { }
