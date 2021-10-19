export class IssuerDto {
    activity_code: string | undefined;
    clientSecret1: string | undefined;
    clientSecret2: string | undefined;
    client_id: string | undefined;
    id: number | undefined;
    issuer_addresses: IssuerAddressDto[] | undefined;
    name: string | undefined;
    reg_num: string | undefined;
    type: string | undefined;

    constructor() {
        this.issuer_addresses = []
    }
}

export class IssuerAddressDto {
    additionalInformation: string | undefined;
    branch_id: string | undefined;
    buildingNumber: string | undefined;
    country: string | undefined;
    floor: string | undefined;
    governate: string | undefined;
    id: number | undefined;
    landmark: string | undefined;
    postalCode: string | undefined;
    regionCity: string | undefined;
    room: string | undefined;
    street: string | undefined;
}