"use strict";

const express = require('express');
const debug = require('debug')('app');
const kue = require('kue');
const kueUiExpress = require('kue-ui-express');

const port = 3000;

const redisConfig = {
    host: process.env.REDIS_ENV_REDIS_HOST || 'redis',
    port: process.env.REDIS_ENV_REDIS_PORT || '6379'
};

if (process.env.REDIS_ENV_REDIS_PASS) {
    redisConfig.auth = process.env.REDIS_ENV_REDIS_PASS;
}

debug.log = console.log.bind(console);

const queue = kue.createQueue({
    redis: redisConfig
});
queue.on('error', function(err) {
    debug('Queue error', err);
});

const app = express();
kueUiExpress(app, '/kue/', '/api/');

app
    .use('/api/', kue.app)
    .listen(port);

debug('Application started');
