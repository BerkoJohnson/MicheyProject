export interface VotingElection {
  _id: string;
  title: string;
  school: string;
  academicYear: string;
  positions: {
    _id?: string;
    title: string;
    candidates: {
      _id?: string;
      name: string;
      gender: string;
      nickname: string;
      dob: string;
      room: string;
      photo: string;
    }[];
  }[];
}
