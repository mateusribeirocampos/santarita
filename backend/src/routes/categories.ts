import { Router } from 'express';
import categoryController from '@/controllers/categoryController';
import { authMiddleware, editorMiddleware } from '@/middlewares/auth';
import { publicApiRateLimiter, crudRateLimiter } from '@/middlewares/rateLimiter';

const router = Router();

// Rota pública para listar categorias com rate limiting
router.get('/', publicApiRateLimiter, categoryController.getAllCategories.bind(categoryController));

// Rota protegida para criar categoria com rate limiting
router.post('/', crudRateLimiter, authMiddleware, editorMiddleware, categoryController.createCategory.bind(categoryController));

export default router;