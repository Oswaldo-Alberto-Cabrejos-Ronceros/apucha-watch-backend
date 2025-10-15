import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
  ) {}

  async create(createDeviceDto: CreateDeviceDto): Promise<Device> {
    const device = this.deviceRepository.create(createDeviceDto);
    return await this.deviceRepository.save(device);
  }

  async findAll(): Promise<Device[]> {
    return await this.deviceRepository.find({
      relations: ['ubications', 'vitalSigns'],
    });
  }

  async findOne(id: number): Promise<Device> {
    const device = await this.deviceRepository.findOne({
      where: { id },
      relations: ['ubications', 'vitalSigns'],
    });
    if (!device) {
      throw new NotFoundException(`Device con id ${id} no encontrado`);
    }
    return device;
  }

  async findOneByCode(deviceCode: string) {
    return await this.deviceRepository.findOneOrFail({
      where: {
        code: deviceCode,
      },
    });
  }

  async update(id: number, updateDeviceDto: UpdateDeviceDto): Promise<Device> {
    const device = await this.findOne(id);
    Object.assign(device, updateDeviceDto);
    return await this.deviceRepository.save(device);
  }

  async remove(id: number): Promise<void> {
    const device = await this.findOne(id);
    await this.deviceRepository.softRemove(device);
  }

  async restore(id: number): Promise<Device> {
    await this.deviceRepository.restore(id);
    return this.findOne(id);
  }
}
