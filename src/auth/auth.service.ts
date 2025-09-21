import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { AuthRequestDto } from './dto/auth-request.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabaseClient: SupabaseClient,
  ) {}
  async signUp(authRequest: AuthRequestDto) {
    const { data, error } = await this.supabaseClient.auth.signUp({
      email: authRequest.email,
      password: authRequest.password,
    });
    if (error) {
      throw error;
    }
    return data;
  }
  async login(authRequest: AuthRequestDto) {
    const { data, error } = await this.supabaseClient.auth.signInWithPassword({
      email: authRequest.email,
      password: authRequest.password,
    });
    if (error) {
      throw error;
    }
    return data;
  }
  async getUser(token: string) {
    const { data, error } = await this.supabaseClient.auth.getUser(token);
    if (error) {
      throw error;
    }
    return data;
  }
}
