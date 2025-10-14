import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeniorHealth } from './entities/senior-health.entity';
import { SeniorHealthService } from './senior-health.service';
import { SeniorHealthController } from './senior-health.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SeniorHealth])],
  providers: [SeniorHealthService],
  controllers: [SeniorHealthController],
})
export class SeniorHealthModule {}
