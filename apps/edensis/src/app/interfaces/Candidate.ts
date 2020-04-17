import { Position } from './Position';

export interface Candidate {
  _id?: string;
  name: string;
  gender: string;
  nickname: string;
  dob: string;
  room: string;
  position?: Position;
  photo?: string;
}
