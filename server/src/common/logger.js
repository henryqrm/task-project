import winston from 'winston';
import fs from 'fs';
import WinstonDailyRotateFile from 'winston-daily-rotate-file';

const env = process.env.NODE_ENV || 'development';
const logDir = 'log';

// Create the log directory if it does not exist
fs.mkdir(logDir, () => {});


const tsFormat = () => (new Date()).toLocaleTimeString();
const logger = new (winston.Logger)({
    transports: [
        // colorize the output to the console
        new (winston.transports.Console)({
            timestamp: tsFormat,
            colorize: true,
            level: 'info',
        }),
        new (WinstonDailyRotateFile)({
            filename: `${logDir}/-results.log`,
            timestamp: tsFormat,
            datePattern: 'dd-MM-yyyy',
            prepend: true,
            level: env === 'development' ? 'verbose' : 'info',
        }),
    ],
});
global.log = logger;