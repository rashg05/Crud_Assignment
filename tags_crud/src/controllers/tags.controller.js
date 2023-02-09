/* eslint-disable no-shadow */
const { error, success } = require("@yapsody/lib-handlers");
const config = require("../config/tags.config.json");
const { addTagValidation, getListValidation, getId, recoveryParamsValidation, updateTagValidation } = require("../validations");
const { tagsService } = require("../services");
const { checkChanges } = require('@yapsody/lib-utils');
const tagsModel = require("../models/tags.model");
const { TagsModel } = require("../managers/sequelize.manager");

const getTagsCount = async (req, res, next) => {
  const reqData = { ...req.query };
  if (reqData.ids) {
    reqData.ids = reqData.ids.split(";");
  }
  try {
    const { search } = await getListValidation.validateAsync(
      reqData
    );

    const count = await tagsService.getTagsCount({
      search,
    });
    return success.handler({ count }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

const addOneTag = async (req, res, next) => {
  const user_id = req.headers['user-id'];
  const reqBody = req.body;
  try {
    const { tag } =
      await addTagValidation.validateAsync(reqBody);
    const userId = await getId.validateAsync(user_id);
    const tag_one = await tagsService.addOneTag({
      userId,
      tag,
    });
    return success.handler({ tag_one }, req, res, next);
  } catch (err) {
    console.error(err);
    switch (err.name) {
      case "SequelizeUniqueConstraintError":
        err.custom_key = "TagConflict";
        err.message = `Tag with name ${req.body.name} already exists`;
        break;
      default:
        break;
    }
    return error.handler(err, req, res, next);
  }
};

const getConfig = async (req, res, next) =>
  success.handler({ config }, req, res, next);

const getTagsList = async (req, res, next) => {
  const reqData = { ...req.query };
  if (reqData.ids) {
    reqData.ids = reqData.ids.split(";");
  }
  try {
    const { page_no, page_size, sort_by, sort_order, search } =
      await getListValidation.validateAsync(reqData);

    const users = await tagsService.getTagsList({
      page_no,
      page_size,
      sort_by,
      sort_order,
      search,
    });
    return success.handler({ users }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

const getOneTag = async (req, res, next) => {
  const { tagId } = req.params;
  try {
    const id = await getId.validateAsync(tagId);
    const tag = await tagsService.getOneTag({
      id,
    });
    return success.handler({ tag }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

const deleteOneTag = async (req, res, next) => {
  const { tagId } = req.params;
  const { force_update } = req.query;
  try {
    await recoveryParamsValidation.validateAsync(force_update);
    const id = await getId.validateAsync(tagId);
    const tag = await tagsService.deleteOneTag({
      id,
      force_update,
    });
    return success.handler({ tag }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

const updateOneTag = async (req, res, next) => {
  const { tagId } = req.params;
  const enableFlag = req.query.enable;
  try {
    const id = await getId.validateAsync(tagId);
    const {
      tag,
      enable,
    } = await updateTagValidation.validateAsync({ ...req.body, enable: enableFlag });

    if (enable === true) {
      const item = await tagsService.enableOne({
        id,
      });

      return success.handler({ tag: item }, req, res, next);
    }

    if (enable === false) {
      const item = await tagsService.disableOne({
        id,
      });
      return success.handler({ tag: item }, req, res, next);
    }

    let item = await tagsService.getOneTag({
      id,
    });

    // eslint-disable-next-line no-unused-vars
    const difference = checkChanges({
      tag,
    }, item);

    item.tag = tag !== undefined ? tag : item.tag;

    item = await item.save();

    return success.handler({ tag: item }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

module.exports = {
  getTagsCount,
  addOneTag,
  getTagsList,
  getConfig,
  getOneTag,
  deleteOneTag,
  updateOneTag,
};
