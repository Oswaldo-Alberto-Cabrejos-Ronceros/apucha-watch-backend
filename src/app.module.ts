import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeniorCitizenProfileModule } from './senior-citizen-profile/senior-citizen-profile.module';
import { SeniorCitizenProfile } from './senior-citizen-profile/entities/senior-citizen-profile.entity';
import { CaredSeniorCitizenModule } from './cared-senior-citizen/cared-senior-citizen.module';
import { CaredSeniorCitizen } from './cared-senior-citizen/entities/cared-senior-citizen.entity';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { SupabaseAuthGuardGuard } from './auth/guards/supabase-auth-guard/supabase-auth-guard.guard';
import { DeviceModule } from './device/device.module';

import { FallModule } from './fall/fall.module';
import { UbicationModule } from './ubication/ubication.module';
import { VitalSignsModule } from './vital-signs/vital-signs.module';
import { Device } from './device/entities/device.entity';
import { Ubication } from './ubication/entities/ubication.entity';
import { VitalSign } from './vital-signs/entities/vital-sign.entity';
import { DeviceRoomModule } from './device-room/device-room.module';
import { VitalSignsSummaryModule } from './vital-signs-summary/vital-signs-summary.module';
import { VitalSignsSummary } from './vital-signs-summary/entities/vital-signs-summary.entity';
import { CaredProfileModule } from './cared-profile/cared-profile.module';
import { CaredProfile } from './cared-profile/entities/cared-profile.entity';
import { HealthConditionModule } from './health-condition/health-condition.module';
import { HealthRecommendationModule } from './health-recommendation/health-recommendation.module';
import { HealthConditionRecommendationModule } from './health-condition-recommendation/health-condition-recommendation.module';
import { HealthRecommendation } from './health-recommendation/entities/health-recommendation.entity';
import { HealthCondition } from './health-condition/entities/health-condition.entity';
import { HealthConditionRecommendation } from './health-condition-recommendation/entities/health-condition-recommendation.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        synchronize: true,
        entities: [
          CaredProfile,
          SeniorCitizenProfile,
          CaredSeniorCitizen,
          Device,
          Ubication,
          VitalSign,
          VitalSignsSummary,
          HealthCondition,
          HealthRecommendation,
          HealthConditionRecommendation,
        ],
      }),
    }),
    CaredProfileModule,
    SeniorCitizenProfileModule,
    CaredSeniorCitizenModule,
    SupabaseModule,
    AuthModule,
    DeviceModule,
    FallModule,
    UbicationModule,
    VitalSignsModule,
    DeviceRoomModule,
    VitalSignsSummaryModule,
    CaredProfileModule,
    HealthConditionModule,
    HealthRecommendationModule,
    HealthConditionRecommendationModule,
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: SupabaseAuthGuardGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: SupabaseAuthGuardGuard,
    },
  ],
})
export class AppModule {}
