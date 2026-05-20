import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig, dataConfig, smtpConfig } from './config/app.config';
import envValidationSchema from './config/validation.config';
import { DatabaseModule } from './infrastructure/database/database.module';
import { SmtpModule } from './infrastructure/smtp/smtp.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dataConfig, smtpConfig],
      validationSchema: envValidationSchema,
    }),
    DatabaseModule,
    SmtpModule,
  ],
})
export class AppModule {}
