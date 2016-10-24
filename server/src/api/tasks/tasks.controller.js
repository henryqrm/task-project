import Task from './../task/task.model';

function respondWithResult(res, statusCode) {
    const code = statusCode || 200;
    return (entity) => {
        if (entity) {
            res.status(code).json(entity);
        }
    };
}

function handleError(res, statusCode) {
    const code = statusCode || 500;
    return (err) => {
        res.status(code).send(err);
    };
}

// Gets a list of Tasks
export function index(req, res) {
    if (req.params.user && req.params.status && req.params.project) {
        return res.status(400).end();
    }
    return Task
        .find({
            user: req.params.user,
            status: req.params.status,
            project: req.params.project,
        })
        .exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}