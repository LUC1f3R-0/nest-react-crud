import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
class DatabaseStatusService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DatabaseStatusService.name);

  constructor(private readonly dataSource: DataSource) {}

  onApplicationBootstrap() {
    if (this.dataSource.isInitialized) {
      this.logger.log('Database connection successfull');
    } else {
      this.logger.error('Database connection is not initialized');
    }
  }
}
export { DatabaseStatusService };
