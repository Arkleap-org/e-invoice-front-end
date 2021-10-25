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

  createReceiver(data: ReceiverDto) {
    const url = `issuer/receiver/create`;
    return this.http.post<ResponseDto>(url, data);
  }

  listReceivers() {
    const url = `issuer/receiver/list`;
    return this.http.get<ResponseDto>(url);
  }
}
