export class IssuerDto {
  activity_code!: string;
  clientSecret1!: string;
  clientSecret2!: string;
  client_id!: string;
  id!: number;
  issuer_addresses: IssuerAddressDto[];
  name!: string;
  reg_num!: string;
  type!: string;
  web_agent!: string;

  constructor() {
    this.issuer_addresses = []
  }
}

export class IssuerAddressDto {
  additionalInformation!: string;
  branch_id!: string;
  buildingNumber!: string;
  country!: string;
  floor!: string;
  governate!: string;
  id!: number;
  landmark!: string;
  postalCode!: string;
  regionCity!: string;
  room!: string;
  street!: string;
}
