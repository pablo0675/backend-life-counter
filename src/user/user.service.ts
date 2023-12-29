import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {IUser} from "../models/user.model";

import { v4 as uuidv4 } from 'uuid';
import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/function/';
import {CreateUserDto} from "./dto/user.dto";
import {hash, verify} from "argon2";


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {
    }

    createUser(user: CreateUserDto): TaskEither<Error, IUser> {
        return pipe(
            tryCatch(() => {
                const uid = uuidv4();
                const createdUser = new this.userModel({...user, uid, is_admin: false});
                return createdUser.save();
            }, (reason) => new Error(String(reason)))
        )
    }

    findUserById(uid: string): TaskEither<Error, IUser> {
        return pipe(
            tryCatch(() => this.userModel.findOne({uid: uid}).exec(), (reason) => new Error(String(reason)))
        )
    }

    async updateUser(user_id: string, user: IUser): Promise<IUser> {
        try {
            const oldUser = await this.userModel.findOne({uid: user_id}).exec();
            if (!oldUser) {
                throw new Error('User not found');
            }
            if (!await verify(oldUser.password, user.password)) {
                user.password = await hash(user.password);
            }
            const updatedUser = await this.userModel.findOneAndUpdate({uid: user_id}, user, {new: true}).exec();
            return updatedUser;
        } catch (e) {
            throw new Error(e);
        }
    }

    deleteUser(uid: string): TaskEither<Error, IUser> {
        return pipe(
            tryCatch(() => this.userModel.findOneAndDelete({uid: uid}).exec(), (reason) => new Error(String(reason)))
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

    async isUserAdmin(uid: string) : Promise<boolean> {
        const user = await this.userModel.findOne({uid}).exec();
        return user.is_admin;
    }
}
