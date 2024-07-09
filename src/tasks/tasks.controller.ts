import { Body, Controller, Delete, Get, Patch, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ICreateTask, IDeleteTask, IGetTask, IUpdateTask } from './tasks.interface';
import { JoiValidationPipe } from 'src/common/pipes/joi.pipe';
import {
  createTaskValidations,
  deleteTaskValidations,
  getTasksValidations,
  updateTaskValidations,
} from './tasks.validations';
import { JWTAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller({
  path: 'tasks',
  version: '1',
})
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get('get')
  @UseGuards(JWTAuthGuard)
  @UsePipes(new JoiValidationPipe(getTasksValidations))
  async get(@Body() getTaskDto: IGetTask, @Req() req: Request) {
    const userId = req.headers['userId'];
    const task = await this.taskService.get({ ...getTaskDto, userId });
    return task;
  }

  @Post('/create')
  @UseGuards(JWTAuthGuard)
  @UsePipes(new JoiValidationPipe(createTaskValidations))
  async create(@Body() createTaskDto: ICreateTask, @Req() req: Request) {
    const userId = req.headers['userId'];
    const task = await this.taskService.create({ ...createTaskDto, userId });
    return task;
  }

  @Patch('/update')
  @UseGuards(JWTAuthGuard)
  @UsePipes(new JoiValidationPipe(updateTaskValidations))
  async update(@Body() updateTaskDto: IUpdateTask, @Req() req: Request) {
    const userId = req.headers['userId'];
    const task = await this.taskService.update({ ...updateTaskDto, userId });
    return task;
  }

  @Delete('/delete')
  @UseGuards(JWTAuthGuard)
  @UsePipes(new JoiValidationPipe(deleteTaskValidations))
  async delete(@Body() deleteTaskDto: IDeleteTask, @Req() req: Request) {
    const userId = req.headers['userId'];
    const task = await this.taskService.delete({ ...deleteTaskDto, userId });
    return task;
  }
}
