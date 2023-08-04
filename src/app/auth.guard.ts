import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Users } from './models/user';
import { LoginService } from './services/login.service';
import { AppConstant } from './utility/app.constant';

declare var checkTabsLimit : any;

@Injectable()
export class AuthGuard implements CanActivate {

    private users : Users = new Users();
    constructor(private loginService: LoginService, private router: Router) {
        this.users = this.loginService.getUser();
    }

    canActivate(): boolean {
        if (!this.loginService.isLoggedIn()) {
          this.router.navigate(['/login']);
            return false;
        }

        //  to check for Admin/ staff user.
        if(this.users.role != 'USERS') { 

            if(!checkTabsLimit()){
                return false;
            }

            AppConstant.adminEnterUserScreen = true;
        }

        return true;
    }
}
