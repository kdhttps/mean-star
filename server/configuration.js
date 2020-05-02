const {format, transports} = require('winston');
const { timestamp, colorize, printf, errors, prettyPrint } = format;
const { Console, File } = transports;

module.exports = {
    PORT: process.env.PORT || 3000,
    Logger: {
        level: process.env.LOGGER_LEVEL || 'debug',
        transports: [
            new Console(),
            new File({filename: 'application.log'})
        ],
        format: format.combine(
            errors({ stack: true }),
            timestamp(),
            colorize(),
            printf(({ level, message, timestamp, stack }) => {
                if (stack) {
                    // print log trace 
                    return `${timestamp} ${level}: ${message} - ${stack}`;
                }
                return `${timestamp} ${level}: ${message}`;
            }),
        ),
        expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
        colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
        ignoreRoute: function (req, res) {
            return false;
        } // optional: allows to skip some log messages based on request and/or response
    }
};
