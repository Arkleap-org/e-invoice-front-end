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
import { CreateInvoiceDto, InvoiceDto, LinesDto } from '../../shared/models/invoice.model';

// services
import { DialogService } from '../../shared/services/dialog.service';
import { InvoiceService } from '../../shared/services/invoice.service';
import { ItemsService } from '../../shared/services/items.service';
import { ReceiverService } from '../../shared/services/receiver.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

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
  totalSalesAmount!: any;
  totalTaxTotals!: any;
  totalInvoiceAmount!: any;
  totalDiscountAmount!: any;

  // name of route param
  invoiceId!: number;

  // name of NgModels
  invoiceDetails!: InvoiceDto;

  // #endregion

  // #region constructor

  constructor(
    private dialogService: DialogService,
    private invoiceService: InvoiceService,
    private receiverService: ReceiverService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private itemsService: ItemsService,
    public datepipe: DatePipe,
    private route: ActivatedRoute
  ) {
    // init variables

    this.listOfReceivers = [];
    this.listOfItems = [];
    this.itemDetails = [];
    this.linesDetails = [];
    this.newLineDetails = [];

    this.listOfDocumentTypes = ListOfDocumentTypes;


    this.receiverDetails = new ReceiverDto;


    const newItemDetail = new ListItemsResponseDto
    this.itemDetails.push(newItemDetail);

    const newLine = new LinesDto;
    this.linesDetails.push(newLine)

    this.isReceiver = this.hasItem = this.hasQty = this.isSubmitted = false;

    this.resetTotals();

    this.invoiceDetails = new InvoiceDto;

    // init forms
    this.initForms();
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {
    this.loadControls();
    this.invoiceId = this.route.snapshot.params['id'];
    if (this.invoiceId) this.getInvoiceById();
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
      date_time_issued: [, Validators.required],
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
  }

  listReceivers() {
    this.receiverService.listReceivers().subscribe((response: ResponseDto) => {
      this.listOfReceivers = response.data;
    });
  }

  getInvoiceById() {
    this.invoiceService.getInvoiceById(this.invoiceId).subscribe((response: ResponseDto) => {
      this.invoiceDetails = response.data;
      // document type version
      this.setDocumentType();

      // receiver data
      this.setReceiverData();

      // issued date
      this.setIssuedDate();

      // lines data
      this.setInvoiceLines();

      // totals
      this.setInvoiceTotals();

      this.calculateSummary();

    });
  }

  setDocumentType() {
    this.documentTypeVersion = this.invoiceDetails.document_type_version;
  }

  setReceiverData() {
    this.receiverId = this.invoiceDetails.receiver;
    this.receiverDetails.id = this.invoiceDetails.receiver;
    this.receiverDetails.reg_num = this.invoiceDetails.receiver_reg_num;
    this.receiverDetails.name = this.invoiceDetails.receiver_name;
    this.receiverDetails.receiver_address = this.invoiceDetails.receiver_address;
  }

  setIssuedDate() {
    this.invoiceDetails.date_time_issued = this.datepipe.transform(new Date(this.invoiceDetails.date_time_issued), 'yyyy-MM-ddThh:mm');
  }

  setInvoiceLines() {
    this.newLineDetails = this.invoiceDetails.lines;
  }

  setInvoiceTotals() {
    this.totalSalesAmount = this.invoiceDetails.total_sales_amount;
    this.totalDiscountAmount = this.invoiceDetails.total_discount_amount;
    this.totalTaxTotals = this.invoiceDetails.tax_totals;
    this.totalInvoiceAmount = this.invoiceDetails.total_amount;
  }

  getTaxAmount(line: LinesDto) {
    return Number(line.tax_amount1 || 0) + Number(line.tax_amount2 || 0) + Number(line.tax_amount3 || 0)
  }

  // #endregion

  // #region invoice summary calculations

  calculateSummary() {
    this.resetTotals();
    let taxTotals: number = 0;
    for (let i in this.newLineDetails) {
      this.totalSalesAmount += Number(this.newLineDetails[i].sales_total || 0);
      this.totalDiscountAmount += Number(this.newLineDetails[i].discount_amount || 0);

      taxTotals =
        Number(this.newLineDetails[i].tax_amount1 || 0) +
        Number(this.newLineDetails[i].tax_amount2 || 0) +
        Number(this.newLineDetails[i].tax_amount3 || 0);

      this.totalTaxTotals += Number(taxTotals);
      this.totalInvoiceAmount += Number(this.newLineDetails[i].total_amount || 0);
    }
    this.totalSalesAmount = this.totalSalesAmount.toFixed(5);
    this.totalDiscountAmount = this.totalDiscountAmount.toFixed(5);
    this.totalTaxTotals = this.totalTaxTotals.toFixed(5);
    this.totalInvoiceAmount = this.totalInvoiceAmount.toFixed(5);
  }

  resetTotals() {
    this.totalSalesAmount = 0;
    this.totalDiscountAmount = 0;
    this.totalTaxTotals = 0;
    this.totalInvoiceAmount = 0;
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
    if (this.invoiceId) {
      this.dialogService.cancelAndRouteBack("Are you sure?", "You won't be able to revert this!", `/invoice/view/${this.invoiceId}`);
    } else {
      this.dialogService.cancelAndRouteBack("Are you sure?", "You won't be able to revert this!", "/invoice/list");
    }
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

  openLinesPopup() {
    const dialogRef = this.dialog.open(InvoiceLineComponent, {
      width: '100rem'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // get data
        this.newLineDetails.push(result.model);
        // append lines in form
        this.invoiceForm.value.lines = this.newLineDetails;
        // total calculations
        this.calculateSummary();
      }
    });
  }

  createInvoice(form: FormGroup) {
    this.isSubmitted = true;
    if (form.valid) {
      form.value.date_time_issued = new Date(form.value.date_time_issued);
      form.value.lines = this.newLineDetails;
      this.invoiceService.createInvoice(form.value).subscribe((response: ResponseDto) => {
        this.dialogService.successAndRouteTo('Invoice created successfully!', '/invoice/list');
        this.isSubmitted = false;
      });
    }
  }

  updateInvoice(id: number, form: FormGroup) {
    this.isSubmitted = true;
    if (form.valid) {
      form.value.date_time_issued = new Date(form.value.date_time_issued);
      form.value.lines = this.newLineDetails;
      this.invoiceService.updateInvoice(id, form.value).subscribe((response: ResponseDto) => {
        this.dialogService.successAndRouteTo('Invoice created successfully!', '/invoice/list');
        this.isSubmitted = false;
      });
    }
  }

  handleSaveInvoiceBtn(form: FormGroup) {
    if (this.invoiceId) {
      this.updateInvoice(this.invoiceId, form);
    } else {
      this.createInvoice(form);
    }
  }

  deleteLine(line: LinesDto) {
    const index: number = this.newLineDetails.indexOf(line);
    if (index !== -1) {
      Swal.fire({
        title: 'Confirm Delete',
        text: 'Are you sure you want to delete this line ?',
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "$success",
        cancelButtonColor: "$secondary",
        confirmButtonText: "Yes, I am sure!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.newLineDetails.splice(index, 1);
          this.calculateSummary();
        }
      });
    }
  }

  // #endregion
}
