import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginModule } from "src/app/login/login.module";
import { RouterModule } from "@angular/router";
import { ROUTES } from "src/app/app.routes";
import { PreloadAllModules } from "@angular/router";
import { AuthGuard } from "src/app/auth.guard";
import { LoginService } from "src/app/services/login.service";
import { HeadersComponent } from './headers/headers.component';
import { InputSwitchModule } from "primeng/primeng";


import { BreadcrumbModule, MenuItem } from 'primeng/primeng'
import { DropdownModule } from 'primeng/primeng';
import { HeaderModule } from "src/app/headers/header.module";
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationModule } from "src/app/registration/registration.module";
import { SurveyComponent } from './survey/survey.component';
import {DataTableModule} from "angular-6-datatable";
import { DashboardModule } from "src/app/dashboard/dashboard.module";
import { SurveyModule } from "src/app/survey/survey.module";
import { leakListViewModule } from "src/app/leakListview/leakListview.module";
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { AuthorizationInterceptor } from "src/app/services/HttpInterceptor";
import { UsageHistoryModule } from "src/app/usageHistory/usageHitory.module";
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    LoginModule,
    RegistrationModule,
    DropdownModule,
    BreadcrumbModule,
    BrowserModule,
    HttpClientModule,
    HeaderModule,
    InputSwitchModule,
    DashboardModule,
    SurveyModule,
    leakListViewModule,
    DataTableModule,
    CalendarModule,
    UsageHistoryModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
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
