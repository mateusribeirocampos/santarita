import { Router } from 'express';
import eventController from '@/controllers/eventController';
import { authMiddleware, editorMiddleware } from '@/middlewares/auth';
import { publicApiRateLimiter, crudRateLimiter } from '@/middlewares/rateLimiter';

const router = Router();

// Rotas públicas com rate limiting
router.get('/', publicApiRateLimiter, eventController.getAllEvents);
router.get('/:id', publicApiRateLimiter, eventController.getEventById);

// Rotas protegidas (apenas editores e admins) com rate limiting para CRUD
router.post('/', crudRateLimiter, authMiddleware, editorMiddleware, eventController.createEvent);
router.put('/:id', crudRateLimiter, authMiddleware, editorMiddleware, eventController.updateEvent);
router.delete('/:id', crudRateLimiter, authMiddleware, editorMiddleware, eventController.deleteEvent);

export default router;