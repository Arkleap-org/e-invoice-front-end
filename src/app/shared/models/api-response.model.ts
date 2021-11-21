export interface ResponseDto {
  response_id: number;
  data: any;
  message: string;
}

export interface ErrorDto {
  response_id: number;
  message: string;
  warning: WarningDto;
  detail: string;
}

export interface WarningDto {
  [Key: string]: string[]
}
