import { Socket } from 'socket.io';
export interface AuthenticationSocket extends Socket {
  user?: {
    id: string;
    email?: string;
    [key: string]: any;
  };
}
