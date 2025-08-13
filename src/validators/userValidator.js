const Joi = require("joi");

const registerSchema = Joi.object({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  dateOfBirth: Joi.date().less("now").required(),
  gender: Joi.string().valid("male", "female", "other").required(),
  role: Joi.string().valid("admin", "hr").default("user"),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

module.exports = { registerSchema, loginSchema };
