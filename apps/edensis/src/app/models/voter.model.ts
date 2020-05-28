import Votes from './Votes.model';

export default class IVoter {
  _id?: string;
  name: string;
  gender?: string;
  room?: string;
  password?: string;
  election?: string;
  isVoted: boolean;
  votes?: Votes[];
  createdAt?: string;
  updatedAt?: string;
}
