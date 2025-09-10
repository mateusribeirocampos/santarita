import { Router } from 'express';
import newsController from '@/controllers/newsController';
import { authMiddleware, editorMiddleware } from '@/middlewares/auth';
import { publicApiRateLimiter, crudRateLimiter } from '@/middlewares/rateLimiter';

const router = Router();

// Rotas públicas com rate limiting
router.get('/', publicApiRateLimiter, newsController.getAllNews.bind(newsController));
router.get('/:id', publicApiRateLimiter, newsController.getNewsById.bind(newsController));

// Rotas protegidas (apenas editores e admins) com rate limiting para CRUD
router.post('/', crudRateLimiter, authMiddleware, editorMiddleware, newsController.createNews.bind(newsController));
router.put('/:id', crudRateLimiter, authMiddleware, editorMiddleware, newsController.updateNews.bind(newsController));
router.delete('/:id', crudRateLimiter, authMiddleware, editorMiddleware, newsController.deleteNews.bind(newsController));

export default router;