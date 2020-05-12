interface Election {
  _id?: string;
  title: string;
  school: string;
  academicYear: string;
  positions: string[];
  createdAt?: string;
  updatedAt?: string;
}

export default Election;
