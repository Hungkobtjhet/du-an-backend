import { Router } from 'express';
import { PublicController } from '../controllers/public.controller.js';

const router = Router();

router.get('/home', PublicController.home);
router.get('/menu', PublicController.menu);
router.get('/menu/:id', PublicController.menuItem);

export default router;
