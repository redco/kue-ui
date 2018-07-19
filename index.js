const express = require('express');
const debug = require('debug')('app');
const kue = require('kue');
const ui = require('kue-ui');

const redisConfig = {
  host: process.env.REDIS_HOST || 'redis',
  port: process.env.REDIS_PORT || '6379',
};

if (process.env.REDIS_PASSWORD) {
  redisConfig.auth = process.env.REDIS_PASSWORD;
}

debug.log = console.log.bind(console);

const queue = kue.createQueue({
  redis: redisConfig,
});
queue.on('error', function (err) {
  debug('Queue error', err);
});

ui.setup({
  apiURL: '/api',
  baseURL: '/kue',
  updateInterval: 5000,
});

const app = express();
app
  .use('/kue', ui.app)
  .use('/api', kue.app)
  .listen(3000);
debug('Application started');
