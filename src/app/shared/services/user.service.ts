import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserRequestDto } from '../models/user.model';
import { ResponseDto } from "../models/api-response.model";
import { ResetPasswordDto } from '../models/reset-password.model';
import { ContactUsDto } from '../models/contact-us.model';



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

  listTraceLog(pageNo: number, size: number) {
    const url = `trace-log/list?page=${pageNo}&size=${size}`;
    return this.http.get<ResponseDto>(url);
  }

  
    updateUser(id: number, data:UserRequestDto) {
      const url = `user/update/${id}`;
      return this.http.put<ResponseDto>(url, data);
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

 changePassword(model:ResetPasswordDto){
   const url = `user/change-password`
   return this.http.put<ResponseDto>(url,model)
   
 }
 

 contactUs(model:ContactUsDto) {
   const url = `contact-us/create`
   return this.http.post<ResponseDto>(url,model)
 }
}
