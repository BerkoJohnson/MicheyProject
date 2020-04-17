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

export interface ElectionPayload extends Payload {
  data: Election;
}

export interface ElectionsPayload extends Payload {
  data: Election[];
}

export interface Position extends Document {
  title: string;
  cast_type: 'Thumbs' | 'Yes/No';
  election?: string | Election;
  candidates?: Candidate[];
}

export interface PositionsPayload extends Payload {
  data: Position[];
}
export interface PositionPayload extends Payload {
  data: Position;
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
  studentID: string;
  nickname: string;
  photo?: string;
}

export interface CandidatesPayload extends Payload {
  data: Candidate[];
}
export interface CandidatePayload extends Payload {
  data: Candidate;
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
