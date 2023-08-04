import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { pipe } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Users } from './models/user';
import { LoginService } from './services/login.service';
import { AppUtility } from './utility/app.utility';

declare var sameTabAlert : boolean;

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
            
      this.router.events.subscribe((data) =>{
        if(data instanceof NavigationEnd){
          AppUtility.removeHighlighterFromChart();
      }});

      this.router.events.pipe(take(1))
        .subscribe( (data : any) => {
      
        // to check weather the data in local storage and in cookies belongs to the same User or not.
        // and if does not belongs to then redirect it to the same user then redirect to the login screen.

          this.loginService.performGet('oauth/me')
          .subscribe((response : any) =>{
            this.users = this.loginService.getUser();

            if( ( this.users.userData && response.userId == this.users.userData.userId) 
              || ( this.users.outhMeResponse && response.userId == this.users.outhMeResponse.userId )){
              return;
            }

            //  in case data in cookies and local storage differs then clear the local storage and relogin the user.
            localStorage.clear();
            this.router.navigate(['/login'] , {queryParams : {'redirectedRoute' : data.url}});

          },error =>{
            this.router.navigate(['/login']);
          });
        }
    );
    // localStorage.setItem('dummy-HEA-APP', Math.random().toString());
   }

  // @HostListener('window:storage', ['$event'])
  // onStorageChange(event: StorageEvent) {
  //   console.log(event);
  //   // if(!sameTabAlert && event.key == 'dummy-HEA-APP'){
  //   //   sameTabAlert = true;
  //   //   var message = 'Another window or tab is working with the same application. Close one of it!';
  //   //     window.alert(message);
  //   //   sameTabAlert = false;
  //   // }
  // }
}