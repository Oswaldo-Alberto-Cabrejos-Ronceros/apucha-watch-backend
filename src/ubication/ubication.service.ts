import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ubication } from './entities/ubication.entity';
import { CreateUbicationDto } from './dto/create-ubication.dto';
import { UpdateUbicationDto } from './dto/update-ubication.dto';

@Injectable()
export class UbicationService {
  constructor(
    @InjectRepository(Ubication)
    private readonly ubicationRepository: Repository<Ubication>,
  ) {}

  async create(createUbicationDto: CreateUbicationDto): Promise<Ubication> {
    const ubication = this.ubicationRepository.create(createUbicationDto);
    return this.ubicationRepository.save(ubication);
  }

  async findAll(): Promise<Ubication[]> {
    return this.ubicationRepository.find({ relations: ['device'] });
  }

  async findOne(id: number): Promise<Ubication> {
    const ubication = await this.ubicationRepository.findOne({
      where: { id },
      relations: ['device'],
    });
    if (!ubication) {
      throw new NotFoundException(
        `La ubicación con ID ${id} no fue encontrada`,
      );
    }
    return ubication;
  }

  async update(
    id: number,
    updateUbicationDto: UpdateUbicationDto,
  ): Promise<Ubication> {
    const result = await this.ubicationRepository.update(
      id,
      updateUbicationDto,
    );
    if (result.affected === 0) {
      throw new NotFoundException(
        `La ubicación con ID ${id} no fue encontrada`,
      );
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.ubicationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `La ubicación con ID ${id} no fue encontrada`,
      );
    }
  }
}
