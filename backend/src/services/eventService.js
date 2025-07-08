const eventRepository = require('../repositories/eventRepository');

class EventService {
  async getAllEvents(filters) {
    try {
      return await eventRepository.findAll(filters);
    } catch (error) {
      throw new Error(`Erro ao buscar eventos: ${error.message}`);
    }
  }

  async getEventById(id) {
    try {
      const event = await eventRepository.findById(id);
      
      if (!event) {
        throw new Error('Evento não encontrado');
      }

      return event;
    } catch (error) {
      throw error;
    }
  }

  async createEvent(eventData, authorId) {
    try {
      const { title, description, fullDescription, date, time, location, image, type, categoryId } = eventData;

      // Validações
      if (!title || !description || !date || !time || !categoryId) {
        throw new Error('Campos obrigatórios: title, description, date, time, categoryId');
      }

      const newEventData = {
        title,
        description,
        fullDescription,
        date: new Date(date),
        time,
        location,
        image,
        type: type || 'regular',
        categoryId,
        authorId
      };

      return await eventRepository.create(newEventData);
    } catch (error) {
      throw error;
    }
  }

  async updateEvent(id, eventData, authorId) {
    try {
      // Verificar se evento existe
      const existingEvent = await eventRepository.findById(id);
      
      if (!existingEvent) {
        throw new Error('Evento não encontrado');
      }

      const updateData = {};
      
      if (eventData.title) updateData.title = eventData.title;
      if (eventData.description) updateData.description = eventData.description;
      if (eventData.fullDescription !== undefined) updateData.fullDescription = eventData.fullDescription;
      if (eventData.date) updateData.date = new Date(eventData.date);
      if (eventData.time) updateData.time = eventData.time;
      if (eventData.location !== undefined) updateData.location = eventData.location;
      if (eventData.image !== undefined) updateData.image = eventData.image;
      if (eventData.type) updateData.type = eventData.type;
      if (eventData.categoryId) updateData.categoryId = eventData.categoryId;
      if (eventData.isActive !== undefined) updateData.isActive = eventData.isActive;

      // Adicionar autor da modificação
      updateData.authorId = authorId;

      return await eventRepository.update(id, updateData);
    } catch (error) {
      throw error;
    }
  }

  async deleteEvent(id) {
    try {
      const existingEvent = await eventRepository.findById(id);
      
      if (!existingEvent) {
        throw new Error('Evento não encontrado');
      }

      return await eventRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new EventService();