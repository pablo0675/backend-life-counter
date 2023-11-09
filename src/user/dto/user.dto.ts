import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly username: string;
}

export class CreateUserResponseDto {
  readonly id: string;
  readonly email: string;
  readonly username: string;
  readonly picture?: string;
  readonly token?: string;
}