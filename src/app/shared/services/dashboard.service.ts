import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseDto } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }


  getCounts() {
    const url = `dashboard`;
    return this.http.get<ResponseDto>(url)
  }

  listRecentInvoices() {
    const url = `invoice/recent-documents/list`;
    return this.http.get<ResponseDto>(url)
  }

  getRecentInvoices() {
    const url = `invoice/recent-documents/save`;
    return this.http.get<ResponseDto>(url)
  }

}
