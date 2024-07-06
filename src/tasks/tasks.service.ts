import { HttpStatus, Injectable } from '@nestjs/common';
import { ICreateTask } from './tasks.interface';

@Injectable()
export class TasksService {
  constructor() {}

  async create(body: ICreateTask) {
    try {
      return { data: body, status: HttpStatus.OK };
    } catch (err) {}
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
