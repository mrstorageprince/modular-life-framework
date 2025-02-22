import { Router } from 'express';
import { banPlayer, unbanPlayer } from '../controllers/admin.controller';

const router = Router();

router.post('/ban', banPlayer);
router.post('/unban', unbanPlayer);

export default router;
