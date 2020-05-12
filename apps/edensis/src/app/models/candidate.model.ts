import IPosition from './position.model';
import IElection from './election.model';

export default class ICandidate {
  name: string;
  gender: 'Male' | 'Female';
  dob: string;
  room: string;
  nickname: string;
  position?: IPosition;
  election?: IElection;
  photo?: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}
