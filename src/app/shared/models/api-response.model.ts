export interface ResponseDto {
  response_id: number;
  data: any;
}

export interface ErrorDto {
  response_id: number;
  message: string;
  warning: WarningDto[]
}

export interface WarningDto {
  [Key: string]: string[]
}
