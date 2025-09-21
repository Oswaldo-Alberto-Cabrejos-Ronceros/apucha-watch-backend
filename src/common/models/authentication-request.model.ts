import { User } from '@supabase/supabase-js';
import { Request } from 'express';
export interface AuthenticationRequest extends Request {
  user?: User;
}
