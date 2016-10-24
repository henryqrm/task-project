import {
    Router,
} from 'express';
import {
    index,
    show,
    status,
    priority,
    create,
    update,
    destroy,
} from './task.controller';

const router = new Router();

router.get('/', index);
router.get('/:id', show);
router.get('/:id/status/:status', status);
router.post('/', create);
router.get('/:id/priority/:priority', priority);
router.put('/:id', update);
router.patch('/:id', update);
router.delete('/:id', destroy);

export default router;