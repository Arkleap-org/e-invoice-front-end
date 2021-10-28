// angular core
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ResponseDto } from 'src/app/shared/models/api-response.model';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { InvoiceService } from 'src/app/shared/services/invoice.service';

@Component({
  selector: 'app-invoice-cancel',
  templateUrl: './invoice-cancel.component.html',
  styleUrls: ['./invoice-cancel.component.scss']
})

export class InvoiceCancelComponent implements OnInit {

  // #region declare variables

  isSubmitted: boolean;

  invoiceId!: number;

  // names of forms
  cancelForm!: FormGroup;

  // #endregion

  // #region constructor

  constructor(
    private formBuilder: FormBuilder,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    public dialog: MatDialog,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    // init variables
    this.isSubmitted = false;
    this.invoiceId = data;

    // init forms
    this.initForms();
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {
  }

  // #endregion

  // #region init forms

  initForms() {
    this.initCancelForm();
  }

  initCancelForm() {
    this.cancelForm = this.formBuilder.group({
      cancel_reason: ['', Validators.required]
    });
  }

  get cancelFormControls() {
    return this.cancelForm.controls;
  }

  // #endregion

  // #region main actions

  cancelInvoice(form: FormGroup) {
    this.isSubmitted = true;
    if (form.valid) {
      this.invoiceService.cancelInvoice(this.invoiceId, form.value).subscribe((response: ResponseDto) => {
        this.dialogService.savedSuccessfully('Invoice Cancelled Successfully!');
        this.isSubmitted = false;
        this.dialog.closeAll();
      });
    }

  }

  // #endregion

}
