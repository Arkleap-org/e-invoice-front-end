// angular core
import { Component, OnInit } from '@angular/core';

// angular forms
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

// angular material dialog
import { MatDialog } from '@angular/material/dialog';

// components
import { ReceiverComponent } from '../../shared/popups/receiver/receiver.component';

// modals
import { ResponseDto } from '../../shared/models/api-response.model';
import { ListItemsResponseDto } from '../../shared/models/items.model';
import { ReceiverDto } from '../../shared/models/receiver.model';

// services
import { DialogService } from '../../shared/services/dialog.service';
import { InvoiceService } from '../../shared/services/invoice.service';
import { ItemsService } from '../../shared/services/items.service';
import { ReceiverService } from '../../shared/services/receiver.service';
import { LinesDto } from 'src/app/shared/models/invoice.model';


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
  itemId!: number;
  // check if add more is clicked and data is not filled
  addMore: boolean;

  // names of lists
  listOfReceivers: ReceiverDto[];
  listOfDocumentTypes: { label: string, value: string }[];
  listOfItems: ListItemsResponseDto[];

  // names of forms
  invoiceForm!: FormGroup
  lines!: FormArray;

  // names of details
  receiverDetails: ReceiverDto;
  itemDetails: ListItemsResponseDto;
  linesDetails: LinesDto;


  // #endregion

  // #region constructor

  constructor(
    private dialogService: DialogService,
    private invoiceService: InvoiceService,
    private receiverService: ReceiverService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private itemsService: ItemsService
  ) {
    // init variables

    this.listOfReceivers = [];

    this.listOfDocumentTypes = [
      { label: "Invoice", value: "I" },
      { label: "Credit Memo", value: "C" },
      { label: "Debit Memo", value: "D" }
    ];

    this.listOfItems = [];

    this.receiverDetails = new ReceiverDto;

    this.isReceiver = false;

    this.itemDetails = new ListItemsResponseDto;
    this.linesDetails = new LinesDto;

    const newLine = new LinesDto;
    // this.linesDetails.push(newLine)

    this.addMore = false;

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
      item: [null, Validators.required],
      description: [''],
      quantity: ['', Validators.required],
      unit_price: ['', Validators.required],
      sales_total: [''],
      discount_amount: ['', Validators.required],
      tax_amount: [''],
      net_total: [''],
      total_amount: ['']
    });
  }

  addLine(form: any): void {
    this.addMore = true;
    if (form.valid) {

      this.lines = this.invoiceForm.get('lines') as FormArray;
      this.lines.push(this.createLines());
      this.addMore = false;
    }
  }

  deleteRow(index: number) {
    this.lines.removeAt(index);
  }

  get invoiceLinesControls(): FormArray {
    return this.invoiceForm.get('lines') as FormArray;
  }

  get invoiceControls() {
    return this.invoiceForm.controls;
  }

  // #endregion

  // #region load controls

  loadControls() {
    this.listReceivers();
    this.listItems();
  }

  listReceivers() {
    this.receiverService.listReceivers().subscribe((response: ResponseDto) => {
      this.listOfReceivers = response.data;
    });
  }

  listItems() {
    this.itemsService.listItems().subscribe((response: ResponseDto) => {
      this.listOfItems = response.data
    });
  }

  // #endregion

  // #region main actions


  getReceiver() {
    this.receiverService.getReciever(this.receiverId).subscribe((response: ResponseDto) => {
      this.receiverDetails = response.data;
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

  getItemById() {
    this.itemsService.getItemById(this.itemId).subscribe((response: ResponseDto) => {
      this.itemDetails = response.data;
      console.log(this.itemDetails);

    });
  }

  createInvoice() {

  }


  // #end region

}
