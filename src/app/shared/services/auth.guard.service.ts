import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

// services
import { SecurityService } from "./security.service";

@Injectable()

export class AuthGuardService implements CanActivate {

  hasPermission = false;

  constructor(public router: Router, private readonly securityService: SecurityService) {

  }

  // activate layout if user have valid token
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.securityService.jwtToken) {
      this.securityService.logout();
      return false;
    }
    else if (this.securityService.hasIssuer === false && state.url !== "/issuer/details") {
      this.router.navigate(["/issuer/details"]);
      return false;
    } else {
      return true;
    }
  }

}
