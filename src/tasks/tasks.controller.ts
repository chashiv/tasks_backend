import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ICreateTask, IUpdateTask } from './tasks.interface';
import { JoiValidationPipe } from 'src/common/pipes/joi.pipe';
import {
  createTaskValidations,
  updateTaskValidations,
} from './tasks.validations';

@Controller({
  path: 'tasks',
  version: '1',
})
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post('/create')
  @UsePipes(new JoiValidationPipe(createTaskValidations))
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
  @UsePipes(new JoiValidationPipe(updateTaskValidations))
  async update(@Body() updateTaskDto: IUpdateTask) {
    const task = await this.taskService.update(updateTaskDto);
    return task;
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
