import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { UnauthorizedError, ForbiddenError } from '@/utils/errors';
import { User } from '@/types';

const prisma = new PrismaClient();

interface JWTPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

export const authMiddleware = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('❌ [Auth] Token não fornecido ou formato inválido');
      res.status(401).json({ 
        error: 'Token de acesso não fornecido' 
      });
      return;
    }

    const token = authHeader.split(' ')[1];
    
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not configured');
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] }) as JWTPayload;
      if (typeof decoded !== 'object' || typeof decoded.userId !== 'string' || !decoded.userId) {
        res.status(401).json({ error: 'Token inválido ou expirado' });
        return;
      }
      
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
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true
        }
      });

      if (!user) {
        res.status(401).json({ 
          error: 'Usuário não encontrado ou inativo' 
        });
        return;
      }

      // Adicionar dados do usuário à requisição
      req.user = user;
      next();
    } catch (jwtError: any) {
      console.error('Erro JWT:', jwtError.message);
      res.status(401).json({ 
        error: 'Token inválido ou expirado' 
      });
      return;
    }
  } catch (error: any) {
    console.error('Erro no middleware de autenticação:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
};

// Middleware para verificar se é admin
export const adminMiddleware = (
  req: Request, 
  res: Response, 
  next: NextFunction
): void => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({ 
      error: 'Acesso negado. Apenas administradores podem acessar.' 
    });
  }
};

// Middleware para verificar se é admin ou editor
export const editorMiddleware = (
  req: Request, 
  res: Response, 
  next: NextFunction
): void => {
  if (req.user && (req.user.role === 'ADMIN' || req.user.role === 'EDITOR')) {
    next();
  } else {
    res.status(403).json({ 
      error: 'Acesso negado. Apenas administradores ou editores podem acessar.' 
    });
  }
};
