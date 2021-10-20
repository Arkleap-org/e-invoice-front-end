// angular core
import { Injectable } from '@angular/core';

// angular http
import { HttpClient } from '@angular/common/http';

// models
import { ResponseDto } from '../models/api-response.model';
import { IssuerAddressDto } from '../models/issuer.model';

@Injectable({
  providedIn: 'root'
})

export class IssuerAddressService {

  constructor(
    private http: HttpClient
  ) { }

  createAddress(address: IssuerAddressDto) {
    const url = `issuer/address/create`;
    return this.http.post<ResponseDto>(url, address);

  }

  listAddresses() {
    const url = `issuer/address/list`;
    return this.http.get<ResponseDto>(url);
  }
}
