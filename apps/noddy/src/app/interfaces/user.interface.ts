interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  posts: string[];
  createdAt?: string;
  updatedAt?: string;
}

export default User;
