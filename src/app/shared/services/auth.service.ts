// angular modules
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponseDto } from "../models/api-response.model";

// models
import { LoginRequestDto, LoginResponseDto } from "../models/auth.model";
import { UserRequestDto } from "../models/user.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(private http: HttpClient) { }

  userLogin(model: LoginRequestDto) {
    const url = `token`;
    return this.http.post<LoginResponseDto>(url, model);
  }

  userRegisteration(model: UserRequestDto) {
    const url = `user/register`;
    return this.http.post<ResponseDto>(url, model);
  }

}
