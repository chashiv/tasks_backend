import * as Joi from 'joi';

export const signUpUserValidations = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
});
