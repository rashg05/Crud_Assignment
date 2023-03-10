const express = require('express');
const { error } = require('@yapsody/lib-handlers');


const apiRoutes = express.Router();

// const userRoutes = require('../../../user_crud/src/routes/user.routes');
// const postsRoutes = require('./posts.routes');
const commentsRoutes = require('./comments.routes');

apiRoutes.use('/posts/:post_id/comments', [commentsRoutes]);

apiRoutes.use('*', () => error.throwNotFound({ item: 'Route' }));

module.exports = apiRoutes;
