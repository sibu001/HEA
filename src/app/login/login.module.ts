import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {PasswordModule} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import {SidebarModule} from 'primeng/primeng';
import { LoginComponent } from "src/app/login/login.component";
import { forgotpasswordComponent } from "src/app/login/forgotpassword.component";
import {HttpModule} from '@angular/http'

@NgModule({
    declarations: [
        LoginComponent,
        forgotpasswordComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        BrowserModule,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        PanelModule,
        ButtonModule,
        SidebarModule,
        HttpModule
    ],
    providers: [],
    exports: [

    ]

})
export class LoginModule {

}