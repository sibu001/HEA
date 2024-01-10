import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Users } from './models/user';
import { LoginService } from './services/login.service';
import { AppConstant } from './utility/app.constant';
import { AppUtility } from './utility/app.utility';

// declare var checkTabsLimit : any;

@Injectable()
export class AuthGuard implements CanActivate {

    private users : Users = new Users();
    constructor(private loginService: LoginService, private router: Router) {
        this.users = this.loginService.getUser();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        //check if url endpoint is recommendationInstruction
        const urlParts = state.url.split('/');
        const lastPart = urlParts[urlParts.length - 1]; 
        if (lastPart === 'recommendationInstruction') {
            return true;
          }
        if (!this.loginService.isLoggedIn()) {
          this.router.navigate(['/login']);
            return false;
        }

        //  to check for Admin/ staff user.
        if(this.users.role != 'USERS') { 

            if( AppConstant.USER_SCREEN_LOCK && !AppConstant.adminEnterUserScreen){
                alert('Cannot open new tab for user screen. Close all other HomeIntel tabs first.');
                return false;
            }
            AppUtility.broadCastEnterMessageToSurveyScreen();
        }

        return true;
    }
}
