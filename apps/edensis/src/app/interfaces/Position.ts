import { Candidate } from './Candidate';
import { Election } from './Election';
import { Document } from './Document';

export interface Position extends Document {
  title: string;
  election?: string | Election;
  candidates?: string | Candidate[];
}
