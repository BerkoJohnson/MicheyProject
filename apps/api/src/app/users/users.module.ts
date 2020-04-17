import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import UserSchema  from './user.schema';

@Module({
  imports: [MongooseModule.forFeature([{
    name: 'User',
    schema: UserSchema
  }])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule { }
