import { Position } from './Position';
import { Document } from './Document';

export interface Election extends Document {
  title: string;
  school: string;
  academicYear: string;
  positions?: Position[];
}
