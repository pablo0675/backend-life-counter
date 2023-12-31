import {Injectable} from '@nestjs/common';
import {LoginDto, RegisterDto} from "./dto/loginRegister.dto";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";
import {TaskEither, tryCatch} from "fp-ts/lib/TaskEither";
import {pipe} from "fp-ts/function/";
import * as TE from "fp-ts/TaskEither";
import {CreateUserDto} from "../user/dto/user.dto";
import {IUser} from "../models/user.model";
import {JwtPayload} from "./jwt-payload.interface";
import {hash, verify} from "argon2";

@Injectable()
export class AuthService
{
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {
    }

    async login({ email, password }: LoginDto): Promise<TaskEither<Error, string>> {
        const user = await this.userService.findUserByEmail(email);
        const exists = await this.userService.existsUserByEmail(email);
        if (!exists) {
            return TE.left(new Error('User not found'));
        }
        return pipe(
            user,
            TE.chain((user) => {
                return pipe(
                    tryCatch(() => verify(user.password, password), (reason) => new Error(String(reason))),
                    TE.chain(result =>
                        result
                            ? TE.right(this.generateToken(user.uid) + ' ' + user.uid)
                            : TE.left(new Error('Wrong password'))
                    )
                )
            })
        )
    }


    async register({ email, username, password }: RegisterDto) : Promise<TaskEither<Error, IUser>>
    {
        let cryptedpass = await hash(password);
        let exists = await this.userService.existsUserByEmail(email);
        if (exists)
            return TE.left(new Error('mail already in use'));
        exists = await this.userService.existUsername(username);
        if (exists)
            return TE.left(new Error('username already in use'));

        return pipe(
            this.userService.createUser({ email, username, password: cryptedpass } as CreateUserDto),
            TE.chain((user) => {
                return TE.right(user);
            })
        )
    }

    generateToken(id: string): string
    {
        return this.jwtService.sign({ id: id});
    }

    async verifyToken(token: string): Promise<JwtPayload | null>
    {
        try {
            return this.jwtService.verify(token);
        } catch {
            return null;
        }
    }
}
