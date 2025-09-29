import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VitalSign } from './entities/vital-sign.entity';
import { CreateVitalSignDto } from './dto/create-vital-sign.dto';
import { UpdateVitalSignDto } from './dto/update-vital-sign.dto';

@Injectable()
export class VitalSignService {
  constructor(
    @InjectRepository(VitalSign)
    private readonly vitalSignRepository: Repository<VitalSign>,
  ) {}

  async create(createVitalSignDto: CreateVitalSignDto): Promise<VitalSign> {
    const vitalSign = this.vitalSignRepository.create(createVitalSignDto);
    return this.vitalSignRepository.save(vitalSign);
  }

  async findAll(): Promise<VitalSign[]> {
    return this.vitalSignRepository.find({ relations: ['device'] });
  }

  async findOne(id: number): Promise<VitalSign> {
    const vitalSign = await this.vitalSignRepository.findOne({
      where: { id },
      relations: ['device'],
    });

    if (!vitalSign) {
      throw new NotFoundException(`No se encontró un registro de signos vitales con el ID ${id}`);
    }

    return vitalSign;
  }

  async update(id: number, updateVitalSignDto: UpdateVitalSignDto): Promise<VitalSign> {
    await this.vitalSignRepository.update(id, updateVitalSignDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.vitalSignRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`No se encontró un registro de signos vitales con el ID ${id}`);
    }
  }
}
