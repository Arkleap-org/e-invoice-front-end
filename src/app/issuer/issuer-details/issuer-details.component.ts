// angular core
import { Component, OnInit } from '@angular/core';

// angular router
import { Router } from '@angular/router';
import { ResponseDto } from 'src/app/shared/models/api-response.model';
import { CountryDto } from 'src/app/shared/models/country.model';
import { IssuerDto } from 'src/app/shared/models/issuer.model';
import { IssuerService } from 'src/app/shared/services/issuer.service';
import { ListsService } from 'src/app/shared/services/lists.service';
import { DialogService } from '../../shared/services/dialog.service';

@Component({
  templateUrl: './issuer-details.component.html',
  styleUrls: ['./issuer-details.component.scss']
})

export class IssuerDetailsComponent implements OnInit {

  // #region declare variables

  issuerTypeSource: { label: string, value: string }[];
  listOfActivityCodes: {}[];
  listOfCountries!: CountryDto[];
  issuerDetails: IssuerDto;


  // #endregion

  // #region constructor

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private issuerService: IssuerService,
    private listsService: ListsService
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

    // this.listOfCountries = new CountryDto;

    this.issuerDetails = new IssuerDto;
    this.listCountries();

  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {
    this.getIssuer();
  }

  // #endregion

  // #region main actions

  // get current issuer data
  getIssuer() {
    this.issuerService.getIssuer()
      .subscribe(
        (response: ResponseDto) => {
          console.log('issuer ', response.data)
          this.issuerDetails = response.data;
        }
      );
  }

  // list countries
  listCountries() {
    this.listsService.listCountries()
      .subscribe(
        (response: ResponseDto) => {
          console.log('countriessss ', response);
          this.listOfCountries = response.data
        }
      );
  }

  saveIssuer() {
    if (this.issuerDetails.id) {
      // update
      this.issuerService.updateIssuer(this.issuerDetails)
        .subscribe(
          (response: ResponseDto) => {
            console.log('creattttteee ', response)
          }
        );

    }
    else {
      // create
    }
  }


  cancelAndRouteBack() {
    this.dialogService.cancelAndRouteBack("Are you sure?", "You won't be able to revert this!", "/home");
  }

  // #endregion

}
