import { Module } from '@nestjs/common';
import { SeniorCitizenProfileService } from './senior-citizen-profile.service';
import { SeniorCitizenProfileController } from './senior-citizen-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeniorCitizenProfile } from './entities/senior-citizen-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SeniorCitizenProfile])],
  controllers: [SeniorCitizenProfileController],
  providers: [SeniorCitizenProfileService],
})
export class SeniorCitizenProfileModule {}
