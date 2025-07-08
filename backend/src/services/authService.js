const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

class AuthService {
  async login(email, password) {
    try {
      // Buscar usuário por email
      const user = await userRepository.findByEmail(email);
      
      if (!user) {
        throw new Error('Credenciais inválidas');
      }

      if (!user.isActive) {
        throw new Error('Usuário inativo');
      }

      // Verificar senha
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        throw new Error('Credenciais inválidas');
      }

      // Gerar token JWT
      const token = jwt.sign(
        { 
          userId: user.id,
          email: user.email,
          role: user.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token
      };
    } catch (error) {
      throw error;
    }
  }

  async register(userData) {
    try {
      const { name, email, password, role = 'ADMIN' } = userData;

      // Verificar se usuário já existe
      const existingUser = await userRepository.findByEmail(email);
      
      if (existingUser) {
        throw new Error('Usuário já existe com este email');
      }

      // Validar dados
      if (!name || !email || !password) {
        throw new Error('Nome, email e senha são obrigatórios');
      }

      if (password.length < 6) {
        throw new Error('Senha deve ter pelo menos 6 caracteres');
      }

      // Criptografar senha
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Criar usuário
      const newUser = await userRepository.create({
        name,
        email,
        password: hashedPassword,
        role
      });

      // Gerar token JWT
      const token = jwt.sign(
        { 
          userId: newUser.id,
          email: newUser.email,
          role: newUser.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      return {
        user: newUser,
        token
      };
    } catch (error) {
      throw error;
    }
  }

  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userRepository.findById(decoded.userId);
      
      if (!user || !user.isActive) {
        throw new Error('Usuário não encontrado ou inativo');
      }

      return user;
    } catch (error) {
      throw new Error('Token inválido');
    }
  }

  async refreshToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });
      const user = await userRepository.findById(decoded.userId);
      
      if (!user || !user.isActive) {
        throw new Error('Usuário não encontrado ou inativo');
      }

      // Gerar novo token
      const newToken = jwt.sign(
        { 
          userId: user.id,
          email: user.email,
          role: user.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      return {
        user,
        token: newToken
      };
    } catch (error) {
      throw new Error('Não foi possível renovar o token');
    }
  }

  async changePassword(userId, oldPassword, newPassword) {
    try {
      const user = await userRepository.findByEmail(
        (await userRepository.findById(userId)).email
      );

      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      // Verificar senha atual
      const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
      
      if (!isOldPasswordValid) {
        throw new Error('Senha atual incorreta');
      }

      if (newPassword.length < 6) {
        throw new Error('Nova senha deve ter pelo menos 6 caracteres');
      }

      // Criptografar nova senha
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Atualizar senha
      await userRepository.update(userId, { password: hashedPassword });

      return { message: 'Senha alterada com sucesso' };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthService();