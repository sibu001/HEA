import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {PasswordModule} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import {SidebarModule} from 'primeng/primeng';
import { RegistrationComponent } from "src/app/registration/registration.component";
import { CustomerRegistrationComponent } from "src/app/registration/customerRegistration.component";
import {CustomerRegistrationSuccessViewComponent} from "src/app/registration/customerRegistrationSuccessView.component";

@NgModule({
    declarations: [
        RegistrationComponent,
        CustomerRegistrationComponent,
        CustomerRegistrationSuccessViewComponent
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
        SidebarModule
    ],
    providers: [],
    exports: [

    ]

})
export class RegistrationModule {

}