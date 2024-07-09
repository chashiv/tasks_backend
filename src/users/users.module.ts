import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { LoggingService } from 'src/logging/logging.service';
import { UsersController } from './users.controller';
import { UsersEntitySubscriber } from './users.entity.subscriber';
import { PiiService } from 'src/common/pii/pii.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [UsersService, LoggingService, UsersEntitySubscriber, PiiService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
