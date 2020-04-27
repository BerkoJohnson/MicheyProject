interface Candidate {
  _id?: string;
  name: string;
  gender: string;
  nickname: string;
  dob: string;
  room: string;
  position: string;
  election?: string;
  photo: Buffer;
}

export default Candidate;
