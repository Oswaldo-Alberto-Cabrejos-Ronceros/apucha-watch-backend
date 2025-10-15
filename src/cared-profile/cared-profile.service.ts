import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCaredProfileDto } from './dto/create-cared-profile.dto';
import { UpdateCaredProfileDto } from './dto/update-cared-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CaredProfile } from './entities/cared-profile.entity';
import { Repository } from 'typeorm';
import { AssignTokenDeviceRequest } from './dto/assign-token-device-request.dto';

@Injectable()
export class CaredProfileService {
  constructor(
    @InjectRepository(CaredProfile)
    private readonly caredProfileRepository: Repository<CaredProfile>,
  ) {}
  async create(createCaredProfileDto: CreateCaredProfileDto) {
    const entity = this.caredProfileRepository.create(createCaredProfileDto);
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

  async assignTokenDevice(assignTokenDeviceRequest: AssignTokenDeviceRequest) {
    const user = await this.findByUserId(assignTokenDeviceRequest.userId);
    user.deviceToken = assignTokenDeviceRequest.deviceToken;
    return this.caredProfileRepository.save(user);
  }

  async update(id: number, updateCaredProfileDto: UpdateCaredProfileDto) {
    const caredProfile = await this.findOne(id);
    if (
      updateCaredProfileDto.name &&
      updateCaredProfileDto.name !== caredProfile.name
    ) {
      caredProfile.name = updateCaredProfileDto.name;
    }
    if (
      updateCaredProfileDto.lastname &&
      updateCaredProfileDto.lastname !== caredProfile.lastname
    ) {
      caredProfile.lastname = updateCaredProfileDto.lastname;
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
