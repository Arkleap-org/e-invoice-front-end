// angular modules
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from } from "rxjs";
import { ReactiveFormsModule, } from '@angular/forms';

// models 
import { CreateItemRequestDto, CreateItemResponseDto, ListItemsResponseDto } from "../models/items.model";
import { ResponseDto } from "../models/api-response.model";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  createItem(model: CreateItemRequestDto) {
    const url = `issuer/item/create`;
    return this.http.post<ResponseDto>(url, model);
  }

  listItems() {
    const url = `issuer/item/list`
    return this.http.get<ResponseDto>(url)
  }

}
