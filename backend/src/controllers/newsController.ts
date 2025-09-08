import { Request, Response } from 'express';
import newsService from '@/services/newsService';
import { handleError } from '@/utils/errors';
import { successResponse, createdResponse } from '@/utils/response';
import { NewsCreateInput, NewsUpdateInput, NewsFilters } from '@/types';

export class NewsController {
  async getAllNews(req: Request, res: Response): Promise<void> {
    try {
      const { category, published, page, limit, search } = req.query;
      
      const filters: NewsFilters & { page?: number; limit?: number } = {
        category: category as string,
        published: published as string,
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
        search: search as string
      };

      const result = await newsService.getAllNews(filters);

      res.json(result);
    } catch (error: any) {
      console.error('Erro ao buscar notícias:', error.message);
      handleError(error, res);
    }
  }

  async getNewsById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const news = await newsService.getNewsById(id);

      res.json(news);
    } catch (error: any) {
      console.error('Erro ao buscar notícia:', error.message);
      handleError(error, res);
    }
  }

  async createNews(req: Request, res: Response): Promise<void> {
    try {
      const authorId = req.user?.id;
      
      if (!authorId) {
        res.status(401).json({
          error: 'Usuário não autenticado'
        });
        return;
      }

      const newsData: NewsCreateInput = req.body;
      const news = await newsService.createNews(newsData, authorId);

      createdResponse(res, news, 'Notícia criada com sucesso');
    } catch (error: any) {
      console.error('Erro ao criar notícia:', error.message);
      handleError(error, res);
    }
  }

  async updateNews(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const authorId = req.user?.id;
      
      if (!authorId) {
        res.status(401).json({
          error: 'Usuário não autenticado'
        });
        return;
      }

      const newsData: NewsUpdateInput = req.body;
      const news = await newsService.updateNews(id, newsData, authorId);

      successResponse(res, news, 'Notícia atualizada com sucesso');
    } catch (error: any) {
      console.error('Erro ao atualizar notícia:', error.message);
      handleError(error, res);
    }
  }

  async deleteNews(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await newsService.deleteNews(id);

      res.status(204).send();
    } catch (error: any) {
      console.error('Erro ao deletar notícia:', error.message);
      handleError(error, res);
    }
  }
}

export default new NewsController();