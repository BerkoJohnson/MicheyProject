import { IsString, IsEmail, IsPhoneNumber, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;
    
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    confirm_password: string;

    @IsPhoneNumber('GH')
    telephone: string;
}



export class UpdateUserDto {
    @IsString()
    name: string;
    
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber('GH')
    telephone: string;
}


