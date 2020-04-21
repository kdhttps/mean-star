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

const app = express();
const server = require('http').Server(app);
const userController = require('./user/user.controller');

/**
 * allow cors for only our frontend
 */
var corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

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
mongoose.connect(process.env.DB_URL, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}, (err, res) => {
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
  app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/client/index.html'));
  });
}
/**
 * Start Server
 */
server.listen(configuration.PORT || 3000, () => {
  logger.info('-----------------------');
  logger.info(`Server started successfully!, Open this URL http://localhost:${configuration.PORT || 3000}`);
  logger.info('-----------------------');
});
