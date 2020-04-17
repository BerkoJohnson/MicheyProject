/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { UsersService } from '../users/users.service';



@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if(!user) {
      return null;
    }
    const hash = crypto.pbkdf2Sync(pass, user.salt, 10000, 64, 'sha512').toString('hex');
    if (user && user.hash === hash) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      user.salt = undefined;
      user.hash = undefined;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
