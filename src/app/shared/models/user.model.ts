

export class UserRequestDto {
    email!: string;
    password!: string;
    password2!: string;
    username!: string;
    date_joined!: Date;
    first_name!: string;
    groups!: any[];
    id!: number;
    is_active!: boolean
    is_staff!: boolean
    is_superuser!: boolean
    last_login!: any;
    last_name!: string;
    user_permissions!: any[];
    issuer!: number
}
