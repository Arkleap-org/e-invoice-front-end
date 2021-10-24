// angular modules
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

// services
import { LocalStorageService } from "./local-storage.service";
import { SessionStorageService } from "./session-storage.service";
import { LoginResponseDto } from "../models/auth.model";


@Injectable()
export class SecurityService {

  // #region private constant

  private tokenStorageKey = "token";

  // #endregion

  // #region private properties



  // #endregion

  // #region public properties

  get jwtToken() { return this.retrieveToken(); }

  get hasIssuer() { return this.user && this.user.has_issuer }

  get user() { return this.retrieveUser(); }

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

  logout() {

    // remove all storage
    this.localStorageService.removeAll();

    // redirect to login page
    this.router.navigate(["/"], { skipLocationChange: true });
  }


  // #endregion

  // #region retrieve local storage actions

  retrieveToken() {
    // retrieve jwt-token
    const token = this.localStorageService.retrieve(this.tokenStorageKey);
    return typeof token !== "undefined" ? token : null;
  }

  retrieveUser() {
    // retrieve user
    const user = this.localStorageService.retrieve('user');
    return typeof user && user !== "undefined" ? user as LoginResponseDto : null;
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
