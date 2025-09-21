import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCarerProfleDto } from './dto/create-carer-profle.dto';
import { UpdateCarerProfleDto } from './dto/update-carer-profle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CarerProfle } from './entities/carer-profle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarerProfleService {
  constructor(
    @InjectRepository(CarerProfle)
    private readonly caredProfileRepository: Repository<CarerProfle>,
  ) {}
  async create(createCarerProfleDto: CreateCarerProfleDto) {
    const entity = this.caredProfileRepository.create(createCarerProfleDto);
    return await this.caredProfileRepository.save(entity);
  }

  async findAll() {
    return await this.caredProfileRepository.find();
  }

  async findOne(id: number) {
    return await this.caredProfileRepository.findOneByOrFail({ id: id });
  }

  //for find by user id from supabase auth
  async findByUserId(userId: string) {
    return await this.caredProfileRepository.findOneByOrFail({
      userId: userId,
    });
  }

  async update(id: number, updateCarerProfleDto: UpdateCarerProfleDto) {
    const caredProfile = await this.findOne(id);
    if (
      updateCarerProfleDto.name &&
      updateCarerProfleDto.name !== caredProfile.name
    ) {
      caredProfile.name = updateCarerProfleDto.name;
    }
    if (
      updateCarerProfleDto.lastname &&
      updateCarerProfleDto.lastname !== caredProfile.lastname
    ) {
      caredProfile.lastname = updateCarerProfleDto.lastname;
    }
    return await this.caredProfileRepository.save(caredProfile);
  }

  async remove(id: number) {
    const caredProfile = await this.findOne(id);
    return await this.caredProfileRepository.softDelete(caredProfile);
  }

  async restore(id: number) {
    const caredProfile = await this.caredProfileRepository.findOneOrFail({
      where: { id: id },
      withDeleted: true,
    });
    if (!caredProfile.deleteAt) {
      throw new ConflictException('El perfil no está eliminado');
    }
    return await this.caredProfileRepository.restore(caredProfile);
  }
}
