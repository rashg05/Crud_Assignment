const express = require('express');
const { error } = require('@yapsody/lib-handlers');


const apiRoutes = express.Router();

const tagsRoutes = require('./tags.routes');

apiRoutes.use('/tags', [tagsRoutes]);

apiRoutes.use('*', () => error.throwNotFound({ item: 'Route' }));

module.exports = apiRoutes;
