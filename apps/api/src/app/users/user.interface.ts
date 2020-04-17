import { Document } from 'mongoose';

export interface IUser extends Document {
    _id: string;
    name: string;
    username: string;
    email: string;
    photo: string;
    salt?: string;
    hash?: string;
    telephone: string;
    createdAt: string;
    updatedAt: string;
}