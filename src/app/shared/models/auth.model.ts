export class LoginRequestDto {
  username!: string;
  password!: string;
}

export class LoginResponseDto {
  access!: string;
  refresh!: string;
}

