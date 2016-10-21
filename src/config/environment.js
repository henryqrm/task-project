import path from 'path';

export default {
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(`${__dirname}/../..`),

    // Server port
    port: (() => {
        let port = process.env.PORT || 80;
        if (process.env.NODE_ENV === 'test') {
            port = 3000;
        } else if (process.env.NODE_ENV === 'development') {
            port = 9000;
        }
        return port;
    })(),

    // Server IP
    ip: process.env.IP || 'localhost',

    // Secret for session
    secrets: {
        session: 'HenryQRM',
    },

    // Should we populate the DB with sample data?
    seedDB: (() => {
        if (process.env.NODE_ENV !== 'production') {
            return true;
        }
        return false;
    })(),

    // MongoDB connection options
    mongo: {
        options: {
            db: {
                safe: true,
            },
        },
        uri: (() => {
            let uri = process.env.MONGO_DB || 'mongodb://localhost/task';
            if (process.env.NODE_ENV === 'test') {
                uri = 'mongodb://localhost/task-test';
            } else if (process.env.NODE_ENV === 'development') {
                uri = 'mongodb://localhost/task-dev';
            }
            return uri;
        })(),
    },
};