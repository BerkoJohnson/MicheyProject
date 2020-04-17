import { Controller, Get, Body, Post, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './user.dto';

@Controller('v1/api/users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    all() {
        return this.userService.list();
    }

    @Post()
    create(@Body() userData: CreateUserDto) {
        if(userData.password !== userData.confirm_password) {
            return HttpStatus.BAD_REQUEST;
        }
        return this.userService.create(userData);
    }
}
