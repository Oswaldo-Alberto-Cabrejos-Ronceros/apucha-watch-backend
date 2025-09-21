import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { CarerProfleService } from 'src/carer-profle/carer-profle.service';
import { AuthenticationRequest } from 'src/common/models/authentication-request.model';

@Injectable()
export class SupabaseAuthGuardGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly supabaseClient: SupabaseClient,
    private readonly carerProfleService: CarerProfleService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    //if is public allow access
    if (isPublic) {
      return true;
    }
    //for verification of token with supabase auth
    const req: AuthenticationRequest = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }
    const token = authHeader.replace('Bearer ', '');

    const { data, error } = await this.supabaseClient.auth.getUser(token);
    if (error || !data?.user) {
      throw new UnauthorizedException('No token provided');
    }

    //obtenemos rol
    const carerProfile = await this.carerProfleService.findByUserId(
      data.user.id,
    );
    if (!carerProfile) {
      throw new UnauthorizedException('No rol provided');
    }
    req.user = data.user;
    req.user.role = carerProfile.userType;
    return true;
  }
}
