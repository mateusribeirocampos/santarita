import { Router } from 'express';
import eventController from '@/controllers/eventController';
import { authMiddleware, editorMiddleware } from '@/middlewares/auth';
import { publicApiRateLimiter, crudRateLimiter } from '@/middlewares/rateLimiter';

const router = Router();

// Rotas públicas com rate limiting
router.get('/', publicApiRateLimiter, eventController.getAllEvents.bind(eventController));
router.get('/:id', publicApiRateLimiter, eventController.getEventById.bind(eventController));

// Rotas protegidas (apenas editores e admins) com rate limiting para CRUD
router.post('/', crudRateLimiter, authMiddleware, editorMiddleware, eventController.createEvent.bind(eventController));
router.put('/:id', crudRateLimiter, authMiddleware, editorMiddleware, eventController.updateEvent.bind(eventController));
router.delete('/:id', crudRateLimiter, authMiddleware, editorMiddleware, eventController.deleteEvent.bind(eventController));

export default router;