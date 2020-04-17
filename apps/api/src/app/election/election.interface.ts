import {Document} from 'mongoose';
export interface Election extends Document{
    _id: string;
    title: string;
    school: string;
    academicYear: string;
    positions: string[];
}