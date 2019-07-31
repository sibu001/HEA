import { Injectable } from '@angular/core';
import { Users } from "src/app/models/user";
import { AppUtility } from "src/app/utility/app.utility";
import { AppConstants } from "src/app/utility/constant";
import { HttpClient, HttpHeaders } from "@angular/common/http";
declare var converse: any;
@Injectable()
export class LoginService {
    private users: Users;
    constructor(private http: HttpClient) {
    }
    public setUser(users: Users) {
        localStorage.setItem('users', JSON.stringify(users));
        this.users = users;
    }

    public getUser(): Users {
        var users = JSON.parse(localStorage.getItem('users'));
        if (users != undefined && users != null) {
            this.users = users;
        } else {
            this.users = new Users();
        }
        return (AppUtility.isEmptyObject(this.users) || AppUtility.isEmptyString(this.users.theme)) ? new Users() : users;
    }
    public isLoggedIn(): boolean {
        this.users = this.getUser();
        if (this.users.token != undefined) {
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
        }
        return httpOptions;
    }

    getOptionsForm() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            }), withCredentials: true,
        }
        return httpOptions;
    }
    getOptionsMultiPart() {
        if (this.getUser != null) {
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                }), withCredentials: true,
            }
            return httpOptions;
        }
    }

    getOptionsMultiPartData() {
        if (this.getUser != null) {
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/x-www-form-urlencoded',
                }), withCredentials: true,
            }
            return httpOptions;
        }
    }

    getOptionsLogOut() {
        if (this.getUser != null) {
            const httpOptions = {
                headers: new HttpHeaders({
                }), withCredentials: true,
            }
            return httpOptions;
        }
    }

    getFormattedUrl(endpoint) {
        return AppConstants.webBaseUrl + endpoint;
    }
    performPost(object, endpoint) {
        let url = this.getFormattedUrl(endpoint);
        return this.http.post(url, JSON.stringify(object), this.getOptions());
    }
    performPostMultiPart(endpoint) {
        let object={};
        let url = this.getFormattedUrl(endpoint);
        return this.http.post(url, object, this.getOptionsMultiPart());
    }
    performPostMultiPartDataPost(object, endpoint) {
        let url = this.getFormattedUrl(endpoint);
        return this.http.post(url, object, this.getOptionsMultiPart());
    }
    performPostMultiPartData(object, endpoint) {
        let url = this.getFormattedUrl(endpoint);
        return this.http.post(url, object, this.getOptionsMultiPartData());
    }
    performPut(object, endpoint) {
        let url = this.getFormattedUrl(endpoint);
        return this.http.put(url, object, this.getOptionsMultiPart());
    }
    performGet(endPoint) {
        let url = this.getFormattedUrl(endPoint);
        return this.http.get(url, this.getOptions());
    }
    performGetMultiPartData(endPoint) {
        let url = this.getFormattedUrl(endPoint);
        return this.http.get(url, this.getOptionsMultiPartData());
    }
    performDelete(endPoint) {
        let url = this.getFormattedUrl(endPoint);
        return this.http.delete(url, this.getOptionsMultiPartData());
    }
    performOauthToken(endPoint, body) {
        let url = this.getFormattedUrl(endPoint);
        var tokens = this.http.post(url, body, this.getOptionsForm());
        return tokens;
    }
    getRefreshToken() {
        let content = new URLSearchParams();
        content.set('grant_type', 'refresh_token');
        content.set('access_token', this.users.token);
        content.set('refresh_token', this.users.refreshToken);
        let body = content.toString();
        let url = this.getFormattedUrl("oauth/token");
        return this.http.post(url, body, this.getOptionsForm())
    }
    performGetLogOut(endPoint) {
        let url = this.getFormattedUrl(endPoint);
        return this.http.get(url, this.getOptionsLogOut());
    }
    public logout(): void {
        document.getElementById("loader").classList.add('loading');
        this.performGetLogOut("j_spring_security_logout").subscribe(
            data => {
                let response = JSON.parse(JSON.stringify(data));
                console.log(response);
                this.users = new Users();
                localStorage.removeItem('users');
                localStorage.clear();
                console.log("logged out");
                window.location.reload();
                document.getElementById("loader").classList.remove('loading');
            },
            errors => {
                console.log(errors);
                this.users = new Users();
                localStorage.removeItem('users');
                localStorage.clear();
                console.log("logged out");
                window.location.reload();
                document.getElementById("loader").classList.remove('loading');
            }
        );
    }



}