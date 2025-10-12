import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { CaredProfileModule } from 'src/cared-profile/cared-profile.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaredProfile } from 'src/cared-profile/entities/cared-profile.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [TypeOrmModule.forFeature([CaredProfile]), CaredProfileModule],
})
export class AuthModule {}
