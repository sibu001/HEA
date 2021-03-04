import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, InputTextModule, PasswordModule, PanelModule, SidebarModule, CalendarModule } from 'primeng/primeng';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { DataTableModule } from 'angular-6-datatable';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    PanelModule,
    ButtonModule,
    SidebarModule,
    HttpModule,
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DataTableModule,
    CalendarModule,
    PasswordModule,
    PanelModule,
    ButtonModule,
    SidebarModule,
    HttpModule,
  ],
  providers: [

  ]
})
export class SharedModule { }
