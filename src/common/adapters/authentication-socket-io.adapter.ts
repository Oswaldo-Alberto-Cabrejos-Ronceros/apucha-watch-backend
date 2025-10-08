import { IoAdapter } from '@nestjs/platform-socket.io';
import { SocketAuthMiddleware } from '../middlewares/socket-auth.middleware';
import { INestApplicationContext } from '@nestjs/common';
import { Server, ServerOptions, Socket } from 'socket.io';

export class AuthenticationSocketIoAdapter extends IoAdapter {
  private readonly authMiddleware: SocketAuthMiddleware;
  constructor(
    app: INestApplicationContext,
    authMiddleware: SocketAuthMiddleware,
  ) {
    super(app);
    this.authMiddleware = authMiddleware;
  }
  override createIOServer(port: number, options?: ServerOptions): Server {
    const server = super.createIOServer(port, {
      ...options,
      cors: { origin: '*' },
    }) as Server;
    server.use((socket: Socket, next) => {
      void this.authMiddleware.use(socket, next);
    });
    return server;
  }
}
