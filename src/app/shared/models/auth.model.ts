export class LoginRequestDto {
  username: string | undefined;
  password: string | undefined;
}

export class LoginResponseDto {
  access: string | undefined;
  refresh: string | undefined;
}

