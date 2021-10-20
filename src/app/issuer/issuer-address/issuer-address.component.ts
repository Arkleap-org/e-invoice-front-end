// angular core
import { Component, OnInit } from '@angular/core';

// angular forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  isSubmitted: boolean;

  // names of lists
  listOfCountries: CountryDto[];

  // names of models
  addressDetails: IssuerAddressDto;

  // names of forms
  addressForm!: FormGroup;

  // #endregion

  // #region constructor

  constructor(
    private listsService: ListsService,
    private dialogService: DialogService,
    private addressService: IssuerAddressService,
    private formBuilder: FormBuilder
  ) {

    // init variables
    this.listOfCountries = [];
    this.addressDetails = new IssuerAddressDto;
    this.isSubmitted = false;

    // init forms
    this.initForms();
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

  // #region init forms

  initForms() {
    this.initAddressForm();
  }

  initAddressForm() {
    this.addressForm = this.formBuilder.group({
      branch_id: ['', Validators.required],
      country: ['', Validators.required],
      governate: ['', Validators.required],
      regionCity: ['', Validators.required],
      street: ['', Validators.required],
      buildingNumber: ['', Validators.required],
      postalCode: ['', Validators.required],
      floor: [''],
      room: [''],
      landmark: [''],
      additionalInformation: ['']
    });
  }

  // form controls
  get addressFormControls() {
    return this.addressForm.controls;
  }

  // #endregion

  // #region main actions

  createAddress() {
    this.isSubmitted = true;

    if (this.addressForm.valid) {
      this.addressService.createAddress(this.addressDetails).subscribe((response: ResponseDto) => {
        this.addressForm.reset();
        this.isSubmitted = false;
        this.dialogService.savedSuccessfully('Address saved successfully.')
      });
    }
  }

  cancelAndRouteBack() {
    this.dialogService.cancelAndRouteBack("Are you sure?", "You won't be able to revert this!", "/home");
  }

  // #endregion

}
