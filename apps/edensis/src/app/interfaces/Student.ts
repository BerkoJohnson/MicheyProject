import {} from './Document';
import { Candidate } from './Candidate';

export interface Student extends Document {
  name: string;
  gender: 'Male' | 'Female';
  room: string;
  studentID: string;
  photo?: string;
  isCandidate: boolean;
  candidate: string | Candidate;
}
