const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authMiddleware, editorMiddleware } = require('../middlewares/auth');
const { publicApiRateLimiter, crudRateLimiter } = require('../middlewares/rateLimiter');

const router = express.Router();
const prisma = new PrismaClient();

// Rota pública para listar categorias com rate limiting
router.get('/', publicApiRateLimiter, async (req, res) => {
  try {
    const { type } = req.query;
    const where = {};
    
    if (type) {
      where.type = type;
    }

    const categories = await prisma.category.findMany({
      where,
      orderBy: { name: 'asc' }
    });

    res.json(categories);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota protegida para criar categoria com rate limiting
router.post('/', crudRateLimiter, authMiddleware, editorMiddleware, async (req, res) => {
  try {
    const { name, description, type } = req.body;

    if (!name || !type) {
      return res.status(400).json({
        error: 'Campos obrigatórios: name, type'
      });
    }

    const validTypes = ['EVENT', 'NEWS'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        error: 'Tipo de categoria inválido. Use: EVENT ou NEWS'
      });
    }

    const category = await prisma.category.create({
      data: { name, description, type }
    });

    res.status(201).json({
      success: true,
      message: 'Categoria criada com sucesso',
      data: category
    });
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Categoria com este nome já existe' });
    }
    
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;