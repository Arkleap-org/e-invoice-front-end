import { Injectable, TemplateRef } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class NotificationMessageService {

  constructor(private snackBar: MatSnackBar) { }

  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'x', {
      panelClass: "success-message",
      duration: 2000,
    })
  }

  showWarningMessage(message: any) {
    this.snackBar.open(message, 'x', {
      panelClass: "warning-message",
      duration: 30000,
    })

  }

  showInfoMessage(message: string, closable: boolean = false) {

  }

  showErrorMessage(message: string) {
    this.snackBar.open(message, 'x', {
      panelClass: "error-message",
      duration: 2000,
    })
  }
}

// .afterDismissed().subscribe((res) => {
// })
