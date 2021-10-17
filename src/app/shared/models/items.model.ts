export class CreateItemRequestDto {
    item_name: string | undefined;
    item_desc: string | undefined;
    unit_type: string | undefined;
    item_type: string | undefined;
    item_code: string | undefined;
    internal_code: string | undefined;
    sub_tax_rate: string | undefined;
    sub_tax_type: string | undefined;

}



export class CreateItemResponseDto {


    id: number | undefined;
    item_name: string | undefined;
    item_desc: number | undefined;
    item_type: string | undefined;
    item_code: number | undefined;
    internal_code: string | undefined;
    sub_tax_rate: number | undefined;
    price_include_tax: boolean | undefined;
    unit_type: string | undefined;
    sub_tax_type: string | undefined;
}

