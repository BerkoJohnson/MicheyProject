import * as mongoose from 'mongoose';
import Admin from '../interfaces/Admin.interface';
const uniqueValidator = require('mongoose-unique-validator');

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  job_profile: {
    type: String,
    required: true,
  },
});

AdminSchema.plugin(uniqueValidator);
const AdminModel = mongoose.model<Admin & mongoose.Document>(
  'Admin',
  AdminSchema
);
export default AdminModel;
