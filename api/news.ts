import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

// GET /api/news - Listar notícias
export async function getNews(req: Request, res: Response) {
  try {
    const { 
      category, 
      published = 'true', 
      page = '1', 
      limit = '10',
      search 
    } = req.query

    const pageNum = parseInt(page as string)
    const limitNum = parseInt(limit as string)
    const skip = (pageNum - 1) * limitNum

    const where: any = {}
    
    if (published === 'true') {
      where.isPublished = true
      where.publishedAt = {
        lte: new Date()
      }
    }

    if (category) {
      where.category = {
        name: category as string
      }
    }

    if (search) {
      where.OR = [
        {
          title: {
            contains: search as string,
            mode: 'insensitive'
          }
        },
        {
          summary: {
            contains: search as string,
            mode: 'insensitive'
          }
        }
      ]
    }

    const [news, total] = await Promise.all([
      prisma.news.findMany({
        where,
        include: {
          category: true
        },
        orderBy: {
          publishedAt: 'desc'
        },
        skip,
        take: limitNum
      }),
      prisma.news.count({ where })
    ])

    const totalPages = Math.ceil(total / limitNum)

    res.json({
      news,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1
      }
    })
  } catch (error) {
    console.error('Erro ao buscar notícias:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

// GET /api/news/:id - Obter notícia específica
export async function getNewsById(req: Request, res: Response) {
  try {
    const { id } = req.params

    const news = await prisma.news.findUnique({
      where: { id },
      include: {
        category: true
      }
    })

    if (!news) {
      return res.status(404).json({ error: 'Notícia não encontrada' })
    }

    // Se a notícia não está publicada, só admin pode ver
    if (!news.isPublished) {
      // Aqui você implementaria verificação de role de admin
      // Por enquanto, vamos permitir visualização
    }

    res.json(news)
  } catch (error) {
    console.error('Erro ao buscar notícia:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

// POST /api/news - Criar notícia
export async function createNews(req: Request, res: Response) {
  try {
    const {
      title,
      summary,
      content,
      image,
      categoryId,
      isPublished = false,
      publishedAt
    } = req.body

    // Validações básicas
    if (!title || !summary || !content || !categoryId) {
      return res.status(400).json({
        error: 'Campos obrigatórios: title, summary, content, categoryId'
      })
    }

    const data: any = {
      title,
      summary,
      content,
      categoryId,
      isPublished
    }

    if (image) {
      data.image = image
    }

    if (isPublished && publishedAt) {
      data.publishedAt = new Date(publishedAt)
    } else if (isPublished) {
      data.publishedAt = new Date()
    }

    const news = await prisma.news.create({
      data,
      include: {
        category: true
      }
    })

    res.status(201).json(news)
  } catch (error) {
    console.error('Erro ao criar notícia:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

// PUT /api/news/:id - Atualizar notícia
export async function updateNews(req: Request, res: Response) {
  try {
    const { id } = req.params
    const {
      title,
      summary,
      content,
      image,
      categoryId,
      isPublished,
      publishedAt
    } = req.body

    const updateData: any = {}

    if (title) updateData.title = title
    if (summary) updateData.summary = summary
    if (content) updateData.content = content
    if (image !== undefined) updateData.image = image
    if (categoryId) updateData.categoryId = categoryId
    if (isPublished !== undefined) {
      updateData.isPublished = isPublished
      
      if (isPublished && publishedAt) {
        updateData.publishedAt = new Date(publishedAt)
      } else if (isPublished) {
        // Se está publicando agora e não foi especificada data
        const currentNews = await prisma.news.findUnique({
          where: { id }
        })
        if (currentNews && !currentNews.publishedAt) {
          updateData.publishedAt = new Date()
        }
      }
    }

    const news = await prisma.news.update({
      where: { id },
      data: updateData,
      include: {
        category: true
      }
    })

    res.json(news)
  } catch (error) {
    console.error('Erro ao atualizar notícia:', error)
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Notícia não encontrada' })
    }
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

// DELETE /api/news/:id - Deletar notícia
export async function deleteNews(req: Request, res: Response) {
  try {
    const { id } = req.params

    await prisma.news.delete({
      where: { id }
    })

    res.status(204).send()
  } catch (error) {
    console.error('Erro ao deletar notícia:', error)
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Notícia não encontrada' })
    }
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}