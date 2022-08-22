import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Users } from './models/user';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class StaffAdminRoleGuardGuard implements CanActivate {
  users: Users = new Users();
  constructor(private loginService: LoginService, private router: Router) {
      this.users = this.loginService.getUser();
  }

  canActivate(): boolean {
      this.users = this.loginService.getUser();
      if (!this.loginService.isLoggedIn() || this.users.role !== 'ADMIN') {
          if (this.users.role !== 'STAFF') {
              this.router.navigate(['/login']);
              return false;
          }
      }
      return true;
  }
}
