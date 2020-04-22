export interface Election extends Document {
  title: string;
  school: string;
  academicYear: string;
  positions?: Position[];
}

export interface Payload {
  success: boolean;
  count?: number;
  errors?: string[];
}

export interface Position extends Document {
  title: string;
  election?: string | Election;
  candidates?: Candidate[];
}

export interface Document {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Candidate extends Document {
  name: string;
  gender: 'Male' | 'Female';
  dob: string;
  room: string;
  nickname: string;
  photo?: string;
}

export interface Student extends Document {
  name: string;
  gender: 'Male' | 'Female';
  room: string;
  studentID: string;
  photo?: string;
  isCandidate: boolean;
  candidate: string | Candidate;
}
