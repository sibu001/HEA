import { Injectable } from '@angular/core';
import { Users } from 'src/app/models/user';
import { AppUtility } from 'src/app/utility/app.utility';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable()
export class LoginService {
    private users: Users;
    constructor(private http: HttpClient, private router: Router) {
    }
    public setUser(users: Users) {
        localStorage.setItem('users', JSON.stringify(users));
        this.users = users;
    }

    public getUser(): Users {
        const users = JSON.parse(localStorage.getItem('users'));
        if (users !== undefined && users !== null) {
            this.users = users;
        } else {
            this.users = new Users();
        }
        return (AppUtility.isEmptyObject(this.users) || AppUtility.isEmptyString(this.users.theme)) ? new Users() : users;
    }
    public isLoggedIn(): boolean {
        this.users = this.getUser();
        if (this.users.token !== undefined && this.users.token !== null) {
            return (AppUtility.isEmptyObject(this.users) || AppUtility.isEmptyString(this.users.token)) ?
                false : true;
        } else {
            return false;
        }
    }

    getOptions() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }), withCredentials: true,
        };
        return httpOptions;
    }
    getHttpParamsOptions(parameter: HttpParams) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }), withCredentials: true,
            params: parameter
        };
        return httpOptions;
    }

    getOptionsForm() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            }), withCredentials: true,
        };
        return httpOptions;
    }
    getOptionsMultiPart() {
        if (this.getUser != null) {
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                }), withCredentials: true,
            };
            return httpOptions;
        }
    }

    getOptionsMultiPartData() {
        if (this.getUser != null) {
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/x-www-form-urlencoded',
                }), withCredentials: true,
            };
            return httpOptions;
        }
    }

    getMultipartOption() {
        if (this.getUser != null) {
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'multipart/form-data',
                }), withCredentials: true,
            };
            return httpOptions;
        }
    }
    getOptionsLogOut() {
        if (this.getUser != null) {
            const httpOptions = {
                headers: new HttpHeaders({
                }), withCredentials: true,
            };
            return httpOptions;
        }
    }

    getFormattedUrl(endpoint: any): any {
        return environment.webBaseUrl + endpoint;
    }
    performPost(object: any, endpoint: any): any {
        const url = this.getFormattedUrl(endpoint);
        return this.http.post(url, JSON.stringify(object), this.getOptions());
    }
    performPostWithParam(object: any, endpoint: any, params: any): any {
        const url = this.getFormattedUrl(endpoint);
        return this.http.post(url, JSON.stringify(object), this.getHttpParamsOptions(params));
    }
    performPostMultiPart(endpoint: any): any {
        const object = {};
        const url = this.getFormattedUrl(endpoint);
        return this.http.post(url, object, this.getOptionsMultiPart());
    }
    performPostMultiPartDataPost(object: any, endpoint: any) {
        const url = this.getFormattedUrl(endpoint);
        return this.http.post(url, object, this.getOptionsMultiPart());
    }
    performPostMultiPartData(object: any, endpoint: any): any {
        const url = this.getFormattedUrl(endpoint);
        return this.http.post(url, object, this.getOptionsMultiPartData());
    }
    performPostMultiPartFromData(object, endpoint) {
        const url = this.getFormattedUrl(endpoint);
        return this.http.post(url, object, this.getMultipartOption());
    }
    performPut(object: any, endpoint: any): any {
        const url = this.getFormattedUrl(endpoint);
        return this.http.put(url, object, this.getOptionsMultiPart());
    }
    performGet(endPoint: any): any {
        const url = this.getFormattedUrl(endPoint);
        return this.http.get(url, this.getOptions());
    }
    performGetWithParams(endPoint: any, params?: HttpParams): any {
        const url = this.getFormattedUrl(endPoint);
        return this.http.get(url, this.getHttpParamsOptions(params));
    }
    performGetMultiPartData(endPoint: any): any {
        const url = this.getFormattedUrl(endPoint);
        return this.http.get(url, this.getOptionsMultiPartData());
    }
    performDelete(endPoint: any): any {
        const url = this.getFormattedUrl(endPoint);
        return this.http.delete(url, this.getOptionsMultiPartData());
    }
    performOauthToken(endPoint: any, body: any): any {
        const url = this.getFormattedUrl(endPoint);
        const tokens = this.http.post(url, body, this.getOptionsForm());
        return tokens;
    }
    getRefreshToken() {
        const content = new URLSearchParams();
        content.set('grant_type', 'refresh_token');
        content.set('access_token', this.users.token);
        content.set('refresh_token', this.users.refreshToken);
        const body = content.toString();
        const url = this.getFormattedUrl('oauth/token');
        return this.http.post(url, body, this.getOptionsForm());
    }
    performGetLogOut(endPoint: any): any {
        const url = this.getFormattedUrl(endPoint);
        return this.http.get(url, this.getOptionsLogOut());
    }
    public logout(): void {
        let theme = '';
        document.getElementById('loader').classList.add('loading');
        this.performGetLogOut('j_spring_security_logout').subscribe(
            data => {
                const response = JSON.parse(JSON.stringify(data));
                console.log(response);
                this.users = this.getUser();
                theme = this.users.theme;
                this.users = new Users();
                localStorage.removeItem('users');
                localStorage.clear();
                console.log('logged out');
                this.router.navigate(['\login'], { queryParams: { 'theme': theme } });
                document.getElementById('loader').classList.remove('loading');
            },
            errors => {
                console.log(errors);
                this.users = this.getUser();
                theme = this.users.theme;
                this.users = new Users();
                localStorage.removeItem('users');
                localStorage.clear();
                this.router.navigate(['\login'], { queryParams: { 'theme': theme } });
                document.getElementById('loader').classList.remove('loading');
            }
        );
    }
}
