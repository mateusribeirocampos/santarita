const authService = require('../services/authService');

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: 'Email e senha são obrigatórios'
        });
      }

      const result = await authService.login(email, password);

      res.json({
        success: true,
        message: 'Login realizado com sucesso',
        data: result
      });
    } catch (error) {
      console.error('Erro no login:', error.message);
      
      const statusCode = error.message === 'Credenciais inválidas' || 
                        error.message === 'Usuário inativo' ? 401 : 500;
      
      res.status(statusCode).json({
        error: error.message || 'Erro interno do servidor'
      });
    }
  }

  async register(req, res) {
    try {
      const { name, email, password, role } = req.body;

      const result = await authService.register({
        name,
        email,
        password,
        role
      });

      res.status(201).json({
        success: true,
        message: 'Usuário registrado com sucesso',
        data: result
      });
    } catch (error) {
      console.error('Erro no registro:', error.message);
      
      const statusCode = error.message.includes('já existe') ? 409 : 
                        error.message.includes('obrigatórios') ||
                        error.message.includes('caracteres') ? 400 : 500;
      
      res.status(statusCode).json({
        error: error.message || 'Erro interno do servidor'
      });
    }
  }

  async verifyToken(req, res) {
    try {
      // O middleware de auth já verificou o token e adicionou o usuário à req
      res.json({
        success: true,
        data: {
          user: req.user
        }
      });
    } catch (error) {
      console.error('Erro na verificação do token:', error.message);
      res.status(401).json({
        error: 'Token inválido'
      });
    }
  }

  async refreshToken(req, res) {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          error: 'Token não fornecido'
        });
      }

      const token = authHeader.split(' ')[1];
      const result = await authService.refreshToken(token);

      res.json({
        success: true,
        message: 'Token renovado com sucesso',
        data: result
      });
    } catch (error) {
      console.error('Erro na renovação do token:', error.message);
      res.status(401).json({
        error: error.message || 'Erro interno do servidor'
      });
    }
  }

  async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const userId = req.user.id;

      if (!oldPassword || !newPassword) {
        return res.status(400).json({
          error: 'Senha atual e nova senha são obrigatórias'
        });
      }

      const result = await authService.changePassword(userId, oldPassword, newPassword);

      res.json({
        success: true,
        message: result.message
      });
    } catch (error) {
      console.error('Erro na alteração de senha:', error.message);
      
      const statusCode = error.message.includes('incorreta') ? 400 : 
                        error.message.includes('caracteres') ? 400 : 500;
      
      res.status(statusCode).json({
        error: error.message || 'Erro interno do servidor'
      });
    }
  }

  async logout(req, res) {
    try {
      // Para logout com JWT, geralmente apenas retornamos sucesso
      // O cliente deve remover o token do storage
      res.json({
        success: true,
        message: 'Logout realizado com sucesso'
      });
    } catch (error) {
      console.error('Erro no logout:', error.message);
      res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  }
}

module.exports = new AuthController();