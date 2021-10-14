// angular core
import { Component, OnInit } from '@angular/core';

// angular router
import { Router } from '@angular/router';
import { DialogService } from '../../shared/services/dialog.service';

@Component({
  templateUrl: './issuer-details.component.html',
  styleUrls: ['./issuer-details.component.scss']
})

export class IssuerDetailsComponent implements OnInit {

  // #region declare variables

  issuerTypeSource: { label: string, value: string }[];
  listOfActivityCodes: {}[];
  listOfCountries: { code: string, en_name: string, ar_name: string }[];


  // #endregion

  // #region constructor

  constructor(
    private router: Router,
    private dialogService: DialogService
  ) {
    // init variables
    this.issuerTypeSource = [
      {
        label: 'Business',
        value: 'B'
      },
      {
        label: 'Natural Preson',
        value: 'NP'
      },
      {
        label: 'Foreigner',
        value: 'F'
      }
    ];

    this.listOfActivityCodes = [
      {
        id: 1,
        activityCode: "activity 1"
      },
      {
        id: 2,
        activityCode: "activity 2"
      },
      {
        id: 3,
        activityCode: "activity 3"
      }
    ];

    this.listOfCountries = [
      {
        code: 'EG',
        en_name: 'Egypt',
        ar_name: 'مصر'
      },
      {
        code: 'UK',
        en_name: 'United Kingdom',
        ar_name: 'المملكة المتحدة'
      }
    ];

  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {
  }

  // #endregion

  // #region main actions


  cancelAndRouteBack() {
    this.dialogService.cancelAndRouteBack("Are you sure?", "You won't be able to revert this!", "/home");
  }

  // #endregion

}
