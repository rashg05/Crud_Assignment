const express = require('express');
const { error } = require('@yapsody/lib-handlers');


const apiRoutes = express.Router();

const postsRoutes = require('./posts.routes');
// const postsRoutes = require('./posts.routes');
// const commentsRoutes = require('./comments.routes');

apiRoutes.use('/posts', [postsRoutes]);

apiRoutes.use('*', () => error.throwNotFound({ item: 'Route' }));

module.exports = apiRoutes;
