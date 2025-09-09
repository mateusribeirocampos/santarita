import eventRepository from '@/repositories/eventRepository';
import { 
  Event, 
  EventCreateInput, 
  EventUpdateInput, 
  EventFilters 
} from '@/types';
import { NotFoundError, ValidationError } from '@/utils/errors';
import { Validator } from '@/utils/validation';
import { transformImageUrls, transformImageUrlsArray } from '@/utils/imageUtils';

type EventWithRelations = Awaited<ReturnType<typeof eventRepository.findById>>;

export class EventService {
  async getAllEvents(filters: EventFilters = {}): Promise<NonNullable<EventWithRelations>[]> {
    try {
      const events = await eventRepository.findAll(filters);
      return transformImageUrlsArray(events);
    } catch (error: any) {
      console.error('Get all events error:', error);
      throw new Error(`Erro ao buscar eventos: ${error.message}`);
    }
  }

  async getEventById(id: string): Promise<NonNullable<EventWithRelations>> {
    try {
      Validator.validateUUID(id);

      const event = await eventRepository.findById(id);
      
      if (!event) {
        throw new NotFoundError('Evento');
      }

      return transformImageUrls(event);
    } catch (error) {
      if (error instanceof ValidationError || error instanceof NotFoundError) {
        throw error;
      }
      console.error('Get event by ID error:', error);
      throw error;
    }
  }

  async createEvent(
    eventData: EventCreateInput, 
    authorId: string
  ): Promise<NonNullable<EventWithRelations>> {
    try {
      const { title, description, fullDescription, date, time, location, image, type, categoryId } = eventData;

      // Validations
      Validator.validateRequired({ title, description, date, time, categoryId });
      Validator.validateUUID(categoryId, 'categoryId');
      Validator.validateUUID(authorId, 'authorId');
      
      const eventDate = Validator.validateDate(date);
      Validator.validateTime(time);

      const newEventData = {
        title: title.trim(),
        description: description.trim(),
        fullDescription: fullDescription?.trim(),
        date: eventDate,
        time: time.trim(),
        location: location?.trim(),
        image: image?.trim(),
        type: type?.trim() || 'regular',
        categoryId,
        authorId
      };

      const createdEvent = await eventRepository.create(newEventData);
      return transformImageUrls(createdEvent);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }
      console.error('Create event error:', error);
      throw error;
    }
  }

  async updateEvent(
    id: string, 
    eventData: EventUpdateInput, 
    authorId: string
  ): Promise<NonNullable<EventWithRelations>> {
    try {
      Validator.validateUUID(id);
      Validator.validateUUID(authorId, 'authorId');

      // Check if event exists
      const existingEvent = await eventRepository.findById(id);
      
      if (!existingEvent) {
        throw new NotFoundError('Evento');
      }

      const updateData: any = {};
      
      if (eventData.title) {
        updateData.title = eventData.title.trim();
      }
      
      if (eventData.description) {
        updateData.description = eventData.description.trim();
      }
      
      if (eventData.fullDescription !== undefined) {
        updateData.fullDescription = eventData.fullDescription?.trim() || null;
      }
      
      if (eventData.date) {
        updateData.date = Validator.validateDate(eventData.date);
      }
      
      if (eventData.time) {
        Validator.validateTime(eventData.time);
        updateData.time = eventData.time.trim();
      }
      
      if (eventData.location !== undefined) {
        updateData.location = eventData.location?.trim() || null;
      }
      
      if (eventData.image !== undefined) {
        updateData.image = eventData.image?.trim() || null;
      }
      
      if (eventData.type) {
        updateData.type = eventData.type.trim();
      }
      
      if (eventData.categoryId) {
        Validator.validateUUID(eventData.categoryId, 'categoryId');
        updateData.categoryId = eventData.categoryId;
      }
      
      if (eventData.isActive !== undefined) {
        updateData.isActive = eventData.isActive;
      }

      // Add modification author
      updateData.authorId = authorId;

      const updatedEvent = await eventRepository.update(id, updateData);
      return transformImageUrls(updatedEvent);
    } catch (error) {
      if (error instanceof ValidationError || error instanceof NotFoundError) {
        throw error;
      }
      console.error('Update event error:', error);
      throw error;
    }
  }

  async deleteEvent(id: string): Promise<void> {
    try {
      Validator.validateUUID(id);

      const existingEvent = await eventRepository.findById(id);
      
      if (!existingEvent) {
        throw new NotFoundError('Evento');
      }

      await eventRepository.delete(id);
    } catch (error) {
      if (error instanceof ValidationError || error instanceof NotFoundError) {
        throw error;
      }
      console.error('Delete event error:', error);
      throw error;
    }
  }
}

export default new EventService();