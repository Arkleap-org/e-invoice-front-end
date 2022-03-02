import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecentInvoicesDto } from '../../home/home.component';
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

  listRecentInvoices(pageNo: number, size: number) {
    const url = `invoice/recent-documents/list?page=${pageNo}&size=${size}`;
    return this.http.get<RecentInvoicesDto>(url)
  }

  getRecentInvoices() {
    const url = `invoice/recent-documents/save`;
    return this.http.get<ResponseDto>(url)
  }

}
