export class LoginRequestDto {
  username!: string;
  password!: string;
}

export class LoginResponseDto {
  access!: string;
  first_name!: string;
  has_issuer!: boolean
  is_staff!: boolean
  is_superuser!: boolean
  refresh!: string;
}

