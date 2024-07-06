import * as Joi from 'joi';
import { TaskStatusEnum } from './tasks.interface';

export const getTasksValidations = Joi.object({
  id: Joi.string().uuid().optional(),
  status: Joi.string()
    .trim()
    .valid(...Object.values(TaskStatusEnum))
    .optional(),
  title: Joi.string().optional(),
  description: Joi.string().trim().optional(),
  metaData: Joi.object().optional(),
});

export const createTaskValidations = Joi.object({
  title: Joi.string().trim().required(),
  status: Joi.string()
    .trim()
    .valid(...Object.values(TaskStatusEnum))
    .required(),
  description: Joi.string().trim().required(),
  metaData: Joi.object().optional(),
});

export const updateTaskValidations = Joi.object({
  id: Joi.string().uuid().required(),
  status: Joi.string()
    .trim()
    .valid(...Object.values(TaskStatusEnum))
    .optional(),
  title: Joi.string().optional(),
  description: Joi.string().trim().optional(),
  metaData: Joi.object().optional(),
});

export const deleteTaskValidations = Joi.object({
  id: Joi.string().uuid().required(),
  status: Joi.string()
    .trim()
    .valid(...Object.values(TaskStatusEnum))
    .optional(),
  title: Joi.string().optional(),
  description: Joi.string().trim().optional(),
  metaData: Joi.object().optional(),
});
