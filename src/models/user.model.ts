import { Schema, model } from 'mongoose';

export interface IUser {
    uid: string;
    mail: string;
    username: string;
    password: string;
    token?: string;
    picture?: string;
}

export const UserSchema = new Schema<IUser>({
    uid: { type: String, required: true, unique: true },
    mail: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String, required: false },
    picture: { type: String, required: false },
});

export const UserModel = model<IUser>('User', UserSchema);