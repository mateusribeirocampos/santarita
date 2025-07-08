const newsRepository = require('../repositories/newsRepository');

class NewsService {
  async getAllNews(filters) {
    try {
      return await newsRepository.findAll(filters);
    } catch (error) {
      throw new Error(`Erro ao buscar notícias: ${error.message}`);
    }
  }

  async getNewsById(id) {
    try {
      const news = await newsRepository.findById(id);
      
      if (!news) {
        throw new Error('Notícia não encontrada');
      }

      return news;
    } catch (error) {
      throw error;
    }
  }

  async createNews(newsData, authorId) {
    try {
      const { title, summary, content, image, categoryId, isPublished = false, publishedAt } = newsData;

      // Validações
      if (!title || !summary || !content || !categoryId) {
        throw new Error('Campos obrigatórios: title, summary, content, categoryId');
      }

      const newNewsData = {
        title,
        summary,
        content,
        categoryId,
        isPublished,
        authorId
      };

      if (image) {
        newNewsData.image = image;
      }

      if (isPublished && publishedAt) {
        newNewsData.publishedAt = new Date(publishedAt);
      } else if (isPublished) {
        newNewsData.publishedAt = new Date();
      }

      return await newsRepository.create(newNewsData);
    } catch (error) {
      throw error;
    }
  }

  async updateNews(id, newsData, authorId) {
    try {
      // Verificar se notícia existe
      const existingNews = await newsRepository.findById(id);
      
      if (!existingNews) {
        throw new Error('Notícia não encontrada');
      }

      const updateData = {};

      if (newsData.title) updateData.title = newsData.title;
      if (newsData.summary) updateData.summary = newsData.summary;
      if (newsData.content) updateData.content = newsData.content;
      if (newsData.image !== undefined) updateData.image = newsData.image;
      if (newsData.categoryId) updateData.categoryId = newsData.categoryId;
      if (newsData.isPublished !== undefined) {
        updateData.isPublished = newsData.isPublished;
        
        if (newsData.isPublished && newsData.publishedAt) {
          updateData.publishedAt = new Date(newsData.publishedAt);
        } else if (newsData.isPublished && !existingNews.publishedAt) {
          updateData.publishedAt = new Date();
        }
      }

      // Adicionar autor da modificação
      updateData.authorId = authorId;

      return await newsRepository.update(id, updateData);
    } catch (error) {
      throw error;
    }
  }

  async deleteNews(id) {
    try {
      const existingNews = await newsRepository.findById(id);
      
      if (!existingNews) {
        throw new Error('Notícia não encontrada');
      }

      return await newsRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new NewsService();