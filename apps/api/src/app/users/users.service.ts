import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as crypto from 'crypto';

import { IUser } from './user.interface';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) { }

  async findOne(username: string): Promise<IUser | undefined> {
    const user = await this.userModel.findOne({username: username});
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    const createdUser = new this.userModel(createUserDto);

    createdUser.salt = crypto.randomBytes(16).toString('hex');
    createdUser.hash = crypto.pbkdf2Sync(createUserDto.password, createdUser.salt, 10000, 64, 'sha512').toString('hex')

    const user = await createdUser.save();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    user.hash = undefined;
    user.salt =undefined;
    return user;
  }

  async list(): Promise<IUser[]> {
    return await this.userModel.find().exec();
  }

}
