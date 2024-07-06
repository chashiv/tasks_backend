import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksEntity } from './tasks.entity';
import { LoggingService } from 'src/logging/logging.service';

@Module({
  imports: [TypeOrmModule.forFeature([TasksEntity])],
  controllers: [TasksController],
  providers: [TasksService, LoggingService],
})
export class TasksModule {}
