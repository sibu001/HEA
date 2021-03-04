import { NgModule } from '@angular/core';
import { RegistrationComponent } from 'src/app/registration/registration.component';
import { CustomerRegistrationComponent } from 'src/app/registration/customerRegistration.component';
import { CustomerRegistrationSuccessViewComponent } from 'src/app/registration/customerRegistrationSuccessView.component';
import { CommonModule } from '@angular/common';
import { RegistrationRoutingModule } from './registration.routes';
import { SharedModule } from '../general/share.module';

@NgModule({
    declarations: [
        RegistrationComponent,
        CustomerRegistrationComponent,
        CustomerRegistrationSuccessViewComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RegistrationRoutingModule
    ],
    providers: [],
    exports: [

    ]

})
export class RegistrationModule { }
