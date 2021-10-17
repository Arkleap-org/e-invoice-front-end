// angular modules
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from } from "rxjs";

// models 
import { CreateItemRequestDto, CreateItemResponseDto } from "../models/items.model";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  createItem(model: CreateItemRequestDto) {
    const url = `issuer/item/create/`;
    return this.http.post<CreateItemResponseDto>(url, model);
  }
}
