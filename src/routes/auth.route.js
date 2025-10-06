// src/routes/auth.route.js 
import { Router } from 'express';//Temel amacı, uygulamanızdaki farklı yolları (URL'leri) daha düzenli ve modüler bir şekilde yönetmektir.(postman urlsi)
import validate from '../middlewares/validate.middleware.js';
import { registerSchema, loginSchema } from '../validators/auth.validator.js';
import authController from '../controllers/auth.controller.js';

const router = Router();

// /register endpoint'i, önce 'validate' middleware'inden, sonra 'register' controller'ından geçer
router.post('/register', validate(registerSchema), authController.register);

// /login endpoint'i, önce 'validate' middleware'inden, sonra 'login' controller'ından geçer
router.post('/login', validate(loginSchema), authController.login);

export default router;
