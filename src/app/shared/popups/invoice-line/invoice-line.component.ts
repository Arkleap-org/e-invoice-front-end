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
  listOfTaxTypes: { code: string, desc_ar: string, desc_en: string, taxtype_reference: string }[];

  // names of ngModels
  itemDetails: ItemDto;
  linesDetails: LinesDto;


  // #endregion

  // #region constructor

  constructor(
    public dialogRef: MatDialogRef<InvoiceLineComponent>,
    private formBuilder: FormBuilder,
    private itemsService: ItemsService,
  ) {
    // init variables
    this.listOfItems = [];
    this.listOfTaxTypes = [];
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
      items_discount: ['', Validators.required],
      discount_rate: ['', Validators.required],
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
    this.listTaxTypes();
  }

  listItems() {
    this.itemsService.listItems().subscribe((response: ResponseDto) => {
      this.listOfItems = response.data;
    });
  }

  listTaxTypes() {
    this.itemsService.listTaxTypes().subscribe((res: ResponseDto) => {
      this.listOfTaxTypes = res.data;
    });
  }

  // #endregion

  // #region line calculations

  calculateSalesTotal() {
    this.linesDetails.sales_total = (this.linesDetails.amount_egp * this.linesDetails.quantity).toFixed(5);
  }

  calculateNetTotal(items_discount: number) {
    if (this.linesDetails.sales_total && items_discount >= 0) {
      this.linesDetails.net_total = (this.linesDetails.sales_total - items_discount).toFixed(5);
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

  calculateTaxTotal(): number {
    const item1 = this.listOfItems.find(item => item.id === this.itemDetails.id);
    const type1 = this.listOfTaxTypes.find(type => item1?.sub_tax_type1 == type.code)
    const tax1 = Number(this.linesDetails.tax_amount1 || 0) * (type1?.taxtype_reference == "T4" ? -1 : 1);

    const item2 = this.listOfItems.find(item => item.id === this.itemDetails.id);
    const type2 = this.listOfTaxTypes.find(type => item2?.sub_tax_type2 == type.code)
    const tax2 = Number(this.linesDetails.tax_amount2 || 0) * (type2?.taxtype_reference == "T4" ? -1 : 1);

    const item3 = this.listOfItems.find(item => item.id === this.itemDetails.id);
    const type3 = this.listOfTaxTypes.find(type => item3?.sub_tax_type3 == type.code)
    const tax3 = Number(this.linesDetails.tax_amount3 || 0) * (type3?.taxtype_reference == "T4" ? -1 : 1);

    return tax1 + tax2 + tax3;

  }

  calculateTotalLineAmount() {
    if (this.linesDetails.net_total) {
      let totalTaxAmount = this.calculateTaxTotal();
      this.linesDetails.total_amount = (Number(this.linesDetails.net_total) + Number(totalTaxAmount) - Number(this.linesDetails.items_discount || 0)).toFixed(5);
    }
  }

  calculateDiscountAmount(sales_total: number, discount_rate: number) {
    this.linesDetails.discount_amount = Number(sales_total || 0) * Number(discount_rate || 0) / 100;
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
      const model: LinesDto = this.linesForm.value;
      model.item_name = this.itemDetails.item_name;
      model.amount_egp = model.amount_egp.toFixed(5);
      model.items_discount = model.items_discount.toFixed(5);
      this.dialogRef.close({ model });
    }
  }

  // #endregion

}
