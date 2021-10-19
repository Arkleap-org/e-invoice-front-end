// angular core
import { Component, OnInit } from '@angular/core';

// angular router
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../shared/services/dialog.service';

// reactive form

import { FormGroup, FormControl } from '@angular/forms';
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

  listOfTypes: string[];
  listOfInternalCodes: {}[];
  listOfUnitTypes: {}[];
  listOfTaxTypes: {}[];
  model: CreateItemRequestDto;


  // #region init form

  itemsForm = new FormGroup({
    item_name: new FormControl(''),
    item_desc: new FormControl(''),
    unit_type: new FormControl(''),
    item_type: new FormControl(''),
    item_code: new FormControl(''),
    internal_code: new FormControl(''),
    sub_tax_rate: new FormControl(''),
    sub_tax_type: new FormControl(''),

  });

  // #endregion



  // #endregion

  // #region constructor

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private itemService: ItemsService
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
    this.listOfUnitTypes = [
      {
        "id": "EA",
        "unitType": "unit type 1"
      },

    ];

    this.listOfTaxTypes = [
      {
        "id": "V009",
        "taxType": "tax type 1"
      },

    ];
    this.model = new CreateItemRequestDto;

  }

  // #region end

  // #region ngOnInit

  ngOnInit(): void {
    this.model.id = this.route.snapshot.params["id"];
    this.getItemById(this.model.id)

  }

  // #endregion

  // #region form actions

  createItem(model: CreateItemRequestDto) {
    console.log('create item')
    this.itemService.createItem(model).subscribe((res: ResponseDto) => {

      this.dialogService.successAndRouteBack("/item/list");




    });
  }

  updateItem(model: CreateItemRequestDto) {
    this.itemService.updateItem(model).subscribe((res: ResponseDto) => {

      this.dialogService.successAndRouteBack("/item/list");




    });

  }

  getItemById(id: number) {

    this.itemService.getItemById(id).subscribe((res: ResponseDto) => {

      this.model = res.data;





    });

  }
  // #region end 



  // #region main actions

  cancelAndRouteBack() {
    this.dialogService.cancelAndRouteBack("Are you sure?", "You won't be able to revert this!", "/item/list");
  }

  // #endregion

}
