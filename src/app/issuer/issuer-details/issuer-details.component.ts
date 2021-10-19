// angular core
import { Component, OnInit } from '@angular/core';

// models
import { ActivityCodeDto } from 'src/app/shared/models/activity-code.model';
import { ResponseDto } from 'src/app/shared/models/api-response.model';
import { CountryDto } from 'src/app/shared/models/country.model';
import { IssuerDto } from 'src/app/shared/models/issuer.model';

// services
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
  listOfActivityCodes: ActivityCodeDto[];
  listOfCountries!: CountryDto[];
  issuerDetails: IssuerDto;

  // #endregion

  // #region constructor

  constructor(
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

    this.listOfActivityCodes = [];

    this.listOfCountries = [];

    this.issuerDetails = new IssuerDto;

  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {
    this.loadControls();
  }

  // #endregion

  // #region load controls

  loadControls() {
    this.listCountries();
    this.listActivityCodes();
    this.getIssuer();
  }

  // #endregion

  // #region main actions

  // get current issuer data
  getIssuer() {
    this.issuerService.getIssuer()
      .subscribe(
        (response: ResponseDto) => {
          this.issuerDetails = response.data;
        }
      );
  }

  // list countries
  listCountries() {
    this.listsService.listCountries()
      .subscribe(
        (response: ResponseDto) => {
          this.listOfCountries = response.data
        }
      );
  }

  // list activity codes
  listActivityCodes() {
    this.listsService.listActivityCodes()
      .subscribe(
        (response: ResponseDto) => {
          console.log('activityyy ', response);
          this.listOfActivityCodes = response.data;

        }
      );
  }

  // save issuer data in update and create
  saveIssuer() {
    if (this.issuerDetails.id) {
      // update
      this.issuerService.updateIssuer(this.issuerDetails)
        .subscribe(
          (response: ResponseDto) => {
            this.dialogService.savedSuccessfully('Issuer has been updated successfully.');
          }
        );

    }
    else {
      // create
      this.issuerService.createIssuer(this.issuerDetails)
        .subscribe(
          (response) => {
            this.dialogService.savedSuccessfully('Issuer has been created successfully.');
          }
        )
    }
  }


  cancelAndRouteBack() {
    this.dialogService.cancelAndRouteBack("Are you sure?", "You won't be able to revert this!", "/home");
  }

  // #endregion

}
