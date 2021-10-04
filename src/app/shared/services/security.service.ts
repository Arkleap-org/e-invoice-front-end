// angular modules
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

// services
import { LocalStorageService } from "./local-storage.service";
import { SessionStorageService } from "./session-storage.service";


@Injectable()
export class SecurityService {

  // #region private constant

  private tokenStorageKey = "jwt-token";

  // #endregion

  // #region private properties



  // #endregion

  // #region public properties

  get jwtToken() { return this.retrieveToken(); }

  get isAuthenticated() { return this.jwtToken !== null }

  // #endregion

  // #region constructor

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService,
    private readonly sessionStorageService: SessionStorageService,
  ) { }

  // #endregion

  // #region actions

  getApplicationUser() {
    const url = `Security/GetApplicationUser`;
    return this.http.get(url).subscribe((data) => {
      if (data === null) {
        this.unauthorized();
      } else {
        // set app-user

        // save app-user in local storage

        // redirect
        this.router.navigateByUrl("/home");
      }
    });
  }

  getApplicationMenu(permissionType: string) {
    const url = `Security/GetListOfAuthorizedMenu/${permissionType}`;
    return this.http.get(url).subscribe((data) => {
      // set app-menu

      // save app-menu in local storage
    });
  }


  logout() {

    // remove all storage
    this.localStorageService.removeAll();

    // reset private properties

    // redirect to login page
    this.router.navigate(["/login"], { skipLocationChange: true });
  }

  unauthorized() {
    // redirect to unauthorized page
    this.router.navigateByUrl("/unauthorized");
  }

  // #endregion

  // #region retrieve local storage actions

  retrieveToken() {
    // retrieve jwt-token
    const token = this.localStorageService.retrieve(this.tokenStorageKey);
    return typeof token !== "undefined" ? token : null;
  }

  // #endregion

  // #region store local storage actions

  storeToken(value: string) {
    // save jwt-token
    this.localStorageService.store(this.tokenStorageKey, value);
  }

  // #endregion

  // #region remove local storage actions

  removeToken() {
    // remove jwt-token
    this.localStorageService.remove(this.tokenStorageKey);
  }

  // #endregion
}
