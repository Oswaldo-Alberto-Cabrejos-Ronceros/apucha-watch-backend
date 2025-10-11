import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ResolutionVitalSigns } from '../enums/resolution.enum';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class VitalSignScredule {
  private readonly logger = new Logger(VitalSignScredule.name);
  constructor(private readonly datasource: DataSource) {}
  //cada hora, mas de una hora promedio de 30s
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  @Cron(CronExpression.EVERY_HOUR)
  async aggregate30s() {
    await this.aggregateAndClean(
      'vitals-sign',
      ResolutionVitalSigns.CINCO_MIN,
      '1 hour',
      '30 seconds',
    );
  }

  //cada 12 horas promedia de 30 s a 1 min
  @Cron('0 */12 * * *')
  async aggregate1min() {
    await this.aggregateAndClean(
      'vital_signs_summary',
      ResolutionVitalSigns.UN_MIN,
      '12 hours',
      '1 minute',
      ResolutionVitalSigns.TREINTA_SEG,
    );
  }

  //cada dia promedia de 1 min a 5 min
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async aggregate5min() {
    await this.aggregateAndClean(
      'vital_signs_summary',
      ResolutionVitalSigns.CINCO_MIN,
      '1 day',
      '5 minutes',
      ResolutionVitalSigns.UN_MIN,
    );
  }

  //funcion para agrupar y limpiar
  private async aggregateAndClean(
    sourceTable: string,
    resolution: ResolutionVitalSigns,
    olderThan: string,
    interval: string,
    sourceResolution?: ResolutionVitalSigns,
  ) {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const resolutionFilter = sourceResolution
        ? `AND resolution = '${sourceResolution}'`
        : '';

      //insertar promedios
      await queryRunner.query(`
        INSERT INTO vital_signs_summary (device_code, start_time, avg_heart_rate, avg_oxygen_saturation, resolution)
        SELECT 
          device_code,
          date_trunc('second', start_time) 
            - (EXTRACT(EPOCH FROM start_time)::int % EXTRACT(EPOCH FROM INTERVAL '${interval}')) * INTERVAL '1 second' AS start_time,
          AVG(avg_heart_rate) AS avg_heart_rate,
          AVG(avg_oxygen_saturation) AS avg_oxygen_saturation,
          '${resolution}' AS resolution
        FROM ${sourceTable}
        WHERE start_time < NOW() - INTERVAL '${olderThan}'
        ${resolutionFilter}
        GROUP BY device_code, start_time;
      `);

      //eliminar datos fuente
      await queryRunner.query(`
        DELETE FROM ${sourceTable}
        WHERE start_time < NOW() - INTERVAL '${olderThan}'
        ${resolutionFilter};
      `);

      await queryRunner.commitTransaction();
      this.logger.log(`Agregación completada para resolución ${resolution}`);
    } catch (e) {
      await queryRunner.rollbackTransaction();
      this.logger.error(`Error al ejecutar resolucion${resolution}`, e);
    } finally {
      await queryRunner.release();
    }
  }
}
