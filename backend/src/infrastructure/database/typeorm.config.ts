import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  return {
    type: 'postgres',

    host: configService.getOrThrow<string>('database.host'),
    port: configService.getOrThrow<number>('database.port'),
    username: configService.getOrThrow<string>('database.username'),
    password: configService.getOrThrow<string>('database.password'),
    database: configService.getOrThrow<string>('database.name'),

    ssl: configService.get<boolean>('database.ssl') ?? false,
    logging: configService.get<boolean>('database.logging') ?? false,

    autoLoadEntities: true,
    synchronize: false,

    retryAttempts: 0,
    retryDelay: 0,
  };
};

export default typeOrmConfig;
