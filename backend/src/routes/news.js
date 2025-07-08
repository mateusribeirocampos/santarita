const express = require('express');
const newsController = require('../controllers/newsController');
const { authMiddleware, editorMiddleware } = require('../middlewares/auth');
const { publicApiRateLimiter, crudRateLimiter } = require('../middlewares/rateLimiter');

const router = express.Router();

// Rotas públicas com rate limiting
router.get('/', publicApiRateLimiter, newsController.getAllNews);
router.get('/:id', publicApiRateLimiter, newsController.getNewsById);

// Rotas protegidas (apenas editores e admins) com rate limiting para CRUD
router.post('/', crudRateLimiter, authMiddleware, editorMiddleware, newsController.createNews);
router.put('/:id', crudRateLimiter, authMiddleware, editorMiddleware, newsController.updateNews);
router.delete('/:id', crudRateLimiter, authMiddleware, editorMiddleware, newsController.deleteNews);

module.exports = router;