import * as Joi from 'joi';

export const loginUserValidations = Joi.object({
  username: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
});

export const validateUserValidations = Joi.object({
  token: Joi.string().trim().required(),
});
