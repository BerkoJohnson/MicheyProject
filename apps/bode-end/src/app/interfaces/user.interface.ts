interface User {
  _id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  contact: string;
  createdAt?: string;
  updatedAt?: string;
}

export default User;
