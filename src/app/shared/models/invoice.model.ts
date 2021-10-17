export class InvoiceDto {
    date_time_issued: Date | undefined;
    document_type: string | undefined;
    document_type_version: string | undefined;
    extra_discount_amount: string | undefined;
    id: number | undefined;
    internal_id: string | undefined;
    lines: LinesDto[] | undefined;
    net_amount: string | undefined;
    receiver_buildingNumber: string | undefined;
    receiver_country: string | undefined;
    receiver_governate: string | undefined;
    receiver_name: string | undefined;
    receiver_reg_num: string | undefined;
    receiver_regionCity: string | undefined;
    receiver_street: string | undefined;
    receiver_type: string | undefined;
    signature_value: string | undefined;
    tax_totals: string | undefined;
    total_discount_amount: string | undefined;
    total_items_discount_amount: string | undefined;
    total_sales_amount: string | undefined;
    total_amount: string | undefined;
    invoice_status: string | undefined;
    portal_status: string | undefined;
}

export class LinesDto {
    amount_Sold: string | undefined;
    amount_egp: string | undefined;
    currency_Sold: string | undefined;
    description: string | undefined;
    discount_amount: string | undefined;
    discount_rate: string | undefined;
    exchange_rate: string | undefined
    id: number | undefined;
    item: number | undefined;
    items_discount: string | undefined;
    net_total: string | undefined;
    quantity: string | undefined;
    sales_total: string | undefined;
    tax_amount: string | undefined;
    total_amount: string | undefined;
    value_difference: string | undefined;
}