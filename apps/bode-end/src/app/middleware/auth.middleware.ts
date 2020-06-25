import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import RequestWithUser from '../interfaces/requestWithUser.interface';
import DataStoredInToken from '../interfaces/dataStoredInToken.interface';
import userModel from '../models/user.model';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import { environment } from '../../environments/environment';

async function authMiddleware(
  request: RequestWithUser,
  response: Response,
  next: NextFunction
) {
  const authorization = request.headers.authorization;

  if (authorization) {
    const token = authorization.split(' ')[1];
    const secret = environment.secret;

    try {
      const verificationResponse = jwt.verify(
        token,
        secret
      ) as DataStoredInToken;
      const id = verificationResponse._id;
      const user = await userModel.findById(id);
      if (user) {
        request.user = user;
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}

export default authMiddleware;
