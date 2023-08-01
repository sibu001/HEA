import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { Users } from './models/user';
import { LoginService } from './services/login.service';
import { AppUtility } from './utility/app.utility';

declare var allowNewTab : boolean;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'app';
  public isNewTabAllowed : boolean = true;
  users : Users = new Users();

  // to remove the highlighter of the chart while navigating to other screen.
  constructor( private router : Router, 
      private readonly loginService : LoginService,
      private readonly activatedRoute : ActivatedRoute){

      //  to limit the number of tabs opened by user.
      // check app-utility.js
      this.isNewTabAllowed = allowNewTab;
      if(!this.isNewTabAllowed){ return; }

      this.router.events.subscribe((data) => {
      
      if(data instanceof NavigationEnd){
        AppUtility.removeHighlighterFromChart();

        // to check weather the data in local storage and in cookies belongs to the same User or not.
        // and if does not belongs to then redirect it to the same user then redirect to the login screen.

        if(data.id == 1){
          this.loginService.performGet('oauth/me')
          .subscribe((response : any) =>{
            this.users = this.loginService.getUser();

            // if user data in local storage is not user.
              if(this.users.role != 'USERS'){
                  if(response.userId != this.users.userData.userId){
                      localStorage.clear();
                      this.router.navigate(['/login']);
                    }
                return;
              }

              if(response.userId != this.users.outhMeResponse.userId ){
                localStorage.clear();
                // localStorage.removeItem('users');
                this.router.navigate(['/login']);
              }

          },error =>{
            this.router.navigate(['/login']);
          });
        }
      }
    });
   }
}