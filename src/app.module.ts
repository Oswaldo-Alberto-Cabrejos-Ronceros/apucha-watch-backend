import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarerProfleModule } from './carer-profle/carer-profle.module';
import { CarerProfle } from './carer-profle/entities/carer-profle.entity';
import { SeniorCitizenProfileModule } from './senior-citizen-profile/senior-citizen-profile.module';
import { SeniorCitizenProfile } from './senior-citizen-profile/entities/senior-citizen-profile.entity';
import { CaredSeniorCitizenModule } from './cared-senior-citizen/cared-senior-citizen.module';
import { CaredSeniorCitizen } from './cared-senior-citizen/entities/cared-senior-citizen.entity';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { SupabaseAuthGuardGuard } from './auth/guards/supabase-auth-guard/supabase-auth-guard.guard';
import { DeviceModule } from './device/device.module';
import { FallService } from './fall/fall.service';
import { FallModule } from './fall/fall.module';
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
        entities: [CarerProfle, SeniorCitizenProfile, CaredSeniorCitizen],
      }),
    }),
    CarerProfleModule,
    SeniorCitizenProfileModule,
    CaredSeniorCitizenModule,
    SupabaseModule,
    AuthModule,
    DeviceModule,
    FallModule,
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
    FallService,
  ],
})
export class AppModule {}
