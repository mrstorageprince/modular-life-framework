import { Router } from 'express';
import { addAdmin, removeAdmin, isAdmin, getAllAdmins } from '../controllers/admin.controller';

const router = Router();

router.post('/add', addAdmin);
router.post('/remove', removeAdmin);
router.get('/is-admin/:playerId', isAdmin);
router.get('/list', getAllAdmins);

export default router;
