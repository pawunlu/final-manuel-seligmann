import * as Joi from '@hapi/joi';

export default Joi.object({
  BASE_URL: Joi.string().required(),
  PORT: Joi.number().required(),
  STAGE: Joi.string().valid('DEV', 'PROD').required(),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_SSL: Joi.boolean().optional(),
  POSTGRES_LOGGING: Joi.boolean().optional(),
  MP_PUBLIC_KEY: Joi.string().allow(''),
  MP_ACCESS_TOKEN: Joi.string().allow(''),
});
