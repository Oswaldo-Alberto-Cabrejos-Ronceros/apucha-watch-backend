import { Module } from '@nestjs/common';
import { CaredSeniorCitizenService } from './cared-senior-citizen.service';
import { CaredSeniorCitizenController } from './cared-senior-citizen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaredSeniorCitizen } from './entities/cared-senior-citizen.entity';
import { CarerProfleModule } from 'src/carer-profle/carer-profle.module';
import { CarerProfle } from 'src/carer-profle/entities/carer-profle.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CaredSeniorCitizen, CarerProfle]),
    CarerProfleModule,
  ],
  controllers: [CaredSeniorCitizenController],
  providers: [CaredSeniorCitizenService],
})
export class CaredSeniorCitizenModule {}
