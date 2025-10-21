/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /* eslint-disable prettier/prettier */
// import {
//   MessageBody,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';

// @WebSocketGateway(5002, { cors: { origin: '*' } })
// export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer() server: Server;

//   handleConnection(client: Socket) {
//     console.log('new user connected..', client.id);
//     client.broadcast.emit('user-joined', {
//       message: `new user joined the chat: ${client.id}`,
//     });
//   }
//   handleDisconnect(client: Socket) {
//     console.log('user disconnected..', client.id);
//     this.server.emit('user-left', {
//       message: `user left the chat: ${client.id}`,
//     });
//   }

//   @SubscribeMessage('newMessage')
//   handleNewMessage(@MessageBody() message: string) {
//     this.server.emit('message', message);
//   }
// }
//socket.on()

//io.emit
//socket.emit()

/* eslint-disable prettier/prettier */
// import {
//   MessageBody,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { PrismaService } from 'prisma/prisma.service';
// import { Server, Socket } from 'socket.io';

// @WebSocketGateway(5002, { cors: { origin: '*' } })
// export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer() server: Server;

//   // Inject PrismaService for database interaction
//   constructor(private prisma: PrismaService) {}

//   handleConnection(client: Socket) {
//     console.log('new user connected..', client.id);
//     client.broadcast.emit('user-joined', {
//       message: `new user joined the chat: ${client.id}`,
//     });
//   }

//   handleDisconnect(client: Socket) {
//     console.log('user disconnected..', client.id);
//     this.server.emit('user-left', {
//       message: `user left the chat: ${client.id}`,
//     });
//   }

//   @SubscribeMessage('newMessage')
//   async handleNewMessage(
//     @MessageBody() data: { message: string; username: string },
//   ) {
//     try {
//       // Use `upsert` to find or create the user based on the username
//       const user = await this.prisma.user.upsert({
//         where: { username: data.username }, // This will look for an existing user
//         update: {}, // No need to update anything if the user exists
//         create: { username: data.username }, // Create a new user if the user doesn't exist
//       });

//       // Save the message in the database and associate it with the user
//       const savedMessage = await this.prisma.message.create({
//         data: {
//           message: data.message, // Store the message
//           userId: user.id, // Associate the message with the user
//         },
//       });
//       console.log(savedMessage);

//       // Broadcast the saved message to all connected clients
//       this.server.emit('message', {
//         message: savedMessage.message,
//         username: data.username,
//       });
//     } catch (error) {
//       // Enhanced error handling
//       if (error instanceof Error) {
//         console.error('Error saving message:', error.message);
//         console.error('Stack trace:', error.stack); // Logs the stack trace for deeper debugging
//       } else {
//         console.error('Unexpected error:', error);
//       }
//     }
//   }
// }

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(5002, { cors: { origin: ['http://localhost:3000'] } })
export class ChatGateway {
  @WebSocketServer() server: Server;
  private connectedUsers: Record<string, { username: string; id: string }> = {};

  handleDisconnect(client: Socket) {
    for (const u of Object.keys(this.connectedUsers)) {
      if (this.connectedUsers[u].id === client.id)
        delete this.connectedUsers[u];
    }
    this.server.emit('joined', this.connectedUsers);
  }

  @SubscribeMessage('join-user')
  join(@MessageBody() name: string, @ConnectedSocket() client: Socket) {
    this.connectedUsers[name] = { username: name, id: client.id };
    this.server.emit('joined', this.connectedUsers);
  }

  @SubscribeMessage('offer')
  offer(@MessageBody() d: { from: string; to: string; offer: any }) {
    const peer = this.connectedUsers[d.to];
    if (peer) this.server.to(peer.id).emit('offer', d);
  }

  @SubscribeMessage('answer')
  answer(@MessageBody() d: { from: string; to: string; answer: any }) {
    const peer = this.connectedUsers[d.to];
    if (peer) this.server.to(peer.id).emit('answer', d);
  }

  @SubscribeMessage('icecandidate')
  ice(@MessageBody() d: { from: string; to: string; candidate: any }) {
    const peer = this.connectedUsers[d.to];
    if (peer) this.server.to(peer.id).emit('icecandidate', d);
  }

  @SubscribeMessage('end-call')
  end(@MessageBody() data: { from: string; to: string }) {
    const peer = this.connectedUsers[data.to];
    if (peer) this.server.to(peer.id).emit('end-call', data);
  }
}
