const express = require('express');
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/auth');
const { authRateLimiter, registerRateLimiter } = require('../middlewares/rateLimiter');

const router = express.Router();

// Rotas públicas (não precisam de autenticação) mas com rate limiting
router.post('/login', authRateLimiter, authController.login);
router.post('/register', registerRateLimiter, authController.register);

// Rotas protegidas (precisam de autenticação)
router.post('/verify', authMiddleware, authController.verifyToken);
router.post('/refresh', authController.refreshToken);
router.post('/change-password', authMiddleware, authController.changePassword);
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;