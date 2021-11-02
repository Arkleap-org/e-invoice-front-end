// angular core
import { Component, OnInit } from '@angular/core';

// angular common
import { DatePipe } from '@angular/common';

// angular forms
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

// angular material dialog
import { MatDialog } from '@angular/material/dialog';

// components
import { AddReceiverComponent } from '../../receiver/add-receiver/add-receiver.component';
import { InvoiceLineComponent } from '../../shared/popups/invoice-line/invoice-line.component';

// constants
import { ListOfDocumentTypes } from '../../shared/constants/list.constant';

// modals
import { ResponseDto } from '../../shared/models/api-response.model';
import { ListItemsResponseDto } from '../../shared/models/items.model';
import { ReceiverDto } from '../../shared/models/receiver.model';
import { LinesDto } from '../../shared/models/invoice.model';

// services
import { DialogService } from '../../shared/services/dialog.service';
import { InvoiceService } from '../../shared/services/invoice.service';
import { ItemsService } from '../../shared/services/items.service';
import { ReceiverService } from '../../shared/services/receiver.service';

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
  hasItem: boolean
  hasQty: boolean;
  isSubmitted: boolean;
  itemName: string[];

  // names of lists
  listOfReceivers: ReceiverDto[];
  listOfDocumentTypes: { label: string, value: string }[];
  listOfItems: ListItemsResponseDto[];

  // names of forms
  invoiceForm!: FormGroup
  lines!: FormArray;
  linesForm!: FormGroup;

  // names of details
  receiverDetails: ReceiverDto;
  itemDetails: ListItemsResponseDto[];
  linesDetails: LinesDto[];
  newLineDetails: LinesDto[];

  // names of total calculations
  totalSalesAmount!: number;
  totalTaxTotals!: number;
  totalInvoiceAmount!: number;
  totalDiscountAmount!: number;


  // #endregion

  // #region constructor

  constructor(
    private dialogService: DialogService,
    private invoiceService: InvoiceService,
    private receiverService: ReceiverService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private itemsService: ItemsService,
    public datepipe: DatePipe
  ) {
    // init variables

    this.listOfReceivers = this.listOfItems = this.itemDetails = this.linesDetails = this.newLineDetails = this.itemName = [];

    this.listOfDocumentTypes = ListOfDocumentTypes;


    this.receiverDetails = new ReceiverDto;


    const newItemDetail = new ListItemsResponseDto
    this.itemDetails.push(newItemDetail);

    const newLine = new LinesDto;
    this.linesDetails.push(newLine)

    this.isReceiver = this.hasItem = this.hasQty = this.isSubmitted = false;

    this.resetTotals();



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
      date_time_issued: [(new Date()).toISOString().substring(0, 10), Validators.required],
      lines: this.formBuilder.array([])
    });
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

  // #region invoice summary calculations

  calculateSummary() {
    this.resetTotals();
    let taxTotals: number = 0;
    for (let i in this.newLineDetails) {
      this.totalSalesAmount += this.newLineDetails[i].sales_total;
      this.totalDiscountAmount += this.newLineDetails[i].discount_amount;
      taxTotals = Number(this.newLineDetails[i].tax_amount1 ? this.newLineDetails[i].tax_amount1 : 0) + Number(this.newLineDetails[i].tax_amount2 ? this.newLineDetails[i].tax_amount2 : 0) + Number(this.newLineDetails[i].tax_amount3 ? this.newLineDetails[i].tax_amount3 : 0);
      this.totalTaxTotals += Number(taxTotals);
      this.totalInvoiceAmount += Number(this.newLineDetails[i].net_total);
    }
  }

  resetTotals() {
    this.totalSalesAmount = this.totalDiscountAmount = this.totalTaxTotals = this.totalInvoiceAmount = 0
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
    const dialogRef = this.dialog.open(AddReceiverComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.listReceivers();
    });
  }

  cancelAndRouteBack() {
    this.dialogService.cancelAndRouteBack("Are you sure?", "You won't be able to revert this!", "/home");
  }

  getItemById(id: number, index: number) {
    this.itemsService.getItemById(id).subscribe((response: ResponseDto) => {
      this.itemDetails[index] = response.data;
      // open quantity field
      this.hasItem = true;
    });
  }

  openUnitPrice() {
    this.hasQty = true;
  }

  createInvoice(form: FormGroup) {
    this.isSubmitted = true;
    if (form.valid) {
      form.value.date_time_issued = this.datepipe.transform(form.value.date_time_issued, 'YYYY-MM-ddThh:mm')
      this.invoiceService.createInvoice(form.value).subscribe((response: ResponseDto) => {
        this.dialogService.successAndRouteTo('Invoice created successfully!', 'invoice/list')
      });
    }
  }

  openLinesPopup() {
    const dialogRef = this.dialog.open(InvoiceLineComponent, {
      width: '100rem'
    });
    dialogRef.afterClosed().subscribe(result => {
      // get data
      this.newLineDetails.push(result.model);
      // get item name
      this.itemName.push(result.itemName);
      // append lines in form
      this.invoiceForm.value.lines = this.newLineDetails;
      // total calculations
      this.calculateSummary();
    });
  }

  // #endregion
}
