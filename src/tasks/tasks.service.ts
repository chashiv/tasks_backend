import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ICreateTask, IDeleteTask, IGetTask, IUpdateTask } from './tasks.interface';
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

  async get(body: IGetTask) {
    try {
      const response = await this.tasksEntity.find({
        where: { ...body },
      });
      return response;
    } catch (err) {
      this.loggingService.logError(err.message, err);
      throw err;
    }
  }

  async create(body: ICreateTask) {
    try {
      const task = await this.tasksEntity.save(body);
      return task;
    } catch (err) {
      this.loggingService.logError(err.message, err);
      throw err;
    }
  }

  async update(body: IUpdateTask) {
    try {
      const { id, ...updateFields } = body;
      const response = await this.tasksEntity.update(id, updateFields);
      if (!response.affected) {
        throw new HttpException(`Task with id: ${id} not found`, HttpStatus.BAD_REQUEST);
      }
      return response;
    } catch (err) {
      this.loggingService.logError(err.message, err);
      throw err;
    }
  }

  async delete(body: IDeleteTask) {
    try {
      const response = await this.tasksEntity.delete(body);
      return response;
    } catch (err) {
      this.loggingService.logError(err.message, err);
      throw err;
    }
  }
}
