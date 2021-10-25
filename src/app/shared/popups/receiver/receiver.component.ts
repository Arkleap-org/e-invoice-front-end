// angular core
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ResponseDto } from '../../models/api-response.model';
import { ReceiverDto } from '../../models/receiver.model';
import { ListsService } from '../../services/lists.service';
import { ReceiverService } from '../../services/receiver.service';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.scss']
})

export class ReceiverComponent implements OnInit {

  // #region declare variables

  receiverDetails: ReceiverDto;

  // names of lists
  listOfReceiverType: { label: string, value: string }[];
  listOfCountries: { code: string, en_name: string, ar_name: string }[];

  // name of forms
  receiverForm!: FormGroup


  // #endregion

  // region constructor

  constructor(
    private formBuilder: FormBuilder,
    private listsService: ListsService,
    public translate: TranslateService,
    private receiverService: ReceiverService
  ) {
    // init variables
    this.listOfReceiverType = [
      { label: 'Business', value: 'B' },
      { label: 'Natural Person', value: 'P' },
      { label: 'Foreigner', value: 'F' }
    ];

    this.listOfCountries = [];

    this.receiverDetails = new ReceiverDto;

    // init forms
    this.initForms();
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {
    this.listCountries();
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

  // #endregion

  // #region main actions

  // list countries
  listCountries() {
    this.listsService.listCountries().subscribe((response: ResponseDto) => {
      this.listOfCountries = response.data
    });
  }

  createReceiver(form: FormGroup) {

  }

  // #endregion

}
