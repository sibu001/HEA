import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { LoginService } from '../services/login.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AppConstant } from '../utility/app.constant';
import { Router } from '@angular/router';
import { Users } from '../models/user';
import { HttpCancelService } from './httpcancel.service';
import { filter, map, takeUntil, tap, } from 'rxjs/operators';
import { AppUtility } from '../utility/app.utility';


@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

    isRefreshingToken = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public totalApiCalls: number = 0;

    constructor(private readonly loginService: LoginService,
                private readonly  router: Router,
                private readonly httpCancelService: HttpCancelService) { }

    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req;
    }


    public showLoaderOrNot() {
        if(this.totalApiCalls > 0){
            this.totalApiCalls--;
        }
       
        if(this.totalApiCalls == 0){
            AppUtility.removeLoader();
        }
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.totalApiCalls++;
        AppUtility.showLoader();

        return next.handle(this.addToken(req, this.loginService.getUser().token)).pipe(
            filter((data: any) => data),
            tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.showLoaderOrNot();
                const response = <HttpResponseBase>event;
                if(response.url == AppConstant.classicVesionRedirectURLsandbox){
                    this.loginService.logout();
                }
                return event;
            }
        }, (error: any) => {
            if (error instanceof HttpErrorResponse) {
                this.showLoaderOrNot();
                switch ((<HttpErrorResponse>error).status) {
                    case 400:
                        return ;
                    case 401:
                        return this.handle401Error(req, next);
                    case 302:
                        return this.handle302Error();
                }
            } else {
                return throwError(error);
            }
        }));

    }
    handle302Error() {
        this.loginService.logout();
    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler) {
        document.getElementById('loader').classList.add('loading');
        this.httpCancelService.cancelPendingRequests();
        this.loginService.logout();

        // if (!this.isRefreshingToken) {
        //     this.isRefreshingToken = true;
        //     this.tokenSubject.next(null);
        //     return this.loginService.getRefreshToken().subscribe(data => {
        //         const response1 = JSON.stringify(data);
        //         const response = JSON.parse(response1);
        //         const user = this.loginService.getUser();
        //         user.token = response.access_token;
        //         user.refreshToken = response.refresh_token;
        //         this.loginService.setUser(user);
        //         this.tokenSubject.next(response.token);
        //         this.isRefreshingToken = false;
        //         return next.handle(this.addToken(req, response.token));
        //     }, error => {
        //         if (this.loginService.getUser().token != null && this.loginService.getUser().token !== undefined) {
        //             return this.loginService.logout();
        //         }
        //     });
        // } else {
        //     return this.tokenSubject.filter(token => token != null).take(1)
        //         .switchMap(token => {
        //             return next.handle(this.addToken(req, token));
        //         });
        // }
    }

    // handle400Error(error) {
    //     if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
    //         // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
    //         return this.loginService.logout();
    //     }

    //     return Observable.throw(error);
    // }
}
