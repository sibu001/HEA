import { Component } from '@angular/core';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { Users } from './models/user';
import { LoginService } from './services/login.service';
import { AppUtility } from './utility/app.utility';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'app';
  users : Users = new Users();

  // to remove the highlighter of the chart while navigating to other screen.
  constructor( private router : Router, 
      private readonly loginService : LoginService,
      private readonly activatedRoute : ActivatedRoute){
    this.router.events.subscribe((data) => {
      
      if(data instanceof NavigationEnd){
        AppUtility.removeHighlighterFromChart();

        if(data.id == 1){
          this.loginService.performGet('oauth/me')
          .subscribe((response : any) =>{
            this.users = this.loginService.getUser();
              if(response.userId != this.users.outhMeResponse.userId ){
                localStorage.clear();
                this.router.navigate(['/login']);
              }
          });
        }
      }
    });
   }
}