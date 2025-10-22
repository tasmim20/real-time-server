import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { PrismaService } from 'prisma/prisma.service';
import { ChatModule } from './chat/chat.module';
import { ChatGateway } from './chat/chat-gateway';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [ChatModule],
  controllers: [AppController, UserController],
  providers: [AppService, AppGateway, PrismaService, ChatGateway, UserService],
})
export class AppModule {}
