import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseAuthService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabaseClient: SupabaseClient,
  ) {}
  async verifyToken(token: string) {
    const { data, error } = await this.supabaseClient.auth.getUser(token);
    if (error || !data.user) throw new Error('Token invalido');
    return data.user;
  }
}
