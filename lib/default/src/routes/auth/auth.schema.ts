import * as Joi from '@hapi/joi';

const userSchema = Joi.object({
  loginId: Joi.string().required(),
  password: Joi.string()
    .min(8)
    .max(13)
    .required(),
  name: Joi.string().required(),
});

const userUpdateSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .max(13),
  name: Joi.string(),
});

export { userSchema, userUpdateSchema };
