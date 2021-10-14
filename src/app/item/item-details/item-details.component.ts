// angular core
import { Component, OnInit } from '@angular/core';

// angular router
import { Router } from '@angular/router';
import { DialogService } from '../../shared/services/dialog.service';

// sweetalert
import Swal from 'sweetalert2';

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

  // #endregion

  // #region constructor

  constructor(
    private router: Router,
    private dialogService: DialogService
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

    this.listOfUnitTypes = [
      {
        "id": 1,
        "unitType": "unit type 1"
      },
      {
        "id": 2,
        "unitType": "unit type 2"
      },
      {
        "id": 3,
        "unitType": "unit type 3"
      }
    ];

    this.listOfTaxTypes = [
      {
        "id": 1,
        "taxType": "tax type 1"
      },
      {
        "id": 2,
        "taxType": "tax type 2"
      },
      {
        "id": 3,
        "taxType": "tax type 3"
      }
    ];
  }

  // #region end

  // #region ngOnInit

  ngOnInit(): void {
  }

  // #endregion

  // #region main actions

  cancelAndRouteBack() {
    this.dialogService.cancelAndRouteBack("Are you sure?", "You won't be able to revert this!", "/item/list");
  }

  // #endregion

}
