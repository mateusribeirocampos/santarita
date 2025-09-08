import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userRepository from '@/repositories/userRepository';
import { 
  LoginCredentials, 
  LoginResponse, 
  UserCreateInput, 
  User 
} from '@/types';
import { 
  ValidationError, 
  UnauthorizedError, 
  ConflictError,
  NotFoundError 
} from '@/utils/errors';
import { Validator } from '@/utils/validation';

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export class AuthService {
  private readonly JWT_SECRET: string;
  private readonly JWT_EXPIRES_IN = '24h';
  private readonly SALT_ROUNDS = 12;
  private readonly MIN_PASSWORD_LENGTH = 8;

  constructor() {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is required');
    }
    this.JWT_SECRET = process.env.JWT_SECRET;
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      // Validate input
      Validator.validateEmail(email);
      Validator.validateRequired({ password });

      // Find user by email
      const user = await userRepository.findByEmail(email);
      
      if (!user) {
        throw new UnauthorizedError('Credenciais inválidas');
      }

      if (!user.isActive) {
        throw new UnauthorizedError('Usuário inativo');
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        throw new UnauthorizedError('Credenciais inválidas');
      }

      // Generate JWT token
      const token = this.generateToken({
        userId: user.id,
        email: user.email,
        role: user.role
      });

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        },
        token
      };
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw error;
      }
      console.error('Login error:', error);
      throw new Error('Erro interno durante o login');
    }
  }

  async register(userData: UserCreateInput): Promise<LoginResponse> {
    try {
      const { name, email, password, role = 'ADMIN' } = userData;

      // Validate input
      Validator.validateRequired({ name, email, password });
      Validator.validateEmail(email);
      
      if (!password) {
        throw new ValidationError('Password is required');
      }
      
      if (password.length < this.MIN_PASSWORD_LENGTH) {
        throw new ValidationError(`Senha deve ter pelo menos ${this.MIN_PASSWORD_LENGTH} caracteres`);
      }

      // Check if user already exists
      const existingUser = await userRepository.findByEmail(email);
      
      if (existingUser) {
        throw new ConflictError('Usuário já existe com este email');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);

      // Create user
      const newUser = await userRepository.create({
        name,
        email,
        password: hashedPassword,
        role
      });

      // Generate JWT token
      const token = this.generateToken({
        userId: newUser.id,
        email: newUser.email,
        role: newUser.role
      });

      return {
        user: newUser,
        token
      };
    } catch (error) {
      if (error instanceof ValidationError || 
          error instanceof ConflictError) {
        throw error;
      }
      console.error('Registration error:', error);
      throw new Error('Erro interno durante o registro');
    }
  }

  async verifyToken(token: string): Promise<Omit<User, 'password'>> {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as JWTPayload;
      const user = await userRepository.findById(decoded.userId);
      
      if (!user || !user.isActive) {
        throw new UnauthorizedError('Usuário não encontrado ou inativo');
      }

      return user;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedError('Token inválido');
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedError('Token expirado');
      }
      throw error;
    }
  }

  async refreshToken(token: string): Promise<LoginResponse> {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET, { 
        ignoreExpiration: true 
      }) as JWTPayload;
      
      const user = await userRepository.findById(decoded.userId);
      
      if (!user || !user.isActive) {
        throw new UnauthorizedError('Usuário não encontrado ou inativo');
      }

      // Generate new token
      const newToken = this.generateToken({
        userId: user.id,
        email: user.email,
        role: user.role
      });

      return {
        user,
        token: newToken
      };
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw error;
      }
      throw new UnauthorizedError('Não foi possível renovar o token');
    }
  }

  async changePassword(
    userId: string, 
    oldPassword: string, 
    newPassword: string
  ): Promise<{ message: string }> {
    try {
      Validator.validateUUID(userId);
      Validator.validateRequired({ oldPassword, newPassword });

      if (newPassword.length < this.MIN_PASSWORD_LENGTH) {
        throw new ValidationError(`Nova senha deve ter pelo menos ${this.MIN_PASSWORD_LENGTH} caracteres`);
      }

      // Get user data with password
      const userData = await userRepository.findById(userId);
      if (!userData) {
        throw new NotFoundError('Usuário');
      }

      const user = await userRepository.findByEmail(userData.email);
      if (!user) {
        throw new NotFoundError('Usuário');
      }

      // Verify current password
      const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
      
      if (!isOldPasswordValid) {
        throw new ValidationError('Senha atual incorreta');
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, this.SALT_ROUNDS);

      // Update password
      await userRepository.update(userId, { password: hashedPassword });

      return { message: 'Senha alterada com sucesso' };
    } catch (error) {
      if (error instanceof ValidationError || 
          error instanceof NotFoundError) {
        throw error;
      }
      console.error('Change password error:', error);
      throw new Error('Erro interno durante alteração de senha');
    }
  }

  private generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, this.JWT_SECRET, { 
      expiresIn: this.JWT_EXPIRES_IN 
    });
  }
}

export default new AuthService();