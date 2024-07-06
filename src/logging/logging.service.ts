import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggingService {
  private logger = new Logger('tasks');

  logInfo(message: string) {
    this.logger.log(message);
  }

  logError(message: string, trace: string) {
    this.logger.error(message, trace);
  }

  logDebug(message: string) {
    this.logger.debug(message);
  }
}
