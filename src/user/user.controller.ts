import {Body, Controller, Delete, Get, HttpException, Param, Post, Query} from '@nestjs/common';
import {UserService} from "./user.service";
import {ApiBody, ApiOkResponse, ApiBadRequestResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserDto, CreateUserResponseDto} from "./dto/user.dto";
import * as TE from "fp-ts/TaskEither";
import {IUser} from "../models/user.model";
import {TaskEither} from "fp-ts/lib/TaskEither";
import {pipe} from "fp-ts/function/";

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {
    }

    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                },
                userName: {
                    type: 'string',
                },
                password: {
                    type: 'string',
                },
            }
        }
    })

    @ApiOkResponse({
        description: 'success',
        type: String,
        status: 200,
    })

    @ApiBadRequestResponse({
        description: 'bad request',
        type: String,
        status: 400,
    })
    @Post()
    async createUser(@Body() userDto: CreateUserDto) {
        const result: TaskEither<Error, IUser> = await this.userService.createUser(userDto)


        return pipe(
            result,
            TE.match(
                (error) => {
                    throw new HttpException(error.message, 500);
                },
                (user) => {
                    return user;
                }
            )
        )();
    }

   @ApiBody({
        schema: {
            type: 'object',
            properties: {
                uid: {
                    type: 'string',
                }
            }
        }
    })

    @ApiOkResponse({
        description: 'success',
        type: CreateUserResponseDto,
        status: 200,
    })

    @ApiBadRequestResponse({
        description: 'bad request',
        type: String,
        status: 400,
    })

    @Get('getUser')
    async getUser(@Query('uid') uid: string) {
        const result = await this.userService.findUserById(uid)
        const returnclass = {
            uid: "",
            email: "",
            username: "",
            picture: "",
        }

        return pipe(
            result,
            TE.match(
                (error) => {
                    throw new HttpException(error.message, 500);
                },
                (user) => {
                    returnclass.uid = user.uid;
                    returnclass.email = user.email;
                    returnclass.username = user.username;
                    returnclass.picture = user.picture;
                    return (returnclass);
                }
            )
        )();
    }

    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                uid: {
                    type: 'string',
                }
            }
        }
    })

    @ApiOkResponse({
        description: 'success',
        type: String,
        status: 200,
    })

    @ApiBadRequestResponse({
        description: 'bad request',
        type: String,
        status: 400,
    })

    @Delete()
    async deleteUser(@Query('uid') uid: string) {
        const result = await this.userService.deleteUser(uid.toString())

        return pipe(
            result,
            TE.match(
                (error) => {
                    throw new HttpException(error.message, 500);
                },
                (user) => {
                    return user;
                }
            )
        )();
    }

    @Get('isUserAdmin')
    async isUserAdmin(@Query('uid') uid: string) {
        return await this.userService.isUserAdmin(uid);
    }
}
