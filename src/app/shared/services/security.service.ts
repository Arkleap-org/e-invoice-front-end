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
    this.router.navigate(["/login"], { skipLocationChange: true });
  }


  // #endregion

  // #region retrieve local storage actions

  retrieveToken() {
    // retrieve jwt-token
    const user = this.localStorageService.retrieve('user');
    return user && typeof user !== "undefined" ? (user as LoginResponseDto).access : null;
  }

  retrieveUser() {
    // retrieve user
    const user = this.localStorageService.retrieve('user');
    return user && typeof user !== "undefined" ? user as LoginResponseDto : null;
  }

  // #endregion

}
