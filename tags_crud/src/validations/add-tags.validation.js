const Joi = require("joi");
const yapValidations = require("@yapsody/lib-validations");

module.exports = Joi.object().keys({
  user_id: yapValidations.id.label("User Id"),
  tag: yapValidations.tag.required().label("Tag"),
});