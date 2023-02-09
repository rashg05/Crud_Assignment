const Joi = require("joi");
const yapValidations = require("@yapsody/lib-validations");

module.exports = Joi.object()
  .keys({
    user_id: yapValidations.name.label("User Id"),
    tag: yapValidations.name.label("Tag"),
    enable: yapValidations.enable.label("Enable"),
  })
  .min(1);
