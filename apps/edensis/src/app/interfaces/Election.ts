import { Position } from './Position';

export interface Election {
  _id?: string;
  title: string;
  school: string;
  academicYear: string;
  positions?: Position[];
}
