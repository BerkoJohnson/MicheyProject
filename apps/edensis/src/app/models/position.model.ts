import IElection from './election.model';
import ICandidate from './candidate.model';

export default class IPosition {
  title: string;
  election?: string;
  candidates?: ICandidate[];
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}
