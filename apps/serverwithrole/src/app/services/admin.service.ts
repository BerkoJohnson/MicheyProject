import AdminModel from "../models/admin.model";

import * as bcrypt from 'bcrypt';

// Find user by id
export const getAdminById = (id: string, callback: Function) => {
 AdminModel.findById(id, callback);
}

// Find admin by username
export const getAdminByUsername = (username: string, callback: Function) => {
  const query = {
    username: username,
  };

 AdminModel.findOne(query, callback);
};

// to register the admin
export const addAdmin = (newAdmin: typeof AdminModel, callback: Function) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newAdmin.password, salt, (err, hash) => {
      if (err) throw err;
      newAdmin.password = hash;
      newAdmin.save(callback);
    });
  });
};

// compare password
export const comparePassword = (password, hash, callback) => {
  bcrypt.compare(password, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};
