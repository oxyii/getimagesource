const express = require('express');
const router = require('./router');

const app = express();

module.exports = rootUri => {
  app.use(router(rootUri));
  return app;
};
