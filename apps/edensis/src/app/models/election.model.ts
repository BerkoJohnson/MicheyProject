import IPosition from './position.model';

export default class IElection {
  title: string;
  school: string;
  academicYear: string;
  positions?: IPosition[];
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}
