import { Injectable } from '@nestjs/common';
import { CreateSeniorCitizenProfileDto } from './dto/create-senior-citizen-profile.dto';
import { UpdateSeniorCitizenProfileDto } from './dto/update-senior-citizen-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SeniorCitizenProfile } from './entities/senior-citizen-profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeniorCitizenProfileService {
  constructor(
    @InjectRepository(SeniorCitizenProfile)
    private readonly seniorCitizenProfileRepository: Repository<SeniorCitizenProfile>,
  ) {}
  async create(createSeniorCitizenProfileDto: CreateSeniorCitizenProfileDto) {
    const entity = this.seniorCitizenProfileRepository.create({
      ...createSeniorCitizenProfileDto,
      device: { id: createSeniorCitizenProfileDto.deviceId },
    });
    return await this.seniorCitizenProfileRepository.save(entity);
  }

  async findAll() {
    return await this.seniorCitizenProfileRepository.find();
  }

  async findOne(id: number) {
    return await this.seniorCitizenProfileRepository.findOneOrFail({
      where: { id: id },
      relations: { device: true },
    });
  }

  async findOneByDeviceCode(deviceCode: string) {
    return await this.seniorCitizenProfileRepository.findOneOrFail({
      where: {
        device: {
          code: deviceCode,
        },
      },
    });
  }

  async update(
    id: number,
    updateSeniorCitizenProfileDto: UpdateSeniorCitizenProfileDto,
  ) {
    const seniorCitizenProfile = await this.findOne(id);
    if (
      updateSeniorCitizenProfileDto.name &&
      updateSeniorCitizenProfileDto.name !== seniorCitizenProfile.name
    ) {
      seniorCitizenProfile.name = updateSeniorCitizenProfileDto.name;
    }
    if (
      updateSeniorCitizenProfileDto.lastname &&
      updateSeniorCitizenProfileDto.lastname !== seniorCitizenProfile.lastname
    ) {
      seniorCitizenProfile.lastname = updateSeniorCitizenProfileDto.lastname;
    }
    if (
      updateSeniorCitizenProfileDto.birthdate &&
      updateSeniorCitizenProfileDto.birthdate !== seniorCitizenProfile.birthdate
    ) {
      seniorCitizenProfile.birthdate = updateSeniorCitizenProfileDto.birthdate;
    }
    return await this.seniorCitizenProfileRepository.save(seniorCitizenProfile);
  }

  async remove(id: number) {
    const seniorCitizenProfile = await this.findOne(id);
    return await this.seniorCitizenProfileRepository.softDelete(
      seniorCitizenProfile,
    );
  }

  async restore(id: number) {
    const seniorCitizenProfile =
      await this.seniorCitizenProfileRepository.findOneOrFail({
        where: { id: id },
        withDeleted: true,
      });
    if (!seniorCitizenProfile.deleteAt) {
      throw new Error('El perfil no está eliminado');
    }
    return await this.seniorCitizenProfileRepository.restore(
      seniorCitizenProfile,
    );
  }
}
