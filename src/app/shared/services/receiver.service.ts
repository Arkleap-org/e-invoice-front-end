import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseDto } from '../models/api-response.model';
import { ReceiverDto } from '../models/receiver.model';

@Injectable({
  providedIn: 'root'
})
export class ReceiverService {

  constructor(
    private http: HttpClient
  ) { }

  createReceiver(model: ReceiverDto) {
    const url = `issuer/receiver/create`;
    return this.http.post<ResponseDto>(url, model);
  }

  updateReceiver(model: ReceiverDto) {
    const url = `issuer/receiver/update/${model.id}`;
    return this.http.put<ResponseDto>(url, model);
  }

  listReceivers() {
    const url = `issuer/receiver/list`;
    return this.http.get<ResponseDto>(url);
  }

  getReciever(id: number) {
    const url = `issuer/receiver/get/${id}`;
    return this.http.get<ResponseDto>(url);
  }

  uploadReceiverExcelSheet(receivers: string[][]) {
    const url = `issuer/receiver/upload-excel`;
    return this.http.post<ResponseDto>(url, { receivers })
  }

}
