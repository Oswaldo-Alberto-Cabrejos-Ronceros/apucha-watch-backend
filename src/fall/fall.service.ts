import { Injectable } from '@nestjs/common';
import { CreateFallDto } from './dto/create-fall.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FallService {

  private fallEvents: CreateFallDto[] = [];

  registerFallEvent(event: CreateFallDto) {
    this.fallEvents.push(event);
    return { message: 'Caída registrada', event };
  }

  getFallHistory(userId: string) {
    return this.fallEvents.filter(e => e.userId === userId);
  }
}

