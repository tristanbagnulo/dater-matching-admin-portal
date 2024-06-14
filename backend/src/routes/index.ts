import { Router } from 'express';
import { getDaters } from '../controllers/daterController.js';

const router = Router();

router.get('/daters', getDaters);

export default router;
