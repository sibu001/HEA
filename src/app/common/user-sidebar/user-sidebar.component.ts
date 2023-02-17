import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { AllowedMenuList } from 'src/app/utility/app.allowedMenuList';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  users : Users = new Users();
  allowedMenuListforUser : AllowedMenuList;
  constructor(private readonly loginService: LoginService) {
   }

  ngOnInit() {
    this.users = this.loginService.getUser();
    this.allowedMenuListforUser = this.users.allowedMenuList;
  }

}
