import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { appConfig, dataConfig, smtpConfig } from '../../config/app.config';
import envValidationSchema from '../../config/validation.config';
import typeOrmConfig from './typeorm.config';
import { DatabaseStatusService } from './connection.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dataConfig, smtpConfig],
      validationSchema: envValidationSchema,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        typeOrmConfig(configService),
    }),
  ],
  providers: [DatabaseStatusService],
})
export class DatabaseModule {}
