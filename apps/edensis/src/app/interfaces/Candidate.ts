import { Position } from './Position';
import { Document } from './Document';
import { Election } from './Election';

export interface Candidate extends Document {
  name: string;
  gender: 'Male' | 'Female';
  dob: string;
  room: string;
  nickname: string;
  position?: Position;
  election?: Election;
  photo?: string;
}
