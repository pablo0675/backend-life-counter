import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {ApiOkResponse} from "@nestjs/swagger";
import {LoginDto, RegisterDto} from "./dto/loginRegister.dto";
import {fold} from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    @Post('login')
    async login(@Body() { email, password }: LoginDto) : Promise<string | void> {
        {
            const result = await (await this.authService.login({email, password}))();
            return pipe(
                result,
                fold(
                    (error: Error) => {
                        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
                    },
                    (token) => {
                        return token.toString();
                    }
                )
            );
        }
    }

    @ApiOkResponse({
        description: 'success',
        type: String,
        status: 200,
    })

    @Post('register')
    async register(@Body() { email, username, password}: RegisterDto)
    {
        const result = await (await this.authService.register({email, username, password}))();
        return pipe(
            result,
            fold(
                (error: Error) => {
                    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
                },
                (user) => {
                    return user;
                }
            )
        );
    }
}
