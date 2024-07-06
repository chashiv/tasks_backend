import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ICreateTask, IGetTask, IUpdateTask } from './tasks.interface';
import { JoiValidationPipe } from 'src/common/pipes/joi.pipe';
import {
  createTaskValidations,
  getTasksValidations,
  updateTaskValidations,
} from './tasks.validations';

@Controller({
  path: 'tasks',
  version: '1',
})
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get('get')
  @UsePipes(new JoiValidationPipe(getTasksValidations))
  async get(@Body() getTaskDto: IGetTask) {
    const task = await this.taskService.get(getTaskDto);
    return task;
  }

  @Post('/create')
  @UsePipes(new JoiValidationPipe(createTaskValidations))
  async create(@Body() createTaskDto: ICreateTask) {
    const task = await this.taskService.create(createTaskDto);
    return task;
  }

  @Patch('/update')
  @UsePipes(new JoiValidationPipe(updateTaskValidations))
  async update(@Body() updateTaskDto: IUpdateTask) {
    const task = await this.taskService.update(updateTaskDto);
    return task;
  }

  @Delete('/delete')
  async delete(@Body() createTaskDto: ICreateTask) {
    const task = await this.taskService.create(createTaskDto);
    return task;
  }
}
