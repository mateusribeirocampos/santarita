import { Router } from 'express';
import authController from '@/controllers/authController';
import { authMiddleware } from '@/middlewares/auth';
import { authRateLimiter, registerRateLimiter } from '@/middlewares/rateLimiter';

const router = Router();

// Rotas públicas (não precisam de autenticação) mas com rate limiting
router.post('/login', authRateLimiter, authController.login);
router.post('/register', registerRateLimiter, authController.register);

// Rotas protegidas (precisam de autenticação)
router.post('/verify', authMiddleware, authController.verifyToken);
router.post('/refresh', authController.refreshToken);
router.post('/change-password', authMiddleware, authController.changePassword);
router.post('/logout', authMiddleware, authController.logout);

export default router;