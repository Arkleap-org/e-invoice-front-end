
// angular modules
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

// models
import { CreateItemRequestDto } from '../../shared/models/items.model';
import { ResponseDto } from '../../shared/models/api-response.model';
import { ActivityCodeDto } from '../../shared/models/activity-code.model';

// services
import { ItemsService } from '../../shared/services/items.service';
import { DialogService } from '../../shared/services/dialog.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})

export class ItemDetailsComponent implements OnInit {

  // #region declare variables

  // name of lists
  listOfTypes: string[];
  listOfUnitTypes: ActivityCodeDto[];
  listOfTaxTypes: { code: string, desc_ar: string, desc_en: string, taxtype_reference: string }[];
  isSubmitted: boolean;

  //name of model

  model: CreateItemRequestDto;
  itemDetails: CreateItemRequestDto;
  itemsForm!: FormGroup;

  // #endregion

  // #region constructor

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private itemService: ItemsService,
    private formBuilder: FormBuilder
  ) {

    // init variables
    this.listOfTypes = ['GS1', 'EGS'];
    this.listOfUnitTypes = this.listOfTaxTypes = [];
    this.model = new CreateItemRequestDto;
    this.isSubmitted = false;
    this.itemDetails = new CreateItemRequestDto;

    // init forms
    this.initForm();
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {
    this.model.id = this.route.snapshot.params["id"];
    this.loadControls();
  }

  // #endregion

  // #region init forms

  initForm() {
    this.itemsForm = this.formBuilder.group({
      item_name: ['', Validators.required],
      item_desc: ['', Validators.required],
      unit_type: [''],
      item_type: [''],
      item_code: ['', Validators.required],
      internal_code: [''],
      sub_tax_rate: ['', [Validators.min(0), Validators.max(100)]],
      sub_tax_type: [''],
    });
  }

  // items form controls
  get itemsFormControls() {
    return this.itemsForm.controls;
  }

  // #endregion


  // #region load controls

  loadControls() {
    this.listUnitTypes();
    this.listTaxTypes();
    if (this.model.id) this.getItemById(this.model.id);
  }

  listUnitTypes() {
    this.itemService.listUnitTypes().subscribe((res: ResponseDto) => {
      this.listOfUnitTypes = res.data;
    })
  }

  listTaxTypes() {
    this.itemService.listTaxTypes().subscribe((res: ResponseDto) => {
      this.listOfTaxTypes = res.data;
    })
  }


  getItemById(id: number) {
    this.itemService.getItemById(id).subscribe((res: ResponseDto) => {
      this.model = res.data;
    });
  }

  // #endregion

  // #region main actions

  createItem(model: CreateItemRequestDto) {
    this.isSubmitted = true;
    // if (this.itemsForm.valid)
    this.itemService.createItem(model).subscribe((res: ResponseDto) => {
      this.dialogService.successAndRouteBack("/item/list");
    });
  }

  updateItem(model: CreateItemRequestDto) {
    this.isSubmitted = true;
    if (this.itemsForm.valid)
      this.itemService.updateItem(model).subscribe((res: ResponseDto) => {
        this.dialogService.successAndRouteBack("/item/list");
      });
  }

  itemSubmitAction(updateId: number) {
    if (updateId) this.updateItem(this.model)
    else this.createItem(this.model)
  }

  cancelAndRouteBack() {
    this.dialogService.cancelAndRouteBack("Are you sure?", "You won't be able to revert this!", "/item/list");
  }

  // #endregion

}
