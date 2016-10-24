import envConfig from './config/environment';
import project from './api/project';
import user from './api/user';
import task from './api/task';
import tasks from './api/tasks';

export default (app) => {
    app.use('/api/project', project);
    app.use('/api/user', user);
    app.use('/api/task', task);
    app.use('/api/tasks', tasks);

    // All other routes should redirect to the index.html
    app.get('/*', (req, res) => {
        res.sendFile(`${envConfig.root}/src/public/index.html`);
    });
};