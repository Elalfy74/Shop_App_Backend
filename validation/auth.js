const Joi = require("joi");

function validateLogin(req) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(req);
}

function validateRegister(req) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(55).required(),
    email: Joi.string().email().required(),
    firstname: Joi.string().min(5).max(55).required(),
    lastname: Joi.string(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(req);
}
function validatePassword(req) {
  const schema = Joi.object({ password: Joi.string().min(8).required() });
  return schema.validate(req);
}
module.exports = {
  validateLogin,
  validateRegister,
  validatePassword,
};
