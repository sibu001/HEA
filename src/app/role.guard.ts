import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Users } from './models/user';
import { LoginService } from './services/login.service';

@Injectable()
export class RoleGuard implements CanActivate {
    users: Users = new Users();
    constructor(private loginService: LoginService, private router: Router) {
        this.users = this.loginService.getUser();
    }

    canActivate(): boolean {
        this.users = this.loginService.getUser();
        if (!this.loginService.isLoggedIn() || (this.users.role !== 'ADMIN' && this.users.role !== 'COACH')) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}
