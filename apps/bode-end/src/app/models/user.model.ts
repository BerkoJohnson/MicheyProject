import * as mongoose from 'mongoose';
import User from '../interfaces/user.interface';

const userSchema = new mongoose.Schema(
  {
    name: {type: String, required: true, trim: true},
    username: {type: String, required: true, trim: true, unique: true},
    email: {type: String, required: true, trim: true, unique: true},
    password: {type: String, required: true},
    photo: Buffer,
    role: {type: String,enum: ['User', 'Admin'], default: 'User'},
    contact: {type: String, }
  },
  {
    timestamps: true
  }
);

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);
export default userModel;
