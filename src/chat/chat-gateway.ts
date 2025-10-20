/* eslint-disable prettier/prettier */
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(5002, { cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log('new user connected..', client.id);
    client.broadcast.emit('user-joined', {
      message: `new user joined the chat: ${client.id}`,
    });
  }
  handleDisconnect(client: Socket) {
    console.log('user disconnected..', client.id);
    this.server.emit('user-left', {
      message: `user left the chat: ${client.id}`,
    });
  }

  @SubscribeMessage('newMessage')
  handleNewMessage(@MessageBody() message: string) {
    this.server.emit('message', message);
  }
}
//socket.on()

//io.emit
//socket.emit()
