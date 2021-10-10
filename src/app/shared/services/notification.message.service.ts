import { Injectable } from "@angular/core";

@Injectable()
export class NotificationMessageService {

  constructor() { }

  showSuccessMessage(message: string) {
    // this.notificationService.show({
    //   content: message,
    //   cssClass: "success-notification",
    //   animation: { type: "fade", duration: 1000 },
    //   position: { horizontal: "center", vertical: "bottom" },
    //   type: { style: "success", icon: true },
    //   hideAfter: 2000 //in milliseconds
    // });
  }

  showWarningMessage(message: string) {
    // this.notificationService.show({
    //   content: message,
    //   cssClass: "button-notification",
    //   animation: { type: "fade", duration: 100 },
    //   position: { horizontal: "center", vertical: "bottom" },
    //   type: { style: "warning", icon: true },
    //   hideAfter: 10000 //in milliseconds
    // });
  }

  showInfoMessage(message: string, closable: boolean = false) {
    // this.notificationService.show({
    //   content: message,
    //   cssClass: "info-notification",
    //   animation: { type: "fade", duration: 500 },
    //   position: { horizontal: "center", vertical: "bottom" },
    //   type: { style: "info", icon: false },
    //   hideAfter: closable ? undefined : 4000, //in milliseconds
    //   closable
    // });
  }

  showCopiedToClipBoardMessage() {
    // this.notificationService.show({
    //   content: "Copied to Clipboard",
    //   animation: { type: "fade", duration: 500 },
    //   position: { horizontal: "left", vertical: "bottom" },
    //   type: { style: "info", icon: false },
    //   cssClass: "copied-class",
    //   hideAfter: 1500 //in milliseconds
    // });
  }

  showErrorMessage(message: string) {
    // this.notificationService.show({
    //   content: message,
    //   closable: true,
    //   animation: { type: "fade", duration: 900 },
    //   position: { horizontal: "center", vertical: "bottom" },
    //   type: { style: "error", icon: true }
    // });
  }
}
