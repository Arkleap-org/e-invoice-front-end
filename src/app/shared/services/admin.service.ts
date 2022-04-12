import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from '../models/api-response.model';
import { PlanDto } from '../../admin/plans/plan-list/plan-list.component';
import { SubscriptionListDto } from '../../admin/subscriptions/subscription-list/subscription-list.component';
import { SubscriptionDetailsDto } from '../../admin/subscriptions/subscription-details/subscription-details.component';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  // #region plan

  getListOfPlans() {
    const url = `subscription/list-subscription-plan/`;
    return this.http.get<PlanDto[]>(url);
  }

  getListOfIssuersForDropdown() {
    const url = `subscription/issuers-list`;
    return this.http.get<ResponseDto>(url);
  }

  getListOfPlansForDropdown() {
    const url = `subscription/plans-list`;
    return this.http.get<ResponseDto>(url);
  }

  getPlanById(id: number) {
    const url = `subscription/get-subscription-plan/${id}`;
    return this.http.get<PlanDto>(url);
  }

  createPlan(model: PlanDto) {
    const url = `subscription/create-subscription-plan/`;
    return this.http.post(url, model);
  }

  updatePlan(model: PlanDto) {
    const url = `subscription/update-subscription-plan/${model.id}`;
    return this.http.put(url, model);
  }

  // #endregion

  // #region subscription

  getListOfSubscriptions() {
    const url = `subscription/list-subscription/`;
    return this.http.get<ResponseDto>(url);
  }

  createSubscription(model: SubscriptionDetailsDto) {
    const url = `subscription/create-subscription/`;
    return this.http.post(url, model);
  }

  updateSubscription(row: SubscriptionListDto) {
    const url = `subscription/update-subscription/${row.id}`;
    const model = { start_date: row.start_date, is_active: row.is_active, is_paid: row.is_paid };
    return this.http.put(url, model);
  }

  // #endregion

}

export interface DropdownDto {
  id: number;
  name: string;
}
