const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class NewsRepository {
  async findAll(filters = {}) {
    const { 
      category, 
      published = true, 
      page = 1, 
      limit = 10,
      search 
    } = filters;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const where = {};
    
    if (published === 'true' || published === true) {
      where.isPublished = true;
      where.publishedAt = { lte: new Date() };
    }

    if (category) {
      where.category = { name: category };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { summary: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [news, total] = await Promise.all([
      prisma.news.findMany({
        where,
        include: { category: true, author: { select: { id: true, name: true } } },
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limitNum
      }),
      prisma.news.count({ where })
    ]);

    const totalPages = Math.ceil(total / limitNum);

    return {
      news,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1
      }
    };
  }

  async findById(id) {
    return await prisma.news.findUnique({
      where: { id },
      include: { category: true, author: { select: { id: true, name: true } } }
    });
  }

  async create(newsData) {
    return await prisma.news.create({
      data: newsData,
      include: { category: true, author: { select: { id: true, name: true } } }
    });
  }

  async update(id, newsData) {
    return await prisma.news.update({
      where: { id },
      data: newsData,
      include: { category: true, author: { select: { id: true, name: true } } }
    });
  }

  async delete(id) {
    return await prisma.news.delete({
      where: { id }
    });
  }
}

module.exports = new NewsRepository();