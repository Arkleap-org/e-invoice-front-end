// angular core
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ResponseDto } from '../../models/api-response.model';
import { LinesDto } from '../../models/invoice.model';
import { ListItemsResponseDto } from '../../models/items.model';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-invoice-line',
  templateUrl: './invoice-line.component.html',
  styleUrls: ['./invoice-line.component.scss']
})

export class InvoiceLineComponent implements OnInit {

  // #region declare variables

  // names of booleans
  isSubmitted: boolean;

  // names of formGroup
  linesForm!: FormGroup;

  // names of lists
  listOfItems: ListItemsResponseDto[];

  // names of ngModels
  itemDetails: ListItemsResponseDto;
  linesDetails: LinesDto;


  // #endregion

  // #region constructor

  constructor(
    public dialogRef: MatDialogRef<InvoiceLineComponent>,
    private formBuilder: FormBuilder,
    private itemsService: ItemsService
  ) {
    // init variables
    this.listOfItems = [];
    this.itemDetails = new ListItemsResponseDto;
    this.isSubmitted = false;
    this.linesDetails = new LinesDto;

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
    this.initLinesForm();
  }

  initLinesForm() {
    this.linesForm = this.formBuilder.group({
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

  // #endregion

  // #region loadControls

  loadControls() {
    this.listItems();
  }

  listItems() {
    this.itemsService.listItems().subscribe((response: ResponseDto) => {
      this.listOfItems = response.data
    });
  }

  // #endregion

  // #region line calculations

  calculateSalesTotal() {
    this.linesDetails.sales_total = (this.linesDetails.amount_egp * this.linesDetails.quantity);
  }

  calculateNetTotal(discount_amount: number) {
    if (this.linesDetails.sales_total && discount_amount >= 0) {
      this.linesDetails.net_total = (this.linesDetails.sales_total - discount_amount);
      this.calculateTaxAmount();
      this.calculateTotalLineAmount();
    }
  }

  calculateTaxAmount() {
    if (this.linesDetails.net_total) this.linesDetails.tax_amount = Number(this.linesDetails.net_total * (this.itemDetails.sub_tax_rate / 100)).toFixed(5);
  }

  calculateTotalLineAmount() {
    if (this.linesDetails.net_total && this.linesDetails.tax_amount) this.linesDetails.total_amount = Number(this.linesDetails.net_total) + Number(this.linesDetails.tax_amount);
  }

  // #endregion

  // #region main actions

  getItemById(id: number) {
    this.itemsService.getItemById(id).subscribe((response: ResponseDto) => {
      this.itemDetails = response.data;
      // open quantity field
      // this.hasItem = true;
    });
  }

  closeAndSave() {
    console.log("From Popup : ", this.linesDetails)
    this.dialogRef.close({ model: this.linesForm.value, itemName: this.itemDetails.item_name });
  }

  // #endregion

}
