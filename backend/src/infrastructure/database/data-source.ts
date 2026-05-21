import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { DatabaseModule } from './database.module';

type MigrationCommand = 'run' | 'revert' | 'show';

async function bootstrap(): Promise<void> {
  const command = (process.argv[2] ?? 'run') as MigrationCommand;

  const app = await NestFactory.createApplicationContext(DatabaseModule, {
    logger: ['error', 'warn'],
  });

  try {
    const dataSource = app.get(DataSource);

    if (command === 'run') {
      const migrations = await dataSource.runMigrations();

      if (migrations.length === 0) {
        console.log('No pending migrations.');
        return;
      }

      console.log(
        `Executed migrations: ${migrations
          .map((migration) => migration.name)
          .join(', ')}`,
      );

      return;
    }

    if (command === 'revert') {
      await dataSource.undoLastMigration();

      console.log('Last migration reverted.');
      return;
    }

    if (command === 'show') {
      const hasPendingMigrations = await dataSource.showMigrations();

      if (hasPendingMigrations) {
        console.log('There are pending migrations.');
      } else {
        console.log('No pending migrations.');
      }

      return;
    }

    throw new Error(`Unknown migration command: ${command}`);
  } catch (error) {
    console.error(`Migration ${command} failed:`, error);
    process.exitCode = 1;
  } finally {
    await app.close();
  }
}

void bootstrap();
