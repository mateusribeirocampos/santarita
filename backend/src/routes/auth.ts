import { Router } from 'express';
import authController from '@/controllers/authController';
import { authMiddleware } from '@/middlewares/auth';
import { authRateLimiter, registerRateLimiter } from '@/middlewares/rateLimiter';

const router = Router();

// Rotas públicas (não precisam de autenticação) mas com rate limiting
router.post('/login', authRateLimiter, authController.login.bind(authController));
router.post('/register', registerRateLimiter, authController.register.bind(authController));

// Rotas protegidas (precisam de autenticação)
router.post('/verify', authMiddleware, authController.verifyToken.bind(authController));
router.post('/refresh', authController.refreshToken.bind(authController));
router.post('/change-password', authMiddleware, authController.changePassword.bind(authController));
router.post('/logout', authMiddleware, authController.logout.bind(authController));

export default router;