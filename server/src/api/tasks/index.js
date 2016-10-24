import {
    Router,
} from 'express';
import {
    index,
} from './tasks.controller';

const router = new Router();

router.get('/:user/:project/:status', index);

export default router;