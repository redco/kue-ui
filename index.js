"use strict";

const express = require('express');
const debug = require('debug')('app');
const kue = require('kue');
const ui = require('kue-ui');

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

ui.setup({
    apiURL: '/api',
    baseURL: '/kue',
    updateInterval: 5000
});

const app = express();

app
    .use('/api', kue.app)
    .use('/kue', ui.app)
    .listen(port);

debug('Application started');
