export class InvoiceDto {
  date_time_issued!: any;
  document_type!: string;
  document_type_version!: string;
  extra_discount_amount!: string;
  id!: number;
  internal_id!: string;
  lines!: LinesDto[];
  net_amount!: string;
  receiver_address!: string;
  receiver_name!: string;
  receiver_reg_num!: string;
  signature_value!: string;
  tax_totals!: number;
  total_discount_amount!: number;
  total_items_discount_amount!: number;
  total_sales_amount!: number;
  total_amount!: number;
  invoice_status!: string;
  portal_status!: string;
  subm_uuid!: string;
  subm_id!: string;
  receiver!: number;
  purchase_order_reference!: string;
  purchase_order_description!: string;
  isSelected?: boolean;
  related_invoice!: string;
}

export class CreateInvoiceDto {
  lines!: LinesDto;
  receiver!: number;
  date_time_issued!: Date;
  document_type!: string;
  document_type_version!: string;
  internal_id!: string;
}

export class LinesDto {
  amount_Sold!: number;
  amount_egp!: any;
  currency!: string;
  currency_Sold!: number;
  description!: string;
  discount_amount!: any;
  discount_rate!: number;
  exchange_rate!: number;
  id!: number;
  item!: number;
  items_discount!: any;
  net_total!: any;
  quantity!: number;
  sales_total!: any;
  tax_amount1!: any;
  tax_amount2!: any;
  tax_amount3!: any;
  total_amount!: any;
  value_difference!: number;
  item_name!: string;
  item_code!: string;

  constructor() {
    this.net_total = 0;
    this.discount_amount = 0;
    this.discount_rate = 0;
    this.exchange_rate = 0;
    this.items_discount = 0;
    this.sales_total = 0;
    this.tax_amount1 = 0;
    this.tax_amount2 = 0;
    this.tax_amount3 = 0;
    this.total_amount = 0;
    this.value_difference = 0;
  }
}

export class InvoiceErrorDto {
  header_errors!: [];
  lines_errors!: [];
  other_errors!: [];
}
