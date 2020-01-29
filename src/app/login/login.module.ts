import { NgModule } from '@angular/core';
import { LoginComponent } from "src/app/login/login.component";
import { forgotpasswordComponent } from "src/app/login/forgotpassword.component";
import { SharedModule } from '../general/share.module';
import { LoginRoutingModule } from './login.routes';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        LoginComponent,
        forgotpasswordComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        LoginRoutingModule
    ],
    providers: [],
    exports: [

    ]

})
export class LoginModule {

}