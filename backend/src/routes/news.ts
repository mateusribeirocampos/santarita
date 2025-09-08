import { Router } from 'express';
import newsController from '@/controllers/newsController';
import { authMiddleware, editorMiddleware } from '@/middlewares/auth';
import { publicApiRateLimiter, crudRateLimiter } from '@/middlewares/rateLimiter';

const router = Router();

// Rotas públicas com rate limiting
router.get('/', publicApiRateLimiter, newsController.getAllNews);
router.get('/:id', publicApiRateLimiter, newsController.getNewsById);

// Rotas protegidas (apenas editores e admins) com rate limiting para CRUD
router.post('/', crudRateLimiter, authMiddleware, editorMiddleware, newsController.createNews);
router.put('/:id', crudRateLimiter, authMiddleware, editorMiddleware, newsController.updateNews);
router.delete('/:id', crudRateLimiter, authMiddleware, editorMiddleware, newsController.deleteNews);

export default router;