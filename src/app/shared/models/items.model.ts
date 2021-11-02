export class CreateItemRequestDto {
    id!: number;
    item_name!: string;
    item_desc!: string;
    unit_type!: string;
    item_type!: string;
    item_code!: string;
    internal_code!: string;
    sub_tax_rate1!: string;
    sub_tax_rate2!: string;
    sub_tax_rate3!: string;
    sub_tax_type1!: string;
    sub_tax_type2!: string;
    sub_tax_type3!: string;

    

}



export class CreateItemResponseDto {


    id!: number;
    item_name!: string;
    item_desc!: number;
    item_type!: string;
    item_code!: number;
    internal_code!: string;
    sub_tax_rate1!: string;
    sub_tax_rate2!: string;
    sub_tax_rate3!: string;    price_include_tax!: boolean;
    unit_type!: string;
    sub_tax_type1!: string;
    sub_tax_type2!: string;
    sub_tax_type3!: string;}

export class ListItemsResponseDto {

    id!: number;
    item_name!: string;
    item_desc!: string;
    item_type!: string;
    item_code!: string;
    internal_code!: number;
    sub_tax_rate!: number;
    price_include_tax!: number;
    unit_type!: string;
    sub_tax_type!: string;

}

export class ItemDto {
    id!: number;
    internal_code!: string;
    item_code!: string;
    item_desc!: string;
    item_name!: string;
    item_type!: string;
    price_include_tax!: boolean;
    sub_tax_rate1!: number;
    sub_tax_rate2!: number;
    sub_tax_rate3!: number;
    sub_tax_type1!: string;
    sub_tax_type2!: string;
    sub_tax_type3!: string;
    unit_type!: string;
}