import { Module } from '@nestjs/common';
import { CaredSeniorCitizenService } from './cared-senior-citizen.service';
import { CaredSeniorCitizenController } from './cared-senior-citizen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaredSeniorCitizen } from './entities/cared-senior-citizen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CaredSeniorCitizen])],
  controllers: [CaredSeniorCitizenController],
  providers: [CaredSeniorCitizenService],
})
export class CaredSeniorCitizenModule {}
