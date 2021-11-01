export class InvoiceDto {
    date_time_issued!: Date;
    document_type!: string;
    document_type_version!: string;
    extra_discount_amount!: string;
    id!: number;
    internal_id!: string;
    lines!: LinesDto[];
    net_amount!: string;
    receiver_buildingNumber!: string;
    receiver_country!: string;
    receiver_governate!: string;
    receiver_name!: string;
    receiver_reg_num!: string;
    receiver_regionCity!: string;
    receiver_street!: string;
    receiver_type!: string;
    signature_value!: string;
    tax_totals!: string;
    total_discount_amount!: string;
    total_items_discount_amount!: string;
    total_sales_amount!: string;
    total_amount!: string;
    invoice_status!: string;
    portal_status!: string;
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
    amount_egp!: number;
    currency_Sold!: number;
    description!: string;
    discount_amount!: number;
    discount_rate!: number;
    exchange_rate!: number;
    id!: number;
    item!: number;
    items_discount!: number;
    net_total!: number;
    quantity!: number;
    sales_total!: number;
    tax_amount1!: any;
    tax_amount2!: any;
    tax_amount3!: any;
    total_amount!: number;
    value_difference!: number;
    item_name!: string;
    item_code!: string;
}

export class InvoiceErrorDto {
    header_errors!: [];
    lines_errors!: [];
    other_errors!: [];
}