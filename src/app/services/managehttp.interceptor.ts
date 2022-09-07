import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { fromEvent, Observable } from 'rxjs';
import { Router, ActivationEnd } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { HttpCancelService } from './httpcancel.service';
import { UtilityService } from './utility.service';

@Injectable()
export class ManageHttpInterceptor implements HttpInterceptor {

    offlineEvent: Observable<Event>;
    onlineEvent: Observable<Event>;

    private isClientOffline = false;

    constructor(router: Router,
        private httpCancelService: HttpCancelService,
        private utilityService: UtilityService
        ) {
                this.offlineEvent = fromEvent(window, 'offline');
                this.offlineEvent.subscribe(event => {
                this.isClientOffline = true;
                if (event instanceof ActivationEnd) {
                  this.httpCancelService.cancelPendingRequests();
                }
            });

            this.onlineEvent = fromEvent(window, 'online');
            this.onlineEvent.subscribe(e => {
              this.isClientOffline = false;
            });

    }

    intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
      if(this.isClientOffline)
        this.utilityService.showErrorMessage("'Not connected to internet'");
      return next.handle(req).pipe(takeUntil(this.httpCancelService.onCancelPendingRequests()))
    }
}