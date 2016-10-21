import {
    Router,
} from 'express';
import {
    index,
    show,
    create,
    update,
    destroy,
} from './project.controller';

const router = new Router();

router.get('/', index);
router.get('/:id', show);
router.post('/', create);
router.put('/:id', update);
router.patch('/:id', update);
router.delete('/:id', destroy);

export default router;