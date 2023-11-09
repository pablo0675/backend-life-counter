import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString, IsStrongPassword} from 'class-validator';

class LoginRegisterDto {
    @ApiProperty({
        description: 'Email',
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email!: string;
}

export class LoginDto extends LoginRegisterDto {
    @ApiProperty({
        description: 'Password',
    })
    @IsNotEmpty()
    @IsString()
    password!: string;
}

export class RegisterDto extends LoginRegisterDto {
    @ApiProperty({
        description: 'username',
    })
    @IsNotEmpty()
    @IsString()
    username!: string;

    @ApiProperty({
        description: 'Password',
    })
    @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1})
    @IsNotEmpty()
    @IsString()
    password!: string;
}