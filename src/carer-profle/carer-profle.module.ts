import { Module } from '@nestjs/common';
import { CarerProfleService } from './carer-profle.service';
import { CarerProfleController } from './carer-profle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarerProfle } from './entities/carer-profle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarerProfle])],
  controllers: [CarerProfleController],
  providers: [CarerProfleService],
  exports: [CarerProfleService],
})
export class CarerProfleModule {}
