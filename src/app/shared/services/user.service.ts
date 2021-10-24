import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserRequestDto } from '../models/user.model';
import { ResponseDto } from "../models/api-response.model";



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  createUser(model: UserRequestDto) {
    const url = `/user/add`;
    return this.http.post<ResponseDto>(url, model);
  }

}
