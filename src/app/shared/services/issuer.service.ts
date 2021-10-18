import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseDto } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class IssuerService {

  constructor(
    private http: HttpClient
  ) { }

  getIssuer() {
    const url = `issuer/get`;
    return this.http.get<ResponseDto>(url);
  }
}
