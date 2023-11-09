import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../user/dto/user.dto";
import {ApiOkResponse} from "@nestjs/swagger";
import {LoginDto, RegisterDto} from "./dto/loginRegister.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    @Post('login')
    async login(@Body() { email, password}: LoginDto)
    {
        return await this.authService.login({ email, password });
    }

    @ApiOkResponse({
        description: 'success',
        type: String,
        status: 200,
    })

    @Post('register')
    async register(@Body() { email, username, password}: RegisterDto)
    {
        return await this.authService.register({ email, username, password });
    }
}
