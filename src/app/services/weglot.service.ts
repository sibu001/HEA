import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter, map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { LoginService } from "./login.service";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
  })
export class WeglotService{
    private readonly TRANSLATE_ENABLED_ENDPOINT = 'conf/translateEnabled';
    private readonly WEGLOT_API_KEY_ENDPOINT = 'conf/weglotApiKey';
    isEnable:boolean;
    count:number=0;
    currentLanguage:string;

    constructor(private router: Router, private readonly loginService : LoginService ) {}
     
      initializeWeglot(apiKey: string): void {
        try {
    
            if (!(window as any).Weglot.initialize) {
                console.error("Weglot object not found");
                return;
            }
    
            (window as any).Weglot.initialize({
                api_key: apiKey
            });
               this.setupLanguageChangedHandler();
               
        } catch (error) {
            console.error("Error initializing Weglot:", error);
        }
    }
    
    
    private setupLanguageChangedHandler(): void {
        try {
               (window as any).Weglot.on('languageChanged', (newLang: string, prevLang: string) => {
                console.log("current lang",(window as any).Weglot.getCurrentLang());
                this.currentLanguage = newLang;
                this.changeLanguage(newLang, () => {
                    console.log('Language change complete');
                });
            });
        } catch (error) {
            console.error("Error in Weglot.on:", error);
        }
    }
   
    private checkTranslationEnabled(): Observable<any> {
        return this.loginService.performGet(this.TRANSLATE_ENABLED_ENDPOINT);
      }
    
      
      private fetchWeglotApiKey(): Observable<any> {
        return this.loginService.performGet(this.WEGLOT_API_KEY_ENDPOINT);
      }
    
      private loadWeglotScriptAndInitialize(apiKey: string): void {
        this.initializeWeglot(apiKey);
      }

      watchForNavigationEnd(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
          this.checkTranslationEnabled().take(1).subscribe(isEnabled => {
            console.log("isEnable",isEnabled);
            if (isEnabled.data) {
              this.fetchWeglotApiKey().take(1).subscribe(apiKey => {
                this.loadWeglotScriptAndInitialize(apiKey.data);
                resolve();
              }, error => {
                console.error('Failed to fetch Weglot API key:', error);
                reject(error);
              });
            } else {
              resolve();
            }
          }, error => {
            console.error('Failed to check translation enabled status:', error);
            reject(error);
          });
        });
      }
    

     changeLanguage(language: string, callback:()=>void) {
        const url = `free/messages/languageChanged?siteLanguage=${language}`;
        this.loginService.performPost({},`${url}`).subscribe(
          data=>{
            console.log("languageChanged:",language,'-',data.data);
          }
        )
        callback();
      }
      
   
}