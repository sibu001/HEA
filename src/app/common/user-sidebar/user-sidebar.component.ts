import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { AllowedMenuList } from 'src/app/utility/app.allowedMenuList';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit,AfterViewInit {

  users : Users = new Users();
  allowedMenuListforUser : AllowedMenuList;
  @Input() showSideBarHeader : boolean = true;

  constructor(private readonly loginService: LoginService) {
   }

   ngAfterViewInit(): void {
    // const usageHistoryDropDown =  document.getElementById('usage-history-dropdown');
    // if(usageHistoryDropDown){
    //   const width = usageHistoryDropDown.offsetWidth;
    //   usageHistoryDropDown.style.width = (width+30) + 'px';
    // }
  }

  ngOnInit() {
    this.users = this.loginService.getUser();
    this.allowedMenuListforUser = this.users.allowedMenuList;
  }

}
