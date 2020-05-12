interface Position {
  _id: string;
  title: string;
  election: string;
  candidates: string[];

  createdAt?: string;
  updatedAt?: string;
}

export default Position;
