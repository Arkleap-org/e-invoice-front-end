// angular modules
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

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
  listOfCountries: { code: string, en_name: string, ar_name: string }[];

  // name of forms
  receiverForm!: FormGroup

  // #endregion

  // #region constructor

  constructor(
    private formBuilder: FormBuilder,
    private listsService: ListsService,
    public translate: TranslateService,
    private receiverService: ReceiverService,
    public dialog: MatDialog
  ) {
    // init variables
    this.listOfReceiverType = ListOfPersonTypes;
    this.listOfCountries = [];
    this.receiverDetails = new ReceiverDto;
    this.isSubmitted = false

    // init forms
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
      name: ['', Validators.required],
      type: ['', Validators.required],
      reg_num: ['', Validators.required],
      country: ['', Validators.required],
      governate: ['', Validators.required],
      regionCity: ['', Validators.required],
      street: ['', Validators.required],
      buildingNumber: ['', Validators.required]
    });
  }

  get receiverFormControls() {
    return this.receiverForm.controls;
  }

  // #endregion

  // #region load controls

  loadControls() {
    this.listCountries();
  }

  listCountries() {
    this.listsService.listCountries().subscribe((response: ResponseDto) => {
      this.listOfCountries = response.data
    });
  }

  // #endregion

  // #region main actions

  createReceiver(form: FormGroup) {
    this.isSubmitted = true;
    if (form.valid) {
      this.receiverService.createReceiver(this.receiverDetails).subscribe((response: ResponseDto) => {
        this.isSubmitted = false;
        this.dialog.closeAll();
      });
    }
  }

  // #endregion

}
