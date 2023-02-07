const express = require("express");
const { tagsController } = require("../controllers");

const tagsRoutes = express.Router({});

tagsRoutes.post("/", tagsController.addOneTag);
tagsRoutes.get("/", tagsController.getTagsList);
tagsRoutes.get("/count", tagsController.getTagCount);
tagsRoutes.get('/:userId/', tagsController.getOneTag);
tagsRoutes.delete('/:userId', tagsController.deleteOneTag);
tagsRoutes.put('/:userId', tagsController.updateOneTag);
tagsRoutes.get("/display-setting/", tagsController.getConfig);

module.exports = tagsRoutes;
