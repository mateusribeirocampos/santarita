import { PrismaClient, Event as PrismaEvent } from '@prisma/client';
import { Event, EventCreateInput, EventUpdateInput, EventFilters } from '@/types';

const prisma = new PrismaClient();

export class EventRepository {
  async findAll(filters: EventFilters = {}): Promise<(PrismaEvent & {
    category: { id: string; name: string; description: string | null; };
    author: { id: string; name: string; } | null;
  })[]> {
    const { category, type, active = true } = filters;
    const where: any = {};
    
    if (active) {
      where.isActive = true;
      where.date = { gte: new Date() };
    }

    if (category) {
      where.category = { name: category };
    }

    if (type) {
      where.type = type;
    }

    return await prisma.event.findMany({
      where,
      include: { 
        category: true, 
        author: { select: { id: true, name: true } } 
      },
      orderBy: { date: 'asc' }
    });
  }

  async findById(id: string): Promise<(PrismaEvent & {
    category: { id: string; name: string; description: string | null; };
    author: { id: string; name: string; } | null;
  }) | null> {
    return await prisma.event.findUnique({
      where: { id },
      include: { 
        category: true, 
        author: { select: { id: true, name: true } } 
      }
    });
  }

  async create(eventData: EventCreateInput & { authorId?: string }): Promise<PrismaEvent & {
    category: { id: string; name: string; description: string | null; };
    author: { id: string; name: string; } | null;
  }> {
    return await prisma.event.create({
      data: eventData,
      include: { 
        category: true, 
        author: { select: { id: true, name: true } } 
      }
    });
  }

  async update(id: string, eventData: EventUpdateInput & { authorId?: string }): Promise<PrismaEvent & {
    category: { id: string; name: string; description: string | null; };
    author: { id: string; name: string; } | null;
  }> {
    return await prisma.event.update({
      where: { id },
      data: eventData,
      include: { 
        category: true, 
        author: { select: { id: true, name: true } } 
      }
    });
  }

  async delete(id: string): Promise<PrismaEvent> {
    return await prisma.event.update({
      where: { id },
      data: { isActive: false }
    });
  }
}

export default new EventRepository();