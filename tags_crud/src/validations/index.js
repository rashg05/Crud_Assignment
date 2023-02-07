const addUserValidation = require('./add-tags.validation');
const getListValidation = require('./get-list.validation');
const getId = require('./get-id.validation');
const recoveryParamsValidation = require('./recovery-params.validations');
const updateUserValidation = require('./update-tags.validation');

module.exports = {
  addUserValidation,
  getListValidation,
  getId,
  recoveryParamsValidation,
  updateUserValidation,
};
