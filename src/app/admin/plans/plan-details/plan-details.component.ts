import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from '../../../shared/services/dialog.service';
import { PlanDto } from '../plan-list/plan-list.component';
import { AdminService } from '../../../shared/services/admin.service';

@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.scss']
})
export class PlanDetailsComponent implements OnInit {

  // #region declare variables

  model: PlanDto;
  isSubmitted!: boolean;
  planForm!: FormGroup;
  listOfTypes: { key: string, value: string }[];

  // #endregion

  // #region constructor

  constructor(
    private dialogService: DialogService,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {
    // init variables
    this.model = new PlanDto;
    this.model.id = this.route.snapshot.params["id"];
    this.listOfTypes = [
      { key: "M", value: "MONTHLY" },

      { key: "Q", value: "QUARTER-ANNUAL" },

      { key: "S", value: "SEMI-ANNUAL" },

      { key: "A", value: "ANNUAL" },
    ]

    // init forms
    this.initForms();
  }

  // #endregion

  // #region init forms

  initForms() {
    this.planForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      is_active: ['', Validators.required],
    });
  }

  get planFormControls() {
    return this.planForm.controls;
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {
    this.loadControls();
  }

  // #endregion

  // #region load controls

  loadControls() {
    if (this.model.id) this.getPlanById(this.model.id);
  }

  getPlanById(id: number) {
    this.adminService.getPlanById(id).subscribe((res: PlanDto) => this.model = res);
  }

  // #endregion

  // #region main actions

  cancelAndRouteBack() {
    this.dialogService.cancelAndRouteBack("Are you sure?", "You won't be able to revert this!", "/user/plan/list");
  }

  savePlan(model: PlanDto) {
    this.isSubmitted = true;
    if (this.planForm.valid) {
      if (model.id) this.updatePlan(model);
      else this.createPlan(model);
    }
  }

  createPlan(model: PlanDto) {
    this.adminService.createPlan(model).subscribe(() => this.dialogService.successAndRouteTo("Plan Created Successfully", "/user/plan/list"));
  }

  updatePlan(model: PlanDto) {
    this.adminService.updatePlan(model).subscribe(() => this.dialogService.successAndRouteTo("Plan Updated Successfully", "/user/plan/list"));
  }

  // #endregion

}

