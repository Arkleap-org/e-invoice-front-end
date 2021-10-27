import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserRequestDto } from '../models/user.model';
import { ResponseDto } from "../models/api-response.model";



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  createUser(model: UserRequestDto) {
    const url = `user/add`;
    return this.http.post<ResponseDto>(url, model);
  }

  listUsers(){
    const url = `user/list`;
    return this.http.get<ResponseDto>(url);
  }

  deleteUser(id:number){
    const url = `user/delete`;

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        users: [id]
      },
    };

    return this.http.delete<any>(url,options);
 }

 getUserById(id:number){
   const url = `user/view/${id}`

   return this.http.get<ResponseDto>(url)
 }

 activateUser(id:number){
   const url = `user/activate`
   const dto = {
       users:[id]
   }
   return this.http.post<ResponseDto>(url,dto)

 }

 deactivateUser(id:number){
  const url = `user/deactivate`
   const dto = {
       users:[id]
    }
   return this.http.post<ResponseDto>(url,{
    users:[id]
  })

 }
 
}
