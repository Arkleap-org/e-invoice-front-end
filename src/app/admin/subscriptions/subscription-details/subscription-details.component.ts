import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '../../../shared/services/dialog.service';
import { AdminService, DropdownDto } from '../../../shared/services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { PlanDto } from '../../plans/plan-list/plan-list.component';
import { ResponseDto } from '../../../shared/models/api-response.model';

@Component({
  selector: 'app-subscription-details',
  templateUrl: './subscription-details.component.html',
  styleUrls: ['./subscription-details.component.scss']
})
export class SubscriptionDetailsComponent implements OnInit {

  // #region declare variables

  model: SubscriptionDetailsDto;
  isSubmitted!: boolean;
  subscriptionForm!: FormGroup;
  listOfPlans!: DropdownDto[];
  listOfIssuers!: DropdownDto[];

  // #endregion

  // #region constructor

  constructor(
    private dialogService: DialogService,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {
    // init variables
    this.model = new SubscriptionDetailsDto;

    // init forms
    this.initForms();
  }

  // #endregion

  // #region init forms

  initForms() {
    this.subscriptionForm = this.formBuilder.group({
      issuer: ['', Validators.required],
      plan: ['', Validators.required],
      start_date: ['', Validators.required],
      is_active: [false],
      is_paid: [false],
    });
  }

  get subscriptionFormControls() {
    return this.subscriptionForm.controls;
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {
    this.loadControls();
  }

  // #endregion

  // #region load controls

  loadControls() {
    this.getListOfPlansForDropdown();
    this.getListOfIssuersForDropdown();
  }

  getListOfPlansForDropdown() {
    this.adminService.getListOfPlansForDropdown().subscribe((res: ResponseDto) => this.listOfPlans = res.data);
  }

  getListOfIssuersForDropdown() {
    this.adminService.getListOfIssuersForDropdown().subscribe((res: ResponseDto) => this.listOfIssuers = res.data);
  }

  // #endregion

  // #region main actions

  cancelAndRouteBack() {
    this.dialogService.cancelAndRouteBack("Are you sure?", "You won't be able to revert this!", "/user/subscription/list");
  }

  createSubscription(model: SubscriptionDetailsDto) {
    this.isSubmitted = true;
    if (this.subscriptionForm.valid)
      this.adminService.createSubscription(model).subscribe(() => this.dialogService.successAndRouteTo("Subscription has been created successfully", "/user/subscription/list"));
  }

  // #endregion

}

export class SubscriptionDetailsDto {
  issuer!: number;
  plan!: number;
  start_date!: string;
  is_active!: boolean;
  is_paid!: boolean;
}
