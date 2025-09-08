import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { handleError, ValidationError, ConflictError } from '@/utils/errors';
import { successResponse, createdResponse } from '@/utils/response';
import { Validator } from '@/utils/validation';

const prisma = new PrismaClient();

export class CategoryController {
  async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const { type } = req.query;
      const where: any = {};
      
      if (type && typeof type === 'string') {
        const validTypes = ['EVENT', 'NEWS'];
        if (!validTypes.includes(type)) {
          throw new ValidationError('Tipo de categoria inválido. Use: EVENT ou NEWS');
        }
        where.type = type;
      }

      const categories = await prisma.category.findMany({
        where,
        orderBy: { name: 'asc' }
      });

      res.json(categories);
    } catch (error: any) {
      console.error('Erro ao buscar categorias:', error);
      handleError(error, res);
    }
  }

  async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, type }: {
        name: string;
        description?: string;
        type: 'EVENT' | 'NEWS';
      } = req.body;

      // Validations
      Validator.validateRequired({ name, type });

      const validTypes = ['EVENT', 'NEWS'];
      if (!validTypes.includes(type)) {
        throw new ValidationError('Tipo de categoria inválido. Use: EVENT ou NEWS');
      }

      const category = await prisma.category.create({
        data: { 
          name: name.trim(), 
          description: description?.trim(), 
          type 
        }
      });

      createdResponse(res, category, 'Categoria criada com sucesso');
    } catch (error: any) {
      console.error('Erro ao criar categoria:', error);
      
      if (error.code === 'P2002') {
        handleError(new ConflictError('Categoria com este nome já existe'), res);
        return;
      }
      
      handleError(error, res);
    }
  }
}

export default new CategoryController();