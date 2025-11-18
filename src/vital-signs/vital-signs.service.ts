import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VitalSign } from './entities/vital-sign.entity';
import { CreateVitalSignDto } from './dto/create-vital-sign.dto';
import { UpdateVitalSignDto } from './dto/update-vital-sign.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { VitalSignsAlertService } from 'src/vital-signs-alert/vital-signs-alert.service';
import { CreateVitalSignsAlertDto } from 'src/vital-signs-alert/dto/create-vital-signs-alert.dto';
import { VitalSignAlertType } from 'src/vital-signs-alert/enums/vital-sign-alert-type';
import { VitalSignAlertSeverity } from 'src/vital-signs-alert/enums/vital-sign-alert-severity';
import { SeniorCitizenProfileService } from 'src/senior-citizen-profile/senior-citizen-profile.service';
import { CaredSeniorCitizenService } from 'src/cared-senior-citizen/cared-senior-citizen.service';

@Injectable()
export class VitalSignService {
  constructor(
    @InjectRepository(VitalSign)
    private readonly vitalSignRepository: Repository<VitalSign>,
    private readonly notificationsService: NotificationsService,
    private readonly vitalStatsAlertService: VitalSignsAlertService,
    private readonly seniorCitizenProfileService: SeniorCitizenProfileService,
    private readonly caredSeniorCitizenService: CaredSeniorCitizenService,
  ) {}

  async create(createVitalSignDto: CreateVitalSignDto): Promise<VitalSign> {
    //obtenemos el senior citizen relacionado al deviceCode
    const seniorCitizenProfile =
      await this.seniorCitizenProfileService.findOneByDeviceCode(
        createVitalSignDto.deviceCode,
      );

    const withDateAndSeniorId = {
      seniorCitizenProfile: {
        id: seniorCitizenProfile.id,
      },
      deviceCode: createVitalSignDto.deviceCode,
      startTime: new Date(),
      heartRate: createVitalSignDto.heartRate,
      oxygenSaturation: createVitalSignDto.oxygenSaturation,
    };
    const vitalSign = this.vitalSignRepository.create(withDateAndSeniorId);
    const vitalSignSaved = await this.vitalSignRepository.save(vitalSign);
    //verificamos si significa una alerta
    if (vitalSignSaved.heartRate <= 55 && vitalSignSaved.heartRate > 50) {
      await this.vitalStatsAlertService.create({
        seniorCitizenProfileId: 1,
        vitalSignId: vitalSignSaved.id,
        type: VitalSignAlertType.BRADICARDIA,
        severity: VitalSignAlertSeverity.LEVE,
      } as CreateVitalSignsAlertDto);
    } else if (vitalSignSaved.heartRate <= 50) {
      await this.vitalStatsAlertService.create({
        seniorCitizenProfileId: vitalSignSaved.seniorCitizenProfile.id,
        vitalSignId: vitalSignSaved.id,
        type: VitalSignAlertType.BRADICARDIA,
        severity: VitalSignAlertSeverity.GRAVE,
      } as CreateVitalSignsAlertDto);
      //obtenemos relaciones
      const relations =
        await this.caredSeniorCitizenService.getAllBySeniorCitizenProfileId(
          vitalSignSaved.seniorCitizenProfile.id,
        );
      //informamos a todo los cuidadores
      for (const relation of relations) {
        const token = relation.caredProfile.deviceToken;
        if (!token) continue;
        await this.notificationsService.sendNotification(
          token,
          'Señales de Bradicardia',
          'Ingrese a la aplicación',
        );
      }
    } else if (
      vitalSignSaved.heartRate >= 100 &&
      vitalSignSaved.heartRate < 120
    ) {
      await this.vitalStatsAlertService.create({
        seniorCitizenProfileId: vitalSignSaved.seniorCitizenProfile.id,
        vitalSignId: vitalSignSaved.id,
        type: VitalSignAlertType.TAQUICARDIA,
        severity: VitalSignAlertSeverity.LEVE,
      } as CreateVitalSignsAlertDto);
    } else if (vitalSignSaved.heartRate > 120) {
      await this.vitalStatsAlertService.create({
        seniorCitizenProfileId: vitalSignSaved.seniorCitizenProfile.id,
        vitalSignId: vitalSignSaved.id,
        type: VitalSignAlertType.TAQUICARDIA,
        severity: VitalSignAlertSeverity.GRAVE,
      } as CreateVitalSignsAlertDto);
      //obtenemos relaciones
      const relations =
        await this.caredSeniorCitizenService.getAllBySeniorCitizenProfileId(
          vitalSignSaved.seniorCitizenProfile.id,
        );
      //informamos a todo los cuidadores
      for (const relation of relations) {
        const token = relation.caredProfile.deviceToken;
        if (!token) continue;
        await this.notificationsService.sendNotification(
          token,
          'Señales de Taquicardia',
          'Ingrese a la aplicación',
        );
      }
    }
    if (
      vitalSignSaved.oxygenSaturation <= 94 &&
      vitalSignSaved.oxygenSaturation >= 90
    ) {
      await this.vitalStatsAlertService.create({
        seniorCitizenProfileId: vitalSignSaved.seniorCitizenProfile.id,
        vitalSignId: vitalSignSaved.id,
        type: VitalSignAlertType.TAQUICARDIA,
        severity: VitalSignAlertSeverity.LEVE,
      } as CreateVitalSignsAlertDto);
    } else if (vitalSignSaved.oxygenSaturation < 90) {
      await this.vitalStatsAlertService.create({
        seniorCitizenProfileId: vitalSignSaved.seniorCitizenProfile.id,
        vitalSignId: vitalSignSaved.id,
        type: VitalSignAlertType.HIPOXEMIA,
        severity: VitalSignAlertSeverity.GRAVE,
      } as CreateVitalSignsAlertDto);
      //obtenemos relaciones
      const relations =
        await this.caredSeniorCitizenService.getAllBySeniorCitizenProfileId(
          vitalSignSaved.seniorCitizenProfile.id,
        );
      //informamos a todo los cuidadores
      for (const relation of relations) {
        const token = relation.caredProfile.deviceToken;
        if (!token) continue;
        await this.notificationsService.sendNotification(
          token,
          'Señales de Hipoxemia',
          'Ingrese a la aplicación',
        );
      }
    }
    return vitalSignSaved;
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
      throw new NotFoundException(
        `No se encontró un registro de signos vitales con el ID ${id}`,
      );
    }

    return vitalSign;
  }

  async update(
    id: number,
    updateVitalSignDto: UpdateVitalSignDto,
  ): Promise<VitalSign> {
    const result = await this.vitalSignRepository.update(
      id,
      updateVitalSignDto,
    );
    if (result.affected === 0) {
      throw new NotFoundException(
        `No se encontró un registro de signos vitales con el ID ${id}`,
      );
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.vitalSignRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `No se encontró un registro de signos vitales con el ID ${id}`,
      );
    }
  }
}
