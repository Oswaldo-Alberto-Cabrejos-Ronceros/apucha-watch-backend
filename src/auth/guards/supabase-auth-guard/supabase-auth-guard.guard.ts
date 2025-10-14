import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { CaredProfileService } from 'src/cared-profile/cared-profile.service';
import { AuthenticationRequest } from 'src/common/models/authentication-request.model';

@Injectable()
export class SupabaseAuthGuardGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('SUPABASE_CLIENT') private readonly supabaseClient: SupabaseClient,
    private readonly caredProfileService: CaredProfileService,
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
    const caredProfile = await this.caredProfileService.findByUserId(
      data.user.id,
    );
    if (!caredProfile) {
      throw new UnauthorizedException('No rol provided');
    }
    req.user = data.user;
    req.user.role = caredProfile.userType;
    return true;
  }
}
