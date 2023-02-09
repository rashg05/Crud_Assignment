const getListValidation = require('./get-list.validation');
const getId = require('./get-id.validation');
const recoveryParamsValidation = require('./recovery-params.validations');
const addCommentsValidation = require('./add-comments.validation');
const updateCommentValidation = require('./update-comments.validation');

module.exports = {
  getListValidation,
  getId,
  recoveryParamsValidation,
  addCommentsValidation,
  updateCommentValidation,
};
