interface Voter {
  _id?: string;
  name: string;
  gender?: string;
  room?: string;
  password?: string;
  election?: string;
  isVoted: boolean;
  votes?: {
    candidate?: string;
    position?: string;
    castType?: 'Yes' | 'No' | 'Thumbs';
  }[];
  createdAt?: string;
  updatedAt?: string;
}

export default Voter;
