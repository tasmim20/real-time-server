import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { UserService } from './user.service'; // Import the user service

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Route to create a new user
  @Post()
  async createUser(@Body() body: { username: string }) {
    const { username } = body;
    return this.userService.createUser(username);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers(); // No async/await needed if the method is not asynchronous
  }
  @Get(':username') // This handles requests like /users/{username}
  async getUser(@Param('username') username: string) {
    return this.userService.getUserByUsername(username);
  }
}
