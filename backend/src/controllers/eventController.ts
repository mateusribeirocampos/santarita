import { Request, Response } from 'express';
import eventService from '@/services/eventService';
import { handleError } from '@/utils/errors';
import { successResponse, createdResponse } from '@/utils/response';
import { EventCreateInput, EventUpdateInput, EventFilters } from '@/types';

export class EventController {
  async getAllEvents(req: Request, res: Response): Promise<void> {
    try {
      const { category, type, active } = req.query;
      
      const filters: EventFilters = {
        category: category as string,
        type: type as string,
        active: active !== undefined ? active === 'true' : true
      };

      const events = await eventService.getAllEvents(filters);

      res.json(events);
    } catch (error: any) {
      console.error('Erro ao buscar eventos:', error.message);
      handleError(error, res);
    }
  }

  async getEventById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const event = await eventService.getEventById(id);

      res.json(event);
    } catch (error: any) {
      console.error('Erro ao buscar evento:', error.message);
      handleError(error, res);
    }
  }

  async createEvent(req: Request, res: Response): Promise<void> {
    try {
      const authorId = req.user?.id;
      
      if (!authorId) {
        res.status(401).json({
          error: 'Usuário não autenticado'
        });
        return;
      }

      const eventData: EventCreateInput = req.body;
      const event = await eventService.createEvent(eventData, authorId);

      createdResponse(res, event, 'Evento criado com sucesso');
    } catch (error: any) {
      console.error('Erro ao criar evento:', error.message);
      handleError(error, res);
    }
  }

  async updateEvent(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const authorId = req.user?.id;
      
      if (!authorId) {
        res.status(401).json({
          error: 'Usuário não autenticado'
        });
        return;
      }

      const eventData: EventUpdateInput = req.body;
      const event = await eventService.updateEvent(id, eventData, authorId);

      successResponse(res, event, 'Evento atualizado com sucesso');
    } catch (error: any) {
      console.error('Erro ao atualizar evento:', error.message);
      handleError(error, res);
    }
  }

  async deleteEvent(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await eventService.deleteEvent(id);

      res.status(204).send();
    } catch (error: any) {
      console.error('Erro ao deletar evento:', error.message);
      handleError(error, res);
    }
  }
}

export default new EventController();