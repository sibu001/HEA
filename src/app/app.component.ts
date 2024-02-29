import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { fromEvent, pipe, timer } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Users } from './models/user';
import { LoginService } from './services/login.service';
import { AppUtility } from './utility/app.utility';
import { AppConstant } from './utility/app.constant';
import { WeglotService } from './services/weglot.service';

declare var sameTabAlert : boolean;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
  title = 'app';
  public isNewTabAllowed : boolean = true;
  users : Users = new Users();

  // to remove the highlighter of the chart while navigating to other screen.
  constructor( private router : Router, 
      private readonly loginService : LoginService,
      private weglotService: WeglotService,
      private readonly activatedRoute : ActivatedRoute){
      AppUtility.broadCastEventListnerForSurveyScreen();
      AppUtility.checkForSurveyScrenLock();
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

            if( ( this.users.userData && response.userId == this.users.userData.userId) || ( this.users.outhMeResponse && response.userId == this.users.outhMeResponse.userId )){
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


    fromEvent(window,'beforeunload').
    subscribe((event : any) =>{
      this.onWindowUnload(event);
    });
   }

   ngOnInit(): void {
   if(window.location.origin === 'http://localhost:4200'|| window.location.origin==='https://sandbox.hea.com'
   || window.location.origin==='http://sandbox.hea.com'){
    timer(100).subscribe(() => {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        take(1)
      ).subscribe(() => {
       this.weglotService.watchForNavigationEnd();
      });
    });
  }  
}


  onWindowUnload(event: any) {
      AppUtility.broadCastLeaveMessageToSurveyScreen();
  }
}