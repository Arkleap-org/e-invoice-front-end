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
          let errorMessage: string;

          if (error.status === 0) {
            errorMessage = "Streamline API is not running, please check and try again";
            this.notificationService.showErrorMessage(errorMessage);
          }
          else if (error.status === 401) {
            // unauthorized, invalid authentication token need to refresh token here
            this.securityService.logout();
          }
          else if (error.status === 403) {
            // valid authentication token but user not unauthorized to access api action
            errorMessage = "You do not have the required permissions to perform this action.";
            this.notificationService.showErrorMessage(errorMessage);
          }
          else if (error.status === 400) {
            // handle validation error
            const errors = [];

            const validationErrorDictionary = typeof (error.error) == "string" ? JSON.parse(error.error).errors : error.error.errors;
            for (let fieldName in validationErrorDictionary) {
              if (validationErrorDictionary.hasOwnProperty(fieldName))
                errors.push(validationErrorDictionary[fieldName]);
            }

            if (errors.length > 0) {
              errorMessage = errors.join("\n");
              this.notificationService.showErrorMessage(errorMessage);
            }
          }
          else {
            if (error.error instanceof ErrorEvent) {
              // client-side error
              errorMessage = `Error: ${error.error.message}`;
            } else {
              // server-side error
              errorMessage = "An error occurred please try again in few minutes.For further help please contact our customer support.";
              //if (error.error != null)
              //    errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.Message}`;
              //else
              //    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }

            this.notificationService.showErrorMessage(errorMessage);
          }

          return throwError(error);
        }));
  }
}
