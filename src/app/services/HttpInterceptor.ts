import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaderResponse, HttpSentEvent, HttpProgressEvent, HttpUserEvent } from '@angular/common/http';
import { LoginService } from '../services/login.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private loginService: LoginService, private router: Router) {

    }

    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        //  return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
        //return req.clone({ setHeaders: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        return req;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.addToken(req, this.loginService.getUser().token)).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                return event;
            }
        }, (error: any) => {
            if (error instanceof HttpErrorResponse) {
                switch ((<HttpErrorResponse>error).status) {
                    case 400:
                    //return this.handle400Error(error);
                    case 401:
                        return this.handle401Error(req, next);
                }
            } else {
                return throwError(error);
            }
        });

    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;
            // Reset here so that the following requests wait until the token
            // comes back from the refreshToken call.
            this.tokenSubject.next(null);
            return this.loginService.getRefreshToken().subscribe(data => {
                let response1 = JSON.stringify(data);
                let response = JSON.parse(response1);
                let user = this.loginService.getUser();
                user.token = response.access_token;
                user.refreshToken = response.refresh_token;
                this.loginService.setUser(user);
                this.tokenSubject.next(response.token);
                this.isRefreshingToken = false;
                return next.handle(this.addToken(req, response.token));
            }, error => {
                if (this.loginService.getUser().token != null && this.loginService.getUser().token != undefined) {
                    return this.loginService.logout();
                }
            });
        } else {
            return this.tokenSubject.filter(token => token != null).take(1)
                .switchMap(token => {
                    return next.handle(this.addToken(req, token));
                });
        }
    }

    // handle400Error(error) {
    //     if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
    //         // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
    //         return this.loginService.logout();
    //     }

    //     return Observable.throw(error);
    // }

}