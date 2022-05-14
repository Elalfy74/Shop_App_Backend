const Joi = require("joi");

function validateProduct(req) {
  const schema = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string().required(),
    img: Joi.string().required(),
    categories: Joi.array(),
    size: Joi.string(),
    color: Joi.string(),
    price: Joi.number().required,
  });
  return schema.validate(req);
}
module.exports = {
  validateProduct,
};
