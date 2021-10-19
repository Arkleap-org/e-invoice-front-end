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

export class LinesDto {
    amount_Sold!: string;
    amount_egp!: string;
    currency_Sold!: string;
    description!: string;
    discount_amount!: string;
    discount_rate!: string;
    exchange_rate!: string
    id!: number;
    item!: number;
    items_discount!: string;
    net_total!: string;
    quantity!: string;
    sales_total!: string;
    tax_amount!: string;
    total_amount!: string;
    value_difference!: string;
}