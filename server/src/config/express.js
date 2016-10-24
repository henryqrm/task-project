import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import Express from 'express';
import envConfig from './environment';

export default (app) => {
    app.use(cors({
        // exposedHeaders: '*',
    }));
    app.use('/', Express.static(path.resolve(envConfig.root, '../public')));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false,
    }));
};