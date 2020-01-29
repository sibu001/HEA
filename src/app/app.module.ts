import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthGuard } from "src/app/auth.guard";
import { LoginService } from "src/app/services/login.service";
import { InputSwitchModule } from "primeng/primeng";
import { BreadcrumbModule } from 'primeng/primeng'
import { DropdownModule } from 'primeng/primeng';
import { HeaderModule } from "src/app/headers/header.module";
import {DataTableModule} from "angular-6-datatable";
import { CalendarModule } from 'primeng/calendar';
import {  ReactiveFormsModule } from '@angular/forms';
import { AuthorizationInterceptor } from "src/app/services/HttpInterceptor";
import { SafePipeModule } from 'safe-pipe';
import { AppRoutingModule } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeadersComponent } from './headers/headers.component';
@NgModule({
  declarations: [
    AppComponent,
    HeadersComponent
  ],
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    BreadcrumbModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    InputSwitchModule,
    DataTableModule,
    CalendarModule,
    SafePipeModule,
    AppRoutingModule
  ],
  exports: [HeaderModule],
  providers: [LoginService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

// ReactiveFormsModule,
//     RegistrationModule,
//     DropdownModule,
//     BreadcrumbModule,
//     BrowserModule,
//     BrowserAnimationsModule,
//     HttpClientModule,
//     HeaderModule,
//     InputSwitchModule,
//     DashboardModule,
//     SurveyModule,
//     leakListViewModule,
//     DataTableModule,
//     CalendarModule,
//     UsageHistoryModule,
//     SafePipeModule,
//     AppRoutingModule