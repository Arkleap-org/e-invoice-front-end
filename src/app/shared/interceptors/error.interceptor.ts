import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { SecurityService } from "../services/security.service";
import { NotificationMessageService } from "../services/notification.message.service";
import { ErrorDto, WarningDto } from "../models/api-response.model";
import { DialogService } from '../services/dialog.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private notificationService: NotificationMessageService, private securityService: SecurityService, private dialogService: DialogService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe((retry(0)) as any,
        catchError((error: HttpErrorResponse) => {
          const errorModel: ErrorDto = error.error;
          // customized response
          if (error.status === 401) {
            this.securityService.logout();
            if (errorModel.detail) this.notificationService.showWarningMessage(errorModel.detail);
          }
          else if (errorModel.response_id) {
            // validation errors (more than one)
            if (errorModel.warning) {
              const msg: string = this.handleWarningMessage(errorModel.warning);
              this.notificationService.showWarningMessage(msg);
            }
            else if (errorModel.message) {
              this.notificationService.showErrorMessage(errorModel.message);
            }
            else if (errorModel.error_messages) {
              const msg: string = this.handleErrorMessages(errorModel.error_messages);
              this.dialogService.alertMessege(msg);
            }
            else {
              this.notificationService.showErrorMessage("Something went wrong please try again or call support.");
            }
          }
          // only one message to show
          else if (typeof (error.error) === "object" && Object.keys(error.error).length === 1) {
            const msg: string = Object.values(error.error)[0] as string;
            this.notificationService.showErrorMessage(msg);
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

  handleErrorMessages(errors: string[]): string {
    let msg = "";
    for (let i = 0; i < errors.length; i++) {
      msg += `${errors[i].charAt(0).toUpperCase() + errors[i].slice(1)} \n`;

    }
    return msg;
  }
}
