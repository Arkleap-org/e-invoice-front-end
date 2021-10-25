// angular core
import { Component, OnInit } from '@angular/core';

// angular router
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../shared/services/dialog.service';

// reactive form

import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

//services
import { ItemsService } from 'src/app/shared/services/items.service';

// sweetalert
import Swal from 'sweetalert2';
import { CreateItemRequestDto, CreateItemResponseDto } from 'src/app/shared/models/items.model';
import { ResponseDto } from 'src/app/shared/models/api-response.model';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})

export class ItemDetailsComponent implements OnInit {

  // #region declare variables

  // name of lists
  listOfTypes: string[];
  listOfInternalCodes: {}[];
  listOfUnitTypes: {}[];
  listOfTaxTypes: {}[];
  isSubmitted: boolean;

  //name of model

  model: CreateItemRequestDto;
  itemDetails: CreateItemRequestDto;
  itemsForm!: FormGroup;

  // #region init form


  // #endregion



  // #endregion

  // #region constructor

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private itemService: ItemsService,
    private formBuilder: FormBuilder
  ) {

    // init variables
    this.listOfTypes = [
      'GS1', 'EGS'
    ];

    this.listOfInternalCodes = [
      {
        "id": 1,
        "internalCode": "internal code 1"
      },
      {
        "id": 2,
        "internalCode": "internal code 2"
      },
      {
        "id": 3,
        "internalCode": "internal code 3"
      }
    ];
    // waiting for api
    this.listOfUnitTypes = [];

    this.listOfTaxTypes = [];
    this.model = new CreateItemRequestDto;
    this.isSubmitted = false;
    this.itemDetails = new CreateItemRequestDto;
    this.initForm();
    this.loadControls();
  }

  // #region end

  // #region ngOnInit

  ngOnInit(): void {
    this.model.id = this.route.snapshot.params["id"];
    if (this.model.id) this.getItemById(this.model.id)

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

  // form controls


  get itemsFormControls() {
    return this.itemsForm.controls;
  }

  // #endregion


  // #region load controls

  listUnitTypes(){
    this.itemService.listUnitTypes().subscribe((res: ResponseDto) => {
      this.listOfUnitTypes = res.data;
    })
  }



  listTaxTypes(){
    this.itemService.listTaxTypes().subscribe((res: ResponseDto) => {
      this.listOfTaxTypes = res.data;
    })
  }

  loadControls(){
    this.listUnitTypes();
    this.listTaxTypes();
  }

  // #endregion

  // #region main actions

  createItem(model: CreateItemRequestDto) {
    this.isSubmitted = true;
    if (this.itemsForm.valid)
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

  getItemById(id: number) {
    this.itemService.getItemById(id).subscribe((res: ResponseDto) => {
      this.model = res.data;
    });
  }

  itemSubmitAction(updateId: number) {
    if (updateId) this.updateItem(this.model)
    else this.createItem(this.model)
  }

  cancelAndRouteBack() {
    this.dialogService.cancelAndRouteBack("Are you sure?", "You won't be able to revert this!", "/item/list");
  }

  // #region end

}
