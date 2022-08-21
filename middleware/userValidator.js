const Joi = require("joi");
const {
  validator
} = require("./requestValidator");
const addUserSchema = Joi.object().keys({
  firstName: Joi.string().min(1).max(40).required(),
  lastName: Joi.string().min(1).max(40).required(),
  email: Joi.string().email().required(),
  age: Joi.number().min(1).max(40).required()
});
const addUserValidator = validator(addUserSchema);
module.exports = {
  addUserValidator
};
