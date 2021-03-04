import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { forgotpasswordComponent } from 'src/app/login/forgotpassword.component';
import { NgModule } from '@angular/core';

export const LoginRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'login/:code', component: LoginComponent },
    { path: 'login/:theme', component: LoginComponent },
    { path: 'forgotpassword', component: forgotpasswordComponent }
];
@NgModule({
    imports: [RouterModule.forChild(LoginRoutes)],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
