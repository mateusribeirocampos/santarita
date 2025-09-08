import { PrismaClient, News as PrismaNews } from '@prisma/client';
import { News, NewsCreateInput, NewsUpdateInput, NewsFilters, PaginationResponse } from '@/types';

const prisma = new PrismaClient();

type NewsWithRelations = PrismaNews & {
  category: { id: string; name: string; description: string | null; };
  author: { id: string; name: string; } | null;
};

export interface NewsRepositoryResponse {
  news: NewsWithRelations[];
  pagination: PaginationResponse;
}

export class NewsRepository {
  async findAll(filters: NewsFilters & { page?: number; limit?: number } = {}): Promise<NewsRepositoryResponse> {
    const { 
      category, 
      published = true, 
      page = 1, 
      limit = 10,
      search 
    } = filters;

    const pageNum = parseInt(String(page));
    const limitNum = parseInt(String(limit));
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    
    if (published === 'true' || published === true) {
      where.isPublished = true;
      where.publishedAt = { lte: new Date() };
    } else if (published === 'false' || published === false) {
      where.isPublished = false;
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
        include: { 
          category: true, 
          author: { select: { id: true, name: true } } 
        },
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

  async findById(id: string): Promise<NewsWithRelations | null> {
    return await prisma.news.findUnique({
      where: { id },
      include: { 
        category: true, 
        author: { select: { id: true, name: true } } 
      }
    });
  }

  async create(newsData: NewsCreateInput & { authorId?: string }): Promise<NewsWithRelations> {
    return await prisma.news.create({
      data: newsData,
      include: { 
        category: true, 
        author: { select: { id: true, name: true } } 
      }
    });
  }

  async update(id: string, newsData: NewsUpdateInput & { authorId?: string }): Promise<NewsWithRelations> {
    return await prisma.news.update({
      where: { id },
      data: newsData,
      include: { 
        category: true, 
        author: { select: { id: true, name: true } } 
      }
    });
  }

  async delete(id: string): Promise<PrismaNews> {
    return await prisma.news.delete({
      where: { id }
    });
  }
}

export default new NewsRepository();