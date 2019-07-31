import { Routes } from '@angular/router';
import { RegistrationComponent } from "src/app/registration/registration.component";
import { CustomerRegistrationComponent } from "src/app/registration/customerRegistration.component";
import {CustomerRegistrationSuccessViewComponent} from "src/app/registration/customerRegistrationSuccessView.component";

export const RegistrationRoutes: Routes = [
    { path: '', component: RegistrationComponent },
    { path: 'customerRegistrationHEA/:theme', component: RegistrationComponent },
    { path: 'customerRegistrationHEA', component: RegistrationComponent },
    { path: 'customerRegistration/:theme', component: CustomerRegistrationComponent },    
    { path: 'customerRegistration', component: CustomerRegistrationComponent },
    { path: 'customerRegistrationSuccessView', component: CustomerRegistrationSuccessViewComponent },    
];
