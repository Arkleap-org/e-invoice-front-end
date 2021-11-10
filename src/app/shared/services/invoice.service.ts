// angular core
import { Injectable } from '@angular/core';

// angular http
import { HttpClient } from '@angular/common/http';

// models
import { ResponseDto } from '../models/api-response.model';
import { CreateInvoiceDto } from '../models/invoice.model';
import { map } from 'rxjs/operators';

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

  submitInvoice(internalId: string) {
    const url = `invoice/save-transit-invoice/${internalId}`;
    return this.http.post<ResponseDto>(url, {})
  }

  cancelInvoice(id: number, cancelReason: string) {
    const url = `invoice/cancel-doc/${id}`;
    return this.http.post<ResponseDto>(url, cancelReason);
  }

  rejectInvoice(id: number, reject_reason: string) {
    const url = `invoice/reject-doc/${id}`;
    return this.http.post<ResponseDto>(url, { reject_reason });
  }

  uploadInvoiceExcelSheet(invoices: string[][]) {
    const url = `invoice/upload-excel`;
    return this.http.post<ResponseDto>(url, { invoices });
  }

  printInvoice(id: number) {
    const url = `invoice/print/${id}`;
    return this.http.get(url, { responseType: 'blob', observe: 'response' }).pipe(
      map((res: any) => {
        return new Blob([res.body], { type: 'application/pdf' });
      })
    );
  }

  updateInvoice(id: number, data: CreateInvoiceDto) {
    const url = `invoice/update/${id}`;
    return this.http.put<ResponseDto>(url, data)
  }

  getInvoiceSubmission(id: number) {
    const url = `invoice/get-submission/${id}`;
    return this.http.get<ResponseDto>(url)
  }

}

