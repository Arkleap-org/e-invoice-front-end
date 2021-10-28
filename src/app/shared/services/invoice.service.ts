import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseDto } from '../models/api-response.model';
import { CreateInvoiceDto } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(
    private http: HttpClient
  ) { }

  listInvoices() {
    const url = `invoice/list`;
    return this.http.get<ResponseDto>(url)
  }

  getInvoiceById(id: number) {
    const url = `invoice/get/${id}`;
    return this.http.get<ResponseDto>(url);
  }

  createInvoice(data: CreateInvoiceDto) {
    const url = `invoice/create`;
    return this.http.post<ResponseDto>(url, data);
  }

  viewInvoiceErrors(id: number) {
    const url = `/invoice/view-errors/${id}`;
    return this.http.get<ResponseDto>(url);
  }

}

