import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { AuthRequestDto } from './dto/auth-request.dto';
import { CreateCarerProfleDto } from 'src/carer-profle/dto/create-carer-profle.dto';
import { CarerProfleService } from 'src/carer-profle/carer-profle.service';
import { RegisterRequestDto } from './dto/register-request.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabaseClient: SupabaseClient,
    private readonly carerProfileService: CarerProfleService,
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
      //parsed to create-carer-profile dto
      const createCarerProfileDto: CreateCarerProfleDto = {
        name: registerRequest.name,
        lastname: registerRequest.lastname,
        userId: data.user.id,
      };
      //save profle
      const carerProfile = await this.carerProfileService.create(
        createCarerProfileDto,
      );
      data.user.role = carerProfile.userType;
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
    const carerProfile = await this.carerProfileService.findByUserId(
      data.user.id,
    );
    data.user.role = carerProfile.userType;
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
