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
import { InvoiceLineComponent } from 'src/app/shared/popups/invoice-line/invoice-line.component';



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
  totalSalesAmount: number;
  totalTaxTotals: number;
  totalInvoiceAmount: number;
  totalDiscountAmount: number;


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

    this.listOfReceivers = [];

    this.listOfDocumentTypes = [
      { label: "Invoice", value: "I" },
      { label: "Credit Memo", value: "C" },
      { label: "Debit Memo", value: "D" }
    ];

    this.listOfItems = [];

    this.receiverDetails = new ReceiverDto;

    this.isReceiver = false;

    this.itemDetails = [];
    const newItemDetail = new ListItemsResponseDto
    this.itemDetails.push(newItemDetail);

    this.linesDetails = [];
    const newLine = new LinesDto;
    this.linesDetails.push(newLine)

    this.hasItem = false;
    this.hasQty = false;

    this.totalSalesAmount = 0;
    this.totalTaxTotals = 0;
    this.totalInvoiceAmount = 0;
    this.totalDiscountAmount = 0;

    this.isSubmitted = false;

    this.newLineDetails = [];

    this.itemName = [];

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


  createLines(): FormGroup {
    return this.formBuilder.group({
      item: [null, Validators.required],
      description: [''],
      quantity: ['', Validators.required],
      unit_price: ['', Validators.required],
      sales_total: [''],
      amount_egp: ['', Validators.required],
      tax_amount: [''],
      net_total: [''],
      total_amount: ['']
    });
  }

  addLine(): void {
    // add new line
    this.addLineDetails();
    // add new item detail
    this.addItemDetails();
    // add new form
    // this.lines = this.invoiceForm.('lines') as FormArray;
    // this.lines.push(this.createLines());
  }

  addLineDetails() {
    const newLine = new LinesDto;
    this.linesDetails.push(newLine);
  }

  addItemDetails() {
    const newItemDetail = new ListItemsResponseDto;
    this.itemDetails.push(newItemDetail);
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

  // #region line calculations

  calculateSalesTotal(index: number) {
    this.linesDetails[index].sales_total = (this.linesDetails[index].amount_egp * this.linesDetails[index].quantity);

  }

  calculateNetTotal(index: number, discount_amount: number) {
    if (this.linesDetails[index].sales_total && discount_amount >= 0) {
      this.linesDetails[index].net_total = (this.linesDetails[index].sales_total - discount_amount);
      this.calculateTaxAmount(index);
      this.calculateTotalLineAmount(index);
      // total calculations
      this.calculateTotalSalesAmount(this.linesDetails[index].sales_total);
      this.calculateTaxTotals(this.linesDetails[index].tax_amount1)
      this.calculateTotalInvoiceAmount(this.linesDetails[index].total_amount)
      this.calculateTotalDiscountAmount(discount_amount);
    }
  }

  calculateTaxAmount(index: number) {
    if (this.linesDetails[index].net_total) this.linesDetails[index].tax_amount1 = Number(this.linesDetails[index].net_total * (this.itemDetails[index].sub_tax_rate / 100)).toFixed(5);
  }

  calculateTotalLineAmount(index: number) {
    if (this.linesDetails[index].net_total && this.linesDetails[index].tax_amount1) this.linesDetails[index].total_amount = Number(this.linesDetails[index].net_total) + Number(this.linesDetails[index].tax_amount1);
  }

  // #endregion

  // #region invoice summary calculations

  calculateTotalSalesAmount(salesAmount: number) {
    this.totalSalesAmount += salesAmount;
  }

  calculateTotalDiscountAmount(discountAmount: number) {
    this.totalDiscountAmount += discountAmount;
  }


  calculateTaxTotals(taxTotal: number) {
    this.totalTaxTotals += Number(taxTotal);
  }


  calculateTotalInvoiceAmount(netTotal: number) {
    this.totalInvoiceAmount += Number(netTotal);
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
      this.itemName.push(result.itemName);
      // this.invoiceLinesControls.push(this.newLineDetails)
      console.log(this.newLineDetails);

      // total calculations
    })
  }

  // #endregion

}
