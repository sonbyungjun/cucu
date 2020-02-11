import * as Joi from '@hapi/joi';

const boardSchema = Joi.object({
    title: Joi.string().required(),
  content: Joi.string().required(),

});

const boardUpdateSchema = Joi.object({
    title: Joi.string(),
  content: Joi.string(),

});

export {
  boardSchema,
  boardUpdateSchema
};

