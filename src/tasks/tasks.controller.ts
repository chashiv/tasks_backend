import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ICreateTask } from './tasks.interface';

@Controller({
  path: 'tasks',
  version: '1',
})
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post('/create')
  async create(@Body() createTaskDto: ICreateTask) {
    try {
      const task = await this.taskService.create(createTaskDto);
      return task;
    } catch (error) {
      throw new HttpException(
        'Failed to create task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('/update')
  async update(@Body() createTaskDto: ICreateTask) {
    try {
      const task = await this.taskService.create(createTaskDto);
      return task;
    } catch (error) {
      throw new HttpException(
        'Failed to create task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/delete')
  async delete(@Body() createTaskDto: ICreateTask) {
    try {
      const task = await this.taskService.create(createTaskDto);
      return task;
    } catch (error) {
      throw new HttpException(
        'Failed to create task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
