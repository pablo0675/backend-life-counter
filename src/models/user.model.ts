import { Schema, model } from 'mongoose';

export interface IUser {
    uid: string;
    email: string;
    username: string;
    password: string;
    token?: string;
    picture?: string;
    is_admin?: boolean;
}

export const UserSchema = new Schema<IUser>({
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String, required: false },
    picture: { type: String, required: false },
    is_admin: { type: Boolean, required: false },
});

export const UserModel = model<IUser>('User', UserSchema);