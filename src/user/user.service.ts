import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Fetch all users
  async getUsers() {
    return this.prisma.user.findMany();
  }

  // Create a user
  async createUser(data: { name: string; email: string }) {
    return this.prisma.user.create({
      data,
    });
  }

  // Save a message
  async saveMessage(senderId: number, receiverId: number, content: string) {
    return this.prisma.message.create({
      data: {
        senderId,
        receiverId,
        content,
      },
    });
  }
}
