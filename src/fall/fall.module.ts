import { Module } from '@nestjs/common';
import { FallService } from './fall.service';
import { FallController } from './fall.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FallEvent } from './entities/fall.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FallEvent])],
  controllers: [FallController],
  providers: [FallService],
})
export class FallModule {}
