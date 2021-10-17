import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { SecurityService } from "../services/security.service";
import { NotificationMessageService } from "../services/notification.message.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private notificationService: NotificationMessageService, private securityService: SecurityService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe((retry(0)) as any,
        catchError((error: HttpErrorResponse) => {

          return throwError(error);
        }));
  }
}
