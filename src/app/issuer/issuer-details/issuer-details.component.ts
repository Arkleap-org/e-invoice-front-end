// angular core
import { Component, OnInit } from "@angular/core";

// angular forms
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

// models
import { ActivityCodeDto } from "../../shared/models/activity-code.model";
import { ResponseDto } from "../../shared/models/api-response.model";
import { CountryDto } from "../../shared/models/country.model";
import { IssuerAddressDto, IssuerDto } from "../../shared/models/issuer.model";

// services
import { IssuerService } from "../../shared/services/issuer.service";
import { ListsService } from "../../shared/services/lists.service";
import { DialogService } from "../../shared/services/dialog.service";

@Component({
  templateUrl: "./issuer-details.component.html",
  styleUrls: ["./issuer-details.component.scss"]
})

export class IssuerDetailsComponent implements OnInit {

  // #region declare variables

  isSubmitted: boolean;

  // name of lists
  listOfIssuerTypes: { label: string, value: string }[];
  listOfActivityCodes: ActivityCodeDto[];
  listOfCountries!: CountryDto[];

  // name of models
  issuerDetails: IssuerDto;
  issuerAddress!: IssuerAddressDto;

  // name of forms
  issuerForm!: FormGroup;
  addressForm!: FormGroup;

  // #endregion

  // #region constructor

  constructor(
    private dialogService: DialogService,
    private issuerService: IssuerService,
    private listsService: ListsService,
    private formBuilder: FormBuilder
  ) {

    // init variables
    this.listOfIssuerTypes = [
      { label: 'Business', value: 'B' },
      { label: 'Natural Preson', value: 'NP' },
      { label: 'Foreigner', value: 'F' }
    ];
    this.listOfActivityCodes = [];
    this.listOfCountries = [];
    this.issuerDetails = new IssuerDto;
    this.issuerAddress = new IssuerAddressDto;
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

  // #region init Forms

  initForms() {
    this.initIssuerForm();
    this.initAddressForm();
  }

  initIssuerForm() {
    this.issuerForm = this.formBuilder.group({
      name: ['', Validators.required],
      reg_num: ['', Validators.required],
      type: ['', Validators.required],
      activity_code: ['', Validators.required],
      client_id: ['', Validators.required],
      clientSecret1: ['', Validators.required],
      clientSecret2: ['']
    });
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

  // get issuer form controls
  get issuerFormControls() {
    return this.issuerForm.controls;
  }

  // get address form controls
  get addressFormControls() {
    return this.addressForm.controls;
  }

  // #endregion

  // #region load controls

  loadControls() {
    this.listCountries();
    this.listActivityCodes();
    this.getIssuer();
  }

  // get current issuer data
  getIssuer() {
    this.issuerService.getIssuer().subscribe((response: ResponseDto) => {
      this.issuerDetails = response.data;
      this.issuerAddress = response.data.issuer_addresses[0];
    });
  }

  // list countries
  listCountries() {
    this.listsService.listCountries().subscribe((response: ResponseDto) => {
      this.listOfCountries = response.data
    });
  }

  // list activity codes
  listActivityCodes() {
    this.listsService.listActivityCodes().subscribe((response: ResponseDto) => {
      this.listOfActivityCodes = response.data;
    });
  }

  // #endregion

  // #region main actions

  // save issuer data in update and create
  saveIssuer() {
    this.isSubmitted = true;
    if (this.issuerForm.valid && this.addressForm.valid) {
      const model = Object.assign({}, this.issuerDetails)
      if (this.issuerDetails.id) this.updateIssuer(model);
      else this.createIssuer(model)
    }
  }

  updateIssuer(model: IssuerDto) {
    this.issuerService.updateIssuer(model).subscribe((response: ResponseDto) => {
      this.isSubmitted = false;
      this.dialogService.savedSuccessfully('Issuer has been updated successfully.');
    });
  }

  createIssuer(model: IssuerDto) {
    model.issuer_addresses = [this.issuerAddress];
    this.issuerService.createIssuer(model).subscribe((response: ResponseDto) => {
      this.isSubmitted = false;
      this.dialogService.savedSuccessfully('Issuer has been created successfully.');
      this.issuerDetails = response.data;
      this.issuerAddress = response.data.issuer_addresses[0];
    });

  }


  cancelAndRouteBack() {
    this.dialogService.cancelAndRouteBack("Are you sure?", "You won't be able to revert this!", "/home");
  }

  // #endregion

}
