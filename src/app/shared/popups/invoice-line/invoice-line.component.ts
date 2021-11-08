// angular modules
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// angular material
import { MatDialogRef } from '@angular/material/dialog';

// models
import { ResponseDto } from '../../models/api-response.model';
import { LinesDto } from '../../models/invoice.model';
import { ItemDto } from '../../models/items.model';

// services
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
  listOfItems: ItemDto[];

  // names of ngModels
  itemDetails: ItemDto;
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
    this.itemDetails = new ItemDto;
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
      quantity: ['', [Validators.required, Validators.min(1)]],
      amount_egp: ['', [Validators.required, Validators.min(1)]],
      sales_total: [''],
      discount_amount: ['', Validators.required],
      tax_amount1: [''],
      tax_amount2: [''],
      tax_amount3: [''],
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
      this.listOfItems = response.data;
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
    if (this.linesDetails.net_total) {
      if (this.itemDetails.sub_tax_rate1) this.linesDetails.tax_amount1 = Number(this.linesDetails.net_total * (this.itemDetails.sub_tax_rate1 / 100)).toFixed(5);
      if (this.itemDetails.sub_tax_rate2) this.linesDetails.tax_amount2 = Number(this.linesDetails.net_total * (this.itemDetails.sub_tax_rate2 / 100)).toFixed(5);
      if (this.itemDetails.sub_tax_rate3) this.linesDetails.tax_amount3 = Number(this.linesDetails.net_total * (this.itemDetails.sub_tax_rate3 / 100)).toFixed(5);
    }
  }

  calculateTotalLineAmount() {
    if (this.linesDetails.net_total) {
      let totalTaxAmount = 0;
      if (this.linesDetails.tax_amount1 && this.linesDetails.tax_amount2 && this.linesDetails.tax_amount3) {
        totalTaxAmount = Number(this.linesDetails.tax_amount1) + Number(this.linesDetails.tax_amount2) + Number(this.linesDetails.tax_amount3);
      }
      else if (!this.linesDetails.tax_amount1 && this.linesDetails.tax_amount2 && this.linesDetails.tax_amount3) {
        totalTaxAmount = Number(this.linesDetails.tax_amount2) + Number(this.linesDetails.tax_amount3);
      }
      else if (this.linesDetails.tax_amount1 && !this.linesDetails.tax_amount2 && this.linesDetails.tax_amount3) {
        totalTaxAmount = Number(this.linesDetails.tax_amount1) + Number(this.linesDetails.tax_amount3);
      }
      else if (this.linesDetails.tax_amount1 && this.linesDetails.tax_amount2 && !this.linesDetails.tax_amount3) {
        totalTaxAmount = Number(this.linesDetails.tax_amount1) + Number(this.linesDetails.tax_amount2);
      }

      this.linesDetails.total_amount = Number(this.linesDetails.net_total) + Number(totalTaxAmount);
    }
  }

  // #endregion

  // #region main actions

  getItemById(id: number) {
    this.itemsService.getItemById(id).subscribe((response: ResponseDto) => {
      this.itemDetails = response.data;
    });
  }

  closeAndSave(form: FormGroup) {
    this.isSubmitted = true;
    if (form.valid) {
      this.isSubmitted = false;
      this.dialogRef.close({ model: this.linesForm.value, itemName: this.itemDetails.item_name });
    }
  }

  // #endregion

}
