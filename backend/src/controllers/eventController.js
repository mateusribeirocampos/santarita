const eventService = require('../services/eventService');

class EventController {
  async getAllEvents(req, res) {
    try {
      const { category, type, active } = req.query;
      
      const filters = {
        category,
        type,
        active: active !== undefined ? active === 'true' : true
      };

      const events = await eventService.getAllEvents(filters);

      res.json(events);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error.message);
      res.status(500).json({ error: error.message || 'Erro interno do servidor' });
    }
  }

  async getEventById(req, res) {
    try {
      const { id } = req.params;
      const event = await eventService.getEventById(id);

      res.json(event);
    } catch (error) {
      console.error('Erro ao buscar evento:', error.message);
      
      const statusCode = error.message === 'Evento não encontrado' ? 404 : 500;
      res.status(statusCode).json({ error: error.message || 'Erro interno do servidor' });
    }
  }

  async createEvent(req, res) {
    try {
      const authorId = req.user.id;
      const event = await eventService.createEvent(req.body, authorId);

      res.status(201).json({
        success: true,
        message: 'Evento criado com sucesso',
        data: event
      });
    } catch (error) {
      console.error('Erro ao criar evento:', error.message);
      
      const statusCode = error.message.includes('obrigatórios') ? 400 : 500;
      res.status(statusCode).json({ error: error.message || 'Erro interno do servidor' });
    }
  }

  async updateEvent(req, res) {
    try {
      const { id } = req.params;
      const authorId = req.user.id;
      const event = await eventService.updateEvent(id, req.body, authorId);

      res.json({
        success: true,
        message: 'Evento atualizado com sucesso',
        data: event
      });
    } catch (error) {
      console.error('Erro ao atualizar evento:', error.message);
      
      const statusCode = error.message === 'Evento não encontrado' ? 404 : 500;
      res.status(statusCode).json({ error: error.message || 'Erro interno do servidor' });
    }
  }

  async deleteEvent(req, res) {
    try {
      const { id } = req.params;
      await eventService.deleteEvent(id);

      res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar evento:', error.message);
      
      const statusCode = error.message === 'Evento não encontrado' ? 404 : 500;
      res.status(statusCode).json({ error: error.message || 'Erro interno do servidor' });
    }
  }
}

module.exports = new EventController();