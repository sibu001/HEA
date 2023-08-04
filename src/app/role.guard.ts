import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Users } from './models/user';
import { LoginService } from './services/login.service';
import { AppConstant } from './utility/app.constant';

declare var decrementTabCounter : any;

@Injectable()
export class RoleGuard implements CanActivate {
    users: Users = new Users();
    constructor(private loginService: LoginService, private router: Router) {
        this.users = this.loginService.getUser();
    }

    canActivate(): boolean {
        this.users = this.loginService.getUser();
        if (!this.loginService.isLoggedIn() || (this.users.role !== 'ADMIN' && this.users.role !== 'COACH' &&  this.users.role !== 'STAFF' )) {
            this.router.navigate(['/login']);
            return false;
        }
        
        // for checking when the user switch from User screen to admin screens first time.
        if(AppConstant.adminEnterUserScreen) { 
            AppConstant.adminEnterUserScreen = false;
            decrementTabCounter();
        }

        return true;
    }
}
