import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { SecurityService } from "../services/security.service";
import { NotificationMessageService } from "../services/notification.message.service";
import { ErrorDto } from "../models/api-response.model";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private notificationService: NotificationMessageService, private securityService: SecurityService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe((retry(0)) as any,
        catchError((error: HttpErrorResponse) => {
          debugger
          const errorModel: ErrorDto = error.error;
          // customized response
          if (errorModel.response_id) {
            if (errorModel.warning) { }
          }
          else if (typeof (error.error) === "object") { }
          else if (typeof (error.error) === "string") { }
          else { }
          return throwError(error);
        }));
  }
}
