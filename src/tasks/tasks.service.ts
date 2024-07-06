import { HttpStatus, Injectable } from '@nestjs/common';
import { ICreateTask } from './tasks.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksEntity } from './tasks.entity';
import { Repository } from 'typeorm';
import { LoggingService } from 'src/logging/logging.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private tasksEntity: Repository<TasksEntity>,
    private loggingService: LoggingService,
  ) {}

  async create(body: ICreateTask) {
    try {
      const task = await this.tasksEntity.save(body);
      return task;
    } catch (err) {
      this.loggingService.logError(err.message, err);
    }
  }

  async update(body: ICreateTask) {
    try {
      return { data: body, status: HttpStatus.OK };
    } catch (err) {}
  }

  async get(body: ICreateTask) {
    try {
      return { data: body, status: HttpStatus.OK };
    } catch (err) {}
  }

  async delete(body: ICreateTask) {
    try {
      return { data: body, status: HttpStatus.OK };
    } catch (err) {}
  }
}
