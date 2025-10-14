import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { AuthRequestDto } from './dto/auth-request.dto';
import { CreateCaredProfileDto } from 'src/cared-profile/dto/create-cared-profile.dto';
import { CaredProfileService } from 'src/cared-profile/cared-profile.service';
import { RegisterRequestDto } from './dto/register-request.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabaseClient: SupabaseClient,
    private readonly caredProfileService: CaredProfileService,
  ) {}
  async signUp(registerRequest: RegisterRequestDto) {
    const { data, error } = await this.supabaseClient.auth.signUp({
      email: registerRequest.email,
      password: registerRequest.password,
    });
    if (error) {
      throw error;
    }
    if (!data.user) {
      throw new Error('User not created');
    }
    try {
      //parsed to create-cared-profile dto
      const createCaredProfileDto: CreateCaredProfileDto = {
        name: registerRequest.name,
        lastname: registerRequest.lastname,
        userId: data.user.id,
      };
      //save profle
      const caredProfile = await this.caredProfileService.create(
        createCaredProfileDto,
      );
      data.user.role = caredProfile.userType;
      return data;
    } catch (e) {
      //if error delete user
      await this.supabaseClient.auth.admin.deleteUser(data.user.id);
      throw e;
    }
  }

  async login(authRequest: AuthRequestDto) {
    const { data, error } = await this.supabaseClient.auth.signInWithPassword({
      email: authRequest.email,
      password: authRequest.password,
    });
    if (error) {
      throw error;
    }
    if (!data.user) {
      throw new Error('User not found');
    }
    const caredProfile = await this.caredProfileService.findByUserId(
      data.user.id,
    );
    data.user.role = caredProfile.userType;
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
