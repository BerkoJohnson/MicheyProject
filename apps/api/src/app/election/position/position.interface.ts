import {Document} from 'mongoose';

export interface Position extends Document{
    _id: string;
    title: string;
    election: string;
}