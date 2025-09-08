import { Request, Response } from 'express';
import authService from '@/services/authService';
import { handleError } from '@/utils/errors';
import { successResponse, createdResponse } from '@/utils/response';
import { LoginCredentials, UserCreateInput } from '@/types';

export class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password }: LoginCredentials = req.body;

      // Input sanitization and validation
      if (!email || !password) {
        res.status(400).json({
          error: 'Email e senha são obrigatórios'
        });
        return;
      }

      // Sanitize input - trim and limit length for security
      const sanitizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
      const sanitizedPassword = typeof password === 'string' ? password : '';

      if (!sanitizedEmail || !sanitizedPassword) {
        res.status(400).json({
          error: 'Email e senha são obrigatórios'
        });
        return;
      }

      const result = await authService.login(sanitizedEmail, sanitizedPassword);

      successResponse(res, result, 'Login realizado com sucesso');
    } catch (error: any) {
      console.error('Erro no login:', error.message);
      handleError(error, res);
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const userData: UserCreateInput = req.body;
      
      // Sanitize email input for security
      if (userData.email && typeof userData.email === 'string') {
        userData.email = userData.email.trim().toLowerCase();
      }
      
      const result = await authService.register(userData);

      createdResponse(res, result, 'Usuário registrado com sucesso');
    } catch (error: any) {
      console.error('Erro no registro:', error.message);
      handleError(error, res);
    }
  }

  async verifyToken(req: Request, res: Response): Promise<void> {
    try {
      // O middleware de auth já verificou o token e adicionou o usuário à req
      successResponse(res, { user: req.user });
    } catch (error: any) {
      console.error('Erro na verificação do token:', error.message);
      res.status(401).json({
        error: 'Token inválido'
      });
    }
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({
          error: 'Token não fornecido'
        });
        return;
      }

      const token = authHeader.split(' ')[1];
      const result = await authService.refreshToken(token);

      successResponse(res, result, 'Token renovado com sucesso');
    } catch (error: any) {
      console.error('Erro na renovação do token:', error.message);
      handleError(error, res);
    }
  }

  async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const { oldPassword, newPassword }: { oldPassword: string; newPassword: string } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({
          error: 'Usuário não autenticado'
        });
        return;
      }

      if (!oldPassword || !newPassword) {
        res.status(400).json({
          error: 'Senha atual e nova senha são obrigatórias'
        });
        return;
      }

      const result = await authService.changePassword(userId, oldPassword, newPassword);

      successResponse(res, undefined, result.message);
    } catch (error: any) {
      console.error('Erro na alteração de senha:', error.message);
      handleError(error, res);
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      // Para logout com JWT, geralmente apenas retornamos sucesso
      // O cliente deve remover o token do storage
      successResponse(res, undefined, 'Logout realizado com sucesso');
    } catch (error: any) {
      console.error('Erro no logout:', error.message);
      res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  }
}

export default new AuthController();