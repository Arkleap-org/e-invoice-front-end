// angular modules
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// constants
import { ListOfPersonTypes } from '../../shared/constants/list.constant';

// models
import { ResponseDto } from '../../shared/models/api-response.model';
import { ReceiverDto } from '../../shared/models/receiver.model';

// services
import { ListsService } from '../../shared/services/lists.service';
import { ReceiverService } from '../../shared/services/receiver.service';

@Component({
  selector: 'app-receiver',
  templateUrl: './add-receiver.component.html',
  styleUrls: ['./add-receiver.component.scss']
})

export class AddReceiverComponent implements OnInit {

  // #region declare variables

  receiverDetails: ReceiverDto;

  // names of booleans
  isSubmitted: boolean;


  // names of lists
  listOfReceiverType: { label: string, value: string }[];
  listOfCountries: { code: string, desc_en: string, desc_ar: string }[];

  // name of forms
  receiverForm!: FormGroup

  // #endregion

  // #region constructor

  constructor(
    private formBuilder: FormBuilder,
    private listsService: ListsService,
    public translate: TranslateService,
    private receiverService: ReceiverService,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { id: number },
  ) {
    // init variables
    this.listOfReceiverType = ListOfPersonTypes;
    this.listOfCountries = [];
    this.receiverDetails = new ReceiverDto;
    this.receiverDetails.id = this.data?.id;
    this.isSubmitted = false;

    // init forms
    this.handleRegistrationNumberValidation = this.handleRegistrationNumberValidation.bind(this);
    this.initForms();

  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {
    this.loadControls();
  }

  // #endregion

  // #region init forms

  initForms() {
    this.initReceiverFrom();
  }

  initReceiverFrom() {
    this.receiverForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      taxable_receiver_name: ['', Validators.required],
      type: ['', Validators.required],
      reg_num: ['', [this.handleRegistrationNumberValidation]],
      country: ['', Validators.required],
      governate: ['', Validators.required],
      regionCity: ['', Validators.required],
      street: ['', Validators.required],
      buildingNumber: ['', Validators.required],
      isTaxable: [, Validators.required]
    });
  }

  get receiverFormControls() {
    return this.receiverForm.controls;
  }

  handleRegistrationNumberValidation(control: FormControl) {
    if( (control && !control.value) && (this.receiverDetails.type == 'B' || this.receiverDetails.type == 'F')) {
      return {isRequired : true}
    }
    else return null;
  }

  // #endregion

  // #region load controls

  loadControls() {
    this.listCountries();
    this.getReceiver(this.receiverDetails.id);
  }

  listCountries() {
    this.listsService.listCountries().subscribe((response: ResponseDto) => {
      this.listOfCountries = response.data
    });
  }

  getReceiver(id: number) {
    if (id)
      this.receiverService.getReciever(id).subscribe((response: ResponseDto) => {
        this.receiverDetails = response.data;
      });
  }

  // #endregion

  // #region main actions


  handleSaveReceiver(model: ReceiverDto) {
    this.isSubmitted = true;
    if (this.receiverForm.valid) {
      if (model.id) this.updateReceiver(model);
      else this.createReceiver(model);
    }

  }

  updateReceiver(model: ReceiverDto) {
    this.receiverService.updateReceiver(model).subscribe((response: ResponseDto) => {
      this.isSubmitted = false;
      this.dialog.closeAll();
    });
  }

  createReceiver(model: ReceiverDto) {
    this.receiverService.createReceiver(model).subscribe((response: ResponseDto) => {
      this.isSubmitted = false;
      this.dialog.closeAll();
    });
  }

  // #endregion

}

