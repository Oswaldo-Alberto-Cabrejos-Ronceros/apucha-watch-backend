import { Injectable, Logger } from '@nestjs/common';
import { SupabaseAuthService } from 'src/supabase/supabase-auth.service';
import { AuthenticationSocket } from '../models/authentication-socket.model';

@Injectable()
export class SocketAuthMiddleware {
  private readonly logger = new Logger(SocketAuthMiddleware.name);
  constructor(private readonly supabaseAuthService: SupabaseAuthService) {}
  use = async (socket: AuthenticationSocket, next: (err?: Error) => void) => {
    try {
      const token = socket.handshake.auth?.token as string | undefined;
      if (!token) throw new Error('Token no encontrado');
      const user = await this.supabaseAuthService.verifyToken(token);
      socket.user = user;
      this.logger.log(`Socket autenticado:${user.email}`);
      next();
    } catch (err) {
      this.logger.error(`Error de autenticacion:${err}`);
      next(new Error('Autenticacion fallida'));
    }
  };
}
