import { Module } from '@nestjs/common';
import { VitalSignService } from './vital-signs.service';
import { VitalSignController } from './vital-signs.controller';
import { VitalSign } from './entities/vital-sign.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([VitalSign])],
  controllers: [VitalSignController],
  providers: [VitalSignService],
})
export class VitalSignsModule {}
