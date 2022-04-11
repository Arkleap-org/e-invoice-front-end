// angular modules
import { AfterViewChecked, AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

// angular material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// models
import { ResponseDto } from '../../models/api-response.model';
import { LinesDto } from '../../models/invoice.model';
import { CurrencyDto, ItemDto } from '../../models/items.model';

// services
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-invoice-line',
  templateUrl: './invoice-line.component.html',
  styleUrls: ['./invoice-line.component.scss'],
})
export class InvoiceLineComponent implements OnInit, AfterViewChecked {
  // #region declare variables

  // names of booleans
  isSubmitted: boolean;

  // names of formGroup
  linesForm!: FormGroup;

  // names of lists
  listOfItems: ItemDto[];
  listOfCurrencies: CurrencyDto[];
  pageSize = 5;
  currentPage = 0;
  listOfTaxTypes: {
    code: string;
    desc_ar: string;
    desc_en: string;
    taxtype_reference: string;
  }[];

  // names of ngModels
  itemDetails: ItemDto;
  lineDetails: LinesDto;

  // #endregion

  // #region constructor

  constructor(
    public dialogRef: MatDialogRef<InvoiceLineComponent>,
    private formBuilder: FormBuilder,
    private itemsService: ItemsService,
    @Inject(MAT_DIALOG_DATA) public data: LinesDto
  ) {
    // init variables
    this.listOfItems = [];
    this.listOfTaxTypes = [];
    this.listOfCurrencies = [];
    this.itemDetails = new ItemDto();
    this.isSubmitted = false;
    this.lineDetails = this.data?.item ? this.data : new LinesDto();

    // init forms
    this.amountSolidIsRequired = this.amountSolidIsRequired.bind(this);
    this.exchangeRateIsRequired = this.exchangeRateIsRequired.bind(this);
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
      quantity: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      exchange_rate: ['', this.exchangeRateIsRequired],
      amount_sold: ['', this.amountSolidIsRequired],
      amount_egp: ['', [Validators.required]],
      sales_total: [''],
      items_discount: [''],
      discount_rate: [''],
      discount_amount: [''],
      tax_amount1: [''],
      tax_amount2: [''],
      tax_amount3: [''],
      net_total: [''],
      total_amount: [''],
    });
  }

  amountSolidIsRequired(control: FormControl) {
    if ((!control || !control.value) && this.lineDetails.currency && this.lineDetails.currency !== 'EGP') {
      return { isAmountRequired: true }
    }
    else return null
  }

  exchangeRateIsRequired(control: FormControl) {
    if ((!control || !control.value) && this.lineDetails.currency && this.lineDetails.currency !== 'EGP') {
      return { isRequired: true }
    }
    else return null
  }

  // #endregion

  // #region loadControls


  loadControls() {
    this.getInvoicelistItems();
    this.listTaxTypes();
    this.getListOfCurrencies();
    if (this.data?.item) this.getItemById(this.data.item);
  }

  getInvoicelistItems() {
    this.itemsService.getInvoicelistItems().subscribe((response: ResponseDto) => this.listOfItems = response.data);
  }

  listTaxTypes() {
    this.itemsService.listTaxTypes().subscribe((res: ResponseDto) => {
      this.listOfTaxTypes = res.data;
      this.calculateTaxAmount();
      this.calculateTotalLineAmount();
    });
  }

  getListOfCurrencies() {
    this.itemsService.getCurrenciesList().subscribe((res: ResponseDto) => {
      this.listOfCurrencies = res.data;      
    })
  }

  // #endregion

  ngAfterViewChecked() {

  }

  // #region line calculations

  calculateUnitPriceForNotEGP() {
    if(this.lineDetails.exchange_rate) {
      if(this.lineDetails.amount_Sold) {
        this.lineDetails.amount_egp = Number(
          this.lineDetails.exchange_rate * this.lineDetails.amount_Sold
        ).toFixed(5);
      }
    }
  }


  calculateSalesTotal() {
    this.lineDetails.sales_total = (
      this.lineDetails.amount_egp * this.lineDetails.quantity
    ).toFixed(5);
  }


  calculateNetTotal(items_discount: number) {
    if (this.lineDetails.sales_total && items_discount >= 0) {
      this.lineDetails.net_total = (
        this.lineDetails.sales_total - items_discount
      ).toFixed(5);
      this.calculateTaxAmount();
      this.calculateTotalLineAmount();
    }
  }



  calculateTaxAmount() {
    if (this.lineDetails.net_total) {
      if (this.itemDetails.sub_tax_rate1)
        this.lineDetails.tax_amount1 = Number(
          this.lineDetails.net_total * (this.itemDetails.sub_tax_rate1 / 100)
        ).toFixed(5);
      if (this.itemDetails.sub_tax_rate2)
        this.lineDetails.tax_amount2 = Number(
          this.lineDetails.net_total * (this.itemDetails.sub_tax_rate2 / 100)
        ).toFixed(5);
      if (this.itemDetails.sub_tax_rate3)
        this.lineDetails.tax_amount3 = Number(
          this.lineDetails.net_total * (this.itemDetails.sub_tax_rate3 / 100)
        ).toFixed(5);
    }
  }

  calculateTaxTotal(): number {
    const item1 = this.listOfItems.find(
      (item) => item.id === this.itemDetails.id
    );
    const type1 = this.listOfTaxTypes.find(
      (type) => item1?.sub_tax_type1 == type.code
    );
    const tax1 =
      Number(this.lineDetails.tax_amount1 || 0) *
      (type1?.taxtype_reference == 'T4' ? -1 : 1);

    const item2 = this.listOfItems.find(
      (item) => item.id === this.itemDetails.id
    );

    const type2 = this.listOfTaxTypes.find(
      (type) => item2?.sub_tax_type2 == type.code
    );
    const tax2 =
      Number(this.lineDetails.tax_amount2 || 0) *
      (type2?.taxtype_reference == 'T4' ? -1 : 1);

    const item3 = this.listOfItems.find(
      (item) => item.id === this.itemDetails.id
    );
    const type3 = this.listOfTaxTypes.find(
      (type) => item3?.sub_tax_type3 == type.code
    );
    const tax3 =
      Number(this.lineDetails.tax_amount3 || 0) *
      (type3?.taxtype_reference == 'T4' ? -1 : 1);

    return tax1 + tax2 + tax3;
  }

  calculateTotalLineAmount() {
    if (this.lineDetails.net_total) {
      let totalTaxAmount = this.calculateTaxTotal();
      this.lineDetails.total_amount = (
        Number(this.lineDetails.net_total) +
        Number(totalTaxAmount) -
        Number(this.lineDetails.items_discount || 0)
      ).toFixed(5);
    }
  }

  calculateDiscountAmount(sales_total: number, discount_rate: number) {
    this.lineDetails.discount_amount =
      ((Number(sales_total || 0) * Number(discount_rate || 0)) / 100).toFixed(5);
  }

  // #endregion

  // #region main actions

  getItemById(id: number) {
    this.itemsService.getItemById(id).subscribe((response: ResponseDto) => {
      this.itemDetails = response.data;
      this.lineDetails.description = this.itemDetails.item_desc;
    });
  }

  closeAndSave(form: FormGroup) {
    this.isSubmitted = true;
    if (form.valid) {
      this.isSubmitted = false;
      const model: LinesDto = this.lineDetails;
      model.item = this.itemDetails.id;
      model.item_name = this.itemDetails.item_name;
      model.amount_egp = Number(model.amount_egp).toFixed(5);
      model.items_discount = Number(model.items_discount).toFixed(5);
      this.dialogRef.close({ model });
    }
  }

  // #endregion
}
