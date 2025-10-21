// import { Controller, Get, Post, Body } from '@nestjs/common';
// import { UserService } from './user.service';

// @Controller('users')
// export class UserController {
//   constructor(private readonly userService: UserService) {}

//   @Get()
//   async getUsers() {
//     return this.userService.getUsers();
//   }

//   @Post()
//   async createUser(@Body() body: { name: string; email: string }) {
//     return this.userService.createUser(body);
//   }

//   @Post('message')
//   // eslint-disable-next-line prettier/prettier
//   async saveMessage(
//     @Body() body: { senderId: number; receiverId: number; content: string },
//   ) {
//     // eslint-disable-next-line prettier/prettier
//     return this.userService.saveMessage(
//       body.senderId,
//       body.receiverId,
//       body.content,
//     );
//   }
// }
