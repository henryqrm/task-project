import mongoose from 'mongoose';
import Promise from 'bluebird';

import envConfig from './environment';

Promise.config({
    // Enable warnings
    warnings: false,

    // Enable long stack traces
    // longStackTraces: true,

    // Enable cancellation
    // cancellation: true,

    // Enable monitoring
    // monitoring: true,
});

// Connect to MongoDB
mongoose.connect(envConfig.mongo.uri, envConfig.mongo.options);

mongoose.connection.on('error', (err) => {
    log.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});

mongoose.connection.on('connected', () => {
    log.info(`MongoDB: ${envConfig.mongo.uri}`);
});

mongoose.connection.on('disconnected', () => {
    log.warn('Mongoose default connection disconnected');
});

mongoose.connection.on('open', () => {
    log.info('Mongoose is open');
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.warn('Mongoose disconnected through app termination');
        process.exit(0);
    });
});