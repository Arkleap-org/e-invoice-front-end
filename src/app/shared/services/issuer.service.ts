import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseDto } from '../models/api-response.model';
import { IssuerDto } from '../models/issuer.model';

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

  createIssuer(issuer: IssuerDto) {
    const url = `issuer/create`;
    return this.http.post<ResponseDto>(url, issuer);
  }

  updateIssuer(issuer: IssuerDto) {
    const url = `issuer/update`;
    return this.http.put<ResponseDto>(url, issuer)
  }
}
