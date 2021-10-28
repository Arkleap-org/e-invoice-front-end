import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { DialogService } from "./dialog.service";

// services
import { SecurityService } from "./security.service";

@Injectable()

export class AuthGuardService implements CanActivate {

  hasPermission = false;

  constructor(public router: Router, private readonly securityService: SecurityService,
    private dialogService:DialogService ) {

  }

  // activate layout if user have valid token
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.securityService.jwtToken) {
      this.securityService.logout();
      return false;
    }
    else if (this.securityService.hasIssuer === false && state.url !== "/issuer/details") {
      this.router.navigate(["/issuer/details"]);
      this.dialogService.alertMessege('Please create an issuer first. So you can use the system')
      
      return false;
    } else {
      return true;
    }
  }

}
