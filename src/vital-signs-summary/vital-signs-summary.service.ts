import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VitalSignsSummary } from './entities/vital-signs-summary.entity';
import { Between, MoreThan, Repository } from 'typeorm';
import { ResolutionVitalSigns } from './enums/resolution.enum';
import { VitalSignsStats } from './dto/vital-signs-stats-response.dto';

@Injectable()
export class VitalSignsSummaryService {
  constructor(
    @InjectRepository(VitalSignsSummary)
    private readonly vitalSignsRepo: Repository<VitalSignsSummary>,
  ) {}

  async findAll() {
    return await this.vitalSignsRepo.find();
  }

  async findAllByIdAndResolution(
    deviceCode: string,
    resolution: ResolutionVitalSigns,
  ) {
    return await this.vitalSignsRepo.find({
      where: {
        deviceCode: deviceCode,
        resolution: resolution,
      },
    });
  }

  async findAllLastHourForStats(deviceCode: string): Promise<VitalSignsStats> {
    const lastHour = new Date();
    //retrocedemos una hora
    lastHour.setHours(lastHour.getHours() - 1);
    const vitalSigns = await this.vitalSignsRepo.find({
      where: {
        deviceCode: deviceCode,
        startTime: MoreThan(lastHour),
      },
    });
    const ahora = new Date();
    const haceUnaHora = new Date(ahora.getTime() - 60 * 60 * 1000);
    const statsHeartRate = vitalSigns
      .filter((v) => v.HeartRate >= 50 && v.HeartRate <= 130)
      .map((v) => {
        const diffMs = v.startTime.getTime() - haceUnaHora.getTime();
        const diffMin = diffMs / (60 * 1000);
        const x = (diffMin / 60) * 12;
        return {
          x: x,
          y: this.scalarHeartRate(v.HeartRate),
        };
      });

    const statsOxygenation = vitalSigns
      .filter((v) => v.oxygenSaturation >= 70 && v.oxygenSaturation <= 100)
      .map((v) => {
        const diffMs = v.startTime.getTime() - haceUnaHora.getTime();
        const diffMin = diffMs / (60 * 1000);
        const x = (diffMin / 60) * 12;
        return {
          x: x,
          y: this.escalarOxygenation(v.oxygenSaturation),
        };
      });

    return {
      heartRate: statsHeartRate,
      oxygenation: statsOxygenation,
    };
  }

  async findAllLastTwelveHoursForStats(
    deviceCode: string,
  ): Promise<VitalSignsStats> {
    const lastHour = new Date();
    //retrocedemos una hora
    lastHour.setHours(lastHour.getHours() - 12);
    const vitalSigns = await this.vitalSignsRepo.find({
      where: {
        deviceCode: deviceCode,
        startTime: MoreThan(lastHour),
      },
    });

    const ahora = new Date();
    const hace12Horas = new Date(ahora.getTime() - 12 * 60 * 60 * 1000);

    const statsHeartRate = vitalSigns
      .filter((v) => v.oxygenSaturation >= 70 && v.oxygenSaturation <= 100)
      .map((v) => {
        const diffMs = v.startTime.getTime() - hace12Horas.getTime();
        const diffHoras = diffMs / (60 * 60 * 1000);
        const x = diffHoras;
        return {
          x: x,
          y: this.scalarHeartRate(v.HeartRate),
        };
      });

    const statsOxygenation = vitalSigns
      .filter((v) => v.oxygenSaturation >= 70 && v.oxygenSaturation <= 100)
      .map((v) => {
        const diffMs = v.startTime.getTime() - hace12Horas.getTime();
        const diffHoras = diffMs / (60 * 60 * 1000);
        const x = diffHoras;
        return {
          x: x,
          y: this.escalarOxygenation(v.oxygenSaturation),
        };
      });
    return {
      heartRate: statsHeartRate,
      oxygenation: statsOxygenation,
    };
  }

  async findAllByDayForStats(
    deviceCode: string,
    day: Date,
  ): Promise<VitalSignsStats> {
    const startOfDay = new Date(day);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(day);
    endOfDay.setHours(23, 59, 59, 999);
    const vitalSigns = await this.vitalSignsRepo.find({
      where: {
        deviceCode: deviceCode,
        startTime: Between(startOfDay, endOfDay),
      },
    });
    const statsHeartRate = vitalSigns
      .filter((v) => v.oxygenSaturation >= 70 && v.oxygenSaturation <= 100)
      .map((v) => {
        const horas = v.startTime.getHours();
        const minutos = v.startTime.getMinutes();
        const totalHoras = horas + minutos / 60;
        const x = (totalHoras / 24) * 12;
        return {
          x: x,
          y: this.scalarHeartRate(v.HeartRate),
        };
      });

    const statsOxygenation = vitalSigns
      .filter((v) => v.oxygenSaturation >= 70 && v.oxygenSaturation <= 100)
      .map((v) => {
        const horas = v.startTime.getHours();
        const minutos = v.startTime.getMinutes();
        const totalHoras = horas + minutos / 60;
        const x = (totalHoras / 24) * 12;
        return {
          x: x,
          y: this.escalarOxygenation(v.oxygenSaturation),
        };
      });
    return {
      heartRate: statsHeartRate,
      oxygenation: statsOxygenation,
    };
  }

  remove(id: number) {
    return this.vitalSignsRepo.delete(id);
  }

  //funcion que escale heart rate

  private scalarHeartRate(y: number): number {
    const minOriginal = 50;
    const maxOriginal = 130;
    const minEscala = 0;
    const maxEscala = 8;

    // normalizacion lineal
    const yEscalado =
      ((y - minOriginal) / (maxOriginal - minOriginal)) *
        (maxEscala - minEscala) +
      minEscala;

    return yEscalado;
  }

  private escalarOxygenation(y: number): number {
    const minOriginal = 70;
    const maxOriginal = 100;
    const minEscala = 0;
    const maxEscala = 9;

    // normalizacion lineal
    const yEscalado =
      ((y - minOriginal) / (maxOriginal - minOriginal)) *
        (maxEscala - minEscala) +
      minEscala;

    return yEscalado;
  }
}
