// angular core
import { Component, Inject, OnInit, Optional } from '@angular/core';

// angular forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// angular material
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

// angular router
import { ActivatedRoute } from '@angular/router';

// models
import { ResponseDto } from '../../models/api-response.model';

// services
import { DialogService } from '../../services/dialog.service';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice-cancel',
  templateUrl: './invoice-cancel.component.html',
  styleUrls: ['./invoice-cancel.component.scss']
})

export class InvoiceCancelComponent implements OnInit {

  // #region declare variables

  isSubmitted: boolean;

  invoiceId!: number;
  title!: string;
  subTitle!: string;

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
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { invoiceId: number, title: string, subTitle: string },
  ) {
    // init variables
    this.isSubmitted = false;
    this.invoiceId = data.invoiceId;
    this.title = data.title;
    this.subTitle = data.title;

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

  handleSubmitAction(form: FormGroup) {
    this.isSubmitted = true;
    if (form.valid) {
      if (this.title.toLowerCase().includes('cancel')) this.cancelInvoice(this.invoiceId, form);
      else this.rejectInvoice(this.invoiceId, form.value.cancel_reason)
    }
  }

  handleSaveResponse(msg: string) {
    this.dialogService.savedSuccessfully(msg);
    this.isSubmitted = false;
    this.dialog.closeAll();
  }

  cancelInvoice(id: number, form: FormGroup) {
    this.invoiceService.cancelInvoice(id, form.value).subscribe((response: ResponseDto) => {
      this.handleSaveResponse('Invoice Cancelled Successfully!');
    });
  }

  rejectInvoice(id: number, reject_reason: string) {
    this.invoiceService.rejectInvoice(id, reject_reason).subscribe((res: ResponseDto) => {
      this.handleSaveResponse('Invoice Rejected Successfully!');
    });
  }

  // #endregion

}
