import { Module } from '@nestjs/common';
import { CaredProfileService } from './cared-profile.service';
import { CaredProfileController } from './cared-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaredProfile } from './entities/cared-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CaredProfile])],
  controllers: [CaredProfileController],
  providers: [CaredProfileService],
  exports: [CaredProfileService],
})
export class CaredProfileModule {}
