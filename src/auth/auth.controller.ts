import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {LoginDto, RegisterDto} from "./dto/loginRegister.dto";
import {fold} from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    @Post('login')
    async login(@Body() { email, password }: LoginDto) : Promise<any | void> {
        {
            const result = await (await this.authService.login({email, password}))();
            return pipe(
                result,
                fold(
                    (error: Error) => {
                        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
                    },
                    (tokenAndId) => {
                        return {
                            token: tokenAndId.split(' ')[0],
                            id: tokenAndId.split(' ')[1],
                        };
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
