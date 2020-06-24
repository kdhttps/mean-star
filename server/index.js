require('dotenv').config();
const express = require('express');
const winston = require('winston');
const expressWinston = require('express-winston');
const bodyParser = require('body-parser');
const configuration = require('./configuration');
const mongoose = require('mongoose');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const path = require('path');
const { ValidationError } = require('express-validation');

const app = express();
const server = require('http').Server(app);
const userController = require('./user/user.controller');

/**
 * allow cors for only our frontend
 */
const whitelistCors = JSON.parse(process.env.CORS_ORIGIN);
var corsOptions = {
  origin: {
    origin: function (origin, callback) {
      if (whitelistCors.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

/**
 * winston.Logger
 * logger for specified log message like console.log
 */
global.__logger = winston.createLogger(configuration.Logger);
/**
 * logger for every HTTP request comes to app
 */
app.use(expressWinston.logger(configuration.Logger));

/**
 * Mongo DB Connection
 */
mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
  if (err) {
    __logger.info(`err connecting to db on ${process.env.DB_URL}, err: ${err}`);
  } else {
    __logger.info(`----- Database connected on ${process.env.DB_URL} -----`);
  }
});

// Load body parser
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.OP_SERVER_URL}/.well-known/jwks.json`,
  }),
  isRevoked: userController.isRevokedCallback,
  requestProperty: 'token',
  // This is the identifier we set when we created the API
  audience: `${process.env.OP_SERVER_URL}/api/v2/`,
  issuer: `${process.env.OP_SERVER_URL}/`, // e.g., your.auth0.com
  algorithms: ['RS256']
});

/**
 * Register routes. Loaded main route. Index route loads other routes.
 */
app.use(require('./index.route'));

// error Logging
app.use(expressWinston.errorLogger(configuration.Logger));


// Statically serve client
if (process.env.PRODUCTION) {
  app.use(express.static(__dirname + '/client'));
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/index.html'));
  });
}

/**
 * Handle errors
 */
app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err)
  }

  return res.status(500).json(err)
});

/**
 * Start Server
 */
server.listen(configuration.PORT || 3000, () => {
  __logger.info('-----------------------');
  __logger.info(`Server started successfully!, Open this URL http://localhost:${configuration.PORT || 3000}`);
  __logger.info('-----------------------');
});
