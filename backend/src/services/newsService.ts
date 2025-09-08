import newsRepository, { NewsRepositoryResponse } from '@/repositories/newsRepository';
import { 
  News, 
  NewsCreateInput, 
  NewsUpdateInput, 
  NewsFilters 
} from '@/types';
import { NotFoundError, ValidationError } from '@/utils/errors';
import { Validator } from '@/utils/validation';

type NewsWithRelations = Awaited<ReturnType<typeof newsRepository.findById>>;

export class NewsService {
  async getAllNews(
    filters: NewsFilters & { page?: number; limit?: number } = {}
  ): Promise<NewsRepositoryResponse> {
    try {
      // Validate pagination parameters if provided
      if (filters.page !== undefined || filters.limit !== undefined) {
        const { page, limit } = Validator.validatePagination(
          String(filters.page || 1), 
          String(filters.limit || 10)
        );
        filters.page = page;
        filters.limit = limit;
      }

      return await newsRepository.findAll(filters);
    } catch (error: any) {
      if (error instanceof ValidationError) {
        throw error;
      }
      console.error('Get all news error:', error);
      throw new Error(`Erro ao buscar notícias: ${error.message}`);
    }
  }

  async getNewsById(id: string): Promise<NonNullable<NewsWithRelations>> {
    try {
      Validator.validateUUID(id);

      const news = await newsRepository.findById(id);
      
      if (!news) {
        throw new NotFoundError('Notícia');
      }

      return news;
    } catch (error) {
      if (error instanceof ValidationError || error instanceof NotFoundError) {
        throw error;
      }
      console.error('Get news by ID error:', error);
      throw error;
    }
  }

  async createNews(
    newsData: NewsCreateInput, 
    authorId: string
  ): Promise<NonNullable<NewsWithRelations>> {
    try {
      const { 
        title, 
        summary, 
        content, 
        image, 
        categoryId, 
        isPublished = false, 
        publishedAt 
      } = newsData;

      // Validations
      Validator.validateRequired({ title, summary, content, categoryId });
      Validator.validateUUID(categoryId, 'categoryId');
      Validator.validateUUID(authorId, 'authorId');

      const newNewsData: any = {
        title: title.trim(),
        summary: summary.trim(),
        content: content.trim(),
        categoryId,
        isPublished,
        authorId
      };

      if (image) {
        newNewsData.image = image.trim();
      }

      // Handle publication date
      if (isPublished) {
        if (publishedAt) {
          newNewsData.publishedAt = Validator.validateDate(publishedAt);
        } else {
          newNewsData.publishedAt = new Date();
        }
      }

      return await newsRepository.create(newNewsData);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }
      console.error('Create news error:', error);
      throw error;
    }
  }

  async updateNews(
    id: string, 
    newsData: NewsUpdateInput, 
    authorId: string
  ): Promise<NonNullable<NewsWithRelations>> {
    try {
      Validator.validateUUID(id);
      Validator.validateUUID(authorId, 'authorId');

      // Check if news exists
      const existingNews = await newsRepository.findById(id);
      
      if (!existingNews) {
        throw new NotFoundError('Notícia');
      }

      const updateData: any = {};

      if (newsData.title) {
        updateData.title = newsData.title.trim();
      }
      
      if (newsData.summary) {
        updateData.summary = newsData.summary.trim();
      }
      
      if (newsData.content) {
        updateData.content = newsData.content.trim();
      }
      
      if (newsData.image !== undefined) {
        updateData.image = newsData.image?.trim() || null;
      }
      
      if (newsData.categoryId) {
        Validator.validateUUID(newsData.categoryId, 'categoryId');
        updateData.categoryId = newsData.categoryId;
      }
      
      if (newsData.isPublished !== undefined) {
        updateData.isPublished = newsData.isPublished;
        
        // Handle publication date
        if (newsData.isPublished) {
          if (newsData.publishedAt) {
            updateData.publishedAt = Validator.validateDate(newsData.publishedAt);
          } else if (!existingNews.publishedAt) {
            // Only set publishedAt if it wasn't set before
            updateData.publishedAt = new Date();
          }
        }
      }

      // Add modification author
      updateData.authorId = authorId;

      return await newsRepository.update(id, updateData);
    } catch (error) {
      if (error instanceof ValidationError || error instanceof NotFoundError) {
        throw error;
      }
      console.error('Update news error:', error);
      throw error;
    }
  }

  async deleteNews(id: string): Promise<void> {
    try {
      Validator.validateUUID(id);

      const existingNews = await newsRepository.findById(id);
      
      if (!existingNews) {
        throw new NotFoundError('Notícia');
      }

      await newsRepository.delete(id);
    } catch (error) {
      if (error instanceof ValidationError || error instanceof NotFoundError) {
        throw error;
      }
      console.error('Delete news error:', error);
      throw error;
    }
  }
}

export default new NewsService();