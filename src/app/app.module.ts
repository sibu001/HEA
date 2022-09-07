import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthGuard } from 'src/app/auth.guard';
import { LoginService } from 'src/app/services/login.service';
import { InputSwitchModule } from 'primeng/primeng';
import { BreadcrumbModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { HeaderModule } from 'src/app/headers/header.module';
import { DataTableModule } from 'angular-6-datatable';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthorizationInterceptor } from 'src/app/services/HttpInterceptor';
import { SafePipeModule } from 'safe-pipe';
import { AppRoutingModule } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeadersComponent } from './headers/headers.component';
import { RoleGuard } from './role.guard';
import { UtilityService } from './services/utility.service';
import { GestureConfig, MatSnackBarModule } from '@angular/material';
import { MultipleRoleGuardService } from './multiple-role.guard';
import { ManageHttpInterceptor } from './services/managehttp.interceptor';
import { HttpCancelService } from './services/httpcancel.service';
import { DisplayPatternPipe } from './pipes/display-pattern.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeadersComponent,
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
    AppRoutingModule,
    MatSnackBarModule
  ],
  exports: [HeaderModule],
  providers: [LoginService, AuthGuard, RoleGuard, MultipleRoleGuardService, UtilityService,HttpCancelService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationInterceptor,
    multi: true
  },{
    provide: HTTP_INTERCEPTORS,
    useClass: ManageHttpInterceptor,
    multi: true
  },
  { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
