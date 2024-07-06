import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log('----------------------------------------------');
    this.logger.log(`[${req.method}] ${req.url}`);

    this.logger.log(`Headers: ${JSON.stringify(req.headers, null, 2)}`);

    if (req.body) {
      this.logger.log(`Body: ${JSON.stringify(req.body, null, 2)}`);
    }

    if (req.query) {
      this.logger.log(`Query: ${JSON.stringify(req.query, null, 2)}`);
    }
    this.logger.log('----------------------------------------------');

    next();
  }
}
