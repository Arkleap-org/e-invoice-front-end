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
          this.notificationService.showSuccessMessage("")
          const errorModel: ErrorDto = error.error;
          // customized response
          if (errorModel.response_id) {
            // if (errorModel.warning) {this.notificationService.showWarningMessage(JSON.stringify(errorModel.warning.values())) }
            if (errorModel.warning) {this.notificationService.showWarningMessage(Object.values(errorModel.warning)) }
          }
          else if (typeof (error.error) === "object") {this.notificationService.showErrorMessage(error.error) }
          else if (typeof (error.error) === "string") {this.notificationService.showErrorMessage(error.error)  }
          else { }
          return throwError(error);
        }));
  }
}
