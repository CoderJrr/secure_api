// src/routes/task.route.js
import { Router } from 'express';
import { authenticateToken, authorizeRole } from '../middlewares/auth.middleware.js';
import taskController from '../controllers/task.controller.js';

const router = Router();

// Bu route'dan sonraki tüm istekler, önce authenticateToken'dan geçmek zorunda.
router.use(authenticateToken);

// YENİ BİR GÖREV OLUŞTURMA (Sadece giriş yapmış kullanıcılar)
router.post('/', taskController.createTask);

// KENDİ GÖREVLERİNİ LİSTELEME (Sadece giriş yapmış kullanıcılar)
router.get('/my-tasks', taskController.getMyTasks);

// TÜM GÖREVLERİ LİSTELEME (Sadece ADMIN rolündeki kullanıcılar)
router.get('/all-tasks', authorizeRole(['ADMIN','SUPER_ADMIN']), taskController.getAllTasks);

export default router;