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
        const lastVisitedURL = this.users.lastVisitedURL
        this.users = (AppUtility.isEmptyObject(this.users) || AppUtility.isEmptyString(this.users.theme)) ? new Users() : users;
        this.users.lastVisitedURL = lastVisitedURL;
        return this.users;
    }

    public updateUser(): void {
        const users: Users = JSON.parse(localStorage.getItem('users'));
        users.paneNumber = 0;
        users.surveyLength = 0;
        users.leakFocusId = 1;
        users.recommendationNo = 0;
        users.treadingLoadsValue = '';
        users.trendId = 1;
        users.profileId = 1;
        users.myReportsData = null;
        users.recommendationList = [];
        users.leakList = [];
        users.customerMailList = [];
        users.surveyList = [];
        users.trendingPartResource = [];
        users.trendingProfileResource = [];
        users.surveyCode = [];
        users.usesList = [];
        users.currentPaneNumber = null;
        users.unitType = 0;
        users.resourceType = 0;
        users.lookupValue = null;
        users.trendingProfileData = null;
        users.mailContent = null;
        users.mailDetail = null;
        users.recommendationStatusChange = false;
        users.types = null;
        users.customerEventDetail = {};
        users.addEvent = false;
        users.allSurveyCheck = true;
        users.leakFocusId = 1;
        this.setUser(users);
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

    getOptionsForm(parameter?: HttpParams) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            }), withCredentials: true,
            params: parameter,
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

    getMultipartOption(params?: any) {
        if (this.getUser != null) {
            const httpOptions = {
                headers: new HttpHeaders({
                }), withCredentials: true,
                params: params,
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

    getOptionForBlob(params?: any) {
        if (this.getUser != null) {
            const httpOptions = {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + this.users.token,
                }),
                params: params,
                responseType: 'blob' as 'json'
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
    performPostMultiPartFromData(object, endpoint, params?: any) {
        const url = this.getFormattedUrl(endpoint);
        return this.http.post(url, object, this.getMultipartOption(params));
    }
    performPostForBlob(object: any, endpoint: any, params?: any) {
        const url = this.getFormattedUrl(endpoint);
        return this.http.post(url, object, this.getOptionForBlob(params));
    }

    performGetForBlob(endpoint: any, params?: any){
        const url = this.getFormattedUrl(endpoint);
        return this.http.get(url, 
            {params: params, observe: 'response', responseType: 'blob'});
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
    performOauthToken(endPoint: any, body: any, params?: HttpParams): any {
        const url = this.getFormattedUrl(endPoint);
        const tokens = this.http.post(url, body, this.getOptionsForm(params));
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
                const currentPaneNumber = this.users.currentPaneNumber;
                this.users = new Users();
                this.users.currentPaneNumber = currentPaneNumber;
                // localStorage.removeItem('users');
                this.users.lastVisitedURL = this.router.url;
                localStorage.setItem('users', JSON.stringify(this.users));
                // localStorage.clear();
                console.log('logged out');
                this.router.navigate(['\login'], { queryParams: { 'theme': theme } });
                document.getElementById('loader').classList.remove('loading');
            },
            errors => {
                console.log(errors);
                this.users = this.getUser();
                theme = this.users.theme;
                const currentPaneNumber = this.users.currentPaneNumber;
                this.users = new Users();
                this.users.currentPaneNumber = currentPaneNumber;
                // localStorage.removeItem('users');
                this.users.lastVisitedURL = this.router.url;
                localStorage.setItem('users', JSON.stringify(this.users));
                // localStorage.clear();
                this.router.navigate(['\login'], { queryParams: { 'theme': theme } });
                document.getElementById('loader').classList.remove('loading');
            }
        );
    }
}
