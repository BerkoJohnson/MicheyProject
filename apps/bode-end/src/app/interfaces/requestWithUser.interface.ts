import * as express from 'express';
import User from './user.interface';

interface RequestWithUser extends express.Request {
  user?: User;
  file?: any;
}

export default RequestWithUser;
