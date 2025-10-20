/* eslint-disable prettier/prettier */
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('offer')
  handleOffer(@MessageBody() offer: any, client: Socket): void {
    if (!client || !client.connected) {
      console.error('Client is not connected.');
      return;
    }
    client.broadcast.emit('offer', offer);
  }

  @SubscribeMessage('answer')
  handleAnswer(@MessageBody() answer: any, client: Socket): void {
    if (!client || !client.connected) {
      console.error('Client is not connected.');
      return;
    }
    client.broadcast.emit('answer', answer);
  }

  @SubscribeMessage('ice-candidate')
  handleIceCandidate(@MessageBody() candidate: any, client: Socket): void {
    if (!client || !client.connected) {
      console.error('Client is not connected.');
      return;
    }
    client.broadcast.emit('ice-candidate', candidate);
  }
}
