const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('🔍 [Auth] Authorization header:', authHeader);
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('❌ [Auth] Token não fornecido ou formato inválido');
      return res.status(401).json({ 
        error: 'Token de acesso não fornecido' 
      });
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Verificar se o usuário ainda existe e está ativo
      const user = await prisma.user.findUnique({
        where: { 
          id: decoded.userId,
          isActive: true 
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      });

      if (!user) {
        return res.status(401).json({ 
          error: 'Usuário não encontrado ou inativo' 
        });
      }

      // Adicionar dados do usuário à requisição
      req.user = user;
      next();
    } catch (jwtError) {
      console.error('Erro JWT:', jwtError.message);
      return res.status(401).json({ 
        error: 'Token inválido ou expirado' 
      });
    }
  } catch (error) {
    console.error('Erro no middleware de autenticação:', error);
    return res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
};

// Middleware para verificar se é admin
const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    return res.status(403).json({ 
      error: 'Acesso negado. Apenas administradores podem acessar.' 
    });
  }
};

// Middleware para verificar se é admin ou editor
const editorMiddleware = (req, res, next) => {
  if (req.user && (req.user.role === 'ADMIN' || req.user.role === 'EDITOR')) {
    next();
  } else {
    return res.status(403).json({ 
      error: 'Acesso negado. Apenas administradores ou editores podem acessar.' 
    });
  }
};

module.exports = {
  authMiddleware,
  adminMiddleware,
  editorMiddleware
};