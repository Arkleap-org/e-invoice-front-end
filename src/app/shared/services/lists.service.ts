import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseDto } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor(
    private http: HttpClient
  ) { }

  // countries list
  listCountries() {
    const url = `codes/country-codes/list`;
    return this.http.get<ResponseDto>(url);
  }

  // activity codes list
  listActivityCodes() {
    const url = `codes/activity-types/list`;
    return this.http.get<ResponseDto>(url);
  }
}
