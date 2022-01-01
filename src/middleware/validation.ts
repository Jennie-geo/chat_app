import Joi from 'joi';

export const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .trim()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  confirmPassword: Joi.ref('password'),
});
export const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

export const channelValidation = Joi.object({
  name: Joi.string().min(5).max(30).trim().required(),
  description: Joi.string().min(8).trim().required(),
});
