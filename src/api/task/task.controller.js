import _ from 'lodash';
import Task from './task.model';

function respondWithResult(res, statusCode) {
    const code = statusCode || 200;
    return (entity) => {
        if (entity) {
            res.status(code).json(entity);
        }
    };
}

function saveUpdates(updates) {
    return function(entity) {
        var updated = _.merge(entity, updates);
        return updated.save()
            .then(updated => {
                return updated;
            });
    };
}

function removeEntity(res) {
    return function(entity) {
        if (entity) {
            return entity.remove()
                .then(() => {
                    res.status(204).end();
                });
        }
    };
}

function handleEntityNotFound(res) {
    return function(entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

// Gets a list of Tasks
export function index(req, res) {
    return Task.find().exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Task from the DB
export function show(req, res) {
    return Task.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Task in the DB
export function create(req, res) {
    console.log(req.body);
    return Task.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Updates an existing Task in the DB
export function status(req, res) {
    const data = {
        status: req.params.status,
    };
    console.log(data);

    return Task.findById(req.params.id)
        .exec()
        .then(handleEntityNotFound(res))
        .then(saveUpdates(data))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Updates an existing Task in the DB
export function priority(req, res) {
    const data = {
        priority: req.params.priority,
    };
    return Task.findById(req.params.id)
        .exec()
        .then(handleEntityNotFound(res))
        .then(saveUpdates(data))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return Task.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Task from the DB
export function destroy(req, res) {
    return Task.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}