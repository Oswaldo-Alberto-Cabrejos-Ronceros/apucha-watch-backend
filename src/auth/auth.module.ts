import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { CarerProfleModule } from 'src/carer-profle/carer-profle.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [SupabaseModule, CarerProfleModule],
})
export class AuthModule {}
