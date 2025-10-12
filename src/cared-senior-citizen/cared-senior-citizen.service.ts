import { Injectable } from '@nestjs/common';
import { CreateCaredSeniorCitizenDto } from './dto/create-cared-senior-citizen.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CaredSeniorCitizen } from './entities/cared-senior-citizen.entity';
import { Repository } from 'typeorm';
import { CheckLinkageResponseDto } from './dto/check-linkage.response.dto';
import { CaredProfileService } from 'src/cared-profile/cared-profile.service';
import { CreateCaredProfileWithUserDto } from './dto/create-cared-senior-citizen-with-user.dto';

@Injectable()
export class CaredSeniorCitizenService {
  constructor(
    @InjectRepository(CaredSeniorCitizen)
    private readonly caredSeniorCitizenRepository: Repository<CaredSeniorCitizen>,
    private readonly caredProfileService: CaredProfileService,
  ) {}
  async create(createCaredSeniorCitizenDto: CreateCaredSeniorCitizenDto) {
    const entity = this.caredSeniorCitizenRepository.create({
      caredProfile: { id: createCaredSeniorCitizenDto.caredProfileId },
      seniorCitizenProfile: {
        id: createCaredSeniorCitizenDto.seniorCitizenProfileId,
      },
    });
    return await this.caredSeniorCitizenRepository.save(entity);
  }

  async createByUserId(
    createCaredProfileWithUserDto: CreateCaredProfileWithUserDto,
  ) {
    const caredProfile = await this.caredProfileService.findByUserId(
      createCaredProfileWithUserDto.userId,
    );
    const entity = this.caredSeniorCitizenRepository.create({
      caredProfile: { id: caredProfile.id },
      seniorCitizenProfile: {
        id: createCaredProfileWithUserDto.seniorCitizenProfileId,
      },
    });
    return await this.caredSeniorCitizenRepository.save(entity);
  }

  async findAll() {
    return this.caredSeniorCitizenRepository.find();
  }

  async findOne(id: number) {
    return this.caredSeniorCitizenRepository.findOneByOrFail({ id: id });
  }

  async remove(id: number) {
    const caredSeniorCitizen = await this.findOne(id);
    return await this.caredSeniorCitizenRepository.delete(caredSeniorCitizen);
  }
  //for check linkage
  async checkLinkage(deviceCode: string) {
    const exist = await this.caredSeniorCitizenRepository.exists({
      where: {
        seniorCitizenProfile: {
          device: {
            code: deviceCode,
          },
        },
      },
    });
    if (exist) {
      return {
        linked: true,
        fecha: new Date(),
      } as CheckLinkageResponseDto;
    } else {
      return {
        linked: false,
      } as CheckLinkageResponseDto;
    }
  }

  //for return seniors profile by cared profile
  async getAllByCaredProfileId(caredProfileId: number) {
    return this.caredSeniorCitizenRepository.findBy({
      caredProfile: {
        id: caredProfileId,
      },
    });
  }

  //for return seniors profile by user id
  async getAllByUserId(userId: string) {
    return this.caredSeniorCitizenRepository.find({
      where: {
        caredProfile: {
          userId: userId,
        },
      },
    });
  }
}
