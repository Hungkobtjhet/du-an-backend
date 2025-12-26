import { Router } from 'express';
import { AdminMenuController } from '../controllers/admin/menu.controller.js';
import { AdminCategoryController } from '../controllers/admin/category.controller.js';
import { AdminOrderController } from '../controllers/admin/order.controller.js';

import { isAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

// Apply admin middleware to all routes here
router.use(isAdmin);

// Menus
router.get('/menus', AdminMenuController.index);
router.post('/menus', AdminMenuController.store);
router.put('/menus/:id', AdminMenuController.update);
router.delete('/menus/:id', AdminMenuController.destroy);

// Categories
router.get('/categories', AdminCategoryController.index);
router.post('/categories', AdminCategoryController.store);
router.put('/categories/:id', AdminCategoryController.update);
router.delete('/categories/:id', AdminCategoryController.destroy);

// Orders
router.get('/orders', AdminOrderController.index);
router.get('/orders/:id', AdminOrderController.show);
router.put('/orders/:id/status', AdminOrderController.updateStatus);


export default router;

