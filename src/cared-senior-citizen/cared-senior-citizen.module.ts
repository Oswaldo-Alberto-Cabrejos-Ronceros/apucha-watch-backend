import { Module } from '@nestjs/common';
import { CaredSeniorCitizenService } from './cared-senior-citizen.service';
import { CaredSeniorCitizenController } from './cared-senior-citizen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaredSeniorCitizen } from './entities/cared-senior-citizen.entity';
import { CaredProfileModule } from 'src/cared-profile/cared-profile.module';
import { CaredProfile } from 'src/cared-profile/entities/cared-profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CaredSeniorCitizen, CaredProfile]),
    CaredProfileModule,
  ],
  controllers: [CaredSeniorCitizenController],
  providers: [CaredSeniorCitizenService],
})
export class CaredSeniorCitizenModule {}
