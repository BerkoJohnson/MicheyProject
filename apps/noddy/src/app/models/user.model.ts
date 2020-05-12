import * as mongoose from 'mongoose';
import User from '../interfaces/user.interface';

const addressSchema = new mongoose.Schema({
  city: String,
  street: String
});

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    photo: Buffer,
    telephone: String
  },
  {
    timestamps: true
  }
);

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);
export default userModel;
