const Joi = require("joi");
const yapValidations = require("@yapsody/lib-validations");

module.exports = Joi.object()
  .keys({
    post_id: yapValidations.name.label("Post Id"),
    tag: yapValidations.name.label("Tag"),
    enable: yapValidations.enable.label("Enable"),
  })
  .min(1);
