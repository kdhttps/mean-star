require('dotenv').config();
const express = require('express');
const winston = require('winston');
const expressWinston = require('express-winston');
const bodyParser = require('body-parser');
const configuration = require('./configuration');
const mongoose = require('mongoose');
const app = express();
const server = require('http').Server(app);

/**
 * winston.Logger
 * logger for specified log message like console.log
 */
logger = winston.createLogger(configuration.Logger);
/**
 * logger for every HTTP request comes to app
 */
app.use(expressWinston.logger(configuration.Logger));

/**
 * Mongo DB Connection
 */
mongoose.connect(process.env.DB_URL, {useUnifiedTopology: true, useNewUrlParser: true}, (err, res) => {
  if (err) {
    logger.info(`err connecting to db on ${process.env.DB_URL}, err: ${err}`);
  } else {
    logger.info(`----- Database connected on ${process.env.DB_URL} -----`);
  }
});

// Load body parser
app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

/**
 * Register routes. Loaded main route. Index route loads other routes.
 */
app.use(require('./index.route'));

// error Logging
app.use(expressWinston.errorLogger(configuration.Logger));

/**
 * Start Server
 */
server.listen(configuration.PORT || 3000, () => {
  logger.info('-----------------------');
  logger.info(`Server started successfully!, Open this URL http://localhost:${configuration.PORT || 3000}`);
  logger.info('-----------------------');
});
