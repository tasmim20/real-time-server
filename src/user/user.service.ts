import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Method to create a new user
  async createUser(username: string) {
    // Create user in the database
    const newUser = await this.prisma.user.create({
      data: { username },
    });
    return newUser;
  }
  async getAllUsers() {
    return this.prisma.user.findMany(); // Prisma query to get all users
  }
  // Method to get a user by their username
  async getUserByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }
}
