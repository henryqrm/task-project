import http from 'http';
import Socket from 'socket.io';
import Express from 'express';
import expressConfig from './config/express';
import envConfig from './config/environment';
import router from './router';
import './config/mongoose';
import './common';

export default class {
    constructor() {
        const app = new Express();
        app.server = http.createServer(app);

        expressConfig(app);

        // Routers
        router(app);

        const socket = new Socket(app.server);
        this.socket = socket;
        this.app = app;
    }
    start() {
        // WebSocket
        let connectCounter = 0;
        this.socket.on('connection', (socket) => {
            connectCounter += 1;
            log.info(`online ${connectCounter}`);
            socket.on('disconnect', () => {
                connectCounter -= 1;
                log.info(`online ${connectCounter}`);
            });
        });

        this.app.server.listen(envConfig.port, () => {
            log.info(`HOST: http://${envConfig.ip}:${envConfig.port}`);
        });


        // Show Info environment
        log.info('NODE_ENV: %s', envConfig.env);

        // Error unexpected
        process.on('exit', (code) => {
            if (code !== 0) {
                log.error('Error unexpected');
            }
        });
    }
}