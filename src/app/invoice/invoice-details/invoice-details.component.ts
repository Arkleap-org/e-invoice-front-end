// angular core
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

// modals
import { ResponseDto } from 'src/app/shared/models/api-response.model';
import { ReceiverDto } from 'src/app/shared/models/receiver.model';
import { ReceiverComponent } from 'src/app/shared/popups/receiver/receiver.component';

// services
import { DialogService } from 'src/app/shared/services/dialog.service';
import { InvoiceService } from 'src/app/shared/services/invoice.service';
import { ReceiverService } from 'src/app/shared/services/receiver.service';


@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})

export class InvoiceDetailsComponent implements OnInit {

  // #region declare variables

  documentTypeVersion!: string;
  receiverId!: number;
  isReceiver: boolean;

  // names of lists
  listOfReceivers: ReceiverDto[];
  listOfDocumentTypes: { label: string, value: string }[];
  listOfItems: { id: number, name: string }[];

  // names of forms
  invoiceForm!: FormGroup
  lines!: FormArray;

  // names of details
  receiverDetails: ReceiverDto;


  // #endregion

  // #region constructor

  constructor(
    private dialogService: DialogService,
    private invoiceService: InvoiceService,
    private receiverService: ReceiverService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    // init variables

    this.listOfReceivers = [];

    this.listOfDocumentTypes = [
      { label: "Invoice", value: "I" },
      { label: "Credit Memo", value: "C" },
      { label: "Debit Memo", value: "D" }
    ];

    this.listOfItems = [
      {
        id: 1,
        name: "item 1"
      },
      {
        id: 2,
        name: "item 2"
      }
    ];

    this.receiverDetails = new ReceiverDto;

    this.isReceiver = false;

    // init forms
    this.initForms();
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {
    this.listReceivers();
  }

  // #endregion

  // #region init forms

  initForms() {
    this.initInvoiceForm();
  }

  initInvoiceForm() {
    this.invoiceForm = this.formBuilder.group({
      document_type: [null, Validators.required],
      receiver: [null, Validators.required],
      document_type_version: ['', Validators.required],
      internal_id: ['', Validators.required],
      date_time_issued: ['', Validators.required],
      lines: this.formBuilder.array([this.createLines()])
    });
  }

  createLines(): FormGroup {
    return this.formBuilder.group({
      item: [null],
      description: [''],
      quantity: [''],
      unit_price: [''],
      sales_total: [''],
      discount_amount: [''],
      tax_amount: [''],
      net_total: [''],
      total_amount: ['']
    });
  }

  addLine(): void {
    this.lines = this.invoiceForm.get('lines') as FormArray;
    this.lines.push(this.createLines());
  }

  deleteRow(index: number) {
    this.lines.removeAt(index);
  }

  get invoiceControls(): FormArray {
    return this.invoiceForm.get('lines') as FormArray;
  }

  // #endregion

  // #region main actions

  listReceivers() {
    this.receiverService.listReceivers().subscribe((response: ResponseDto) => {
      this.listOfReceivers = response.data;
    });
  }

  getReceiver() {
    this.receiverService.getReciever(this.receiverId).subscribe((response: ResponseDto) => {
      this.receiverDetails = response.data;
      console.log(this.receiverDetails);
      this.isReceiver = true;
    });

  }

  openReceiverPopup() {
    const dialogRef = this.dialog.open(ReceiverComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.listReceivers();
    });
  }

  cancelAndRouteBack() {
    this.dialogService.cancelAndRouteBack("Are you sure?", "You won't be able to revert this!", "/home");
  }

  // #end region

}
