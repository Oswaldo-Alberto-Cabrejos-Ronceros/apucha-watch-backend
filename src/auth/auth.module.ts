import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { CarerProfleModule } from 'src/carer-profle/carer-profle.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarerProfle } from 'src/carer-profle/entities/carer-profle.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [TypeOrmModule.forFeature([CarerProfle]), CarerProfleModule],
})
export class AuthModule {}
