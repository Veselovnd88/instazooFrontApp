import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {TokenStorageService} from "../service/token-storage.service";
import {NotificationService} from "../service/notification.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenStorageService,
              private notificationService: NotificationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // @ts-ignore
    return next.handle(req).pipe(catchError(err => {
      if (err.status === 401) {
        this.tokenService.logout();
        window.location.reload(); //TODO how it works
      }
      const error = err.error.message || err.statusText;
      this.notificationService.showSnackBar(error);
      return throwError(error);
    }));
  }

}

//TODO how it works
export const authErrorInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true}
];

