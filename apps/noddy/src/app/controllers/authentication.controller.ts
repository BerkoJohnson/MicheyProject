import * as bcrypt from 'bcrypt';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';

import Controller from '../interfaces/controller.interface';
import userModel from '../models/user.model';
import validateMiddleware from '../middleware/validation.middleware';
import CreateUserDto from '../dtos/user.dto';
import LogInDto from '../dtos/login.dto';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import User from '../interfaces/user.interface';
import TokenData from '../interfaces/tokenData.interface';
import DataStoredInToken from '../interfaces/dataStoredInToken.interface';
import { environment } from '../../environments/environment';

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = express.Router();
  public userModel = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validateMiddleware(CreateUserDto),
      this.registration
    );
    this.router.post(
      `${this.path}/login`,
      validateMiddleware(LogInDto),
      this.loggingIn
    );
  }

  private registration = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const userData: CreateUserDto = req.body;
    if (await this.userModel.findOne({ email: userData.email })) {
      next(new UserWithThatEmailAlreadyExistsException(userData.email));
    } else {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await this.userModel.create({
        ...userData,
        password: hashedPassword
      });
      user.password = undefined;
      const tokenData = this.createToken(user);
      res.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
      res.status(201).json(user);
    }
  };

  private loggingIn = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const logInData: LogInDto = req.body;
    const user = await this.userModel.findOne({ email: logInData.email });

    if (user) {
      const isPasswordMatching = await bcrypt.compare(
        logInData.password,
        (await user).password
      );
      if (isPasswordMatching) {
        user.password = undefined;

        const tokenData = this.createToken(user);
        res.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
        res.status(200).json(tokenData);
      } else {
        next(new WrongCredentialsException());
      }
    } else {
      next(new WrongCredentialsException());
    }
  };

  private createToken(user: User): TokenData {
    const expiresIn = 7 * 24 * 60 * 60; // an hour
    const secret = environment.secret;
    // const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn })
    };
  }

  private createCookie(tokenData: TokenData) {
    return `Authorization = ${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }

  private loggingOut = (req: express.Request, res: express.Response) => {
    res.setHeader('Set-Cookie', ['Authorization=;Max-Age=0']);
    res.send(200);
  };
}

export default AuthenticationController;
