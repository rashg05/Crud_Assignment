const { error } = require('@yapsody/lib-handlers');
const { sequelizeManager } = require("../managers");
const { STATUS } = require('../consts');
const { TagsModel } = sequelizeManager;
const { recoveryOptionsUtils: { getDeleteRecoveryOptions } } = require('../utils');

const getTagsCount = async ({ search }) => {
  if (search) {
    where.name = {
      [Op.like]: `%${search}%`,
    };
  }

  return TagsModel.findAll({});
};

const addOneTag = async ({ userId, tag }) =>
  TagsModel.create({
    user_id: userId,
    tag,
  });

const getTagsList = async ({ page_no, page_size, sort_by, sort_order, search }) => {
  const limit = page_size;
  const offset = (page_no - 1) * limit;

  if (search) {
    where.name = {
      [Op.like]: `%${search}%`,
    };
  }

  const order = [];
  order.push([sort_by, sort_order]);

  return TagsModel.findAll({
    order,
    offset,
    limit,
  });
};

const getOneTag = async ({ id }) => {
  const where = {
    id,
  };

  const item = await TagsModel.findOne({
    where,
  });

  if (!item) {
    return error.throwNotFound({ custom_key: "TagNotFound", item: "Tag" });
  }

  return item;
};

const deleteOneTag = async ({ id, force_update }) => {
  const item = await getOneTag({
    id,
  });

  if (force_update) {
    return item.destroy();
  }

  if (item.status === STATUS.ENABLED) {
    return error.throwPreconditionFailed({
      message: "Enabled Tag can't be deleted",
      recovery: {
        message: "do you want to force delete?",
        options: getDeleteRecoveryOptions({ tagId: id }, true),
      },
    });
  }

  return item.destroy();
};

const enableOne = async ({ id }) => {
  const item = await getOneTag({
    id,
  });

  if (item.status !== STATUS.DISABLED) {
    throw error.throwPreconditionFailed({ message: 'Only disabled Tag can be enabled' });
  }

  item.status = STATUS.ENABLED;
  return item.save();
};

const disableOne = async ({ id }) => {
  const item = await getOne({
    id,
  });

  if (item.status !== STATUS.ENABLED) {
    throw error.throwPreconditionFailed({ message: 'Only enabled user can be disabled' });
  }

  item.status = STATUS.DISABLED;
  return item.save();
};

module.exports = {
  addOneTag,
  getTagsList,
  getTagsCount,
  getOneTag,
  deleteOneTag,
  enableOne,
  disableOne,
};
