const newsService = require('../services/newsService');

class NewsController {
  async getAllNews(req, res) {
    try {
      const { category, published, page, limit, search } = req.query;
      
      const filters = {
        category,
        published,
        page,
        limit,
        search
      };

      const result = await newsService.getAllNews(filters);

      res.json(result);
    } catch (error) {
      console.error('Erro ao buscar notícias:', error.message);
      res.status(500).json({ error: error.message || 'Erro interno do servidor' });
    }
  }

  async getNewsById(req, res) {
    try {
      const { id } = req.params;
      const news = await newsService.getNewsById(id);

      res.json(news);
    } catch (error) {
      console.error('Erro ao buscar notícia:', error.message);
      
      const statusCode = error.message === 'Notícia não encontrada' ? 404 : 500;
      res.status(statusCode).json({ error: error.message || 'Erro interno do servidor' });
    }
  }

  async createNews(req, res) {
    try {
      const authorId = req.user.id;
      const news = await newsService.createNews(req.body, authorId);

      res.status(201).json({
        success: true,
        message: 'Notícia criada com sucesso',
        data: news
      });
    } catch (error) {
      console.error('Erro ao criar notícia:', error.message);
      
      const statusCode = error.message.includes('obrigatórios') ? 400 : 500;
      res.status(statusCode).json({ error: error.message || 'Erro interno do servidor' });
    }
  }

  async updateNews(req, res) {
    try {
      const { id } = req.params;
      const authorId = req.user.id;
      const news = await newsService.updateNews(id, req.body, authorId);

      res.json({
        success: true,
        message: 'Notícia atualizada com sucesso',
        data: news
      });
    } catch (error) {
      console.error('Erro ao atualizar notícia:', error.message);
      
      const statusCode = error.message === 'Notícia não encontrada' ? 404 : 500;
      res.status(statusCode).json({ error: error.message || 'Erro interno do servidor' });
    }
  }

  async deleteNews(req, res) {
    try {
      const { id } = req.params;
      await newsService.deleteNews(id);

      res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar notícia:', error.message);
      
      const statusCode = error.message === 'Notícia não encontrada' ? 404 : 500;
      res.status(statusCode).json({ error: error.message || 'Erro interno do servidor' });
    }
  }
}

module.exports = new NewsController();