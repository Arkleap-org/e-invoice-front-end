// angular core
import { Component, OnInit } from '@angular/core';

// angular forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

// models
import { ResponseDto } from '../../shared/models/api-response.model';
import { CountryDto } from '../../shared/models/country.model';
import { IssuerAddressDto } from '../../shared/models/issuer.model';

// services
import { DialogService } from '../../shared/services/dialog.service';
import { IssuerAddressService } from '../../shared/services/issuer-address.service';
import { ListsService } from '../../shared/services/lists.service';


@Component({
  selector: 'app-issuer-address',
  templateUrl: './issuer-address.component.html',
  styleUrls: ['./issuer-address.component.scss'],
})

export class IssuerAddressComponent implements OnInit {

  // #region declare variables

  isSubmitted: boolean;

  // names of lists
  listOfCountries: CountryDto[];
  listOfIssuerAddresses: IssuerAddressDto[];

  // names of models
  addressDetails: IssuerAddressDto;

  // names of forms
  addressForm!: FormGroup;

  // names of params
  addressId!: number;

  // #endregion

  // #region constructor

  constructor(
    private listsService: ListsService,
    private dialogService: DialogService,
    private addressService: IssuerAddressService,
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

    // init variables
    this.listOfCountries = [];
    this.addressDetails = new IssuerAddressDto;
    this.isSubmitted = false;
    this.listOfIssuerAddresses = [];

    // init forms
    this.initForms();
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {
    this.addressId = this.route.snapshot.params["id"];

    this.loadControls();
    // keep calling api while updating params
    this.route.params.subscribe(params => {
      this.addressId = params['id'];
      if (this.addressId) this.getAddressById(this.addressId);
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
      postalCode: [''],
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

  // #region load controls

  // load controls
  loadControls() {
    this.listCountries();
    this.listAddresses();
  }

  // list countries
  listCountries() {
    this.listsService.listCountries().subscribe((response: ResponseDto) => this.listOfCountries = response.data);
  }

  listAddresses() {
    this.addressService.listAddresses().subscribe((response: ResponseDto) => this.listOfIssuerAddresses = response.data);
  }

  // #endregion


  // #region main actions

  createAddress() {
    this.isSubmitted = true;

    if (this.addressForm.valid) {
      this.addressService.createAddress(this.addressDetails).subscribe((response: ResponseDto) => {
        this.addressForm.reset();
        this.isSubmitted = false;
        this.listAddresses();
        this.dialogService.savedSuccessfully('Address saved successfully.')
      });
    }
  }

  cancelAndRouteBack() {
    this.dialogService.cancelAndRouteBack("Are you sure?", "You won't be able to revert this!", "/home");
  }

  getAddressById(id: number) {
    this.addressService.getAddressById(id).subscribe((response: ResponseDto) => {
      this.addressDetails = response.data;
    });
  }

  getAddressOnUpdate(id: number) {
    this.router.navigate([`/issuer/address/${id}`]);
    this.getAddressById(id)
  }

  updateAddress(id: number) {
    this.addressService.updateAddress(id, this.addressDetails).subscribe((response: ResponseDto) => {
      this.router.navigate(['/issuer/address'])
      this.listAddresses();
      this.dialogService.savedSuccessfully('Address updated successfully.')
    });
  }

  // #endregion

}
