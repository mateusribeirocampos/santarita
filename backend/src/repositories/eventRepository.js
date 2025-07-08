const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class EventRepository {
  async findAll(filters = {}) {
    const { category, type, active = true } = filters;
    const where = {};
    
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
      include: { category: true, author: { select: { id: true, name: true } } },
      orderBy: { date: 'asc' }
    });
  }

  async findById(id) {
    return await prisma.event.findUnique({
      where: { id },
      include: { category: true, author: { select: { id: true, name: true } } }
    });
  }

  async create(eventData) {
    return await prisma.event.create({
      data: eventData,
      include: { category: true, author: { select: { id: true, name: true } } }
    });
  }

  async update(id, eventData) {
    return await prisma.event.update({
      where: { id },
      data: eventData,
      include: { category: true, author: { select: { id: true, name: true } } }
    });
  }

  async delete(id) {
    return await prisma.event.update({
      where: { id },
      data: { isActive: false }
    });
  }
}

module.exports = new EventRepository();