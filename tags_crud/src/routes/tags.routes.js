const express = require("express");
const { tagsController } = require("../controllers");

const tagsRoutes = express.Router({});

tagsRoutes.post("/", tagsController.addOneTag);
tagsRoutes.get("/", tagsController.getTagsList);
tagsRoutes.get("/count", tagsController.getTagsCount);
tagsRoutes.get('/:tagId/', tagsController.getOneTag);
tagsRoutes.delete('/:tagId', tagsController.deleteOneTag);
tagsRoutes.put('/:tagId', tagsController.updateOneTag);
tagsRoutes.get("/display-setting/", tagsController.getConfig);

module.exports = tagsRoutes;
