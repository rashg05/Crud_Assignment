const getListValidation = require('./get-list.validation');
const getId = require('./get-id.validation');
const recoveryParamsValidation = require('./recovery-params.validations');
const addPostsValidation = require('./add-posts.validation');
const updatePostValidation = require('./update-posts.validation');

module.exports = {
  getListValidation,
  getId,
  recoveryParamsValidation,
  addPostsValidation,
  updatePostValidation,
};
