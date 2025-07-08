const express = require('express');
const eventController = require('../controllers/eventController');
const { authMiddleware, editorMiddleware } = require('../middlewares/auth');
const { publicApiRateLimiter, crudRateLimiter } = require('../middlewares/rateLimiter');

const router = express.Router();

// Rotas públicas com rate limiting
router.get('/', publicApiRateLimiter, eventController.getAllEvents);
router.get('/:id', publicApiRateLimiter, eventController.getEventById);

// Rotas protegidas (apenas editores e admins) com rate limiting para CRUD
router.post('/', crudRateLimiter, authMiddleware, editorMiddleware, eventController.createEvent);
router.put('/:id', crudRateLimiter, authMiddleware, editorMiddleware, eventController.updateEvent);
router.delete('/:id', crudRateLimiter, authMiddleware, editorMiddleware, eventController.deleteEvent);

module.exports = router;