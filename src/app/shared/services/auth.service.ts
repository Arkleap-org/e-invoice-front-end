// angular modules
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

// models
import { LoginRequestDto, LoginResponseDto } from "../models/auth.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(private http: HttpClient) { }

  userLogin(model: LoginRequestDto) {
    const url = `token/`;
    return this.http.post<LoginResponseDto>(url, model);
  }

}
