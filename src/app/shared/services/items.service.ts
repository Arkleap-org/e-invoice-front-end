// angular modules
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

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

  updateItem(model: CreateItemRequestDto) {
    const url = `issuer/item/update/${model.id}`;
    return this.http.put<ResponseDto>(url, model);
  }

  deleteItem(id: number) {
    const url = `issuer/item/delete/${id}`;
    return this.http.delete<ResponseDto>(url);
  }

  listItems() {
    const url = `issuer/item/list`
    return this.http.get<ResponseDto>(url)
  }

  listUnitTypes() {
    const url = `codes/unit-types/list`
    return this.http.get<ResponseDto>(url)

  }

  listTypes() {
    const url = `codes/activity-types/list`
    return this.http.get<ResponseDto>(url)

  }


  listTaxTypes() {
    const url = `codes/tax-subtypes/list`
    return this.http.get<ResponseDto>(url)

  }

  getItemById(id: number) {
    const url = `issuer/item/get/${id}`;
    return this.http.get<ResponseDto>(url)
  }

  uploadItemExcelSheet(items: string[][]) {
    const url = `issuer/item/upload-excel`;
    return this.http.post<ResponseDto>(url, { items })
  }


}
