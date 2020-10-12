import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CustomerComponent } from './customer/customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular-6-datatable';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonHEAModule } from '../common/common.module';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    DataTableModule,
    CommonHEAModule
  ],
  declarations: [CustomerComponent, SidebarComponent]
})
export class AdminModule { }
