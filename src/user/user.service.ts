import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {IUser} from "../models/user.model";

import { v4 as uuidv4 } from 'uuid';
import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/function/';
import {CreateUserDto} from "./dto/user.dto";


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {
    }

    createUser(user: CreateUserDto): TaskEither<Error, IUser> {
        return pipe(
            tryCatch(() => {
                const uid = uuidv4();
                const createdUser = new this.userModel({...user, uid});
                return createdUser.save();
            }, (reason) => new Error(String(reason)))
        )
    }

    findUserById(uid: string): TaskEither<Error, IUser> {
        return pipe(
            tryCatch(() => this.userModel.findById(uid).exec(), (reason) => new Error(String(reason)))
        )
    }

    updateUser(uid: string, user: IUser): TaskEither<Error, IUser> {
        return pipe(
            tryCatch(() => this.userModel.findByIdAndUpdate(uid, user).exec(), (reason) => new Error(String(reason)))
        )
    }

    deleteUser(uid: string): TaskEither<Error, IUser> {
        return pipe(
            tryCatch(() => this.userModel.findByIdAndDelete(uid).exec(), (reason) => new Error(String(reason)))
        )
    }

    findUserByEmail(email: string): TaskEither<Error, IUser> {
        return pipe(
            tryCatch(() => this.userModel.findOne({email}).exec(), (reason) => new Error(String(reason)))
        )
    }

    async existsUserByEmail(email: string) : Promise<boolean> {
        const user = await this.userModel.findOne({email}).exec();
        return !!user;
    }
    async existUsername(username: string) : Promise<boolean> {
        const user = await this.userModel.findOne({username}).exec();
        return !!user;
    }
}
