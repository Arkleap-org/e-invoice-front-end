// angular core
import { Component, OnInit } from '@angular/core';

// angular router
import { Router } from '@angular/router';

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
    private router: Router
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

  cancel() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "$success",
      cancelButtonColor: "$secondary",
      confirmButtonText: "Yes, I am sure!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(["/home"]);
      }
    });
  }

  // #endregion

}
