// src/routes/user.route.js
import { Router } from 'express';
import { authenticateToken, authorizeRole } from '../middlewares/auth.middleware.js';
import userController from '../controllers/user.controller.js';

const router = Router();

// Bu endpoint'e sadece ve sadece SUPER_ADMIN rolündeki kullanıcılar erişebilir.
router.patch(
  '/:userId/role', 
  authenticateToken, 
  authorizeRole(['SUPER_ADMIN']), 
  userController.changeRole
);

export default router;