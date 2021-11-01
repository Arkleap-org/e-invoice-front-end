import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { SecurityService } from "../services/security.service";
import { NotificationMessageService } from "../services/notification.message.service";
import { ErrorDto, WarningDto } from "../models/api-response.model";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private notificationService: NotificationMessageService, private securityService: SecurityService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe((retry(0)) as any,
        catchError((error: HttpErrorResponse) => {
          const errorModel: ErrorDto = error.error;
          // customized response
          if (errorModel.response_id) {
            // validation errors (more than one)
            if (errorModel.warning) {
              const msg: string = this.handleWarningMessage(errorModel.warning);
              this.notificationService.showWarningMessage(msg);
            }
            else if (errorModel.message) {
              this.notificationService.showErrorMessage(errorModel.message);
            }
          }
          else if (typeof (error.error) === "object") {
            // only one message to show
            if (Object.keys(error.error).length === 1) {
              const msg: string = Object.values(error.error)[0] as string;
              this.notificationService.showErrorMessage(msg);
            }
          }
          // direct one message
          else if (typeof (error.error) === "string" && error.error.length < 200) {
            this.notificationService.showErrorMessage(error.error)
          }
          else {
            this.notificationService.showErrorMessage("Something went wrong please try again or call support.");
          }
          return throwError(error);
        }));
  }

  handleWarningMessage(warning: WarningDto): string {
    let msg = "";
    for (const key in warning) {
      msg += `${key.charAt(0).toUpperCase() + key.slice(1)} : ${warning[key]} \n`;
    }
    return msg;
  }
}
