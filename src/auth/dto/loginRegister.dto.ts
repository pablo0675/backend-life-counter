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
    @IsNotEmpty()
    @IsString()
    password!: string;
}