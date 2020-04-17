import { Candidate } from './Candidate';
import { Election } from './Election';

// import Candidate from './Candidate';
export interface Position {
  _id?: string;
  title: string;
  election?: Election;
  candidates?: Candidate[];
}
