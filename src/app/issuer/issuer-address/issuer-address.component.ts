// angular core
import { Component, OnInit } from '@angular/core';

// models
import { ResponseDto } from 'src/app/shared/models/api-response.model';
import { CountryDto } from 'src/app/shared/models/country.model';
import { IssuerAddressDto } from 'src/app/shared/models/issuer.model';

// services
import { DialogService } from 'src/app/shared/services/dialog.service';
import { IssuerAddressService } from 'src/app/shared/services/issuer-address.service';
import { ListsService } from 'src/app/shared/services/lists.service';


@Component({
  selector: 'app-issuer-address',
  templateUrl: './issuer-address.component.html',
  styleUrls: ['./issuer-address.component.scss']
})

export class IssuerAddressComponent implements OnInit {

  // #region declare variables

  listOfCountries: CountryDto[];
  addressDetails: IssuerAddressDto;

  // #endregion

  // #region constructor

  constructor(
    private listsService: ListsService,
    private dialogService: DialogService,
    private addressService: IssuerAddressService
  ) {

    // init variables
    this.listOfCountries = [];
    this.addressDetails = new IssuerAddressDto;
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {
    this.loadControls();
  }

  // #endregion

  // #region load controls

  // load controls
  loadControls() {
    this.listCountries();
  }

  // list countries
  listCountries() {
    this.listsService.listCountries().subscribe((response: ResponseDto) => {
      this.listOfCountries = response.data
    });
  }

  // #endregion

  // #region main actions

  createAddress() {
    this.addressService.createAddress(this.addressDetails).subscribe((response: ResponseDto) => {
      this.dialogService.savedSuccessfully('Address saved successfully.')
    });
  }

  cancelAndRouteBack() {
    this.dialogService.cancelAndRouteBack("Are you sure?", "You won't be able to revert this!", "/home");
  }

  // #endregion

}
