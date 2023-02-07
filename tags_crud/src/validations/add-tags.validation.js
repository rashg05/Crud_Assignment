const Joi = require("joi");
const yapValidations = require("@yapsody/lib-validations");

module.exports = Joi.object().keys({
  post_id: yapValidations.id.label("Post Id"),
  tag: yapValidations.name.required().label("Tag"),
});