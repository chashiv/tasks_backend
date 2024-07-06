import * as Joi from 'joi';
import { TaskStatusEnum } from './tasks.interface';

export const createTaskValidations = Joi.object({
  title: Joi.string().trim().required(),
  status: Joi.string()
    .trim()
    .valid(...Object.values(TaskStatusEnum))
    .required(),
  description: Joi.string().trim().required(),
  metaData: Joi.object().optional(),
});
