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
    if (this.securityService.isAuthenticated) {
      return true;
    } else {
      this.securityService.logout();
      return false;
    }
  }

}
