// angular core
import { Component, OnInit } from '@angular/core';

// angular router
import { Router } from '@angular/router';
import { ResponseDto } from 'src/app/shared/models/api-response.model';
import { IssuerDto } from 'src/app/shared/models/issuer.model';
import { IssuerService } from 'src/app/shared/services/issuer.service';
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
  issuerDetails: IssuerDto;


  // #endregion

  // #region constructor

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private issuerService: IssuerService
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

    this.issuerDetails = new IssuerDto;

  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {
    this.getIssuer();
  }

  // #endregion

  // #region main actions

  getIssuer() {
    this.issuerService.getIssuer()
      .subscribe(
        (response: ResponseDto) => {
          console.log('issuer ', response.data)
          this.issuerDetails = response.data;
        }
      );
  }


  cancelAndRouteBack() {
    this.dialogService.cancelAndRouteBack("Are you sure?", "You won't be able to revert this!", "/home");
  }

  // #endregion

}
